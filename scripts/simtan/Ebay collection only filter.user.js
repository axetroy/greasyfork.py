// ==UserScript==
// @name       Ebay collection only filter
// @namespace  CollectionOnlyFilter
// @version    0.1
// @description  Hides all collection only listings.
// @match      http://www.ebay.co.uk/*
// @grant      none
// ==/UserScript==

$(document).ready(function() {
  $('body').append('<input type="button" value="Filter Collection Only" id="FCO">');
  $("#FCO").css("position", "fixed").css("top", 2).css("left", 2);
  $('#FCO').click(function(){ 
    $("span.ship:contains('Collection only: Free')").parent().parent().parent().hide();
  });
});