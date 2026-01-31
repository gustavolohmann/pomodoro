// ============================================
// Estado da Aplicação (UI + estatísticas; timer global em PomodoroEngine)
// ============================================
const state = {
    // Estatísticas (local)
    todayCount: 0,
    totalCount: 0,
    lastDate: null,
    // Áudio
    audioContext: null
};

// ============================================
// Elementos DOM
// ============================================
const elements = {
    timerDisplay: document.getElementById('timerDisplay'),
    currentMode: document.getElementById('currentMode'),
    startBtn: document.getElementById('startBtn'),
    pauseBtn: document.getElementById('pauseBtn'),
    resetBtn: document.getElementById('resetBtn'),
    skipBtn: document.getElementById('skipBtn'),
    cyclesDots: document.querySelectorAll('.cycle-dot'),
    cyclesCount: document.getElementById('cyclesCount'),
    todayCount: document.getElementById('todayCount'),
    totalCount: document.getElementById('totalCount'),
    timerPulse: document.getElementById('timerPulse'),
    
    // Modal
    settingsModal: document.getElementById('settingsModal'),
    settingsBtn: document.getElementById('settingsBtn'),
    closeSettingsBtn: document.getElementById('closeSettingsBtn'),
    cancelSettingsBtn: document.getElementById('cancelSettingsBtn'),
    saveSettingsBtn: document.getElementById('saveSettingsBtn'),
    
    // Inputs de configuração
    pomodoroTime: document.getElementById('pomodoroTime'),
    shortBreakTime: document.getElementById('shortBreakTime'),
    longBreakTime: document.getElementById('longBreakTime'),
    cyclesForLongBreak: document.getElementById('cyclesForLongBreak'),
    
    // Toast
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toastMessage')
};

