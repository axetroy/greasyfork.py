// ==UserScript==
// @name         食品伙伴网
// @namespace    http://greasyfork.org/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://down.foodmate.net/*
// @require      http://code.jquery.com/jquery-1.12.4.min.js
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';



  $(".bzmc a").each(function(){
      var urls=this.href.split("/").pop().replace(".html","");
      var titles=this.title.replace("/","_");
      $(this).parents().next(".bzrq").text(titles);

  $(this).attr('href',"http://down.foodmate.net/standard/down.php?auth="+urls);



  });

    // Your code here...
})();