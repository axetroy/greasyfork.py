// ==UserScript==
// @name         知乎隐去标题
// @namespace    https://www.zhihu.com/
// @version      0.1.1
// @description  隐去标题
// @author       cH
// @match        https://www.zhihu.com
// @match        https://www.zhihu.com/question/*
// @require      http://cdn.bootcss.com/jquery/2.1.4/jquery.min.js
// @run-at       document-end
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    $("document").ready(function(){
        $('.QuestionHeader-title').css("display","none");
    })
})();