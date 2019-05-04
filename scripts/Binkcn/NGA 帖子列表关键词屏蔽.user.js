// ==UserScript==
// @name         NGA 帖子列表关键词屏蔽
// @description  根据关键词屏蔽帖子列表中不想看到的主贴。
// @namespace    binkcn@nga
// @create       2019-04-08
// @lastmodified 2019-04-08
// @version      0.1
// @license      GNU GPL v3
// @author       Binkcn
// @connect      bbs.nga.cn
// @include      *://bbs.nga.cn/*
// @note         2019-01-25 Version 0.1 第一个版本发布。
// ==/UserScript==

(function() {
    'use strict';

    var keywords = ['996', '码农'];

    setInterval(function(){

        var topics = document.getElementsByClassName('topic');

        for (var i = 0; i < topics.length; i++) {
            var a = topics[i];
            var title = a.innerText;

            for (var j = 0; j < keywords.length; j++) {
                var keyword = keywords[j];

                if(title.indexOf(keyword) >= 0){
                    console.log('Removed: ' + a.href + ' [' + title + ']');

                    a.parentElement.parentElement.parentElement.remove();
                }
            }
        }
    }, 100);
})();