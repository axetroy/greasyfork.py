// ==UserScript==
// @name         Sweetstakes.tf Dialogue Box "Enter Items"
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Moves the "Enter Items" dialogue down, so you can see the current jackpot and makes the item values bolded
// @author       Litronom
// @match        https://sweetstakes.tf/
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

addGlobalStyle('.modal-lg { width: auto !important; }');
addGlobalStyle('.modal-dialog { margin: 500px auto !important; }');
addGlobalStyle('.item-price { font-weight: bolder !important; }');
addGlobalStyle('.jackpot-enter-modal-grid { max-height: 190px !important; }');