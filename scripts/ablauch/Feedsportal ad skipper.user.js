// ==UserScript==
// @name         Feedsportal ad skipper
// @description  Skips feedsportal interstitial ads
// @version      1.01
// @author       ablauch
// @include      http://da.feedsportal.com/*
// @include      https://da.feedsportal.com/*
// @grant        none
// @namespace    ablauch
// ==/UserScript==

if (document.querySelector) {
  var finalLink = document.querySelector("div#clicker div a");
  if (finalLink) {
    console.debug("Skipping Feedsportal Ad...");
    window.location = finalLink.href;
  }
}