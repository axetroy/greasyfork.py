// ==UserScript==
// @name         surviv.io ad remover, needlessness remover!
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  First ever surviv.io mod!
// @author       You
// @match        http://surviv.io/
// @grant        none
// ==/UserScript==

//removes stuff
document.getElementById("start-top-left").remove();
document.getElementById("leaderboard-front").remove();
document.getElementById("ad-block-left").remove();
document.getElementById("news-block").remove();
document.getElementById("social-share-wrapper").remove();
document.getElementById("social-share-block").remove();
document.getElementById("start-bottom-left").remove();


