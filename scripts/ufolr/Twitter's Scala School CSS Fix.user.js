// ==UserScript==
// @name         Twitter's Scala School CSS Fix
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       ufolr & rexer & chuang
// @match        https://twitter.github.io/scala_school/*
// @grant        none
// @run-at       document-body
// ==/UserScript==

(function() {
    'use strict';
    Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(n => n.href = '/scala_school' + n.getAttribute('href'))
})();