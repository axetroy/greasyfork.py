// ==UserScript==
// @name        SF.net: Direct download links
// @description Replaces links in the Files tab on sourceforge.net with direct download links
// @namespace   BlackNullerNS
// @include     http*://sourceforge.net/*/files/*
// @version     1.0
// @grant       none
// ==/UserScript==

var href, links = document.querySelectorAll('a[href$="/download"]');

for (var i = 0, l = links.length; i < l; i++) {
    href = links[i].getAttribute("href").replace("sourceforge.net/projects/", "master.dl.sourceforge.net/project/").replace("/files/", "/").replace(/\/download$/, "");
    links[i].setAttribute("href", href);
}