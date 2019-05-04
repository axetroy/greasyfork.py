// ==UserScript==
// @name         Sort Facebook NewsFeed by Most Recent
// @version      2.2
// @description  Automatically sorts your news feed by Most Recent instead of by Top Stories.
// @author       Eric Mintz
// @match        https://www.facebook.com/*
// @grant        none
// @run-at document-start
// @namespace https://greasyfork.org/users/7084
// ==/UserScript==

(function(){
    if (document.location.href == 'https://www.facebook.com/') {
        document.location.href += '?sk=h_chr';
    }
})();