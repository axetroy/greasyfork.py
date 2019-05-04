// ==UserScript==
// @name         Wider facebook content
// @namespace    https://greasyfork.org/en/scripts/22423-wider-facebook-content
// @version      0.1
// @description  Set facebook content to 100% width after removing column between content and chat
// @author       zombie.king@zoho.com
// @match        https://www.facebook.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    var rightCol = document.getElementById("rightCol");
    if(!rightCol) {
        return;
    }
    rightCol.parentNode.removeChild(rightCol);

    addGlobalStyle('#contentArea { width: 100% !important; }');
})();