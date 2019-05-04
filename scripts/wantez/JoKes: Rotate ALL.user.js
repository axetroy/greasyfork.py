// ==UserScript==
// @name          JoKes: Rotate ALL
// @namespace     JoKes
// @description   Rotate all content on webpages
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js
// @include       http://*/*
// @grant         none
// @version 0.0.1.20150903131720
// ==/UserScript==

jQuery.fn.rotate = function(degrees) {
    $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                 '-moz-transform' : 'rotate('+ degrees +'deg)',
                 '-ms-transform' : 'rotate('+ degrees +'deg)',
                 'transform' : 'rotate('+ degrees +'deg)'});
    return $(this);
};

$(function() {
    setTimeout(function() { $('*').rotate(180) }, 2000);
});