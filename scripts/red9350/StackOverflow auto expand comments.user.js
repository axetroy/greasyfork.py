// ==UserScript==
// @name         StackOverflow auto expand comments
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Automatically expands all StackOverflow comments
// @author       red9350
// @match        https://stackoverflow.com/questions/*/*
// @grant        none
// ==/UserScript==

//https://stackoverflow.com/questions/*/*
(function() {
    "use strict";

    window.onload = function() {
        var expandLinks = document.getElementsByClassName('js-show-link comments-link');
        for (var i = 0; i < expandLinks.length; i++)
        {
            expandLinks[i].click();
        }
    };
})();