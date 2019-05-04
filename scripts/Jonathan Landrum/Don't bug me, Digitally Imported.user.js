// ==UserScript==
// @name         Don't bug me, Digitally Imported
// @namespace    https://github.com/jonlandrum/di
// @description  Closes the "Are you still there?" dialog box
// @include      http://www.di.fm/*
// @exclude      https://www.di.fm/login
// @grant        none
// @author       Jonathan Landrum
// @version      1.0
// ==/UserScript==
/* jshint -W097 */
'use strict';

setInterval(function() {
    var modal = document.getElementById('modal-region');
    if (typeof(modal) !== 'undefined' && modal !== null && modal.children.length !== 0) {
        document.querySelectorAll("button[type='button']")[1].click();
    }
}, 1000);