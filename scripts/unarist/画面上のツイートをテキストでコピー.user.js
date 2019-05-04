// ==UserScript==
// @name         画面上のツイートをテキストでコピー
// @description  ツイートのユーザー名、本文、statusidを一行にまとめてコピーするやつ
// @namespace    https://github.com/unarist/
// @version      0.2
// @author       unarist
// @match        https://twitter.com/*
// @exclude      https://twitter.com/i/*
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function() {
    'use strict';

    var chain = f => function() { f.apply(this, arguments); return this; };
    var extendTo = (t, o) => { for(var p in o) t[p] = o[p]; };

    var here = code => code.toString().match(/\/\*([^]*)\*\//)[1];
    var fragment = html => document.createRange().createContextualFragment(html);
    var $ = document.querySelector.bind(document);
    var $$ = document.querySelectorAll.bind(document);

    extendTo(Node.prototype, {
        on: chain(Node.prototype.addEventListener),
        appendTo(target) { target.appendChild(this); return this; },
        text(t) { this.textContent = t; return this; },
        val(v) { this.value = v; return this; }
    });
    extendTo(Element.prototype, {
        find: Element.prototype.querySelector,
        findAll: Element.prototype.querySelectorAll,
        hide() {
            if(!this.hasOwnProperty('show')) {
                var prev = this.style.display;
                this.show = function() { this.style.display = prev; delete this.show; return this; };
                this.style.display = 'none';
            }
            return this;
        }
    });
    for(var prop of ['map', 'filter', 'forEach', 'reduce', 'some', 'every'])
        NodeList.prototype[prop] = Array.prototype[prop];

    var containerHtml = here(function(){/*
<div style="position:fixed; top:0; width:100%; height:100%; background: rgba(0,0,0,0.5); z-index: 999">
<textarea style="position:absolute; top:0;left:0;bottom:0;right:0; margin:auto; width:640px; height:480px; background:white; white-space: nowrap">
</textarea>
</div>
*/});

    var container = fragment(containerHtml).firstElementChild;
    container.on('click', e => (e.target === e.currentTarget && e.currentTarget.hide()))
        .hide()
        .appendTo($('body'));

    GM_registerMenuCommand('画面上のツイートをテキストでコピー', function() {
        var tweets = $$('.js-stream-tweet').map((e)=>`@${e.dataset.screenName}: ${e.querySelector('.tweet-text').innerText} (${e.dataset.tweetId})`).reverse().join('\n');
        container.find('textarea').val(tweets);
        container.show();
    });
})();