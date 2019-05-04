// ==UserScript==
// @name        5ch_mona_keshi
// @namespace   http://catherine.v0cyc1pp.com/5ch_mona_keshi.user.js
// @include     http://*.5ch.net/*
// @include     https://*.5ch.net/*
// @include     http://*.bbspink.com/*
// @include     https://*.bbspink.com/*
// @author      greg10
// @run-at      document-end
// @license     GPL 3.0
// @version     2.0
// @grant       none
// @description ５ちゃんねるのモナーを消す。
// ==/UserScript==

console.log("5ch_mona_keshi start");

document.querySelector(".mascot").setAttribute("style","");