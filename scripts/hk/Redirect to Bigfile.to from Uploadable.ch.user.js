// ==UserScript==
// @name         Redirect to Bigfile.to from Uploadable.ch
// @namespace    http://plg4u.blog.fc2.com/
// @version      0.1
// @description  Test version
// @author       hk
// @match        *://uploadable.ch/*
// @match        *://www.uploadable.ch/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.location.replace((document.location + "").replace("uploadable.ch", "bigfile.to"));
})();