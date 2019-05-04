// ==UserScript==
// @name     Bellgab Scrollsaver
// @version  1.0
// @grant    none
// @description Ethers forum s#!++ers except when quoted
// @include    http://bellgab.com/*
// @namespace https://greasyfork.org/users/219042
// ==/UserScript==


var divs = document.querySelectorAll(".post_wrapper");
Array.from(divs).forEach(function(div) {
  if (div.textContent.indexOf("You are ignoring this user.") >= 0 || div.textContent.indexOf("Thuis") >= 0) {
    div.style.display = "none";
  }
});

var divs = document.querySelectorAll(".post_wrapper");
Array.from(divs).forEach(function(div) {
  if (div.textContent.indexOf("You are ignoring this user.") >= 0 || div.textContent.indexOf("Thuis") >= 0) {
    div.style.display = "none";
  }
});
// created by code ninja George Sinta TGFP(TM)
// STFU video later