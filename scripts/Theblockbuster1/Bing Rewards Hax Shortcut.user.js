// ==UserScript==
// @name       Bing Rewards Hax Shortcut
// @namespace  https://www.bing.com
// @version    0.1
// @description ez moneyz
// @match      https://www.bing.com/*
// @match      http://www.bing.com/*
// ==/UserScript==

document.onkeyup = function(e) {
  if (e.shiftKey && e.which == 72) {
    location.href = "http://www.helpingsocial.com/bingrewards.html";
  }
};