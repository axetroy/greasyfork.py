// ==UserScript==
// @name        Upsize Stand-Alone Images
// @author      Jefferson "jscher2000" Scher
// @namespace   JeffersonScher
// @version     0.5
// @copyright   Copyright 2017 Jefferson Scher
// @license     BSD-3-Clause
// @description Proportionally enlarge smaller stand-alone images
// @match       http*://*/*
// @grant       none
// ==/UserScript==

var tgt, resizeTimeout;
function resizeImg(e){
  var whratio = tgt.width / tgt.height;
  var wnew = window.innerWidth;
  var hnew = Math.round(wnew * (1 / whratio));
  if (hnew > window.innerHeight){
    hnew = window.innerHeight;
    wnew = Math.round(hnew * whratio);
  }
  tgt.width = wnew;
  tgt.height = hnew;
}
function resizeThrottler(){
  if(!resizeTimeout){
    resizeTimeout=setTimeout(function(){resizeTimeout=null;resizeImg();},200);
  }
}
if (document.querySelector('head').innerHTML.indexOf('TopLevelImageDocument.css') > -1) {
  tgt = document.querySelector('body  img'); // first image in body
  if (tgt.className.indexOf('shrinkToFit') == -1) { // if Firefox is already managing resizing, do nothing
    console.log(tgt.)
    window.addEventListener('resize', resizeThrottler, false); 
    window.setTimeout(resizeImg, 100);
  }
}
