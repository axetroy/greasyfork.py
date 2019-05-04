// ==UserScript==
// @name         Always desktop Wikihow
// @version      1.2
// @description  Redirects wikihow's mobile website to desktop
// @author       Mario O.M.
// @namespace    https://github.com/marioortizmanero
// @match        *://m.wikihow.com/*
// @match        *://m.wikihow.mom/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    location.href = location.href.replace("m.wikihow", "www.wikihow");
})();