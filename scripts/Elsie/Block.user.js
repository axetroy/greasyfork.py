// ==UserScript==
// @name        Block
// @namespace   elsie
// @include     http://www.ign.com/boards/*
// @description Fuck that guy
// @version     1
// @grant       none
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

$(".message").each(function() {
  if($(this).attr("data-author") == "kogunenjou")
    $(this).hide();
});
