// ==UserScript==
// @name mBank
// @description A script which restores the previous theme of mBank. 
// @include https://online.mbank.pl/*
// @run-at document-end
// @grant none
// @version 0.0.1.20180525153534
// @namespace https://greasyfork.org/users/187643
// ==/UserScript==
document.querySelectorAll('.lifting').forEach(e=>e.classList.remove('lifting'));