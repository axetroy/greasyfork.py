// ==UserScript==
// @name 去掉开源中国左侧评论栏
// @namespace 7YUX84VtKczqahPFp2ZZ4sc4S3BmKVxE
// @description 去掉开源中国左侧评论栏，因为你并不一定会用得着，影响视野
// @author asmoker<blog.smoker.cc@gmail.com>
// @version 0.1
// @match https://my.oschina.net/*/blog/*
// @grant none
// ==/UserScript==

(function() {
    'use strict';
    $("div.two.wide.computer.only.column").css('visibility', 'hidden');
})();