// ==UserScript==
// @name        Hide MTurk Instructions
// @namespace   https://mturkers.org/
// @author      adaaaam
// @description Hide MTurk HIT instructions
// @include     *
// @version     2017.03.21
// ==/UserScript==

document.getElementsByClassName('panel panel-primary')[0].style.display='none';