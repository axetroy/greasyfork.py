// ==UserScript==
// @name         HP-FC:Pokalkorrektur
// @author      Nugorra
// @namespace   hpfcpunkteabstand
// @description ein Script zur Korrektur der falschen Banner Anzeige
// @include     https://www.hp-fc.de/*
// @version     1.0.0
// @grant       none
// @require     https://code.jquery.com/jquery-3.1.0.slim.min.js
// ==/UserScript==

$(document).ready(function(){
  $("img[src$='hauspokal.gif']").css({"width":"50%"});
  $("img[src$='quiddpokal.gif']").css({"width":"50%"});
});