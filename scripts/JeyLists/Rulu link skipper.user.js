// ==UserScript==
// @name         Rulu link skipper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  No more waiting for 5 seconds now!
// @author       JeyLists
// @match        *://www.rulu.co/*
// ==/UserScript==

(function() {
    'use strict';
    var external_links = document.querySelectorAll('a[href*="https://rulu.io/j/"]');
    for (var i = 0; i < external_links.length; i++)
    {
        var href = external_links[i].getAttribute("href");
        var wantedLink = href.substr(18,href.length);
        external_links[i].setAttribute("href", wantedLink);
    }
})();