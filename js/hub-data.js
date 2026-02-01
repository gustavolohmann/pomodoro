/**
 * Hub de Métodos de Estudo - Dados centralizados (localStorage)
 * Chaves: hub_ivyLee, hub_flashcards, hub_metacognicao, hub_blurt, hub_activityLog
 */

const HubData = {
    keys: {
        ivyLee: 'hub_ivyLee',
        flashcards: 'hub_flashcards',
        metacognicao: 'hub_metacognicao',
        blurt: 'hub_blurt',
        activityLog: 'hub_activityLog',
        mindmap: 'hub_mindmap'
    },

    getToday() {
        return new Date().toISOString().slice(0, 10);
    },

    // Ivy Lee: { "YYYY-MM-DD": [ { id, name, description?, done, order } ] } (text = name para compat)
    getIvyLee(date) {
        const raw = localStorage.getItem(this.keys.ivyLee);
        const all = raw ? JSON.parse(raw) : {};
        return all[date] || [];
    },
    setIvyLee(date, tasks) {
        const raw = localStorage.getItem(this.keys.ivyLee);
        const all = raw ? JSON.parse(raw) : {};
        all[date] = tasks;
        localStorage.setItem(this.keys.ivyLee, JSON.stringify(all));
    },

    // Flashcards: [ { id, question, answer, nextReview?, interval? } ]
    getFlashcards() {
        const raw = localStorage.getItem(this.keys.flashcards);
        return raw ? JSON.parse(raw) : [];
    },
    setFlashcards(cards) {
        localStorage.setItem(this.keys.flashcards, JSON.stringify(cards));
    },

    // Spaced Repetition: usa mesmo array de flashcards com nextReview (YYYY-MM-DD), interval (1,3,7,15,30)
    getDueCards() {
        const today = this.getToday();
        return this.getFlashcards().filter(c => !c.nextReview || c.nextReview <= today);
    },

    // Metacognição: { "YYYY-MM-DD": { learned, difficult, toReview, worked } }
    getMetacognicao(date) {
        const raw = localStorage.getItem(this.keys.metacognicao);
        const all = raw ? JSON.parse(raw) : {};
        return all[date] || null;
    },
    setMetacognicao(date, data) {
        const raw = localStorage.getItem(this.keys.metacognicao);
        const all = raw ? JSON.parse(raw) : {};
        all[date] = data;
        localStorage.setItem(this.keys.metacognicao, JSON.stringify(all));
    },

    // Blurt: [ { id, topic, content, baseContent?, date } ]
    getBlurts() {
        const raw = localStorage.getItem(this.keys.blurt);
        return raw ? JSON.parse(raw) : [];
    },
    setBlurts(items) {
        localStorage.setItem(this.keys.blurt, JSON.stringify(items));
    },

    // Activity log para dashboard: { dates: ["YYYY-MM-DD"], pomodoroMinutes: N, cardsReviewed: N, correctCount: N }
    getActivityLog() {
        const raw = localStorage.getItem(this.keys.activityLog);
        return raw ? JSON.parse(raw) : { dates: [], pomodoroMinutes: 0, cardsReviewed: 0, correctCount: 0 };
    },
    setActivityLog(data) {
        localStorage.setItem(this.keys.activityLog, JSON.stringify(data));
    },
    recordActivity(type, value) {
        const log = this.getActivityLog();
        const today = this.getToday();
        if (!log.dates.includes(today)) log.dates.push(today);
        if (type === 'pomodoroMinutes') log.pomodoroMinutes = (log.pomodoroMinutes || 0) + value;
        if (type === 'cardsReviewed') log.cardsReviewed = (log.cardsReviewed || 0) + 1;
        if (type === 'correct') log.correctCount = (log.correctCount || 0) + 1;
        this.setActivityLog(log);
    },
    addActiveDay() {
        const log = this.getActivityLog();
        const today = this.getToday();
        if (!log.dates.includes(today)) {
            log.dates.push(today);
            this.setActivityLog(log);
        }
    },

    // Mapa mental: { nodes: [{ id, x, y, text, shape }], edges: [{ from, to }] }
    getMindmap() {
        const raw = localStorage.getItem(this.keys.mindmap);
        if (!raw) return { nodes: [], edges: [] };
        const data = JSON.parse(raw);
        return { nodes: data.nodes || [], edges: data.edges || [] };
    },
    setMindmap(data) {
        localStorage.setItem(this.keys.mindmap, JSON.stringify({ nodes: data.nodes || [], edges: data.edges || [] }));
    },

    exportAll() {
        const data = {};
        for (const k of Object.values(this.keys)) {
            const v = localStorage.getItem(k);
            if (v) data[k] = JSON.parse(v);
        }
        data.exportDate = new Date().toISOString();
        return data;
    },

    importAll(data) {
        for (const k of Object.values(this.keys)) {
            if (data[k]) localStorage.setItem(k, JSON.stringify(data[k]));
        }
    },

    resetHub() {
        for (const k of Object.values(this.keys)) {
            localStorage.removeItem(k);
        }
    }
};
