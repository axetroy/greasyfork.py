// ==UserScript==
// @name           Dan Gilbert Comic Tweets !
// @namespace      pylbcavsdan
// @description    Dan Gilbert's tweets show up in Comic Sans.
// @include        http*://twitter.com/*/cavsdan*
// @include        http*://twitter.com/cavsdan*
// @grant          GM_addStyle
// @version        1.0
// ==/UserScript==

GM_addStyle("p.js-tweet-text { font-family: 'Comic Sans MS' !important;}");