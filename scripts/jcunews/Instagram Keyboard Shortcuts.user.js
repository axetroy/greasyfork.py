// ==UserScript==
// @name         Instagram Keyboard Shortcuts
// @namespace    http://tampermonkey.net/
// @version      1.0.3
// @license      GNU AGPLv3
// @description  Keyboard shortcuts for Instagram (when input focus is not on an input box or form field). "I" to follow/unfollow. ";" to pick first post on the page (if none is picked yet). "O" to like/unlike post. "P" to save/unsave post. "[" and "]" for previous and next post (alternative for Left and Right arrow keys). "N" and "M" for previous and next posted picture/video. "K" for play/pause posted video. "J" and "L" for rewind and fast forward posted video by 10 seconds.
// @author       jcunews
// @website      https://greasyfork.org/en/users/85671-jcunews
// @match        *://www.instagram.com/*
// @grant        none
// ==/UserScript==

(function(tags) {
  tags = ["INPUT", "SELECT", "TEXTAREA"];
  addEventListener("keydown", function(ev, ele) {
    if (ev.shiftKey || ev.ctrlKey || ev.altKey || tags.includes(ev.target.tagName)) return;
    switch (ev.key.toUpperCase()) {
      case "I": //follow/unfollow
        if (ele = document.querySelector(".oW_lN,._6VtSN") || document.querySelector(".HfISj>._4pI4F")) ele.click();
        break;
      case ";": //pick first post on the page
        if (!document.querySelector(".L_LMM") && (ele = document.querySelector(".v1Nh3>a"))) ele.click();
        break;
      case "O": //like/unlike post
        if (ele = document.querySelector(".fr66n>button")) ele.click();
        break;
      case "P": //save/unsave post
        if (ele = document.querySelector(".wmtNn>button")) ele.click();
        break;
      case "[": //previous post
        if (ele = document.querySelector(".qSTh6")) ele.click();
        break;
      case "]": //next post
        if (ele = document.querySelector(".HBoOv")) ele.click();
        break;
      case "N": //previous post's picture/video
        if (ele = document.querySelector(".POSa_")) ele.click();
        break;
      case "M": //next post's picture/video
        if (ele = document.querySelector("._6CZji")) ele.click();
        break;
      case "K": //play/pause post's video
        if (ele = document.querySelector(".QvAa1")) ele.click();
        break;
      case "J": //rewind post's video by 10 seconds
        if (ele = document.querySelector(".tWeCl")) ele.currentTime -= 10;
        break;
      case "L": //fast forward post's video by 10 seconds
        if (ele = document.querySelector(".tWeCl")) ele.currentTime += 10;
        break;
    }
  });
})();
