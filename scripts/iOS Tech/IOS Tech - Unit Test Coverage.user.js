// ==UserScript==
// @name         IOS Tech - Unit Test Coverage
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://landlord-beaver-51287.netlify.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    addGlobalStyle('.target-details { padding-top: 5px; !important;  padding-bottom: 5px; !!important; }');
    addGlobalStyle('.target-name { font-size: 14px; !important;  font-weight: 200; !!important; }');
    addGlobalStyle('.target-percentage { font-size: 14px; !important;  font-weight: 200; !!important; }');
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