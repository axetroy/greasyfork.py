// ==UserScript==
// @name          cnbc anti-anti-adblocker
// @namespace     danalec
// @description	  :)
// @include       https://*.cnbc.com*
// @grant         none
// @require       https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @version       10.03.2018
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);
$(function() {
  $(document).bind('DOMNodeInserted',function(){
    $('.bx-slab').hide();
    $('.adBlockerMessaging').hide();
  })
})();