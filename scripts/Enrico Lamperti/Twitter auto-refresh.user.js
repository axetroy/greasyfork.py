// ==UserScript==
// @name         Twitter auto-refresh
// @namespace    http://elamperti.com/
// @version      0.2
// @description  Refreshes the timeline items automatically every 10 sec.
// @author       Enrico Lamperti
// @match        https://twitter.com/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

function updateTimeline() {
  if ($("body").scrollTop() < 500) { // Get new tweets only when not seeing tweets down the timeline
    var newTweets = document.querySelector(".new-tweets-bar");
    if (newTweets) {
      newTweets.click();
    }
  }
  return true;
}

setInterval(updateTimeline, 10000);