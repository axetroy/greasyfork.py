// ==UserScript==
// @name         Number Key Disable on Udemy and Youtube
// @namespace    None
// @version      0.1
// @description  Number key shortcuts disable on Udemy and Youtube
// @author       SVD
// @match        https://www.udemy.com/*
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    window.addEventListener('keyup', (e)=> {
        if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
            e.stopPropagation();
        }
    }, true);

    window.addEventListener('keydown', (e)=> {
        if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
            e.stopPropagation();
        }
    }, true);

    window.addEventListener('keypress', (e)=> {
        if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
            e.stopPropagation();
        }
    }, true);
})();