// ==UserScript==
// @name         YouTube automatic seek request
// @namespace    神楽屋
// @version      0.6
// @description  send seek request at time interval.
// @author       神楽 舞衣
// @match        http://*/*
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var timerid;
    function videoseek() {
        var player = document.getElementsByTagName('video')[0];
        if (player) {
            player.addEventListener('play', videoseek, false);
            if (!player.paused) { player.currentTime = player.currentTime; }
        }
        clearTimeout(timerid);
        timerid = setTimeout(videoseek, 1200000);
    }
    videoseek();
})();