// ==UserScript==
// @name       Ebay collection only filter
// @namespace  CollectionOnlyFilter
// @version    0.5
// @description  Hides all collection only listings.
// @match      https://www.ebay.co.uk/*
// @grant      none
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
  $('div.asp.pnl.left').append('<input type="button" value="Filter Collection Only" id="FCO">');
  //$("#FCO").css("position", "fixed").css("top", 2).css("left", 2);
  $('#FCO').click(function(){ 
    $(".ship:contains('Collection only: Free')").parent().parent().parent().hide();
  });
});