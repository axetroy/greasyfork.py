// ==UserScript==
// @name        VVVVID Anti-Adblock Killer
// @namespace   https://github.com/Nearata/vvvvid-anti-adblock-killer
// @copyright   2018+, William Di Cicco (Nearata)
// @license     MIT
// @version     1.0.5
// @description Previene la disattivazione dell'adblock
// @author      Nearata <nearata@protonmail.com>
// @supportURL  https://github.com/Nearata/vvvvid-anti-adblock-killer/issues
// @match       *://www.vvvvid.it/*
// @exclude     *://www.vvvvid.it/adblock.html
// @grant       none
// ==/UserScript==

(function() {
    'use strict';

    window.vvvvid.models.PlayerObj.prototype.startAdv = function(g, c, f) {
        g = null;
        c = null;

        f();
    }
    
    window.vvvvid.models.PlayerObj.prototype.playCommunity = function(b, f) {
        f()
    }
})();