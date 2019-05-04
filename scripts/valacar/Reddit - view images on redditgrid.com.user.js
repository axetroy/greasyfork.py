// ==UserScript==
// @name         Reddit - view images on redditgrid.com
// @description  Add a link to view all images of a subreddit on redditgrid.com
// @namespace    reddit.grid.link
// @author       valacar
// @version      1.1.2
// @license      MIT
// @author       Valacar
// @include      https://www.reddit.com/*
// @include      https://old.reddit.com/*
// @grant        none
// @noframes
// @compatible   firefox Firefox
// @compatible   chrome Chrome
// ==/UserScript==

(function() {
  'use strict';

  // add link next to name of subreddit in header
  const subredditLink = document.querySelector("body.listing-page #header .pagename a");
  if (subredditLink) {
    const redditgridLink = subredditLink.href.replace("/www.reddit.com/", "/redditgrid.com/");
    const icon = "&#9638;";  // unicode glyph icon
    subredditLink.parentNode.innerHTML +=
      `<a href="${redditgridLink}" style="padding-left: 8px; font-weight: normal;" title="View images on redditgrid.com">${icon}</a>`;
  }

})();
