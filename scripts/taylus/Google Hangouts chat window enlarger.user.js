// ==UserScript==
// @name        Google Hangouts chat window enlarger
// @namespace   taylus-google-hangouts-chat-window-enlarger
// @description Enlarges the width of Google Hangouts chat windows
// @version     1
// @grant       none
// @match	https://hangouts.google.com/*
// ==/UserScript==

document.addEventListener("DOMNodeInserted", function(event) {
  var element = event.target;
  if (element.tagName == "DIV" && element.classList.contains("Cl")) {
    console.log("foo");
  	element.style.width = "50%"; 
  }
}, false);