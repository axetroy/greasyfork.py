// ==UserScript==
// @name        Epic-games/ Fortnight - no background image
// @namespace   english
// @description Epic-games/ Fortnight   no background image
// @include     http*://*epicgames.com*
// @version     1.1
// @run-at document-end
// @grant       GM_addStyle
// ==/UserScript==

// Main - Collapse the Greasy Fork Header

var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '           body, html, #accountPortalModalProductStyle{    background: #ccc !important;}          ';
document.getElementsByTagName('head')[0].appendChild(style);
