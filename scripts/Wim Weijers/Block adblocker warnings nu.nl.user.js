// ==UserScript==
// @name         Block adblocker warnings nu.nl
// @namespace    https://marthijnhoiting.com/
// @author       Marthijn Hoiting
// @include      http://*.nu.nl/*
// @include      https://*.nu.nl/*
// @version      0.3
// @grant        none
// @license      Copyright by Marthijn Hoiting
// @run-at       document-start
// @description  Blocked warning @nu.nl
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

addGlobalStyle('.block.toast.adblocker { display: none !important; }');
