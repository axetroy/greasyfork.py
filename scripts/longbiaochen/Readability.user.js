// ==UserScript==
// @name         Readability
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  improve the readability of specific pages
// @author       Longbiao CHEN
// @match        *.wikipedia.org/*
// @match        *.mathworks.com/*
// @grant        none
// @license      GPLv3
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// ==/UserScript==

document.body.style.zoom = "120%";