// ==UserScript==
// @name         Disable Laggy Battle.net Forum Scroll Handler
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Remove Battle.net Forum scrolling performance penalty
// @author       github.com/blaenk
// @match        https://us.battle.net/forums/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $(window).unbind('scroll');
})();