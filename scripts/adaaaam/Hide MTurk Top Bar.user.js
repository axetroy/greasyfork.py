// ==UserScript==
// @name        Hide MTurk Top Bar
// @namespace   https://mturkers.org/
// @author      adaaaam
// @description Hide top bar announcements on MTurk
// @include     https://www.mturk.com/*
// @run-at      document-start
// @version     2017.05.05
// ==/UserScript==

document.getElementsByClassName('top-stripe')[0].style.display='none';