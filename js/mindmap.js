/**
 * Mapa Mental - Vanilla JS + SVG
 * Canvas fullscreen, zoom/pan, sidebar fixa, nós e ligações. Estado só em memória (não salva no navegador).
 */
(function () {
    'use strict';

    const NODE_WIDTH = 100;
    const NODE_HEIGHT = 36;
    const NODE_MIN_W = 24;
    const NODE_MIN_H = 24;
    const ELLIPSE_RX = 50;
    const ELLIPSE_RY = 18;
    const DIAMOND_W = 50;
    const DIAMOND_H = 22;
    const EDGE_HIT_STROKE = 12;
    const HANDLE_SIZE = 8;
    const VIEWBOX_DEFAULT = { x: 0, y: 0, w: 1200, h: 800 };
    const ZOOM_MIN = 0.2;
    const ZOOM_MAX = 4;
    const ZOOM_FACTOR = 1.15;

    let svgEl, canvasWrap, gEdges, gNodes, nodes = [], edges = [];
    let mode = 'select';
    let nextShape = 'rect';
    let selectedNodeId = null;
    let selectedEdgeIndex = -1;
    /**
     * Estado mutável do editor. Apenas um tipo de interação ativa por vez:
     * dragNodeId | resizingNodeId | isPanning | editingNodeId | linkSourceNodeId
     */
    let dragNodeId = null;
    let dragOffsetX = 0, dragOffsetY = 0;
    let linkSourceNodeId = null;
    let editingNodeId = null;
    /** Referência ao elemento .mindmap-node-edit em edição (evita querySelector). */
    let editingNodeEl = null;
    let resizingNodeId = null;
    let resizeHandle = null;
    let resizeStart = null;
    let viewBox = { x: VIEWBOX_DEFAULT.x, y: VIEWBOX_DEFAULT.y, w: VIEWBOX_DEFAULT.w, h: VIEWBOX_DEFAULT.h };
    let isPanning = false;
    let panStart = null;
    let renderScheduled = false;
    let cursorUpdateScheduled = false;
    let modeButtons = [];
    let shapeButtons = [];
    let i18n = window.I18n || { t: function (k) { return k; } };

    function getNodeW(node) { return Math.max(NODE_MIN_W, node.width || NODE_WIDTH); }
    function getNodeH(node) { return Math.max(NODE_MIN_H, node.height || NODE_HEIGHT); }

    function generateId() {
        return 'n' + Date.now() + '_' + Math.random().toString(36).slice(2, 9);
    }

    function getNodeById(id) {
        return nodes.find(function (n) { return n.id === id; });
    }

    function applyViewBox() {
        if (svgEl) svgEl.setAttribute('viewBox', viewBox.x + ' ' + viewBox.y + ' ' + viewBox.w + ' ' + viewBox.h);
    }

    /** Agenda no máximo uma renderização por frame (drag/resize/pan). */
    function scheduleRender() {
        if (renderScheduled) return;
        renderScheduled = true;
        requestAnimationFrame(function () {
            renderScheduled = false;
            render();
        });
    }

    function getSvgPoint(evt) {
        if (!svgEl) return { x: 0, y: 0 };
        var rect = svgEl.getBoundingClientRect();
        var x = viewBox.x + (evt.clientX - rect.left) / rect.width * viewBox.w;
        var y = viewBox.y + (evt.clientY - rect.top) / rect.height * viewBox.h;
        return { x: x, y: y };
    }

    function getNodeCenter(node) {
        return { x: node.x, y: node.y };
    }

    function getNodeBounds(node) {
        var hw = getNodeW(node) / 2, hh = getNodeH(node) / 2;
        return { left: node.x - hw, top: node.y - hh, right: node.x + hw, bottom: node.y + hh };
    }

    function pointInEllipse(px, py, cx, cy, rx, ry) {
        return ((px - cx) / rx) * ((px - cx) / rx) + ((py - cy) / ry) * ((py - cy) / ry) <= 1;
    }

    function pointInDiamond(px, py, cx, cy, dw, dh) {
        var dx = Math.abs(px - cx);
        var dy = Math.abs(py - cy);
        return (dx / dw) + (dy / dh) <= 1;
    }

    function pointInNode(x, y, n) {
        var shape = n.shape === 'ellipse' ? 'circle' : (n.shape || 'rect');
        var hw = getNodeW(n) / 2, hh = getNodeH(n) / 2;
        if (shape === 'rect') {
            var b = getNodeBounds(n);
            return x >= b.left && x <= b.right && y >= b.top && y <= b.bottom;
        }
        if (shape === 'circle') return pointInEllipse(x, y, n.x, n.y, hw, hh);
        return pointInDiamond(x, y, n.x, n.y, hw, hh);
    }

    function hitTestNode(x, y) {
        for (var i = nodes.length - 1; i >= 0; i--) {
            if (pointInNode(x, y, nodes[i])) return nodes[i].id;
        }
        return null;
    }

    function getNodeEdgePoint(node, dirX, dirY) {
        var cx = node.x, cy = node.y;
        var len = Math.sqrt(dirX * dirX + dirY * dirY) || 1e-6;
        var ux = dirX / len, uy = dirY / len;
        var shape = node.shape === 'ellipse' ? 'circle' : (node.shape || 'rect');
        var hw = getNodeW(node) / 2, hh = getNodeH(node) / 2;
        var t = Infinity;

        if (shape === 'rect') {
            if (ux > 1e-6) t = Math.min(t, hw / ux);
            if (ux < -1e-6) t = Math.min(t, -hw / ux);
            if (uy > 1e-6) t = Math.min(t, hh / uy);
            if (uy < -1e-6) t = Math.min(t, -hh / uy);
        } else if (shape === 'circle') {
            t = 1 / Math.sqrt((ux / hw) * (ux / hw) + (uy / hh) * (uy / hh));
        } else {
            var verts = [
                [cx, cy - hh], [cx + hw, cy], [cx, cy + hh], [cx - hw, cy]
            ];
            for (var i = 0; i < 4; i++) {
                var v0 = verts[i], v1 = verts[(i + 1) % 4];
                var ex = v1[0] - v0[0], ey = v1[1] - v0[1];
                var den = ux * ey - uy * ex;
                if (Math.abs(den) < 1e-9) continue;
                var dx = v0[0] - cx, dy = v0[1] - cy;
                var ti = (dx * ey - dy * ex) / den;
                if (ti > 0.001) {
                var px = cx + ti * ux, py = cy + ti * uy;
                var segMin = Math.min(v0[0], v1[0]), segMax = Math.max(v0[0], v1[0]);
                var segMinY = Math.min(v0[1], v1[1]), segMaxY = Math.max(v0[1], v1[1]);
                if (px >= segMin - 0.1 && px <= segMax + 0.1 && py >= segMinY - 0.1 && py <= segMaxY + 0.1)
                    t = Math.min(t, ti);
                }
            }
        }
        if (t === Infinity || t < 0) t = 1;
        return { x: cx + t * ux, y: cy + t * uy };
    }

    function hitTestEdge(x, y) {
        for (var i = 0; i < edges.length; i++) {
            var ep = getEdgeEndpoints(edges[i]);
            if (!ep) continue;
            var p1 = ep.p1, p2 = ep.p2;
            if (distToSegment(x, y, p1.x, p1.y, p2.x, p2.y) <= EDGE_HIT_STROKE) return i;
        }
        return -1;
    }

    function distToSegment(px, py, x1, y1, x2, y2) {
        var dx = x2 - x1, dy = y2 - y1;
        var len = Math.sqrt(dx * dx + dy * dy) || 1e-6;
        var t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / (len * len)));
        var qx = x1 + t * dx, qy = y1 + t * dy;
        return Math.sqrt((px - qx) * (px - qx) + (py - qy) * (py - qy));
    }

    function renderNode(g, node) {
        var isSel = node.id === selectedNodeId;
        var isEditing = node.id === editingNodeId;
        var shape = node.shape === 'ellipse' ? 'circle' : (node.shape || 'rect');
        var w = getNodeW(node), h = getNodeH(node);
        var hw = w / 2, hh = h / 2;
        var x = node.x, y = node.y;
        var el = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        var isLinkSource = (mode === 'addEdge' && linkSourceNodeId === node.id);
        el.setAttribute('class', 'mindmap-node' + (isSel ? ' selected' : '') + (isEditing ? ' editing' : '') + (isLinkSource ? ' link-source' : ''));
        el.setAttribute('data-id', node.id);

        if (shape === 'rect') {
            var r = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            r.setAttribute('x', x - hw);
            r.setAttribute('y', y - hh);
            r.setAttribute('width', w);
            r.setAttribute('height', h);
            r.setAttribute('rx', '6');
            r.setAttribute('ry', '6');
            r.setAttribute('class', 'mindmap-node-shape');
            el.appendChild(r);
        } else if (shape === 'circle') {
            var c = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
            c.setAttribute('cx', x);
            c.setAttribute('cy', y);
            c.setAttribute('rx', hw);
            c.setAttribute('ry', hh);
            c.setAttribute('class', 'mindmap-node-shape');
            el.appendChild(c);
        } else {
            var d = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            d.setAttribute('points', (x) + ',' + (y - hh) + ' ' + (x + hw) + ',' + (y) + ' ' + (x) + ',' + (y + hh) + ' ' + (x - hw) + ',' + (y));
            d.setAttribute('class', 'mindmap-node-shape');
            el.appendChild(d);
        }

        /* Área de hit cobrindo 100% do nó: fill quase invisível para receber eventos em todos os browsers */
        if (!isEditing) {
            var hitRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            hitRect.setAttribute('x', x - hw);
            hitRect.setAttribute('y', y - hh);
            hitRect.setAttribute('width', w);
            hitRect.setAttribute('height', h);
            hitRect.setAttribute('fill', 'white');
            hitRect.setAttribute('fill-opacity', '0.001');
            hitRect.setAttribute('class', 'mindmap-node-hit');
            hitRect.setAttribute('pointer-events', 'all');
            el.appendChild(hitRect);
        }

        if (isEditing) {
            var fo = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
            fo.setAttribute('x', x - hw + 4);
            fo.setAttribute('y', y - hh + 4);
            fo.setAttribute('width', Math.max(32, w - 8));
            fo.setAttribute('height', Math.max(24, h - 8));
            fo.setAttribute('class', 'mindmap-node-edit-wrap');
            var body = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
            body.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
            body.className = 'mindmap-node-edit';
            body.setAttribute('contenteditable', 'true');
            body.setAttribute('tabindex', '0');
            body.setAttribute('data-node-id', node.id);
            body.textContent = node.text || '';
            body.style.width = '100%';
            body.style.height = '100%';
            body.style.minHeight = '20px';
            body.style.cursor = 'text';
            body.style.caretColor = 'currentColor';
            fo.appendChild(body);
            el.appendChild(fo);
            editingNodeEl = body;
            g.appendChild(el);
            (function focusEdit() {
                requestAnimationFrame(function () {
                    requestAnimationFrame(function () {
                        if (getNodeById(node.id) && node.id === editingNodeId) {
                            body.focus();
                            try {
                                var range = document.createRange();
                                range.selectNodeContents(body);
                                var sel = window.getSelection();
                                if (sel) { sel.removeAllRanges(); sel.addRange(range); }
                            } catch (e) {}
                        }
                    });
                });
            })();
            body.addEventListener('blur', function () {
                var txt = (body.textContent || '').trim();
                var n = getNodeById(node.id);
                if (n) n.text = txt;
                editingNodeId = null;
                editingNodeEl = null;
                save();
                render();
            });
            body.addEventListener('keydown', function (evt) {
                if (evt.key === 'Escape') {
                    evt.preventDefault();
                    body.blur();
                }
                evt.stopPropagation();
            });
            body.addEventListener('mousedown', function (evt) { evt.stopPropagation(); });
            body.addEventListener('click', function (evt) { evt.stopPropagation(); });
            return;
        }

        var t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        t.setAttribute('x', x);
        t.setAttribute('y', y);
        t.setAttribute('text-anchor', 'middle');
        t.setAttribute('dominant-baseline', 'middle');
        t.setAttribute('class', 'mindmap-node-text');
        t.setAttribute('pointer-events', 'none');
        var txt = (node.text || '').replace(/\n/g, ' ');
        t.textContent = txt.length > 40 ? txt.slice(0, 40) + '…' : txt;
        el.appendChild(t);

        if (isSel) {
            var handles = ['se', 'sw', 'ne', 'nw'];
            handles.forEach(function (handleId) {
                var hr = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                var hx = (handleId.indexOf('e') >= 0) ? x + hw - HANDLE_SIZE : x - hw;
                var hy = (handleId.indexOf('s') >= 0) ? y + hh - HANDLE_SIZE : y - hh;
                hr.setAttribute('x', hx);
                hr.setAttribute('y', hy);
                hr.setAttribute('width', HANDLE_SIZE);
                hr.setAttribute('height', HANDLE_SIZE);
                hr.setAttribute('class', 'mindmap-resize-handle');
                hr.setAttribute('data-handle', handleId);
                el.appendChild(hr);
            });
        }
        g.appendChild(el);
    }

    function getEdgeEndpoints(edge) {
        var a = getNodeById(edge.from), b = getNodeById(edge.to);
        if (!a || !b) return null;
        var dx = b.x - a.x, dy = b.y - a.y;
        var len = Math.sqrt(dx * dx + dy * dy) || 1e-6;
        var ux = dx / len, uy = dy / len;
        var p1 = getNodeEdgePoint(a, ux, uy);
        var p2 = getNodeEdgePoint(b, -ux, -uy);
        return { p1: p1, p2: p2 };
    }

    function renderEdge(g, edge, index) {
        var ep = getEdgeEndpoints(edge);
        if (!ep) return;
        var p1 = ep.p1, p2 = ep.p2;
        var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', p1.x);
        line.setAttribute('y1', p1.y);
        line.setAttribute('x2', p2.x);
        line.setAttribute('y2', p2.y);
        line.setAttribute('class', 'mindmap-edge' + (index === selectedEdgeIndex ? ' selected' : ''));
        line.setAttribute('data-edge-index', index);
        line.setAttribute('stroke-width', EDGE_HIT_STROKE);
        line.setAttribute('stroke', 'transparent');
        line.setAttribute('stroke-linecap', 'round');
        g.appendChild(line);
        var vis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        vis.setAttribute('x1', p1.x);
        vis.setAttribute('y1', p1.y);
        vis.setAttribute('x2', p2.x);
        vis.setAttribute('y2', p2.y);
        vis.setAttribute('class', 'mindmap-edge-line');
        g.appendChild(vis);
    }

    function render() {
        if (!gEdges || !gNodes) return;
        if (editingNodeId) {
            var ed = editingNodeEl || document.querySelector('.mindmap-node-edit');
            if (ed) {
                var n = getNodeById(editingNodeId);
                if (n) n.text = (ed.textContent || '').trim();
            }
            editingNodeEl = null;
        }
        gEdges.innerHTML = '';
        gNodes.innerHTML = '';
        edges.forEach(function (edge, i) { renderEdge(gEdges, edge, i); });
        nodes.forEach(function (node) { renderNode(gNodes, node); });
    }

    function save() {
        /* Mapa dinâmico: não persiste no localStorage. Estado apenas em memória. */
    }

    /** Persiste texto do nó em edição e sai do modo edição (sem alterar seleção). */
    function commitEditingNode() {
        if (!editingNodeId) return;
        var ed = editingNodeEl || document.querySelector('.mindmap-node-edit');
        if (ed) {
            var n = getNodeById(editingNodeId);
            if (n) n.text = (ed.textContent || '').trim();
        }
        editingNodeId = null;
        editingNodeEl = null;
    }

    function doRemoveNode(id) {
        nodes = nodes.filter(function (n) { return n.id !== id; });
        edges = edges.filter(function (e) { return e.from !== id && e.to !== id; });
        if (selectedNodeId === id) selectedNodeId = null;
        selectedEdgeIndex = -1;
        if (editingNodeId === id) { editingNodeId = null; editingNodeEl = null; }
        if (dragNodeId === id) dragNodeId = null;
        if (resizingNodeId === id) {
            resizingNodeId = null;
            resizeHandle = null;
            resizeStart = null;
        }
        if (linkSourceNodeId === id) linkSourceNodeId = null;
        save();
        render();
    }

    /** Remove aresta por índice. Todos os caminhos de exclusão de aresta passam por aqui. */
    function doRemoveEdge(index) {
        if (index < 0 || index >= edges.length) return;
        edges.splice(index, 1);
        selectedNodeId = null;
        selectedEdgeIndex = -1;
        save();
        render();
    }

    function load() {
        nodes = [];
        edges = [];
        selectedNodeId = null;
        selectedEdgeIndex = -1;
        linkSourceNodeId = null;
        viewBox = { x: VIEWBOX_DEFAULT.x, y: VIEWBOX_DEFAULT.y, w: VIEWBOX_DEFAULT.w, h: VIEWBOX_DEFAULT.h };
        applyViewBox();
        render();
    }

    function setMode(m) {
        commitEditingNode();
        mode = m;
        linkSourceNodeId = null;
        isPanning = false;
        panStart = null;
        if (canvasWrap) {
            canvasWrap.classList.remove('panning', 'pan-cursor', 'mindmap-mode-addEdge');
            if (mode === 'addEdge') canvasWrap.classList.add('mindmap-mode-addEdge');
        }
        for (var i = 0; i < modeButtons.length; i++) modeButtons[i].classList.toggle('active', modeButtons[i].getAttribute('data-mode') === mode);
        if (mode === 'select') updatePanCursor(false);
        render();
    }

    function updatePanCursor(show) {
        if (!canvasWrap) return;
        if (mode !== 'select') show = false;
        canvasWrap.classList.toggle('pan-cursor', !!show);
    }

    function init(container) {
        if (!container) return;
        canvasWrap = container.querySelector('.mindmap-canvas-wrap');
        svgEl = canvasWrap ? canvasWrap.querySelector('.mindmap-svg') : container.querySelector('.mindmap-svg');
        if (!svgEl) return;
        gEdges = svgEl.querySelector('.mindmap-edges');
        gNodes = svgEl.querySelector('.mindmap-nodes');
        if (!gEdges || !gNodes) return;

        modeButtons = container.querySelectorAll('.mindmap-btn-mode') || [];
        shapeButtons = container.querySelectorAll('.mindmap-btn-shape') || [];

        load();
        applyViewBox();

        var target = canvasWrap || container;
        var lastCursorShowPan = false;

        function getNodeIdFromEvent(evt) {
            var pt = getSvgPoint(evt);
            var nodeEl = evt.target.closest && evt.target.closest('.mindmap-node[data-id]');
            var nodeId = nodeEl ? nodeEl.getAttribute('data-id') : null;
            if (!nodeId) nodeId = hitTestNode(pt.x, pt.y);
            var edgeIdx = hitTestEdge(pt.x, pt.y);
            return { nodeId: nodeId, pt: pt, edgeIdx: edgeIdx };
        }

        function handleNodeClick(evt, nodeId, pt) {
            evt.preventDefault();
            evt.stopPropagation();
            if (mode === 'delete') {
                doRemoveNode(nodeId);
                return;
            }
            if (mode === 'addEdge') {
                commitEditingNode();
                if (!linkSourceNodeId) {
                    linkSourceNodeId = nodeId;
                    selectedNodeId = nodeId;
                    render();
                    return;
                }
                if (linkSourceNodeId === nodeId) {
                    linkSourceNodeId = null;
                    selectedNodeId = null;
                    render();
                    return;
                }
                if (!getNodeById(linkSourceNodeId) || !getNodeById(nodeId)) {
                    linkSourceNodeId = null;
                    selectedNodeId = null;
                    render();
                    return;
                }
                edges.push({ from: linkSourceNodeId, to: nodeId });
                save();
                linkSourceNodeId = null;
                selectedNodeId = null;
                setMode('select');
                return;
            }
            if (mode === 'select' || mode === 'addNode') {
                if (editingNodeId === nodeId) return;
                if (mode === 'select' && selectedNodeId === nodeId) {
                    linkSourceNodeId = null;
                    editingNodeId = nodeId;
                    evt.preventDefault();
                    evt.stopPropagation();
                    render();
                    return;
                }
                selectedNodeId = nodeId;
                selectedEdgeIndex = -1;
                dragNodeId = nodeId;
                var n = getNodeById(nodeId);
                if (n) { dragOffsetX = pt.x - n.x; dragOffsetY = pt.y - n.y; }
                try { if (target.setPointerCapture && evt.pointerId != null) target.setPointerCapture(evt.pointerId); } catch (err) {}
                render();
            }
        }

        function handleEdgeClick(evt, edgeIdx) {
            if (edgeIdx >= 0 && mode === 'delete') {
                evt.preventDefault();
                evt.stopPropagation();
                doRemoveEdge(edgeIdx);
                return;
            }
            if (edgeIdx >= 0 && mode === 'select') {
                evt.preventDefault();
                evt.stopPropagation();
                selectedEdgeIndex = edgeIdx;
                selectedNodeId = null;
                render();
            }
        }

        function handleCanvasEmptyClick(evt, pt) {
            selectedNodeId = null;
            selectedEdgeIndex = -1;
            if (mode === 'addEdge') {
                linkSourceNodeId = null;
                evt.preventDefault();
                render();
                return;
            }
            if (mode === 'addNode') {
                evt.preventDefault();
                evt.stopPropagation();
                var text = (i18n.t('mindmapNewNodeLabel') || 'Novo nó').trim();
                nodes.push({ id: generateId(), x: pt.x, y: pt.y, text: text, shape: nextShape, width: NODE_WIDTH, height: NODE_HEIGHT });
                save();
                render();
                return;
            }
            if (mode === 'select') {
                evt.preventDefault();
                render();
            } else {
                render();
            }
        }

        function onCanvasMousedown(evt) {
            if (evt.target.closest && evt.target.closest('.mindmap-node-edit')) return;

            if (evt.button === 2) {
                evt.preventDefault();
                if (mode === 'select') {
                    isPanning = true;
                    panStart = { clientX: evt.clientX, clientY: evt.clientY, viewBoxX: viewBox.x, viewBoxY: viewBox.y };
                    if (canvasWrap) canvasWrap.classList.add('panning');
                    try { if (target.setPointerCapture && evt.pointerId != null) target.setPointerCapture(evt.pointerId); } catch (err) {}
                }
                return;
            }
            if (evt.button !== 0) return;

            var pt = getSvgPoint(evt);
            var handleEl = evt.target.closest && evt.target.closest('[data-handle]');
            if (handleEl) {
                var nodeEl = handleEl.closest('[data-id]');
                var nodeId = nodeEl ? nodeEl.getAttribute('data-id') : null;
                if (nodeId && mode === 'select') {
                    var n = getNodeById(nodeId);
                    if (n) {
                        evt.preventDefault();
                        evt.stopPropagation();
                        resizingNodeId = nodeId;
                        resizeHandle = handleEl.getAttribute('data-handle');
                        resizeStart = { x: pt.x, y: pt.y, w: getNodeW(n), h: getNodeH(n) };
                        try { if (target.setPointerCapture && evt.pointerId != null) target.setPointerCapture(evt.pointerId); } catch (err) {}
                    }
                }
                return;
            }

            var info = getNodeIdFromEvent(evt);
            var nodeId = info.nodeId;
            var edgeIdx = info.edgeIdx;

            if (nodeId) {
                handleNodeClick(evt, nodeId, info.pt);
                return;
            }

            handleEdgeClick(evt, edgeIdx);
            if (edgeIdx >= 0) return;

            handleCanvasEmptyClick(evt, info.pt);
        }

        svgEl.addEventListener('mousedown', onCanvasMousedown, true);

        function onMousemove(evt) {
            if (isPanning && panStart && svgEl) {
                var rect = svgEl.getBoundingClientRect();
                viewBox.x = panStart.viewBoxX - (evt.clientX - panStart.clientX) / rect.width * viewBox.w;
                viewBox.y = panStart.viewBoxY - (evt.clientY - panStart.clientY) / rect.height * viewBox.h;
                applyViewBox();
                scheduleRender();
                return;
            }
            if (resizingNodeId && resizeStart && resizeHandle) {
                var pt = getSvgPoint(evt);
                var n = getNodeById(resizingNodeId);
                if (n) {
                    var dx = pt.x - resizeStart.x, dy = pt.y - resizeStart.y;
                    var dw = (resizeHandle.indexOf('e') >= 0) ? dx : -dx;
                    var dh = (resizeHandle.indexOf('s') >= 0) ? dy : -dy;
                    n.width = Math.max(NODE_MIN_W, resizeStart.w + dw);
                    n.height = Math.max(NODE_MIN_H, resizeStart.h + dh);
                    scheduleRender();
                }
                return;
            }
            if (dragNodeId) {
                var pt = getSvgPoint(evt);
                var n = getNodeById(dragNodeId);
                if (n) {
                    n.x = pt.x - dragOffsetX;
                    n.y = pt.y - dragOffsetY;
                    scheduleRender();
                }
                return;
            }
            var pt = getSvgPoint(evt);
            var overNode = hitTestNode(pt.x, pt.y);
            var overEdge = hitTestEdge(pt.x, pt.y);
            lastCursorShowPan = !overNode && overEdge < 0 && mode === 'select';
            if (!cursorUpdateScheduled) {
                cursorUpdateScheduled = true;
                requestAnimationFrame(function () {
                    cursorUpdateScheduled = false;
                    updatePanCursor(lastCursorShowPan);
                });
            }
        }

        function onMouseup() {
            if (dragNodeId) {
                save();
                dragNodeId = null;
            }
            if (resizingNodeId) {
                resizingNodeId = null;
                resizeHandle = null;
                resizeStart = null;
            }
            if (isPanning) {
                isPanning = false;
                panStart = null;
                if (canvasWrap) canvasWrap.classList.remove('panning');
            }
        }

        function onMouseleave() {
            if (dragNodeId) { save(); dragNodeId = null; }
            if (resizingNodeId) {
                resizingNodeId = null;
                resizeHandle = null;
                resizeStart = null;
            }
            if (isPanning) {
                isPanning = false;
                panStart = null;
                if (canvasWrap) canvasWrap.classList.remove('panning');
            }
            updatePanCursor(false);
        }

        function onContextmenu(evt) {
            evt.preventDefault();
        }

        function onWheel(evt) {
            evt.preventDefault();
            if (!svgEl) return;
            var rect = svgEl.getBoundingClientRect();
            var mx = viewBox.x + (evt.clientX - rect.left) / rect.width * viewBox.w;
            var my = viewBox.y + (evt.clientY - rect.top) / rect.height * viewBox.h;
            var factor = evt.deltaY > 0 ? 1 / ZOOM_FACTOR : ZOOM_FACTOR;
            var newW = Math.max(ZOOM_MIN * VIEWBOX_DEFAULT.w, Math.min(ZOOM_MAX * VIEWBOX_DEFAULT.w, viewBox.w * factor));
            var newH = Math.max(ZOOM_MIN * VIEWBOX_DEFAULT.h, Math.min(ZOOM_MAX * VIEWBOX_DEFAULT.h, viewBox.h * factor));
            viewBox.x = mx - (evt.clientX - rect.left) / rect.width * newW;
            viewBox.y = my - (evt.clientY - rect.top) / rect.height * newH;
            viewBox.w = newW;
            viewBox.h = newH;
            applyViewBox();
        }

        function onDblclick(evt) {
            if (evt.target.closest && evt.target.closest('[data-handle]')) return;
            if (evt.target.closest && evt.target.closest('.mindmap-node-edit')) return;
            var pt = getSvgPoint(evt);
            var nodeId = hitTestNode(pt.x, pt.y);
            if (nodeId) {
                linkSourceNodeId = null;
                editingNodeId = nodeId;
                render();
                evt.preventDefault();
            }
        }

        function onKeydown(e) {
            if (e.key === 'Escape') {
                if (editingNodeId) {
                    var ed = editingNodeEl || document.querySelector('.mindmap-node-edit');
                    if (ed) ed.blur();
                    return;
                }
                if (mode !== 'select' || linkSourceNodeId || selectedNodeId !== null || selectedEdgeIndex !== -1) {
                    setMode('select');
                    linkSourceNodeId = null;
                    selectedNodeId = null;
                    selectedEdgeIndex = -1;
                    updatePanCursor(false);
                    render();
                }
                return;
            }
            if (e.key === 'Delete' || e.key === 'Backspace') {
                var active = document.activeElement;
                if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.contentEditable === 'true')) return;
                if (selectedNodeId) {
                    e.preventDefault();
                    doRemoveNode(selectedNodeId);
                } else if (selectedEdgeIndex >= 0) {
                    e.preventDefault();
                    doRemoveEdge(selectedEdgeIndex);
                }
            }
        }

        var removeBtn = container.querySelector('.mindmap-sidebar [data-action="remove"]') || container.querySelector('[data-mode="delete"]') || container.querySelector('[data-action="remove"]');
        function onRemoveClick(evt) {
            evt.preventDefault();
            evt.stopPropagation();
            if (selectedNodeId) {
                doRemoveNode(selectedNodeId);
            } else if (selectedEdgeIndex >= 0) {
                doRemoveEdge(selectedEdgeIndex);
            } else {
                setMode('delete');
            }
        }
        if (removeBtn) removeBtn.addEventListener('click', onRemoveClick);

        target.addEventListener('mousemove', onMousemove);
        target.addEventListener('mouseup', onMouseup);
        target.addEventListener('mouseleave', onMouseleave);
        target.addEventListener('contextmenu', onContextmenu);
        target.addEventListener('wheel', onWheel, { passive: false });
        target.addEventListener('dblclick', onDblclick);
        document.addEventListener('keydown', onKeydown);

        var shapeClickHandlers = [];
        for (var j = 0; j < shapeButtons.length; j++) {
            (function (btn, idx) {
                var handler = function () {
                    nextShape = btn.getAttribute('data-shape');
                    for (var k = 0; k < shapeButtons.length; k++) shapeButtons[k].classList.toggle('active', shapeButtons[k].getAttribute('data-shape') === nextShape);
                };
                shapeClickHandlers[idx] = handler;
                btn.addEventListener('click', handler);
            })(shapeButtons[j], j);
        }

        function destroy() {
            svgEl.removeEventListener('mousedown', onCanvasMousedown, true);
            target.removeEventListener('mousemove', onMousemove);
            target.removeEventListener('mouseup', onMouseup);
            target.removeEventListener('mouseleave', onMouseleave);
            target.removeEventListener('contextmenu', onContextmenu);
            target.removeEventListener('wheel', onWheel, { passive: false });
            target.removeEventListener('dblclick', onDblclick);
            document.removeEventListener('keydown', onKeydown);
            if (removeBtn) removeBtn.removeEventListener('click', onRemoveClick);
            for (var j = 0; j < shapeButtons.length; j++) {
                if (shapeClickHandlers[j]) shapeButtons[j].removeEventListener('click', shapeClickHandlers[j]);
            }
        }
        if (window.Mindmap) window.Mindmap.destroy = destroy;

        setMode('select');
        var firstRect = container.querySelector('[data-shape="rect"]');
        if (firstRect) firstRect.classList.add('active');
    }

    var EXPORT_STYLE = '<style type="text/css">' +
        '.mindmap-node-shape{fill:rgba(255,255,255,0.08);stroke:#22c55e;stroke-width:2px}' +
        '.mindmap-node.selected .mindmap-node-shape{stroke:#38bdf8;stroke-width:3px}' +
        '.mindmap-node-text{fill:#f1f5f9;font-size:14px;font-family:inherit;pointer-events:none}' +
        '.mindmap-edge-line{stroke:#94a3b8;stroke-width:2px;fill:none}' +
        '.mindmap-edges .mindmap-edge.selected + .mindmap-edge-line{stroke:#38bdf8;stroke-width:3px}' +
        '.mindmap-resize-handle{fill:#38bdf8;stroke:#f1f5f9;stroke-width:1px}' +
        '</style>';

    function buildExportSvgString() {
        if (!svgEl) return '';
        commitEditingNode();
        render();
        var clone = svgEl.cloneNode(true);
        clone.setAttribute('width', viewBox.w);
        clone.setAttribute('height', viewBox.h);
        clone.setAttribute('viewBox', viewBox.x + ' ' + viewBox.y + ' ' + viewBox.w + ' ' + viewBox.h);
        clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        var defs = clone.querySelector('defs');
        if (!defs) {
            defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            clone.insertBefore(defs, clone.firstChild);
        }
        var styleEl = document.createElementNS('http://www.w3.org/2000/svg', 'style');
        styleEl.setAttribute('type', 'text/css');
        var styleContent = EXPORT_STYLE.replace(/<style[^>]*>|<\/style>/gi, '').trim();
        styleEl.textContent = styleContent;
        defs.appendChild(styleEl);
        var s = new XMLSerializer();
        var str = s.serializeToString(clone);
        if (str.indexOf('xmlns=') === -1) str = str.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
        return str;
    }

    function exportToSvg() {
        var str = buildExportSvgString();
        if (!str) return;
        var blob = new Blob([str], { type: 'image/svg+xml;charset=utf-8' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'mapa-mental.svg';
        a.click();
        URL.revokeObjectURL(url);
    }

    function exportToPng() {
        var str = buildExportSvgString();
        if (!str) return;
        var w = Math.round(viewBox.w);
        var h = Math.round(viewBox.h);
        var blob = new Blob([str], { type: 'image/svg+xml;charset=utf-8' });
        var url = URL.createObjectURL(blob);
        var img = new Image();
        img.onload = function () {
            var canvas = document.createElement('canvas');
            canvas.width = w;
            canvas.height = h;
            var ctx = canvas.getContext('2d');
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(0, 0, w, h);
            ctx.drawImage(img, 0, 0, w, h);
            var dataUrl = canvas.toDataURL('image/png');
            var a = document.createElement('a');
            a.href = dataUrl;
            a.download = 'mapa-mental.png';
            a.click();
            URL.revokeObjectURL(url);
        };
        img.onerror = function () { URL.revokeObjectURL(url); };
        img.src = url;
    }

    function noopDestroy() {}
    window.Mindmap = { init: init, load: load, save: save, setMode: setMode, exportToPng: exportToPng, exportToSvg: exportToSvg, destroy: noopDestroy };
})();
