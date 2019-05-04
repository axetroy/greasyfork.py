// ==UserScript==
// @name         Large Theatre mode for YouTube
// @version      1.0
// @description  Shows a larger theatre mode (1280px x 720px) with window >= 1294px on YouTube
// @author       Henry
// @match        https://www.youtube.com/watch*
// @grant        none
// @namespace https://greasyfork.org/users/99845
// ==/UserScript==

(function() {
    'use strict';
    var style = '@media(min-width:1294px){.watch-stage-mode .player-width{width:1280px!important;left:-640px!important}.watch-stage-mode .player-height{height:640px}}';
    function addcss(css){
        var head = document.getElementsByTagName('head')[0];
        var s = document.createElement('style');
        s.setAttribute('type', 'text/css');
        s.appendChild(document.createTextNode(css));
        head.appendChild(s);
    }
    addcss(style);
})();