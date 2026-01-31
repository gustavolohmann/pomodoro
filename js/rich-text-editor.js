/**
 * Rich Text Editor - 100% client-side, sem bibliotecas externas
 * Toolbar: B, I, U, lista, lista numerada, H1, H2
 * Uso: RichTextEditor.create(containerElement, options) -> { getHTML, setHTML, clear }
 */
(function() {
    'use strict';

    function createToolbar(container) {
        var toolbar = document.createElement('div');
        toolbar.className = 'rte-toolbar';
        toolbar.setAttribute('role', 'toolbar');
        var buttons = [
            { cmd: 'bold', label: 'B', title: 'Negrito', tag: 'b' },
            { cmd: 'italic', label: 'I', title: 'Itálico', tag: 'i' },
            { cmd: 'underline', label: 'U', title: 'Sublinhado', tag: 'u' },
            { cmd: 'insertUnorderedList', label: '•', title: 'Lista com marcadores' },
            { cmd: 'insertOrderedList', label: '1.', title: 'Lista numerada' },
            { cmd: 'formatBlock', value: 'h1', label: 'H1', title: 'Título 1' },
            { cmd: 'formatBlock', value: 'h2', label: 'H2', title: 'Título 2' }
        ];
        buttons.forEach(function(b) {
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'rte-toolbar-btn';
            btn.textContent = b.label;
            btn.title = b.title || b.label;
            btn.setAttribute('aria-label', b.title || b.label);
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                document.execCommand(b.cmd, false, b.value != null ? b.value : null);
                btn.focus();
            });
            toolbar.appendChild(btn);
        });
        container.appendChild(toolbar);
        return toolbar;
    }

    function createEditor(container, options) {
        options = options || {};
        var placeholder = options.placeholder || '';
        var minHeight = options.minHeight != null ? options.minHeight : 120;
        var editor = document.createElement('div');
        editor.className = 'rte-editor';
        editor.contentEditable = 'true';
        editor.setAttribute('data-placeholder', placeholder);
        editor.setAttribute('role', 'textbox');
        editor.setAttribute('aria-multiline', 'true');
        if (minHeight) editor.style.minHeight = minHeight + 'px';
        container.appendChild(editor);

        editor.addEventListener('focus', function() {
            editor.classList.add('rte-editor-focused');
        });
        editor.addEventListener('blur', function() {
            editor.classList.remove('rte-editor-focused');
        });

        function getHTML() {
            var html = editor.innerHTML.trim();
            if (html === '' || html === '<br>') return '';
            return html;
        }
        function setHTML(html) {
            editor.innerHTML = (html || '').trim() || '';
        }
        function clear() {
            editor.innerHTML = '';
        }
        return { element: editor, getHTML: getHTML, setHTML: setHTML, clear: clear };
    }

    /**
     * Cria um RTE completo (toolbar + editor) dentro de container.
     * @param {HTMLElement} container - Elemento que receberá toolbar e editor
     * @param {Object} options - { placeholder, minHeight }
     * @returns {Object} - { getHTML, setHTML, clear, element }
     */
    function create(container, options) {
        if (typeof container === 'string') container = document.getElementById(container);
        if (!container) return null;
        var wrapper = document.createElement('div');
        wrapper.className = 'rte-wrapper';
        container.appendChild(wrapper);
        createToolbar(wrapper);
        var editorApi = createEditor(wrapper, options);
        editorApi.wrapper = wrapper;
        return editorApi;
    }

    /**
     * Apenas toolbar (para uso compartilhado com vários editores).
     * @param {HTMLElement} container
     */
    function createToolbarOnly(container) {
        if (typeof container === 'string') container = document.getElementById(container);
        if (!container) return null;
        return createToolbar(container);
    }

    /**
     * Apenas editor contenteditable (sem toolbar).
     * @param {HTMLElement} container
     * @param {Object} options - { placeholder, minHeight }
     */
    function createEditorOnly(container, options) {
        if (typeof container === 'string') container = document.getElementById(container);
        if (!container) return null;
        var wrapper = document.createElement('div');
        wrapper.className = 'rte-wrapper rte-wrapper-no-toolbar';
        container.appendChild(wrapper);
        return createEditor(wrapper, options);
    }

    window.RichTextEditor = {
        create: create,
        createToolbarOnly: createToolbarOnly,
        createEditorOnly: createEditorOnly
    };
})();
