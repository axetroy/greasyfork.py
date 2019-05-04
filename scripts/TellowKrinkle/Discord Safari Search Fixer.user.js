// ==UserScript==
// @name         Discord Safari Search Fixer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Fixes the bug where Discord's search doesn't work in Safari
// @author       TellowKrinkle
// @match        https://discordapp.com/channels/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.styleSheets[0].addRule("div[contenteditable=\"true\"]", "-webkit-user-select: text;", 0);
})();