// ==UserScript==
// @name         自动跳过微博信息更新界面
// @namespace    http://www.suzhengpeng.com
// @version      0.2
// @description  FUck weibo.com Update Info Page
// @author       Suzhengpeng
// @include      *weibo.com/nguide*
// ==/UserScript==

(function() {
    'use strict';
    var host = location.href;  
    if(host=='http://weibo.com/nguide/interests'||'http://weibo.com/nguide/recommend')
    {
     location.replace("http://weibo.com/");
    }
})();