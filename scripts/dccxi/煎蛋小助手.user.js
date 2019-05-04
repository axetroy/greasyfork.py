// ==UserScript==
// @name         煎蛋小助手
// @namespace    http://jandan.net/
// @version      0.2
// @description  隐藏不受欢迎图并展开评论
// @author       dccxi
// @match        http://jandan.net/pic*
// @match        http://jandan.net/top*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    // 隐藏所有不受欢迎无聊图
    $('li[id*="comment-"]').each(function(){
        var c = $(this).find("div.text p").eq(0).attr("class");
        if (c === "bad_content") {
            $(this).hide();
        }
    });
    // 自动展开吐槽
    var i = 0;
    $(document).scroll(function() {
        var bottomReached = $(document).scrollTop() + $(window).height();
        console.log(bottomReached);
        if ($('.author')[i].offsetTop < bottomReached) {
            $(".tucao-btn")[i].click();
            i++;
        }
    });
})();