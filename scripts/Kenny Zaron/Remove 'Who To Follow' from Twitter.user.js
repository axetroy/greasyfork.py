// ==UserScript==
// @name         Remove 'Who To Follow' from Twitter
// @namespace    http://www.kennyzaron.com
// @description  Removes the 'who to follow' box on twitter.com as of 02/09/2015
// @include      https://twitter.com/*
// @grant        none
// @version      1.0.020915
// ==/UserScript==

function disable() {
    document.getElementsByClassName('wtf-module')[0].style.display='none';
}
disable();
