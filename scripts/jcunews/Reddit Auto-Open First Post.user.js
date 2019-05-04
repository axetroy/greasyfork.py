// ==UserScript==
// @name        Reddit Auto-Open First Post
// @namespace   RedditAutoOpenFirstPost
// @description Auto open first post in Reddit front page using Reddit API URL: https://api.reddit.com/?goToFirstPost
// @include     https://api.reddit.com/*
// @version     1
// @grant       none
// ==/UserScript==

if (location.pathname === "/") {
  if (location.search.toLowerCase() === "?gotofirstpost") {
    var obj = JSON.parse(document.body.children[0].innerHTML);
    var entries = obj.data.children;
    if (entries.length) {
      location.href = "https://www.reddit.com" + entries[0].data.permalink;
    } else {
      alert("No posted entry found in Reddit front page data.");
    }
  }
}
