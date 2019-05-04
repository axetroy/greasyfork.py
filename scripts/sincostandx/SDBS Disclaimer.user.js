// ==UserScript==
// @name        SDBS Disclaimer
// @version     0.1.0
// @author      sincostandx
// @description Automatically agree disclaimer when visiting Spectral Database for Organic Compounds (SDBS) by AIST
// @namespace   https://greasyfork.org/users/171198
// @include     http://sdbs.db.aist.go.jp/sdbs/cgi-bin/*
// ==/UserScript==

var f = document.getElementsByTagName('frame');
for (var i = 0; i < f.length; ++i) {
  if (f[i].src.includes('disclaimer')) {
    var c = f[i].contentWindow;
    c.addEventListener("load", function(){
      c.document.getElementsByTagName('form')[0].submit();
    });
    break;
  }
}