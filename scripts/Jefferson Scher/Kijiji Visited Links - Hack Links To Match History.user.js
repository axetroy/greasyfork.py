// ==UserScript==
// @name        Kijiji Visited Links - Hack Links To Match History
// @author      Jefferson "jscher2000" Scher
// @namespace   JeffersonScher
// @copyright   Copyright 2016 Jefferson Scher
// @license     BSD 3-clause
// @description Add link with "?enableSearchNavigationFlag=true" to match how Firefox recorded them in history for a while
// @include     http://www.kijiji.ca/*
// @version     0.6
// @grant       none
// ==/UserScript==

var serpLinks = document.querySelectorAll('.search-item a.title');
var OLDLINK = document.createElement("a");
OLDLINK.setAttribute("style", "margin-left:2em; padding:1px 4px; border:1px solid #333; background-color:#f3f3f3; font-size:0.8em; text-decoration:none;");
OLDLINK.appendChild(document.createTextNode("OldStyle"));
for (var i=0; i<serpLinks.length; i++){
  var btn = OLDLINK.cloneNode(true);
  var qrypos = serpLinks[i].href.indexOf("?");
  if (qrypos > -1){
    btn.href = serpLinks[i].href.substr(0,qrypos) + "?enableSearchNavigationFlag=true";
  } else {
    btn.href = serpLinks[i].href + "?enableSearchNavigationFlag=true";
  }
  serpLinks[i].parentNode.appendChild(btn);
}
