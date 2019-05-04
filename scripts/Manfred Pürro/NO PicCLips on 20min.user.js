// ==UserScript==
// @name        NO PicCLips on 20min
// @description Removes PicClip Articles from 20min.ch
// @namespace   ch.monkee
// @include     http://www.20min.ch/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js?0.1
// @version     1
// @grant       none
// ==/UserScript==


$( document ).ready(function() {
  $(".box div.teaser_title h3 a:contains('PicClip')").closest(".box").hide();
});