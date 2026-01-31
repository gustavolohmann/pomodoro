/**
 * Header global do Pomodoro - visível em todas as telas
 * Mostra tempo restante, modo (Foco/Pausa) e botão Pausar/Iniciar
 */
(function() {
    'use strict';

    function formatTime(seconds) {
        var m = Math.floor(seconds / 60);
        var s = seconds % 60;
        return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
    }

    function modeLabel(mode) {
        var key = mode === 'pomodoro' ? 'pomodoroMode' : (mode === 'shortBreak' ? 'shortBreak' : 'longBreak');
        return (window.I18n && window.I18n.t(key)) || (mode === 'pomodoro' ? 'Pomodoro' : (mode === 'shortBreak' ? 'Pausa Curta' : 'Pausa Longa'));
    }

    function isFocus(mode) {
        return mode === 'pomodoro';
    }

    function render(state) {
        var block = document.getElementById('pomodoroGlobalBlock');
        if (!block) return;
        var timeEl = document.getElementById('pomodoroGlobalTime');
        var modeEl = document.getElementById('pomodoroGlobalMode');
        var btnEl = document.getElementById('pomodoroGlobalBtn');
        var linkEl = document.getElementById('pomodoroGlobalLink');
        if (timeEl) timeEl.textContent = formatTime(state.remaining);
        if (modeEl) {
            modeEl.textContent = state.isRunning
                ? (isFocus(state.mode) ? ((window.I18n && window.I18n.t('focusActive')) || 'Foco Ativo') : ((window.I18n && window.I18n.t('breakActive')) || 'Pausa'))
                : ((window.I18n && window.I18n.t('paused')) || 'Pausado');
        }
        if (btnEl) {
            btnEl.textContent = state.isRunning
                ? ((window.I18n && window.I18n.t('pause')) || 'Pausar')
                : ((window.I18n && window.I18n.t('start')) || 'Iniciar');
            btnEl.setAttribute('aria-label', state.isRunning ? 'Pausar' : 'Iniciar Pomodoro');
        }
        if (linkEl) linkEl.href = window.location.pathname.indexOf('pomodoro.html') !== -1 ? 'index.html' : 'pomodoro.html';
    }

    function createBlock() {
        var html =
            '<div id="pomodoroGlobalBlock" class="pomodoro-global-block">' +
            '  <a id="pomodoroGlobalLink" href="pomodoro.html" class="pomodoro-global-link" aria-label="Pomodoro">' +
            '    <span class="pomodoro-global-icon" aria-hidden="true">🍅</span>' +
            '    <span id="pomodoroGlobalTime" class="pomodoro-global-time">25:00</span>' +
            '    <span id="pomodoroGlobalMode" class="pomodoro-global-mode">Pausado</span>' +
            '  </a>' +
            '  <button type="button" id="pomodoroGlobalBtn" class="pomodoro-global-btn">Iniciar</button>' +
            '</div>';
        var wrap = document.createElement('div');
        wrap.innerHTML = html;
        return wrap.firstElementChild;
    }

    function init() {
        if (!window.PomodoroEngine) return;
        var topBar = document.querySelector('.top-bar');
        var block = createBlock();
        if (topBar) {
            topBar.insertBefore(block, topBar.firstChild);
            document.body.classList.add('has-pomodoro-bar');
        } else {
            var bar = document.createElement('div');
            bar.className = 'pomodoro-global-bar';
            bar.appendChild(block);
            var bg = document.querySelector('.background-gradient');
            if (bg && bg.nextSibling) {
                document.body.insertBefore(bar, bg.nextSibling);
            } else {
                document.body.insertBefore(bar, document.body.firstChild);
            }
            document.body.classList.add('has-pomodoro-bar');
        }

        var state = window.PomodoroEngine.getState();
        render(state);

        document.getElementById('pomodoroGlobalBtn').addEventListener('click', function() {
            state = window.PomodoroEngine.getState();
            if (state.isRunning) {
                window.PomodoroEngine.pause();
            } else {
                window.PomodoroEngine.start();
            }
        });

        document.addEventListener('pomodoro:update', function(e) {
            render(e.detail || window.PomodoroEngine.getState());
        });

        document.addEventListener('pomodoro:complete', function(e) {
            render(e.detail || window.PomodoroEngine.getState());
        });
        updateCardPomodoro(state);
        document.addEventListener('pomodoro:update', function(e) {
            updateCardPomodoro(e.detail || window.PomodoroEngine.getState());
        });
    }
    function updateCardPomodoro(state) {
        var block = document.getElementById('cardPomodoroStatus');
        if (!block) return;
        var m = Math.floor(state.remaining / 60);
        var s = state.remaining % 60;
        var timeStr = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
        var modeLabel = state.mode === 'pomodoro' ? ((window.I18n && window.I18n.t('pomodoroMode')) || 'Pomodoro') : (state.mode === 'shortBreak' ? ((window.I18n && window.I18n.t('shortBreak')) || 'Pausa Curta') : ((window.I18n && window.I18n.t('longBreak')) || 'Pausa Longa'));
        var restLabel = (window.I18n && window.I18n.t('remaining')) || 'restantes';
        block.innerHTML = '<a href="pomodoro.html" class="card-pomodoro-status-link">🍅 ' + (state.isRunning ? ((window.I18n && window.I18n.t('pomodoroActive')) || 'Pomodoro ativo') + ' &ndash; ' + timeStr + ' ' + restLabel + ' &ndash; ' + modeLabel : timeStr + ' &ndash; ' + modeLabel) + '</a>';
        block.style.display = '';
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
