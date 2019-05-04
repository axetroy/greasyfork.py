// ==UserScript==
// @name         Font-Size fix
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  fix font-size
// @author       LORDexile
// @match        https://projects.customertimes.com/work_time/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $(document).ready(function() {
        document.getElementsByTagName("BODY")[0].style.fontSize = "0.8rem";
    });
})();