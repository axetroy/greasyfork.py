// ==UserScript==
// @name          aspdotnet-suresh anti-anti-adblocker
// @namespace     danalec
// @description	  :)
// @include       https://*.aspdotnet-suresh.com*
// @grant         none
// @require       https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @version       10.04.2018
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);
$(function() {
  $(document).bind('DOMNodeInserted',function(){
    $('#g207').hide();
  })
})();