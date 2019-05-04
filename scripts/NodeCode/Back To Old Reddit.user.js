// ==UserScript==
// @name Back To Old Reddit
// @description Redirect you from new Reddit to old.Reddit.com
// @namespace https://www.nordicnode.com/
// @version      0.1
// @match *://www.reddit.com/*
// @author https://www.nordicnode.com/
// @grant none
// @copyright  2019 NordicNode - https://www.nordicnode.com/userscript-back-to-old-reddit-simple-redirect/
// @run-at document-start
// ==/UserScript==

var currentURL = window.document.location.toString();
if(currentURL.includes("://www.reddit.com")) {
  var newURL = currentURL.replace("://www","://old");
  window.document.location.replace(newURL);
}