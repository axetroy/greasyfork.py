// ==UserScript==
// @name        Watch Series Patch
// @namespace   localhost
// @include     http://watchtvseries.se/open/cale/*
// @include     http://www.vid.gg/*
// @require     https://greasyfork.org/scripts/10546-mujs-2-0/code/MUJS%2020.js?version=57895
// @description watch series patch
// @version     1.0
// @grant       none
// ==/UserScript==


mouse('click','.myButton');

sel('#videoPlayer').attr({'autoplay':'true'});