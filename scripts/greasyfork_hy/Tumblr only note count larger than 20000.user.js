// ==UserScript==
// @name        Tumblr only note count larger than 20000
// @descriotion Will hide anything whose notes num is not larger than 20000 on Tumblr Dashboard
// @namespace   hippotoes
// @version     1.0
// @grant       none
// @include https://www.tumblr.com/dashboard
// @require https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.min.js
// @description Will hide anything whose notes num is not larger than 20000 on Tumblr Dashboard
// ==/UserScript==
$(function()
{
  $('#posts').bind("DOMSubtreeModified", function()
  {
    $( "#posts li div" ).each(function( index, element ) {
      var notes_count = $(this).find("span").filter(".note_link_current").attr('data-count');
      if (notes_count < 20000)
      {
        $(this).remove();
      }
    });
  });
// Tumblr.AutoPaginator.start();
});