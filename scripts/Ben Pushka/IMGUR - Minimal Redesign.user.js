// ==UserScript==
// @name        IMGUR - Minimal Redesign
// @namespace   english
// @description IMGUR - Minimal Redesign - Remove homepage images and other dross
// @include     http*://*imgur.com
// @include     http*://*imgur.com/
// @version     2.2
// @run-at document-end
// @grant       GM_addStyle
// ==/UserScript==


// Main - CSS hides two classes - video add box, and call to action box under it. - also social media

 
var style = document.createElement('style');

style.type = 'text/css';style.innerHTML = '      .Grid-column {    display: none !important;}            ';
document.getElementsByTagName('head')[0].appendChild(style);

 