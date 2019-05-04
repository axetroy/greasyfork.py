// ==UserScript==
// @name         the-movie-project fix  movie poster images
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://kumailht.com/the-movie-project/
// @grant        none
// ==/UserScript==

document.querySelectorAll('.title img').forEach(item => {
    item.src = item.src.replace('t/p/w150', 't/p/w300')
})
