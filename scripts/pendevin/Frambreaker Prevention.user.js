// ==UserScript==
// @name        Frambreaker Prevention
// @namespace   pendevin
// @description adds all sandbox restrictions to iframes except allow-same-origin
// @include     *
// @version     1
// @grant       none
// @require     http://code.jquery.com/jquery-2.1.3.min.js
// ==/UserScript==

//ll breaks without noconflict jquery
this.$ = this.jQuery = jQuery.noConflict(true);

$('iframe').attr('sandbox','allow-same-origin');