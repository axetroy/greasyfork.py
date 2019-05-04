// ==UserScript==
// @name        stackoverflow good table form for evernote web clipper
// @namespace   mnts
// @description Change table content of stackoverflow to make evernote clips good looking.
// @include     http?://stackoverflow.com/questions/?*
// @include     *://*stackoverflow.*/questions/*
// @version     1.0
// @grant       none
// ==/UserScript==

var divs = document.getElementsByClassName("comments");
for (var i = 0; i < divs.length; i++) {
  var div = divs[i];
  var trs = div.getElementsByClassName("comment");
  for (var j = 0; j < trs.length; j++) {
    var tr = trs[j];
    var tds = tr.getElementsByTagName("td");
    tr.removeChild(tds[0]);
  }
}