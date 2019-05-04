// ==UserScript==
// @name         Reddit取消標題點擊事件
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://www.reddit.com/*
// @grant        none
// @require https://code.jquery.com/jquery-3.3.1.min.js
// @run-at        document-end
// ==/UserScript==

(function() {
setInterval(function(){
      $("h2").each(function(i, obj) {
        $(this).css("cursor","text").click(function() { return false; });
        $(this).parent().attr("href",null)
    });
}, 1000);

})();