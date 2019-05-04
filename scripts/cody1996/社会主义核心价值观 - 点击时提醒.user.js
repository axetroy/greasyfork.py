// ==UserScript==
// @name         社会主义核心价值观 - 点击时提醒
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  社会主义核心价值观 在你每次点击时飘出并提示！
// @author       Cody
// @include      http://*
// @include      https://*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';
    var coreSocialistValues = ["\u5bcc\u5f3a", "\u6c11\u4e3b", "\u6587\u660e", "\u548c\u8c10", "\u81ea\u7531", "\u5e73\u7b49", "\u516c\u6b63" ,"\u6cd5\u6cbb", "\u7231\u56fd", "\u656c\u4e1a", "\u8bda\u4fe1", "\u53cb\u5584"],
        index = Math.floor(Math.random() * coreSocialistValues.length);
    document.body.addEventListener('click', function (e) {
        if (e.target.tagName == 'A') {
            return;
        }
        var x = e.pageX,
            y = e.pageY,
            span = document.createElement('span');
        span.textContent = coreSocialistValues[index];
        index = (index + 1) % coreSocialistValues.length;
        span.style.cssText = ['z-index: 9999999; position: absolute; font-size: 14px; font-weight: bold; color: #ff6655; top: ', y - 20, 'px; left: ', x, 'px;'].join('');
        document.body.appendChild(span);
        animate(span);
    });

    function animate(el) {
        var i = 0,
            top = parseInt(el.style.top),
            id = setInterval(frame, 16.7);

        function frame() {
            if (i > 180) {
                clearInterval(id);
                el.parentNode.removeChild(el);
            } else {
                i += 2;
                el.style.top = top - i + 'px';
                el.style.opacity = (180 - i) / 180;
            }
        }
    }
})();