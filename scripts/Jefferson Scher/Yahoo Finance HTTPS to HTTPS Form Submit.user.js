// ==UserScript==
// @name        Yahoo Finance HTTPS to HTTPS Form Submit
// @description Fix any forms on HTTPS pages that have HTTP submission URLs to avoid warnings
// @author      Jefferson "jscher2000" Scher
// @namespace   JeffersonScher
// @copyright   Copyright 2015 Jefferson Scher
// @license     BSD 3-clause
// @include     https://biz.yahoo.com/*
// @include     https://finance.yahoo.com/*
// @version     0.5
// @grant       none
// ==/UserScript==

function fixForms(){
  // Create a node list of forms whose action does not start with https: or with /
  var tgts = document.querySelectorAll('form[action]:not([action^="https:"]):not([action^="/"])');
  for (var i=0; i<tgts.length; i++){
    var actn = tgts[i].getAttribute("action");
    // If the action starts with http: switch it to https:
    if (actn.substr(0, 5) == "http:") tgts[i].setAttribute("action", "https:" + actn.substr(5));
  }
}
// Run fixForms half a second from now (approx. half a second after DOM Content Loaded)
window.setTimeout(fixForms, 500);