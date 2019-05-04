// ==UserScript==
// @name        Hide reblogs from Dashboard v2
// @namespace   https://greasyfork.org
// @description	This will hide any reblogs on your Tumblr dashboard.
// @author      yamavu
// @homepage    https://greasyfork.org/scripts/3140-tumblr-com-hide-reblogs-from-dashboard
// @include     http://www.tumblr.com/dashboard
// @include     https://www.tumblr.com/dashboard
// @include     http*://*.tumblr.com/*
// @grant       GM_addStyle 
// @run-at      document-start
// @version     1.02
// ==/UserScript==
(function () {
    GM_addStyle('.posts .is_reblog {height:10px; !important; } .posts .is_reblog div{display:none !important; }');
}) ();