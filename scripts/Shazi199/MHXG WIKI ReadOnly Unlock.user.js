// ==UserScript==
// @name         MHXG WIKI ReadOnly Unlock
// @namespace    https://github.com/Shazi199/
// @version      0.0.3
// @description  Unlock MHXG WIKI's right click and select.
// @author       Shazi199
// @license      MIT License
// @match        http://wiki.mhxg.org/*
// @match        http://mhwg.org/*
// @grant        none
// @require      http://code.jquery.com/jquery-1.11.0.min.js
// ==/UserScript==

(function() {
    'use strict';

    $("body").removeAttr("onContextmenu");
    $("body").removeAttr("onSelectStart");
    $("body").attr("style","");
})();