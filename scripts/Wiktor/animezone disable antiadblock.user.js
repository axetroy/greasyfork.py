// ==UserScript==
// @name        animezone disable antiadblock
// @namespace   dtm
// @include     http://www.animezone.pl/odcinki-online/*
// @description blokuje antyadblocka
// @version     1
// @grant       none
// ==/UserScript==

$(document).ready(function(){
  $('.play').prop('disabled', false).prop('title', 'Oglądaj').text('Oglądaj');  
});