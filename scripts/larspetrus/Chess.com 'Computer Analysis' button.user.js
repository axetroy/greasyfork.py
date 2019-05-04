// ==UserScript==
// @name         Chess.com 'Computer Analysis' button
// @version      1.1
// @description  Order a computer analysis directly from the Live Chess page
// @author       Lars Petrus
// @match        http://live.chess.com/*
// @namespace https://greasyfork.org/users/10616
// ==/UserScript==

go_analyze = function() {
  var gameId = window.location.href.split("=").pop();
  window.location.href = "http://www.chess.com/home/computer_analysis_redirect?live_id="+gameId;
}

$("body").append("<button class='button-submit' onclick='go_analyze();' style='position:fixed; left: 200px; top:5px; font-size:10px; z-index: 9;'>Computer Analysis</button>");
