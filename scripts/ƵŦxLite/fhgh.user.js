// ==UserScript==
// @name         fhgh
// @namespace    http://github.com/dimotsai/
// @version      0.51
// @description  This script will show a mini map and your location on agar.io
// @author       fghfg
// @license      MIT
// @match        http://agar.io/*
// @require      http://cdn.jsdelivr.net/msgpack/1.05/msgpack.js
// @grant        none
// @run-at       document-body
// ==/UserScript==

function handleQuickFeed() {
      if (qkeyDown) {
        SendPos();
        SendCmd(21);            
        setTimeout(handleQuickFeed, 142);
      }
    }
      
    window.onkeydown = function(event) {
      if (!(32 != event.keyCode || spaceDown)) {
        SendPos();
        SendCmd(17);
        spaceDown = true;
      }
      if (!(81 != event.keyCode || cachedSkin)) {
        SendCmd(18);
        cachedSkin = true;
      }
      if (!(87 != event.keyCode || qkeyDown)) {
        SendPos();
        SendCmd(21);
        qkeyDown = true;
      }
(end);