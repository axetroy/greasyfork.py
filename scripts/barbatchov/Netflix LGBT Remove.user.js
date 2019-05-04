// ==UserScript==
// @name Netflix LGBT Remove
// @namespace Violentmonkey Scripts
// @version     0.0.2
// @require https://code.jquery.com/jquery-3.0.0.min.js
// @grant none
// @description Remove LGBT from menu and list
// ==/UserScript==

(function(){
  'use strict';
  var location = window.document.location;
  var netflix  = "www.netflix.com";
  var genre    = "5977";

  if (location.host != netflix) {
    return;
  }
  
  if (window.location.pathname === "/browse/genre/" + genre) {
    return (window.location.href = "/browse");
  }

  $(document).ready(function(){

    var list = null;
    setInterval(function(){
      list = $("a#" + genre);
      (list.length === 0) ?'': list.parents()[1].remove();
    }, 10);
    
    var subMenu = null;
    setInterval(function() {
      subMenu = $("a[id=" + genre + "][class=sub-menu-link]");
      (subMenu.length === 0) ?'': subMenu.parents()[0].remove(); 
	}, 10);

  });
})();