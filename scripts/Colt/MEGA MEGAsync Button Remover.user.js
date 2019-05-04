// ==UserScript==
// @name         MEGA MEGAsync Button Remover
// @namespace    https://twitter.com/BitOBytes
// @version      0.1
// @description  Because MEGAsync sucks amirite?
// @author       https://twitter.com/BitOBytes
// @match        *://*mega.nz/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

//Made for Cami Bae ;D

var run = function () {
    var b1 = document.getElementsByClassName('new-download-sync-app')[0];
    var b2 = document.getElementsByClassName('regular-download')[0];
    if (b1 && b2) {
        b1.className = b1.className + ' hidden';
        b2.className = b2.className.replace(' hidden', '');
        return;
    }
    setTimeout(run, 500);
};

setTimeout(run, 500);