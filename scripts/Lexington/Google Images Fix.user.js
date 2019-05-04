// ==UserScript==
// @name        Google Images Fix
// @author      Lexington
// @namespace   googleimagesfix
// @description Attempts to fix the view image button
// @version     1.0.8
// @include     *://www.google.*/search*tbm=isch*
// @grant       none
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
  
  $(window).on("load", function(){  
    $(".irc_rist").filter(function() { return $(this).css("visibility") == "visible";}).children().first().click();
	});
      
  $("body").on("click", "a[href^='/imgres']", function(){

    // Retrieve the item id
    var itemId = $(this).parent().data("item-id");
    if (!itemId) { itemId = $(this).children("img").prop("id"); }
    
    // Search for the item id in metadata
    var metaData = $(".rg_meta");
    
    $.each(metaData, function(key, value) {
      var data = JSON.parse(value.textContent);
      
      if (data.ou && (data.id == itemId || data.id == itemId.slice(0,-1))) {
        
        $(".viewImgBtn").remove();
        $('<td><a class="viewImgBtn" data-noload="" role="button" tabindex="0" target="_blank" href="' + data.ou + '"><span class="_WKw">View image</span></a></td>').insertAfter($("span:contains('Visit')").parent().parent()); 
        
        return false; 
      }
    });
  });
});