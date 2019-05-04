// ==UserScript==
// @name        FordClubPolska Tooltip Killer
// @description Disable annoying FordClubPolska tooltips on thread lists
// @version     1.0
// @namespace   http://www.studiopomyslow.com
// @match       http://forum.fordclubpolska.org/*
// @copyright   2015+, Dawid Ciecierski
// ==/UserScript==

var topics = document.getElementsByClassName('alt1');
for (var t = 0; t < topics.length; t++) {
    topics[t].title = '';
}
