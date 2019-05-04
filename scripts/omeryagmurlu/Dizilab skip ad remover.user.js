// ==UserScript==
// @name         Dizilab skip ad remover
// @namespace    omeryagmurlu.github.io
// @version      0.1
// @description  try to take over the world and hate ads
// @author       MindlessRanger
// @match        dizilab.com/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

// Your code here...
if (document.getElementsByClassName('skip')) {
    document.getElementsByClassName('skip')[0].click();
}