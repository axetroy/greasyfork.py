// ==UserScript==
// @name         斗鱼 HTML5 播放器
// @namespace    douyu.html5
// @version      0.0.1
// @description  使用斗鱼 HTML5 播放器！
// @author       DIYgod
// @match        https://www.douyu.com/*
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';

    const switchCheck = setInterval(function () {
        if (unsafeWindow.__player && unsafeWindow.__player.switchPlayer) {
            unsafeWindow.__player.switchPlayer('h5');
            clearInterval(switchCheck);
        }
    }, 500);
})();