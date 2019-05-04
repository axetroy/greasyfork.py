// ==UserScript==
// @name         Firefox Newtab Disabler for GitHub Projects
// @namespace    http://github.com/DuckSoft
// @version      0.1
// @description  Never drag out a new tab.
// @author       DuckSoft
// @match        *://github.com/*/projects/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.body.ondrop = e => {
        e.preventDefault();
        e.stopPropagation();
    }
})();
