// ==UserScript==
// @name         Line Breaker for MyAnimelist
// @namespace    https://myanimelist.net/profile/CyCeph
// @version      0.5
// @description  Replaces "," with line breaks for the "Related Anime" thing
// @author       CyCeph
// @include     /^https?:\/\/myanimelist.net\/((anime(list)?|manga|news|featured)(.php?id=|\/)|character|people|search)/
// ==/UserScript==

(function() {
    'use strict';
    var paragraphs = document.querySelectorAll("table.anime_detail_related_anime,table.mb24.news-related-database,div.mr8");
    for (var i = 0; i < paragraphs.length; i++) {
        paragraphs[i].innerHTML = paragraphs[i].innerHTML.replace(/>, /g, "><br/>")
}
})();