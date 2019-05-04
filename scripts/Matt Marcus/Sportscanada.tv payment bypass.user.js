// ==UserScript==
// @name          Sportscanada.tv payment bypass
// @description   Bypass the paywall at sportscanada.tv
// @include       http://sportscanada.tv*
// @author        Mattwmaster58
// @version       0.9
// @require       https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js
// @namespace https://greasyfork.org/users/107214
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

function deleteOverlay(){
    if ($(".tp-overlay").length >0){
        $(".tp-overlay").remove();
        console.log("Paywall removed");
    }
}

window.onload = deleteOverlay;