// ==UserScript==
// @name         Edge auto-hide scrollbar
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Auto-hide scrollbar in Microsoft Edge browser
// @author       allsoundsthesame
// @match        *://*/*
// @grant        none
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
addGlobalStyle('html { -ms-overflow-style: -ms-autohiding-scrollbar }');