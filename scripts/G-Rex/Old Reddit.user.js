// ==UserScript==
// @name         Old Reddit
// @namespace    https://greasyfork.org/users/154522
// @version      1.0
// @description  Use old reddit site
// @author       G-Rex
// @match        https://www.reddit.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    window.location.href = window.location.href.replace(/www/, 'old');
})();