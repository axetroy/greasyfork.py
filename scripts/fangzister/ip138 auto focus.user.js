// ==UserScript==
// @name         ip138 auto focus
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  auto focus ip textbox when access ip138.com
// @author       You
// @match        http://www.ip138.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.getElementById('ip').focus();
    // Your code here...
})();