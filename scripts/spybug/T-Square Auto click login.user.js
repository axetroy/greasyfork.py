// ==UserScript==
// @name         T-Square Auto click login
// @namespace    http://kingraham.me/
// @version      1.01
// @description  Auto clicks the login button on t-square
// @author       Karl Ingraham
// @match        https://t-square.gatech.edu/portal
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var link = document.getElementById('loginLink1');
    if (link.innerHTML == "Login") {
        link.click();
    }
})();