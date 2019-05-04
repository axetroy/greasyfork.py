// ==UserScript==
// @name        MAL Anime Page cite
// @description idk
// @author BahNahNah - http://hackforums.net/member.php?action=profile&uid=2388291
// @include     http://myanimelist.net/anime/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @version     1
// @grant       none
// @namespace https://greasyfork.org/users/23798
// ==/UserScript==

$("#citeMAL").live("click", function()
{
    window.prompt("Press Ctrl+C to copy!", cite);
});

var e = $(".h1 span[itemprop*='name']");
var cite = "[url=" + document.URL + "][b]" + e.html() + "[/b][/url]";
e.after('&nbsp<span style="font-size:x-small"><a title="Cite MAL!" href="javascript:void();" id="citeMAL">[cite]</a></span>');
