// ==UserScript==
// @name        WordPress.com Stats Sparkline
// @namespace   tpenguinltg
// @description Adds a stats sparkline to the WordPress.com admin bar
// @include     https://*.wordpress.com/*
// @version     1.1.0
// @homepageURL https://greasyfork.org/en/scripts/26076-wordpress-com-stats-sparkline
// @homepageURL https://github.com/tpenguinltg/wpcom-stats-sparkline
// @grant       none
// @license     MPLv2.0; http://mozilla.org/MPL/2.0/
// @copyright   2016, tPenguinLTG (http://tpenguinltg.wordpress.com/)
// ==/UserScript==

// Function by dystroy. From http://stackoverflow.com/a/14388512
function fetchJSONFile(path, callback, fallback) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        if (callback) callback(JSON.parse(httpRequest.responseText));
      } else if (fallback) {
        fallback();
      }
    }
  };
  httpRequest.open('GET', path);
  httpRequest.send();
}

function addSparkline(src) {
  var sparklineImage = document.createElement("img");
  sparklineImage.src = src;
  sparklineImage.alt = "Stats";
  sparklineImage.title = "Showing site views per hour for the last 48 hours. Click for full Site Stats.";
  sparklineImage.style.paddingTop = "4px";
  sparklineImage.style.paddingBottom = "4px";

  var statsLink = document.createElement("a");
  statsLink.appendChild(sparklineImage);
  statsLink.href = "https://wordpress.com/stats/" + window.location.hostname;
  statsLink.className = "ab-item";

  var menuItem = document.createElement("li");
  menuItem.appendChild(statsLink);

  document.getElementById("wp-admin-bar-root-default").appendChild(menuItem);
}

window.onload = function() {
  var blogUrlAnchor = document.querySelector("#wp-admin-bar-blog-info a.ab-item");
  if (!blogUrlAnchor) return;

  var scrapedBlogUrl = blogUrlAnchor.href.replace(/\/+$/, "");

  // scraped: https://example.wordpress.com/wp-includes/charts/admin-bar-hours-scale-2x.php?masterbar=1
  // target:  https://example.wordpress.com/wp-includes/charts/admin-bar-hours-scale.php
  var sparklineImageSrc = document.querySelector("#wp-admin-bar-blog-stats img").src.replace(/-2x|\?.*/g, "");

  // only act on sites where the user is a member
  if (document.URL.startsWith(scrapedBlogUrl)) {
    addSparkline(sparklineImageSrc);
  } else {
    // check for custom domain
    fetchJSONFile("https://public-api.wordpress.com/rest/v1.1/sites/" + window.location.hostname,
      function(data) {
        if (scrapedBlogUrl == data.URL) addSparkline(sparklineImageSrc);
      }
    );
  }
}
