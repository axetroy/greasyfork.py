// ==UserScript==
// @name         IGG GAMES Direct Download
// @namespace    mivm
// @version      1.0
// @description  Remove the download jump from igg-games.com and go directly to the download site to avoid waiting time and advertising harassment.
// @author       Hill-98 [mivm.cn]
// @match        *://igg-games.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var allLinks = document.querySelectorAll("a[href*=\"bluemediafiles.com\"]");
    for (var i = 0; i < allLinks.length; i++) {
        var Link = allLinks[i];
        if (Link.href.indexOf("xurl=")) {
            allLinks[i].href = "http" + allLinks[i].href.split("xurl=")[1];
        }
    }
})();