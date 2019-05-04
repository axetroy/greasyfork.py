// ==UserScript==
// @name         KissAnime AutoFocus Search Field
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Does what it says on the tin
// @author       blackcat
// @match        http://kissanime.ru/*
// @grant        none
// ==/UserScript==

(function() {  
        document.getElementById("keyword").focus();
})();