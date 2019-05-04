// ==UserScript==
// @name         View LiveJournal Posts w/ Default Theme
// @description  Automatically redirect LiveJournal posts to their minimally styled "format=light" URL
// @version      0.1
// @author       mica
// @namespace    greasyfork.org/users/12559
// @match        *://*.livejournal.com/*.html*
// @run-at       document-start
// @grant        none
// ==/UserScript==

if (! location.search.match('format=light')) {
    location.replace('http://' + location.host + location.pathname + '?format=light' + location.search.replace('?','&') + location.hash);
}