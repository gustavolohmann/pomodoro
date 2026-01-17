// ============================================
// Estado da Aplicação
// ============================================
const state = {
    // Timer
    timeLeft: 25 * 60, // em segundos
    isRunning: false,
    intervalId: null,
    
    // Modos
    currentMode: 'pomodoro', // 'pomodoro', 'shortBreak', 'longBreak'
    modes: {
        pomodoro: 25 * 60,
        shortBreak: 5 * 60,
        longBreak: 15 * 60
    },
    
    // Ciclos
    completedCycles: 0,
    cyclesForLongBreak: 4,
    
    // Estatísticas
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
    updateDisplay();
    setupEventListeners();
    checkDateReset();
    initAudioContext();
    
    // Solicitar permissão para notificações
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
// Timer Functions
// ============================================
function startTimer() {
    if (state.isRunning) return;
    
    state.isRunning = true;
    elements.startBtn.disabled = true;
    elements.pauseBtn.disabled = false;
    elements.timerPulse.classList.add('active');
    
    state.intervalId = setInterval(() => {
        state.timeLeft--;
        updateDisplay();
        
        if (state.timeLeft <= 0) {
            completeTimer();
        }
    }, 1000);
}

function pauseTimer() {
    if (!state.isRunning) return;
    
    state.isRunning = false;
    clearInterval(state.intervalId);
    elements.startBtn.disabled = false;
    elements.pauseBtn.disabled = true;
    elements.timerPulse.classList.remove('active');
}

function resetTimer() {
    pauseTimer();
    state.timeLeft = state.modes[state.currentMode];
    updateDisplay();
}

function skipToNext() {
    pauseTimer();
    switchToNextMode();
}

function completeTimer() {
    pauseTimer();
    
    // Tocar som de notificação
    playNotificationSound();
    
    // Se completou um Pomodoro
    if (state.currentMode === 'pomodoro') {
        state.completedCycles++;
        incrementPomodoroCount();
        updateCyclesDisplay();
        
        // Verificar se deve ir para pausa longa
        if (state.completedCycles % state.cyclesForLongBreak === 0) {
            state.currentMode = 'longBreak';
        } else {
            state.currentMode = 'shortBreak';
        }
    } else {
        // Se completou uma pausa, voltar para Pomodoro
        state.currentMode = 'pomodoro';
    }
    
    state.timeLeft = state.modes[state.currentMode];
    updateDisplay();
    
    // Mostrar notificação
    showNotification();
    
    saveSettings();
}

function switchToNextMode() {
    if (state.currentMode === 'pomodoro') {
        // Se está em pomodoro, vai para pausa apropriada
        if ((state.completedCycles + 1) % state.cyclesForLongBreak === 0) {
            state.currentMode = 'longBreak';
        } else {
            state.currentMode = 'shortBreak';
        }
    } else {
        // Se está em pausa, volta para pomodoro
        state.currentMode = 'pomodoro';
    }
    
    state.timeLeft = state.modes[state.currentMode];
    updateDisplay();
}

// ============================================
// Display Functions
// ============================================
function updateDisplay() {
    const minutes = Math.floor(state.timeLeft / 60);
    const seconds = state.timeLeft % 60;
    elements.timerDisplay.textContent = 
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    // Atualizar texto do modo
    const modeNames = {
        pomodoro: 'Pomodoro',
        shortBreak: 'Pausa Curta',
        longBreak: 'Pausa Longa'
    };
    elements.currentMode.textContent = modeNames[state.currentMode];
}

function updateCyclesDisplay() {
    const dots = Array.from(elements.cyclesDots);
    const cycleIndex = state.completedCycles % state.cyclesForLongBreak;
    
    dots.forEach((dot, index) => {
        if (index < cycleIndex) {
            dot.classList.add('completed');
        } else {
            dot.classList.remove('completed');
        }
    });
    
    elements.cyclesCount.textContent = state.completedCycles;
}

function updateStatistics() {
    elements.todayCount.textContent = state.todayCount;
    elements.totalCount.textContent = state.totalCount;
}

// ============================================
// Configurações
// ============================================
function openSettings() {
    // Carregar valores atuais nos inputs
    elements.pomodoroTime.value = state.modes.pomodoro / 60;
    elements.shortBreakTime.value = state.modes.shortBreak / 60;
    elements.longBreakTime.value = state.modes.longBreak / 60;
    elements.cyclesForLongBreak.value = state.cyclesForLongBreak;
    
    elements.settingsModal.classList.add('active');
}

function closeSettings() {
    elements.settingsModal.classList.remove('active');
}

function saveSettings() {
    // Validar e salvar tempos
    const pomodoro = Math.max(1, Math.min(60, parseInt(elements.pomodoroTime.value) || 25));
    const shortBreak = Math.max(1, Math.min(60, parseInt(elements.shortBreakTime.value) || 5));
    const longBreak = Math.max(1, Math.min(60, parseInt(elements.longBreakTime.value) || 15));
    const cycles = Math.max(1, Math.min(10, parseInt(elements.cyclesForLongBreak.value) || 4));
    
    state.modes.pomodoro = pomodoro * 60;
    state.modes.shortBreak = shortBreak * 60;
    state.modes.longBreak = longBreak * 60;
    state.cyclesForLongBreak = cycles;
    
    // Se o timer não está rodando, atualizar o tempo atual
    if (!state.isRunning) {
        state.timeLeft = state.modes[state.currentMode];
        updateDisplay();
    }
    
    // Salvar no localStorage
    localStorage.setItem('pomodoroSettings', JSON.stringify({
        pomodoro: pomodoro,
        shortBreak: shortBreak,
        longBreak: longBreak,
        cyclesForLongBreak: cycles
    }));
    
    closeSettings();
    showToast('Configurações salvas!');
}

function loadSettings() {
    const saved = localStorage.getItem('pomodoroSettings');
    if (saved) {
        try {
            const settings = JSON.parse(saved);
            state.modes.pomodoro = (settings.pomodoro || 25) * 60;
            state.modes.shortBreak = (settings.shortBreak || 5) * 60;
            state.modes.longBreak = (settings.longBreak || 15) * 60;
            state.cyclesForLongBreak = settings.cyclesForLongBreak || 4;
        } catch (e) {
            console.error('Erro ao carregar configurações:', e);
        }
    }
    
    state.timeLeft = state.modes[state.currentMode];
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
    const modeNames = {
        pomodoro: 'Pomodoro',
        shortBreak: 'Pausa Curta',
        longBreak: 'Pausa Longa'
    };
    
    const message = state.currentMode === 'pomodoro' 
        ? '🍅 Pomodoro concluído! Hora de descansar.'
        : `⏰ ${modeNames[state.currentMode]} finalizada!`;
    
    showToast(message);
    
    // Notificação do navegador (se permitido)
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Pomodoro Timer', {
            body: message,
            icon: '🍅',
            badge: '🍅'
        });
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
    // Ignorar se estiver digitando em um input
    if (e.target.tagName === 'INPUT') return;
    
    switch(e.code) {
        case 'Space':
            e.preventDefault();
            if (state.isRunning) {
                pauseTimer();
            } else {
                startTimer();
            }
            break;
        case 'KeyR':
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                resetTimer();
            }
            break;
        case 'KeyS':
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                skipToNext();
            }
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
