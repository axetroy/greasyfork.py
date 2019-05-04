// ==UserScript==
// @name         完全隐藏BiliBili黑名单用户评论
// @description  隐藏BiliBili黑名单用户在评论区中显示的“由于黑名单设置，该评论已被隐藏。”
// @namespace    starry
// @version      1.0
// @author       starry
// @match        *://www.bilibili.com/*
// @license      MIT License
// ==/UserScript==

(function () {
    'use strict';
    var biliObserver = new MutationObserver(check);
        var options = {
            'childList': true,
            'subtree': true
        };
        biliObserver.observe(document.body, options);
    function check() {
        if (document.getElementsByClassName("comment-list")){
            clearComment();
        }
    }
    function clearComment() {
        var comment = document.getElementsByClassName("blacklist-font-color");
        if (comment) {
            for (var i = 0; i < comment.length; i++) {
                //判断是否是评论中的回复
                if (comment[i].nodeName == "SPAN") {
                    comment[i].parentNode.parentNode.parentNode.style.display = "none";
                }
                comment[i].parentNode.parentNode.style.display = "none";
            }
        }
    }
})();