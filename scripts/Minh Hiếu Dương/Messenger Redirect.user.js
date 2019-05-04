// ==UserScript==
// @name         Messenger Redirect
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Redirect facebook.com/messenger to messenger.com
// @author       Darkha
// @match        *://*.facebook.com/messages/t/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    window.location.replace("https://www.messenger.com/t/" + /facebook.com\/messages\/t\/(.*?)\?/.exec(window.location.href + '?')[1]);
    // Your code here...
})();