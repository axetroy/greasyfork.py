// ==UserScript==
// @name         Battlelog keeper fixer
// @namespace    battlelog
// @version      0.1
// @description  Changes the keeper endpoint to https one so the match info and scoreboard starts working again
// @author       xfileFIN
// @match        http://battlelog.battlefield.com/bf4/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    S.globalContext.staticContext.keeperQueryEndpoint = "https://keeper.battlelog.com"
})();