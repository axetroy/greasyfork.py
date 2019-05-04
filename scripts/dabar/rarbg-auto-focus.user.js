// ==UserScript==
// @name        rarbg-auto-focus
// @namespace   rarbg-auto-focus
// @include     *rarbg.to*
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @description rarbg autofocus
// @version     1.2
// ==/UserScript==

$(function() {
  var input = $('#searchinput');
  
  input.removeAttr('autocomplete').focus();
});