// ==UserScript==
// @name Enable Vertical and Horizontal Scrollbar Everywhere
// @namespace RW5hYmxlIFZlcnRpY2FsIGFuZCBIb3Jpem9udGFsIFNjcm9sbGJhciBFdmVyeXdoZXJl
// @description Enable vertical and horizontal page BODY scrolling (for example, where it is disabled if a modal is open).
// @author smed79
// @version 1.1
// @encoding utf-8
// @license https://creativecommons.org/licenses/by-nc-sa/4.0/
// @icon https://vgy.me/R02voT.png
// @match http://*/*
// @match https://*/*
// @grant GM_addStyle
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {
        return;
    }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('html { overflow: auto !important; }');
addGlobalStyle('body { overflow: auto !important; }');
