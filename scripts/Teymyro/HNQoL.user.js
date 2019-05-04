// ==UserScript==
// @name         HNQoL
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Hacker News personnalisation and QoL improvements
// @author       Teymyro
// @match        https://news.ycombinator.com/*
// @grant        none
// @namespace https://greasyfork.org/users/184736
// ==/UserScript==

var links = document.getElementsByTagName("a");
for (var i=0; i<links.length; i++) {
    links[i].setAttribute('target', '_blank');
}