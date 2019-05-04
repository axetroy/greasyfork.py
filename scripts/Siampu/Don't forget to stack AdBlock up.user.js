// ==UserScript==
// @name         Don't forget to stack AdBlock up
// @namespace    https://twitter.com/siampuu
// @version      1.0
// @description  Why is this even necessary.
// @author       Shampooh
// @match        http://squidboards.com/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

var adblockNotice = document.getElementsByTagName("div")[45];
if (adblockNotice) {
    adblockNotice.remove ();
}