// ==UserScript==
// @name         Gaia - Forum URL Shortener
// @namespace    GaiaUpgrade
// @version      0.1
// @description  This shortens the thread URL in the address bar, pagination links, and post links.
// @author       KnightYoshi
// @match        http://www.gaiaonline.com/forum/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  var regex = /\/forum\/.*\/(t.\d+(?:_(?:recent|\d+))?)\//;
  var pathModifier = location.pathname.replace(regex, '/forum/$1');
  var newURL = pathModifier + location.hash;
  var GuHistory = { modifier: "GaiaUpgrade" };
  history.pushState(GuHistory, document.querySelector('title').textContent, newURL);

  var postURLs = document.querySelectorAll('.post-directlink a');
  var title = document.querySelector('#thread_title a');
  title.href = title.href.replace(regex, '/forum/$1');

  var pages = document.querySelectorAll('.forum_detail_pagination .yui3-pjax');

  for(var page of pages) {
    page.href = page.href.replace(regex, '/forum/$1');
  }

  for(var anchor of postURLs) {
    anchor.href = anchor.href.replace(regex, '/forum/$1');
  }
})();