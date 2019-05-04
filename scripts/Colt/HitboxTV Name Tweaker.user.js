// ==UserScript==
// @name         HitboxTV Name Tweaker
// @namespace    https://twitter.com/BitOBytes
// @version      0.1
// @description  Mainly for the new Dark Theme
// @author       http://www.hitbox.tv/bitobytes
// @match        *://*.hitbox.tv/*
// @grant        none
// ==/UserScript==

var chat, style;

var run = function () {
    'use strict';
    
    if (!chat || chat === null) {
        chat = document.getElementsByClassName('chatBody')[0];
    } else {
        style = document.createElement('style');
        style.innerHTML = ".chatBody .name {color: #FF00EE !important; font-size: 16px !important; font-weight: bold !important;}";
        
        document.getElementsByTagName('head')[0].appendChild(style);
        return;
    }
    setTimeout(run, 200);
};

setTimeout(run, 2000);