// ==UserScript==
// @name                Force HTTPS to HTTP (flyertea)
// @namespace           hntee
// @version             1.0.0
// @run-at              document-start
// @description         Force HTTPS links to use HTTP. You need to write your own @match or @include rules!
// @match https://www.flyertea.com/*
// ==/UserScript==

document.location.replace(document.location.href.replace(/https\:/, 'http:'));