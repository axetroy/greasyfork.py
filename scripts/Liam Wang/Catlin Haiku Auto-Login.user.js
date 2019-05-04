// ==UserScript==
// @name         Catlin Haiku Auto-Login
// @version      1.2
// @description  by Tristan Peng
// @author       Tristan Peng
// @match        https://catlin.learning.powerschool.com/do/account/login
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js
// @namespace https://greasyfork.org/users/118299
// ==/UserScript==


(function() {
    'use strict';
    // Your code here...
    window.location.href = 'https://catlin.learning.powerschool.com/do/authentication/google/google_begin?google_domain=catlin.edu';
})();