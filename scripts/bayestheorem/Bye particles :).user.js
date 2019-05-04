// ==UserScript==
// @name         Bye particles :)
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Oh, my eyes!
// @author       bayeszou
// @include       http://*
// @include       https://*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.querySelector('#particles-js').remove();
})();