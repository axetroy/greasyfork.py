// ==UserScript==
// @name        (SO) Custom badges
// @match       *://*.stackoverflow.com/*
// @grant       GM_addStyle
// @description to change SO badges
// @version 0.0.2.20180427263650
// @namespace https://greasyfork.org/users/182332
// ==/UserScript==

GM_addStyle("\
span.badge1 { background: url(http://cdn.cosdentbyslc.com/wp-content/uploads/2015/04/z2.png); width: 12px; }\
span.badge2 { background: url(http://achmatim.net/wp-content/plugins/wp-synhighlight/themes/default/images/code.png); width: 12px; }\
span.badge3 { background: url(https://www.facebook.com/rsrc.php/v3/yB/r/-pz5JhcNQ9P.png); width: 12px; }\
.topbar span.badge1 { width: 12px; }\
.topbar span.badge2 { width: 12px; }\
.topbar span.badge3 { width: 12px; }\
");