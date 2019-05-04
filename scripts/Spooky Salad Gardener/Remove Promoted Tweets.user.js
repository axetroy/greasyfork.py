// ==UserScript==
// @name        Remove Promoted Tweets
// @namespace   spookysaladgardener.tumblr.com
// @description:en Block promoted tweets on Twitter
// @include     *
// @version     1
// @grant       none
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

function hide_promoted() {

$("span.class:contains(Icon Icon--promoted)").parent().parent().parent().remove();
}

window.setInterval(function(){
  hide_promoted();
}, (1000));