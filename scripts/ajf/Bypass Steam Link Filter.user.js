// ==UserScript==
// @id             linkfilter-bypass
// @name           Bypass Steam Link Filter
// @version        1.0.4
// @namespace      
// @author         Andrea Faulds <ajf@ajf.me>
// @description    If you found this userscript, I expect you understand what this is for. It skips the Steam linkfilter and goes straight where you actually wanted, before the page even finishes loading. Nothing more, nothing less.
// @include        https://steamcommunity.com/linkfilter/?url=*
// @run-at         document-start
// @grant          none
// ==/UserScript==

var prefix;
prefix = "https://steamcommunity.com/linkfilter/?url=";

window.location.replace(window.location.toString().substr(prefix.length));