// ==UserScript==
// @name         HTML5 na emsc2.tv
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  zmienia player na emsc2.tv na wersje html5
// @author       You
// @match        http://emsc2.tv/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.getElementById('emsc-player').src = 'http://player.twitch.tv/?channel=emstarcraft&html5';

})();