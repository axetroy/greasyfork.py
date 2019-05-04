// ==UserScript==
// @name         Season Pack Highlight (BTN)
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Highlight Season Packs on Torrent Page
// @author       You
// @match        https://broadcasthe.net/torrents.php*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let tt = document.getElementById('torrent_table');

    [...Array.from(tt.querySelectorAll('tr.torrent td:first-child'))].forEach(td => {
        if (td.querySelector('img[title="Season"]')) {
            td.style = 'position: relative';
            let overlay = document.createElement('div');
            overlay.style = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: #FFD700; opacity: 0.4';
            td.appendChild(overlay);
        }
    });
})();