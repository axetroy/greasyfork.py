// ==UserScript==
// @version 1.02
// @author          Maike André
// @icon            https://s.ytimg.com/yts/img/favicon-vflz7uhzw.ico
// @name Remove NEXT video button from youtube auto play bar in HTML5 PLAYER
// @description     Removes the NEXT button from AUTO PLAY BAR of a HTML5 YouTube pLAYER.
// @match https://*.youtube.com/*
// @include         http*://youtube.com/*
// @include         http*://*.youtu.be/*
// @include         http*://youtu.be/*
// @run-at document-start
// @grant none
// @noframes
// @namespace https://greasyfork.org/users/11421
// ==/UserScript==
(function () {
    'use strict';
    function removeAPUN() {
        var autoplaybar = document.getElementsByClassName('ytp-play-button ytp-button')[0];
        if (autoplaybar) {
            //autoplaybar.removeAttribute('class');
            //document.getElementsByClassName('ytp-next-button ytp-button')[0].remove();
            document.getElementsByClassName('ytp-next-button')[0].remove();
        }
    }
    window.addEventListener('readystatechange', removeAPUN, true);
    window.addEventListener('spfdone', removeAPUN);
}());