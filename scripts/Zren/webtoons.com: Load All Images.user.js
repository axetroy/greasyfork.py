// ==UserScript==
// @name         webtoons.com: Load All Images
// @namespace    http://tampermonkey.net/
// @version      1
// @description  try to take over the world!
// @author       You
// @match        http://www.webtoons.com/*
// @grant        none
// ==/UserScript==

for (var e of document.querySelectorAll('img._images')) {
    e.setAttribute('src', e.getAttribute('data-url'));
}
