// ==UserScript==
// @name       Link not display retweet For twitter
// @namespace  namespace
// @version    0.1
// @description  リツイートを非表示にするリンクを生成します。リンクをクリックすると、タイムライン上のリツイートを非表示にできます。
// @match    https://twitter.com/*
// @require http://code.jquery.com/jquery-2.1.1.min.js
// @copyright  2014+, qa2
// ==/UserScript==

$(function() {
const notRT = $("<button>")
  .text("NotRT")
  .css("color", "Red")
  .on("click", () => {
  $(".tweet").has(".js-retweet-text").css("display", "none")
 })
  // add element
  $("#global-actions").before(notRT)
});

