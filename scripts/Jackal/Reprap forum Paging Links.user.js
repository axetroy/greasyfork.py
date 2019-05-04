// ==UserScript==
// @name        Reprap forum Paging Links
// @namespace   localhost
// @include     http://forums.reprap.org/read.php*
// @require     http://code.jquery.com/jquery-3.2.1.min.js
// @version     1
// @grant       none
// @description	Prepend reprap forum paging links to top
// ==/UserScript==
$('div.nav div.paging').clone().prependTo('div#page-info + div.nav');