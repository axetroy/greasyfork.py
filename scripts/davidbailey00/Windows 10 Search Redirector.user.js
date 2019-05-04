// ==UserScript==
// @name         Windows 10 Search Redirector
// @namespace    https://davidjb.online/
// @version      0.1.0
// @description  Redirect searches from the Windows 10 Start menu to Google
// @author       David Bailey
// @match        https://www.bing.com/search?*
// @grant        none
// @run-at       document-start
// ==/UserScript==

if (location.search.match(/&form=WNS[A-Z]{3}&/)) {
    location.href = `https://www.google.com/search${location.search}`;
}