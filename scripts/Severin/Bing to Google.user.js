// ==UserScript==
// @name         Bing to Google
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically redirects Bing searches to Google.
// @author       Sev
// @include      https://www.bing.com/search*
// @run-at       document-start
// @grant        none
// ==/UserScript==

location.href = location.href.replace('bing', 'google');