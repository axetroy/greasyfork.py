// ==UserScript==
// @name         CCC chat fix
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  CCC twitch chat fix
// @author       jak3122
// @match        https://www.chess.com/computer-chess-championship
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.getElementById('computerchess').src = 'https://www.twitch.tv/embed/computerchess/chat';
})();