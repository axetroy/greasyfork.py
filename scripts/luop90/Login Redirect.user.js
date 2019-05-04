// ==UserScript==
// @name         Login Redirect
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Redirects you instantly to the login page, instead of dealing with Pearson's BS popups / etc.
// @author       Luop90
// @match        https://www.pearsonmylabandmastering.com/northamerica/masteringengineering/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here
    location.assign("https://www.masteringengineering.com/site/login.html");
})();