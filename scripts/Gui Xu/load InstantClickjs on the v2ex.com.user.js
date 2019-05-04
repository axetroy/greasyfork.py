// ==UserScript==
// @name       load InstantClickjs on the v2ex.com
// @namespace  namespace
// @version    0.3
// @description  load InstantClick.js on the v2ex.com 
// @match      https://www.v2ex.com/*
// @copyright  2014+, qa2
// ==/UserScript==


!function() {
  var s = document.createElement("script");
  s.setAttribute("src","https://dxvi.nos-eastchina1.126.net/instantclick.min.js");
  document.body.appendChild(s);
}();

 window.onload = function() {  
  var el = document.createElement("script");
  el.setAttribute("data-no-instant", "");
  el.innerHTML = "InstantClick.init();"
  document.body.appendChild(el);
}