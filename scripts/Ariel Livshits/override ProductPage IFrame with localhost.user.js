// ==UserScript==
// @name         override ProductPage IFrame with localhost
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://ecom.wix.com/storefront/product/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Your code here...
    console.log('overrides IFrame works');
    location.href = `http://localhost:4000${location.search}`;
})();

