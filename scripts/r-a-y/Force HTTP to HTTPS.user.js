// ==UserScript==
// @name                Force HTTP to HTTPS
// @namespace           r-a-y/https
// @version             1.0.0
// @run-at              document-start
// @description         Force HTTP links to use HTTPS. You need to write your own @match or @include rules!
// ==/UserScript==

document.location.replace(document.location.href.replace(/http\:/, 'https:'));