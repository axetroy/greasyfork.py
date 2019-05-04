// ==UserScript==
// @name        steam phishing prevention removal
// @namespace   https://greasyfork.org/users/2226-adam
// @include     https://steamcommunity.com/linkfilter/?url=*
// @version     0.1
// @grant       none
// @description steam wants to save me from phishing. Thanks but I got this.
// ==/UserScript==
window.location = String(window.location).substring(43);