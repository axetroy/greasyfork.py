// ==UserScript==
// @name         No more outlines!
// @namespace    http://floatingcube.web44.net/
// @version      1.6
// @description  Removes ugly button outlines on chrome and firefox.
// @author       GRA0007
// @match        http://*/*
// @match        https://*/*
// @grant        none
// @require	 https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

var css = '* { outline:none; } button::-moz-focus-inner { border:0; }',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

style.type = 'text/css';
if (style.styleSheet){
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}

head.appendChild(style);