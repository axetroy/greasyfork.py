// ==UserScript==
// @name          Steam Linkfilter Redirect
// @namespace     http://greasyfork.org/users/2240-doodles
// @author        Doodles
// @version       1
// @description   Redirects Steam Linkfilter to the Linked Page
// @include       *://steamcommunity.com/linkfilter/?url=*
// @grant         none
// @updateVersion 1
// @run-at        document-start
// ==/UserScript==

window.location.assign(document.URL.split("url=")[1]);