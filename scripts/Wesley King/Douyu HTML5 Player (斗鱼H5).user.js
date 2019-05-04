// ==UserScript==
// @name         Douyu HTML5 Player (斗鱼H5)
// @namespace    douyu.html5
// @version      1.0.1
// @description  使用斗鱼 HTML5 播放器播放非主页视频 (基于https://greasyfork.org/en/scripts/26901)
// @author       wknet1988
// @match        https://v.douyu.com/*
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