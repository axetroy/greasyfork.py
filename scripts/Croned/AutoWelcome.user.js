// ==UserScript==
// @name         AutoWelcome
// @namespace    http://your.homepage/
// @version      1.0
// @description  Types welcome automatically when the game is joined
// @author       Croned
// @match        https://epicmafia.com/game/*
// @grant        none
// ==/UserScript==
 
console.log("AutoWelcome activated!");
 
$("#typebox").val("welcome");

setTimeout(function() {
	angular.element($("#speak")).scope().send_msg();
}, 1000);