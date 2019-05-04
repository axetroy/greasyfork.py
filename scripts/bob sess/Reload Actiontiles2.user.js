// ==UserScript==
// @name         Reload Actiontiles2
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo/related?hl=en
// @include      http://app.actiontiles.com/panel/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.setInterval(function(){
        window.location.reload();
    }, 5000);
})();