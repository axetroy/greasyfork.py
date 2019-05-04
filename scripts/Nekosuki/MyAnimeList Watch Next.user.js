// ==UserScript==
// @name         MyAnimeList Watch Next
// @namespace    http://tampermonkey.com/
// @version      1.0
// @description  Get a random anime to watch from your list.
// @author       Nekosuki
// @match        https://myanimelist.net/animelist/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

if(window.location.href.slice(-1) == 6) {
    let animes = $(".list-item .list-table-data > .plantowatch").parent().children(".title").children("a.link");
    let anime = animes[Math.floor(Math.random() * animes.length)];
    $("div.list-block").prepend("<div class=\"list-unit plantowatch\"><div style=\"margin-bottom: 15px\" class=\"list-status-title\"><span class=\"text\">Watch next: <i><a style=\"color:white\" href=\"" + anime.href + "\">" + anime.text + "</a></i></span></div></div>");
}