// ==UserScript==
// @name        Fix Google derping
// @namespace   http://classcoder.com
// @description Sometimes the solid black Google Apps bar shows up at the top of the screen. Not now.
// @include     http://*.google.com/*
// @include     https://*.google.com/*
// @include     http://google.com/*
// @include     https://google.com/*
// @version     1.1
// ==/UserScript==

setTimeout(function() {
    document.querySelector('#stefanvdnavwrappe').style.display = 'none'
}, 1000)