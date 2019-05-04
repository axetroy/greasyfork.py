// ==UserScript==
// @name         Pikabu - удаление спонсорских постов
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  удаляет посты, автором которых является ads.
// @author       Leoric
// @match        https://pikabu.ru/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var matches = ["ads", "реклама", "закрепленный пост"];
    var post;
    var links = document.getElementsByTagName("a");
    for(var i=0, l=links.length;i<l;i++) {
        if (links[i] && matches.includes(links[i].textContent.trim())) {
            post = findAncestor(links[i], "story");
            post.remove();
        }
    }
    var authors = document.getElementsByClassName("story__header-additional-wrapper");
    if (authors[0] && matches.includes(authors[0].textContent.split(" ")[0].trim())) {
        post = findAncestor(authors[0], "story");
        post.remove();
    }
})();

function findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}