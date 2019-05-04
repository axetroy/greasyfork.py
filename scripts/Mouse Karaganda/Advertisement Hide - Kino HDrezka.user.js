// ==UserScript==
// @name           Advertisement Hide - Kino HDrezka
// @namespace      scriptomatika
// @author         mouse-karaganda
// @description    Удаляет рекламу с ресурса HDrezka
// @include        http://hdrezka.ag/*
// @include        http://mastarti.com/video/*
// @include        http://mastarti.com/serial/*
// @require        https://greasyfork.org/scripts/379902-include-tools/code/Include%20Tools.js
// @version        1.17
// @grant          none
// ==/UserScript==

var paramWindow = (typeof unsafeWindow === 'object') ? unsafeWindow : window;

(function(unsafeWindow) {
    var console = unsafeWindow.console;
    var $ = unsafeWindow.jQuery;
    var $$ = unsafeWindow.__krokodil;

    $$.renderStyle(
        '.flowplayer .fp-message, .flowplayer .fp-ui { z-index: 4; }',
        '.shadow-adverts { position: absolute; left: 0; right: 0; top: 0; bottom: 0; z-index: 3; background: url(http://static.scriptomatika.ru/img/fon16.png); }',
        '.flowplayer .fp-x-window { position: relative; width: 5rem; height: 3rem; text-align: right; cursor: pointer; font-weight: bold; font-family: "Open Sans",Arial; }',
        '.flowplayer .fp-x-window, .fp-x-window-activ .b-post__lastepisodeout .fp-x-window { padding: 0 8px; opacity: 0.9; background-color: #333; color: #ddd; font-size: 12px; line-height: 30px; }',
        '.flowplayer .fp-x-window:hover, .fp-x-window-activ .b-post__lastepisodeout .fp-x-window:hover { background-color: #eee; color: #333; }',
        '.flowplayer .fp-x-window.activ:hover, .b-post__lastepisodeout .fp-x-window:hover span { color: #f12b24; }',
        '.b-post__lastepisodeout .fp-x-window { float: right; cursor: pointer; }',
        '.fp-x-window-activ .b-post__lastepisodeout .fp-x-window { position: fixed; left: 0; top: 0; z-index: 4; transform: rotate(-90deg) translateX(-100%) translateY(100%); transform-origin: 0 100%; }',
        '.fp-x-window-activ #ownplayer { position: fixed; left: 0; top: 0; right: 0; bottom: 0; width: auto !important; height: auto !important; margin: 0 !important; z-index: 3; background-color: black; }',
        '.fp-x-window-activ #videoplayer { width: auto !important; height: 100% !important; margin: 0 30px !important; }',
        '.fp-x-window-activ #videoplayer iframe { width: 100% !important; height: 100% !important; }'
    );

    var deleteTimer, deleteStep = 0;

    /**
     * Удаляет рекламу от внешних сервисов
     */
    var deleteExternalAdverts = function() {
        if (++deleteStep > 20) {
            clearInterval(deleteTimer);
            deleteStep = 0;
            return;
        }
        var path = ('a[href^="//recreativ."], a[href*="adbetnet.com/"], iframe[href*="adbetnet.com/"]');
        $$.getAll(path).forEach(function(elem) {
            var node = elem;
            while (!/^\w+$/.test(node.id)) {
                node = node.parentNode;
            }
            $$.del(node);
        });
    };

    var muteTimer, muteStep = 0;

    var hidden = { name: 'scriptomatika-hidden' };
    hidden.pseudo = (`:not(.${hidden.name})`);

    /**
     * Выключает звук на внутренней рекламе
     */
    var muteInternalAdverts = function() {
        if (++muteStep > 1000) {
            clearInterval(muteTimer);
            muteStep = 0;
            return;
        }
        var button;
        if (button = $$.get(`#player .adv_clickable${hidden.pseudo}`)) {
            $$.hideFixed(button);
            button.classList.add(hidden.name);

            if (button = $$.get(`#player video`)) {
                if (!/https?:\/\/mastarti\.com/i.test(button.src)) {
                    var shadow = $$.renderElement({
                        cls: 'shadow-adverts',
                        renderTo: button.parentNode
                    });
                }
            }
        }
        if (button = $$.get(`#player .adv_volume.volume_on${hidden.pseudo}`)) {
            $$.fireEvent(button, 'click');
            button.classList.add(hidden.name);
        }
        if (button = $$.get('#player .adv_close')) {
            $$.fireEvent(button, 'click');
        }
    };

    /**
     * Выключает звук на внутренней рекламе
     */
    var afterPlayClick = function() {
        muteTimer = setInterval(muteInternalAdverts, 100);

        $$.missingElement('#footer .fp-quality', function(exists) {
            if (!exists) return;
            var btnToWindow = $$.renderElement({
                cls: 'fp-x-window activ',
                innerHTML: '<span></span>В окне',
                renderTo: this,
                //renderType: 'insertAfter',
                renderType: 'none',
                dataset: { activ: false },
                listeners: {
                    click: function() {
                        var state = !eval(this.dataset.activ);
                        var method = (state) ? 'add' : 'remove';
                        this.classList[method]('activ');
                        $$.get('span', this).innerHTML = (state) ? '• ' : '';
                        this.dataset.activ = state;
                    }
                }
            });
        });
    };

    /**
     * Выключение звука работает после нажатия на кнопку
     */
    $$.missingElement('#play_button', function(exists) {
        if (!exists) return;
        $$.on(this, 'click', afterPlayClick);
    });

    /**
     * Переключает видео в режим на всё окно
     */
    $$.missingElement('.b-post__lastepisodeout', function(exists) {
        if (!exists) return;
        var btnToWindow = $$.renderElement({
            tagName: 'h2',
            cls: 'fp-x-window',
            innerHTML: '<span>🔴 </span>В окне',
            renderTo: this,
            renderType: 'prepend',
            dataset: { activ: false },
            listeners: {
                click: function() {
                    var state = !eval(this.dataset.activ);
                    var method = (state) ? 'add' : 'remove';
                    $$.get('body').classList[method]('fp-x-window-activ');
                    this.dataset.activ = state;
                }
            }
        });
    });

    deleteTimer = setInterval(deleteExternalAdverts, 100);
    console.log('Advertisement Hide - Kino HDrezka');
})(paramWindow);