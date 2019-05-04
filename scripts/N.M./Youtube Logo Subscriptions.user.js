// ==UserScript==
// @name          Youtube Logo Subscriptions
// @namespace     http://nmtools.com
// @description   Changes youtube logo link to subscriptions feed
// @include       *.youtube.com*
// @version       1.2
// @run-at       document-end
// ==/UserScript==

document.getElementById("logo").href = "/feed/subscriptions";