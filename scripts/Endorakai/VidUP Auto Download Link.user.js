// ==UserScript==
// @name        VidUP Auto Download Link
// @namespace   https://greasyfork.org/en/users/13772-endorakai
// @description When at VidUP, automagically go to current video's download page
// @include     http*://vidup.me/*
// @exclude     http*://vidup.me/download/*
// @exclude     http*://vidup.me/download%2F*
// @exclude     http*://vidup.me/mpaabpu/*
// @version     0.02b
// @grant       none
// ==/UserScript==

location.pathname = '/download'+encodeURIComponent(location.pathname);