// ==UserScript==
// @name        Imgur remove key listener
// @namespace   xxx
// @description Removes the key shortcuts on imgur
// @include     *://imgur.com/*
// @version     1
// @grant       none
// @locale       en
// ==/UserScript==

$(document).unbind('keydown').unbind('keyup');