// ==UserScript==
// @name         chatous Text chat button
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  add a button to start a new text chat on chatous
// @author       You
// @match        https://chatous.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
     let buttonWrap = document.getElementById('new-button-wrapper');
     let textBut = document.createElement('div');
     textBut.innerHTML = 'new text chat';
     textBut.id = 'newTextChat';
     buttonWrap.append(textBut);
})();