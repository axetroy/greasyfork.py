// ==UserScript==
// @name    Scribd downloader
// @author  Witiko
// @version 1.0.3
// @include http://www.scribd.com/doc/*
// @description Downloads from Scribd
// @namespace Scribd
// ==/UserScript==

var $ = [document.querySelector(".bottom span.inner.has_icon"), document.querySelector("span.download_icon")];
document.body.addEventListener("click", function(event) {
  if(event.target !== $[0] && event.target !== $[1]) return;
  open(location.href.replace(/http:\/\/www.scribd.com\/doc\/(\d*).*/, "http://www.scribd.com/mobile/documents/$1/download"));
  event.stopPropagation();
}, true);