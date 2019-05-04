// ==UserScript==
// @name         博客园 阅读模式
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  clear read blog
// @author       zhuanwan
// @match        *.cnblogs.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    function removeAd() {
        let len = arguments.length;
        for (var i = 0; i < len; i++) {
            $(arguments[i]).fadeOut("slow");
        }
    }
    removeAd("#blogTitle","#navigator","#cnblogs_c2", "#comment_form", "#cnblogs_c1", "#sideBarMain", "#blog_post_info_block", "#sideBar");

    $("#mainContent").width("97%").css("marginLeft","0");
    $(".forFlow").css("marginLeft","0");
    $("body,#header,#footer,.forFlow").css("background","none");

})();