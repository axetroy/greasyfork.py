// ==UserScript==
// @name        Furvilla - Shrink Forum Signatures
// @namespace   Shaun Dreclin
// @description Forum signatures taller than 100px will be confined to a scrolling div.
// @include     /^https?://www\.furvilla\.com/forums/thread/.*$/
// @version     1.0
// @grant       GM_addStyle
// ==/UserScript==

GM_addStyle(".thread-user-post-bottom { max-height: 100px; overflow-y: auto; }");
