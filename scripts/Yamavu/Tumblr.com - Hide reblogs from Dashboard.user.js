// ==UserScript==
// @name          Tumblr.com - Hide reblogs from Dashboard
// @name:de       Tumblr.com - Verhindert das Anzeigen von Reblogs auf dem Dashboard
// @namespace     https://greasyfork.org
// @description	  This will hide any reblogs on your Tumblr dashboard.
// @description:de Dieses Skript verhindert das Anzeigen von geteilten Inhalten auf deinem Tumblr-Dashboard.
// @author        yamavu
// @homepage      https://greasyfork.org/scripts/3140-tumblr-com-hide-reblogs-from-dashboard
// @include       http://www.tumblr.com/dashboard
// @include       https://www.tumblr.com/dashboard
// @grant         GM_addStyle 
// @run-at        document-start
// @version       1.02
// ==/UserScript==
(function () {
    GM_addStyle('#posts.posts .is_reblog {display:none !important; }');
}) ();
