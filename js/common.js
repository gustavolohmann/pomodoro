/**
 * common.js - Tradução multi-idioma (default: Brasil pt-BR)
 * Depende de: lang/pt-BR.js, lang/en.js, lang/es.js (carregados antes)
 */
(function() {
    'use strict';

    var LANG_KEY = 'hub_lang';
    var DEFAULT_LANG = 'pt-BR';

    var LANGUAGES = {
        'pt-BR': { flag: '🇧🇷', name: 'Brasil', label: 'Português' },
        'en':    { flag: '🇺🇸', name: 'English', label: 'English' },
        'es':    { flag: '🇪🇸', name: 'Español', label: 'Español' }
    };

    var TRANSLATIONS = {};
    if (typeof window.LANG_PT_BR !== 'undefined') TRANSLATIONS['pt-BR'] = window.LANG_PT_BR;
    if (typeof window.LANG_EN !== 'undefined') TRANSLATIONS['en'] = window.LANG_EN;
    if (typeof window.LANG_ES !== 'undefined') TRANSLATIONS['es'] = window.LANG_ES;

    function getLang() {
        var saved = localStorage.getItem(LANG_KEY);
        return (saved && TRANSLATIONS[saved]) ? saved : DEFAULT_LANG;
    }

    function t(key) {
        var lang = getLang();
        var tr = TRANSLATIONS[lang];
        if (tr && tr[key] !== undefined) return tr[key];
        var fallback = TRANSLATIONS[DEFAULT_LANG];
        return (fallback && fallback[key] !== undefined) ? fallback[key] : key;
    }

    function setLang(lang) {
        if (!TRANSLATIONS[lang]) return;
        localStorage.setItem(LANG_KEY, lang);
        document.documentElement.lang = lang === 'pt-BR' ? 'pt-BR' : lang === 'es' ? 'es' : 'en';
        applyPage();
        var sel = document.getElementById('langSelect');
        if (sel) sel.value = lang;
    }

    function applyPage() {
        document.querySelectorAll('[data-i18n]').forEach(function(el) {
            var key = el.getAttribute('data-i18n');
            if (key) el.textContent = t(key);
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
            var key = el.getAttribute('data-i18n-placeholder');
            if (key) el.placeholder = t(key);
        });
        document.querySelectorAll('[data-i18n-title]').forEach(function(el) {
            var key = el.getAttribute('data-i18n-title');
            if (key) el.title = t(key);
        });
        document.querySelectorAll('[data-i18n-aria-label]').forEach(function(el) {
            var key = el.getAttribute('data-i18n-aria-label');
            if (key) el.setAttribute('aria-label', t(key));
        });
    }

    function renderLangSelector(containerId) {
        var container = document.getElementById(containerId);
        if (!container) return;
        var current = getLang();
        var select = document.createElement('select');
        select.id = 'langSelect';
        select.className = 'lang-select';
        select.setAttribute('aria-label', t('language'));
        Object.keys(LANGUAGES).forEach(function(code) {
            var opt = document.createElement('option');
            opt.value = code;
            opt.textContent = LANGUAGES[code].flag + ' ' + LANGUAGES[code].label;
            if (code === current) opt.selected = true;
            select.appendChild(opt);
        });
        select.addEventListener('change', function() {
            setLang(select.value);
        });
        container.appendChild(select);
    }

    function ensureToast() {
        var el = document.getElementById('toast');
        if (el) return el;
        el = document.createElement('div');
        el.id = 'toast';
        el.className = 'toast';
        el.setAttribute('role', 'status');
        el.setAttribute('aria-live', 'polite');
        var inner = document.createElement('div');
        inner.className = 'toast-content';
        var span = document.createElement('span');
        span.id = 'toastMessage';
        inner.appendChild(span);
        el.appendChild(inner);
        document.body.appendChild(el);
        return el;
    }

    function showToast(message) {
        var el = ensureToast();
        var msgEl = el.querySelector('#toastMessage') || el.querySelector('.toast-content span');
        if (msgEl) msgEl.textContent = message;
        el.classList.add('show');
        if (window._toastTimer) clearTimeout(window._toastTimer);
        window._toastTimer = setTimeout(function() {
            el.classList.remove('show');
            window._toastTimer = null;
        }, 2500);
    }

    window.I18n = {
        t: t,
        setLang: setLang,
        getLang: getLang,
        applyPage: applyPage,
        renderLangSelector: renderLangSelector,
        LANGUAGES: LANGUAGES
    };
    window.showToast = showToast;

    document.addEventListener('DOMContentLoaded', function() {
        setLang(getLang());
        var langContainer = document.getElementById('langSelector');
        if (langContainer && !document.getElementById('langSelect')) {
            renderLangSelector('langSelector');
        }
    });
})();
