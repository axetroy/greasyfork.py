// ==UserScript==
// @name         淘宝&京东首页自动跳转到搜索页面
// @namespace    http://www.suzhengpeng.com
// @version      0.4
// @description  jump to search page，from the homepage of taobao or jd
// @author       Suzhengpeng
// @include      *www.taobao.com*
// @include      *www.jd.com*
// ==/UserScript==

(function() {
    'use strict';
    var host = location.host;  
    var host2 = document.domain; 
    if(host=='www.taobao.com')
    {
     location.replace("https://s.taobao.com/");
    }
    if(host=='www.jd.com')
    {
     location.replace("https://search.jd.com");
    }
})();