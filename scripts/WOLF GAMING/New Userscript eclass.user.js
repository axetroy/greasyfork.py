// ==UserScript==
// @name         New Userscript eclass
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.baycreekrams.org/home
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.open("https://publish.gwinnett.k12.ga.us/gcps/home/gcpslogin");
    window.open("https://apps.gwinnett.k12.ga.us/dca/student/dashboard?ts=1555523692984#1571")
    alert("click ok to close this tab")

    window.close("https://www.baycreekrams.org/home")
})();
