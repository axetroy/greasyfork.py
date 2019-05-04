// ==UserScript==
// @name        Remove Disqus and other social media from Hindustan Times
// @description Clean your HT newspaper online.
// @namespace   http://www.hindustantimes.com
// @include     http://www.hindustantimes.com/*
// @require     https://code.jquery.com/jquery-2.1.4.min.js
// @version     1
// @grant       none
// ==/UserScript==
setInterval(function(){ 
  $("#disqus_thread").remove();
  $(".commn_row,.footernav").remove();
  $(".ggl_page_row").remove();
  $(".story_comment").remove();
  $(".follows").remove();
  $('a').filter(function(index) { return $(this).text() === "editor's pick"; }).closest("section").remove();
}, 1000);

