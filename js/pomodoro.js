/**
 * Pomodoro Engine - Estado global do Pomodoro (sem dependência de UI)
 * Fonte da verdade: localStorage. Tempo restante sempre recalculado por Date.now().
 */
(function() {
    'use strict';

    var STORAGE_KEY = 'pomodoroState';
    var SETTINGS_KEY = 'pomodoroSettings';
    var STATS_KEY = 'pomodoroStatistics';
    var TICK_MS = 1000;

    var defaultSettings = {
        pomodoro: 25,
        shortBreak: 5,
        longBreak: 15,
        cyclesForLongBreak: 4
    };

    var tickIntervalId = null;

    function getSettings() {
        try {
            var raw = localStorage.getItem(SETTINGS_KEY);
            if (raw) {
                var s = JSON.parse(raw);
                return {
                    pomodoro: (s.pomodoro || 25) * 60,
                    shortBreak: (s.shortBreak || 5) * 60,
                    longBreak: (s.longBreak || 15) * 60,
                    cyclesForLongBreak: s.cyclesForLongBreak || 4
                };
            }
        } catch (e) {}
        return {
            pomodoro: defaultSettings.pomodoro * 60,
            shortBreak: defaultSettings.shortBreak * 60,
            longBreak: defaultSettings.longBreak * 60,
            cyclesForLongBreak: defaultSettings.cyclesForLongBreak
        };
    }

    function getStoredState() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            if (raw) return JSON.parse(raw);
        } catch (e) {}
        var settings = getSettings();
        return {
            isRunning: false,
            mode: 'pomodoro',
            startTime: null,
            duration: settings.pomodoro,
            remaining: settings.pomodoro,
            completedCycles: 0,
            cyclesForLongBreak: settings.cyclesForLongBreak
        };
    }

    function persist(state) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                isRunning: state.isRunning,
                mode: state.mode,
                startTime: state.startTime,
                duration: state.duration,
                remaining: state.remaining,
                completedCycles: state.completedCycles,
                cyclesForLongBreak: state.cyclesForLongBreak
            }));
        } catch (e) {}
    }

    function dispatch(state) {
        document.dispatchEvent(new CustomEvent('pomodoro:update', { detail: state }));
    }

    function recalculateRemaining(state) {
        if (!state.isRunning || state.startTime == null) return state.remaining;
        var elapsed = Math.floor((Date.now() - state.startTime) / 1000);
        var r = state.duration - elapsed;
        return r < 0 ? 0 : r;
    }

    function getState() {
        var settings = getSettings();
        var state = getStoredState();
        state.cyclesForLongBreak = settings.cyclesForLongBreak;
        var durationByMode = {
            pomodoro: settings.pomodoro,
            shortBreak: settings.shortBreak,
            longBreak: settings.longBreak
        };
        if (state.isRunning && state.startTime != null) {
            state.remaining = recalculateRemaining(state);
            if (state.remaining <= 0) {
                state.remaining = 0;
                completeTimer(state, durationByMode);
                return state;
            }
            if (!tickIntervalId) startTick();
        } else {
            state.duration = durationByMode[state.mode] || settings.pomodoro;
            state.remaining = state.remaining != null ? state.remaining : state.duration;
        }
        return state;
    }

    function completeTimer(state, durationByMode) {
        state.isRunning = false;
        stopTick();
        if (state.mode === 'pomodoro') {
            state.completedCycles = (state.completedCycles || 0) + 1;
            try {
                if (window.HubData && typeof window.HubData.recordActivity === 'function') {
                    window.HubData.recordActivity('pomodoroMinutes', 25);
                }
            } catch (e) {}
            var statsRaw = localStorage.getItem(STATS_KEY);
            if (statsRaw) {
                try {
                    var stats = JSON.parse(statsRaw);
                    stats.todayCount = (stats.todayCount || 0) + 1;
                    stats.totalCount = (stats.totalCount || 0) + 1;
                    stats.lastDate = new Date().toDateString();
                    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
                } catch (e) {}
            }
            var cycles = state.cyclesForLongBreak || 4;
            if (state.completedCycles % cycles === 0) {
                state.mode = 'longBreak';
            } else {
                state.mode = 'shortBreak';
            }
        } else {
            state.mode = 'pomodoro';
        }
        state.duration = durationByMode[state.mode] || durationByMode.pomodoro;
        state.remaining = state.duration;
        state.startTime = null;
        persist(state);
        dispatch(state);
        document.dispatchEvent(new CustomEvent('pomodoro:complete', { detail: state }));
    }

    function startTick() {
        if (tickIntervalId) return;
        tickIntervalId = setInterval(function() {
            var state = getState();
            if (!state.isRunning) return;
            persist(state);
            dispatch(state);
        }, TICK_MS);
    }

    function stopTick() {
        if (tickIntervalId) {
            clearInterval(tickIntervalId);
            tickIntervalId = null;
        }
    }

    function start() {
        var state = getState();
        if (state.isRunning) return;
        var settings = getSettings();
        var durationByMode = {
            pomodoro: settings.pomodoro,
            shortBreak: settings.shortBreak,
            longBreak: settings.longBreak
        };
        state.duration = durationByMode[state.mode] || settings.pomodoro;
        state.remaining = state.remaining != null && state.remaining > 0 ? state.remaining : state.duration;
        state.startTime = Date.now() - (state.duration - state.remaining) * 1000;
        state.isRunning = true;
        persist(state);
        dispatch(state);
        startTick();
    }

    function pause() {
        var state = getState();
        if (!state.isRunning) return;
        state.remaining = recalculateRemaining(state);
        state.isRunning = false;
        state.startTime = null;
        stopTick();
        persist(state);
        dispatch(state);
    }

    function resume() {
        start();
    }

    function reset() {
        var state = getState();
        state.isRunning = false;
        state.startTime = null;
        stopTick();
        var settings = getSettings();
        var durationByMode = {
            pomodoro: settings.pomodoro,
            shortBreak: settings.shortBreak,
            longBreak: settings.longBreak
        };
        state.duration = durationByMode[state.mode] || settings.pomodoro;
        state.remaining = state.duration;
        persist(state);
        dispatch(state);
    }

    function skipToNext() {
        var state = getState();
        var settings = getSettings();
        var cycles = state.cyclesForLongBreak || settings.cyclesForLongBreak;
        if (state.mode === 'pomodoro') {
            state.mode = (state.completedCycles + 1) % cycles === 0 ? 'longBreak' : 'shortBreak';
        } else {
            state.mode = 'pomodoro';
        }
        state.duration = settings[state.mode] || settings.pomodoro;
        state.remaining = state.duration;
        state.isRunning = false;
        state.startTime = null;
        stopTick();
        persist(state);
        dispatch(state);
    }

    window.PomodoroEngine = {
        getState: getState,
        getSettings: getSettings,
        start: start,
        pause: pause,
        resume: resume,
        reset: reset,
        skipToNext: skipToNext,
        persist: persist,
        dispatch: dispatch
    };

    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            var state = getState();
            if (state.isRunning) dispatch(state);
        }
    });
})();
