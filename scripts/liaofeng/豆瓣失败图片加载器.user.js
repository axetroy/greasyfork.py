// ==UserScript==
// @name         豆瓣失败图片加载器
// @namespace    undefined
// @version      0.1.4
// @description  替换豆瓣加载失败的图片
// @author       watermelon
// @match        *://douban.com*
// @match        *://www.douban.com*
// @require      https://code.jquery.com/jquery-latest.js
// @run-at       document-start
// @grant        unsafeWindow
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
  console.log("in");
  $("<img/>").on('error', function(event) {
    console.log("error");
    event.preventDefault();
    var src = $(this).attr("src");
    console.log("load image failed: " + src);
    $(this).attr(src.replace("img1", "img3"));
  });
})();