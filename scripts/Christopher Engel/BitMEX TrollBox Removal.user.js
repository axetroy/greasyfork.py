// ==UserScript==
// @name         BitMEX TrollBox Removal
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.bitmex.com/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
 
addGlobalStyle('.popUpChat {display: none}')

// Thanks to Tulip_stefan bitmex user who wrote this, I'm just publishing it here.