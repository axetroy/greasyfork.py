// ==UserScript==
// @name         playok adblockblockblock
// @namespace    http://tampermonkey.net/
// @version      1
// @description  block the adblock block
// @author       ggpeti
// @match        https://www.playok.com/en/*/
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';
    unsafeWindow.abask = undefined;
})();