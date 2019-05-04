// ==UserScript==
// @name         Anti-anti-adblock for rim-world.com
// @namespace    http://ksir.pw
// @version      1.1
// @description  Rim-world.com is buggy. Their anti-adblock keeps hiding download buttons even when you disable it. This fixes it.
// @author       Kain (ksir.pw)
// @run-at       document-ready
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @icon         https://www.google.com/s2/favicons?domain=www.rim-world.com
// @match        https://rim-world.com/*
// @grant        unsafeWindow
// ==/UserScript==

jQuery('<iframe id="aswift">').appendTo('body');