// ============================================
// Inicialização
// ============================================
function init() {
    loadSettings();
    loadStatistics();
    syncDisplayFromEngine();
    setupEventListeners();
    checkDateReset();
    initAudioContext();
    document.addEventListener('pomodoro:update', syncDisplayFromEngine);
    document.addEventListener('pomodoro:complete', onPomodoroComplete);
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

// ============================================
// Áudio Context
// ============================================
function initAudioContext() {
    try {
        state.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
        console.warn('Web Audio API não suportada:', e);
    }
}

function resumeAudioContext() {
    if (state.audioContext && state.audioContext.state === 'suspended') {
        state.audioContext.resume();
    }
}

// ============================================
// Event Listeners
// ============================================
function setupEventListeners() {
    // Controles do Timer
    elements.startBtn.addEventListener('click', () => {
        resumeAudioContext();
        startTimer();
    });
    elements.pauseBtn.addEventListener('click', pauseTimer);
    elements.resetBtn.addEventListener('click', resetTimer);
    elements.skipBtn.addEventListener('click', skipToNext);
    
    // Modal de Configurações
    elements.settingsBtn.addEventListener('click', openSettings);
    elements.closeSettingsBtn.addEventListener('click', closeSettings);
    elements.cancelSettingsBtn.addEventListener('click', closeSettings);
    elements.saveSettingsBtn.addEventListener('click', saveSettings);
    
    // Fechar modal ao clicar fora
    elements.settingsModal.addEventListener('click', (e) => {
        if (e.target === elements.settingsModal) {
            closeSettings();
        }
    });
    
    // Atalhos de teclado
    document.addEventListener('keydown', handleKeyboard);
    
    // Ativar contexto de áudio na primeira interação
    document.addEventListener('click', resumeAudioContext, { once: true });
    document.addEventListener('keydown', resumeAudioContext, { once: true });
}

// ============================================
// Timer Functions (delegam ao PomodoroEngine global)
// ============================================
function startTimer() {
    if (window.PomodoroEngine) window.PomodoroEngine.start();
}

function pauseTimer() {
    if (window.PomodoroEngine) window.PomodoroEngine.pause();
}

function resetTimer() {
    if (window.PomodoroEngine) window.PomodoroEngine.reset();
}

function skipToNext() {
    if (window.PomodoroEngine) window.PomodoroEngine.skipToNext();
}

function onPomodoroComplete() {
    playNotificationSound();
    showNotification();
    loadStatistics();
    updateStatistics();
}

// ============================================
// Display Functions (leem do PomodoroEngine)
// ============================================
function syncDisplayFromEngine() {
    var engine = window.PomodoroEngine;
    if (!engine || !elements.timerDisplay) return;
    var s = engine.getState();
    var minutes = Math.floor(s.remaining / 60);
    var seconds = s.remaining % 60;
    elements.timerDisplay.textContent =
        (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    var modeNames = {
        pomodoro: (window.I18n && window.I18n.t('pomodoroMode')) || 'Pomodoro',
        shortBreak: (window.I18n && window.I18n.t('shortBreak')) || 'Pausa Curta',
        longBreak: (window.I18n && window.I18n.t('longBreak')) || 'Pausa Longa'
    };
    elements.currentMode.textContent = modeNames[s.mode] || modeNames.pomodoro;
    elements.startBtn.disabled = !!s.isRunning;
    elements.pauseBtn.disabled = !s.isRunning;
    elements.timerPulse.classList.toggle('active', !!s.isRunning);
    var dots = Array.from(elements.cyclesDots);
    var cycleIndex = (s.completedCycles || 0) % (s.cyclesForLongBreak || 4);
    dots.forEach(function(dot, index) {
        dot.classList.toggle('completed', index < cycleIndex);
    });
    elements.cyclesCount.textContent = s.completedCycles || 0;
}

function updateStatistics() {
    elements.todayCount.textContent = state.todayCount;
    elements.totalCount.textContent = state.totalCount;
}

// ============================================
// Configurações
// ============================================
function openSettings() {
    var settings = window.PomodoroEngine ? window.PomodoroEngine.getSettings() : { pomodoro: 25 * 60, shortBreak: 5 * 60, longBreak: 15 * 60, cyclesForLongBreak: 4 };
    elements.pomodoroTime.value = settings.pomodoro / 60;
    elements.shortBreakTime.value = settings.shortBreak / 60;
    elements.longBreakTime.value = settings.longBreak / 60;
    elements.cyclesForLongBreak.value = settings.cyclesForLongBreak || 4;
    elements.settingsModal.classList.add('active');
}

function closeSettings() {
    elements.settingsModal.classList.remove('active');
}

function saveSettings() {
    var pomodoro = Math.max(1, Math.min(60, parseInt(elements.pomodoroTime.value, 10) || 25));
    var shortBreak = Math.max(1, Math.min(60, parseInt(elements.shortBreakTime.value, 10) || 5));
    var longBreak = Math.max(1, Math.min(60, parseInt(elements.longBreakTime.value, 10) || 15));
    var cycles = Math.max(1, Math.min(10, parseInt(elements.cyclesForLongBreak.value, 10) || 4));
    localStorage.setItem('pomodoroSettings', JSON.stringify({
        pomodoro: pomodoro,
        shortBreak: shortBreak,
        longBreak: longBreak,
        cyclesForLongBreak: cycles
    }));
    if (window.PomodoroEngine) window.PomodoroEngine.reset();
    syncDisplayFromEngine();
    closeSettings();
    showToast('Configurações salvas!');
}

function loadSettings() {
    if (window.PomodoroEngine) window.PomodoroEngine.getState();
}

// ============================================
// Estatísticas
// ============================================
function updateStatistics() {
    checkDateReset();
    elements.todayCount.textContent = state.todayCount;
    elements.totalCount.textContent = state.totalCount;
}

function checkDateReset() {
    const today = new Date().toDateString();
    
    if (state.lastDate !== today) {
        // Novo dia, resetar contador do dia
        state.todayCount = 0;
        state.lastDate = today;
        saveStatistics();
    }
}

function incrementPomodoroCount() {
    state.todayCount++;
    state.totalCount++;
    updateStatistics();
    saveStatistics();
}

function loadStatistics() {
    const saved = localStorage.getItem('pomodoroStatistics');
    if (saved) {
        try {
            const stats = JSON.parse(saved);
            state.totalCount = stats.totalCount || 0;
            state.lastDate = stats.lastDate;
            
            // Verificar se é o mesmo dia
            const today = new Date().toDateString();
            if (state.lastDate === today) {
                state.todayCount = stats.todayCount || 0;
            } else {
                state.todayCount = 0;
                state.lastDate = today;
            }
        } catch (e) {
            console.error('Erro ao carregar estatísticas:', e);
        }
    }
    
    updateStatistics();
}

function saveStatistics() {
    localStorage.setItem('pomodoroStatistics', JSON.stringify({
        todayCount: state.todayCount,
        totalCount: state.totalCount,
        lastDate: state.lastDate || new Date().toDateString()
    }));
}

// ============================================
// Notificações
// ============================================
function playNotificationSound() {
    try {
        // Garantir que o contexto de áudio está ativo
        if (!state.audioContext) {
            initAudioContext();
        }
        
        if (!state.audioContext) {
            console.warn('Áudio não disponível');
            return;
        }
        
        // Se o contexto estiver suspenso, tentar resumir
        if (state.audioContext.state === 'suspended') {
            state.audioContext.resume().then(() => {
                playSound();
            }).catch(() => {
                console.warn('Não foi possível ativar o áudio');
            });
        } else {
            playSound();
        }
    } catch (e) {
        console.warn('Erro ao reproduzir som:', e);
    }
    
    function playSound() {
        const ctx = state.audioContext;
        const oscillator1 = ctx.createOscillator();
        const oscillator2 = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        // Conectar os osciladores ao gain
        oscillator1.connect(gainNode);
        oscillator2.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        // Criar um som mais perceptível (dois tons)
        oscillator1.frequency.value = 800;
        oscillator1.type = 'sine';
        
        oscillator2.frequency.value = 1000;
        oscillator2.type = 'sine';
        
        // Envelope de volume (fade in/out)
        const now = ctx.currentTime;
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.4, now + 0.1);
        gainNode.gain.linearRampToValueAtTime(0.3, now + 0.3);
        gainNode.gain.linearRampToValueAtTime(0, now + 0.6);
        
        // Tocar os sons
        oscillator1.start(now);
        oscillator1.stop(now + 0.6);
        
        oscillator2.start(now);
        oscillator2.stop(now + 0.6);
    }
}

function showNotification() {
    var s = window.PomodoroEngine ? window.PomodoroEngine.getState() : { mode: 'pomodoro' };
    var modeNames = {
        pomodoro: (window.I18n && window.I18n.t('pomodoroMode')) || 'Pomodoro',
        shortBreak: (window.I18n && window.I18n.t('shortBreak')) || 'Pausa Curta',
        longBreak: (window.I18n && window.I18n.t('longBreak')) || 'Pausa Longa'
    };
    var message = s.mode === 'pomodoro'
        ? '⏰ Pausa finalizada! Hora de focar.'
        : '🍅 Pomodoro concluído! Hora de descansar.';
    showToast(message);
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Pomodoro Timer', { body: message, icon: '🍅', badge: '🍅' });
    }
}

function showToast(message) {
    elements.toastMessage.textContent = message;
    elements.toast.classList.add('show');
    
    setTimeout(() => {
        elements.toast.classList.remove('show');
    }, 3000);
}

// ============================================
// Atalhos de Teclado
// ============================================
function handleKeyboard(e) {
    if (e.target.tagName === 'INPUT') return;
    var s = window.PomodoroEngine ? window.PomodoroEngine.getState() : { isRunning: false };
    switch (e.code) {
        case 'Space':
            e.preventDefault();
            if (s.isRunning) pauseTimer(); else startTimer();
            break;
        case 'KeyR':
            if (e.ctrlKey || e.metaKey) { e.preventDefault(); resetTimer(); }
            break;
        case 'KeyS':
            if (e.ctrlKey || e.metaKey) { e.preventDefault(); skipToNext(); }
            break;
    }
}


// ============================================
// Inicializar quando o DOM estiver pronto
// ============================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
