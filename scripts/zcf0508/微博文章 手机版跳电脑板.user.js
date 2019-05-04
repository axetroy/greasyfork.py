// ==UserScript==
// @name         微博文章 手机版跳电脑板
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       zcf0508
// @match        https://media.weibo.cn/article?*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';



    // Your code here...



    function GetQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }

    var id=GetQueryString("id");

    window.location.href="https://weibo.com/ttarticle/p/show?id="+id;


})();