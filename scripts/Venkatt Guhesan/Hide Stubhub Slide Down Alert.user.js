// ==UserScript==
// @name         Hide Stubhub Slide Down Alert 
// @namespace    http://venkattguhesan.com
// @version      0.1
// @description  There was an annoying slide down continuously showing on StubHub so added CSS to hide them 
// @author       Venkatt Guhesan
// @match        https://www.stubhub.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    addGlobalStyle('#price-alert-slider-container { display: none; }');
    addGlobalStyle('#dropdown-header { display: none; }');
  
})();

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
