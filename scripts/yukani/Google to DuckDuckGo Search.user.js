// ==UserScript==
// @name Google to DuckDuckGo Search
// @namespace https://github.com/yukani
// @version 1.01
// @description Redirect Google searchs to DuckDuckGo.
// @author yukani
// @match *://www.google.com/*
// @run-at document-start
// @grant none
// ==/UserScript==
var url_string = window.location.href;

    if (url_string.includes("?q=") || url_string.includes("&q=")) {
        var url = new URL(url_string);
        var searchkey = url.searchParams.get("q");
        var ddgkey = "https://duckduckgo.com/?q=" + searchkey
        window.location.href = ddgkey;
    }