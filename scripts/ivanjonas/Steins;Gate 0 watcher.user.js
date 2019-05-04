// ==UserScript==
// @name         Steins;Gate 0 watcher
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Change widths
// @author       You
// @match        http://steinsgatezero.net/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle('\
#content {\
    padding: 0;\
}\
#primary {\
    width: auto;\
}\
#secondary,\
.addthis-smartlayers {\
    display:none;\
}\
.entry-content {\
    padding: 0;\
}\
');
})();