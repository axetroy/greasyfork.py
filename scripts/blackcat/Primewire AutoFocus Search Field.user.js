// ==UserScript==
// @name         Primewire AutoFocus Search Field
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Does what it says on the tin
// @author       blackcat
// @match        http://www.primewire.is/*
// @match        http://www.primewire.ag/*
// @match        http://www.primewire.org/*
// @grant        none
// ==/UserScript==

(function() {  
        document.getElementById("search_term").focus();
})();