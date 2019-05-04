// ==UserScript==
// @name	Steam URL Filter Redirector
// @namespace	the.vindicar.scripts
// @description	Automatically skips that moronic link filter Steam employs.
// @version	1.0.0
// @grant none
// @run-at document-start
// @include	https://steamcommunity.com/linkfilter/?url=*
// ==/UserScript==

window.location.replace(window.location.toString().replace(/https:\/\/steamcommunity\.com\/linkfilter\/\?url=/i, ''));