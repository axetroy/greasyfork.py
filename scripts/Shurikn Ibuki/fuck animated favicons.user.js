// ==UserScript==
// @name        fuck animated favicons
// @namespace   shurikn
// @description Removes animated favicons
// @include     https://www.jinx.com*
// @version     1
// @grant       none
// ==/UserScript==
var link = document.createElement('link'); 
link.type = 'image/x-icon'; 
link.rel = 'shortcut icon'; 
link.href = '';
document.getElementsByTagName('head')[0].appendChild(link);