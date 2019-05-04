// ==UserScript==
// @name         煎蛋首页http链接转为https
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       mtdwss@gmail.com
// @match        https://jandan.net/*
// @match        http://jandan.net/*
// @grant        none
// ==/UserScript==

(function() {
  "use strict";

  if (window.top != window.self) return;
  $(document).ready(function() {
    $(
      ".list-post .thumbs_b a, .list-post h2 a, #list-hotposts a, #list-hotlike a, #list-hotcomments a, .hotcomment .acv_author a, .post-author, .post h1 a, .s_related a, .time_s a"
    ).each(function() {
      console.log($(this).attr("href"));
      $(this).attr(
        "href",
        $(this)
          .attr("href")
          .replace("http", "https")
      );
    });
  });
  // Your code here...
})();
