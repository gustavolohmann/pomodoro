/**
 * Modal reutilizável (sucesso / erro / aviso)
 * Uso: Modal.show({ type: 'success'|'error'|'warning', title, message, confirmLabel, cancelLabel, onConfirm, onCancel, showCancel })
 *      Modal.hide()
 */
(function() {
    'use strict';

    var overlay = null;
    var box = null;
    var iconWrap = null;
    var titleEl = null;
    var messageEl = null;
    var actionsEl = null;
    var confirmBtn = null;
    var cancelBtn = null;
    var currentOnConfirm = null;
    var currentOnCancel = null;
    var currentEscHandler = null;

    var ICONS = {
        success: '✓',
        error: '✕',
        warning: '⚠️'
    };

    function createModal() {
        if (overlay) return;

        overlay = document.createElement('div');
        overlay.id = 'app-modal-overlay';
        overlay.className = 'app-modal-overlay';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-labelledby', 'app-modal-title');

        box = document.createElement('div');
        box.className = 'app-modal-box';

        iconWrap = document.createElement('div');
        iconWrap.className = 'app-modal-icon-wrap';

        titleEl = document.createElement('h2');
        titleEl.id = 'app-modal-title';
        titleEl.className = 'app-modal-title';

        messageEl = document.createElement('p');
        messageEl.className = 'app-modal-message';

        actionsEl = document.createElement('div');
        actionsEl.className = 'app-modal-actions';

        cancelBtn = document.createElement('button');
        cancelBtn.type = 'button';
        cancelBtn.className = 'app-modal-btn app-modal-btn--secondary';
        cancelBtn.textContent = 'Cancelar';
        cancelBtn.addEventListener('click', function() {
            hide();
            if (typeof currentOnCancel === 'function') currentOnCancel();
        });

        confirmBtn = document.createElement('button');
        confirmBtn.type = 'button';
        confirmBtn.className = 'app-modal-btn app-modal-btn--primary';
        confirmBtn.textContent = 'OK';
        confirmBtn.addEventListener('click', function() {
            hide();
            if (typeof currentOnConfirm === 'function') currentOnConfirm();
        });

        actionsEl.appendChild(cancelBtn);
        actionsEl.appendChild(confirmBtn);

        box.appendChild(iconWrap);
        box.appendChild(titleEl);
        box.appendChild(messageEl);
        box.appendChild(actionsEl);
        overlay.appendChild(box);

        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                hide();
                if (typeof currentOnCancel === 'function') currentOnCancel();
            }
        });

        document.body.appendChild(overlay);
    }

    function show(options) {
        options = options || {};
        createModal();

        var type = (options.type === 'success' || options.type === 'error' || options.type === 'warning')
            ? options.type
            : 'warning';

        iconWrap.className = 'app-modal-icon-wrap ' + type;
        iconWrap.textContent = options.icon != null ? options.icon : ICONS[type];

        titleEl.textContent = options.title != null ? options.title : (type === 'success' ? 'Sucesso' : type === 'error' ? 'Erro' : 'Atenção');
        messageEl.textContent = options.message != null ? options.message : '';

        var showCancel = options.showCancel !== false;
        cancelBtn.style.display = showCancel ? '' : 'none';
        cancelBtn.textContent = options.cancelLabel != null ? options.cancelLabel : 'Cancelar';
        confirmBtn.textContent = options.confirmLabel != null ? options.confirmLabel : 'OK';

        box.className = 'app-modal-box ' + type;

        currentOnConfirm = options.onConfirm || null;
        currentOnCancel = options.onCancel || null;

        overlay.classList.add('is-open');
        document.body.style.overflow = 'hidden';

        confirmBtn.focus();

        currentEscHandler = function(e) {
            if (e.key === 'Escape') {
                removeEscHandler();
                hide();
                if (typeof currentOnCancel === 'function') currentOnCancel();
            }
        };
        document.addEventListener('keydown', currentEscHandler);
    }

    function removeEscHandler() {
        if (currentEscHandler) {
            document.removeEventListener('keydown', currentEscHandler);
            currentEscHandler = null;
        }
    }

    function hide() {
        if (!overlay) return;
        removeEscHandler();
        overlay.classList.remove('is-open');
        document.body.style.overflow = '';
        currentOnConfirm = null;
        currentOnCancel = null;
    }

    window.Modal = {
        show: show,
        hide: hide
    };
})();
