// ==UserScript==
// @name         洛谷用户名优化 Luogu username optimize
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  让你的洛谷用户名变成紫色并添加管理员标签，让自己变成管理员QAQ
// @author       andyli
// @match        https://www.luogu.org/*
// @match        http://www.luogu.org/*
// @match        https://www.luogu.org
// @match        http://www.luogu.org
// @match        https://www.luogu.org/space/show?uid=*
// @match        http://www.luogu.org/space/show?uid=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var tar = document.getElementsByClassName("lg-fg-red lg-bold");
    var ele = "&nbsp;<span class=\"am-badge am-radius lg-bg-purple\">管理员</span>";
    for (var i = 0; i < tar.length; i++)
    {
        if (tar[i].attributes['href'].value == "/space/show?uid=84282")
        {
            $(tar[i]).after(ele);
            tar[i].className="lg-fg-purple lg-bold";
        }
    }
    var tar1 = document.getElementsByClassName("lg-right");
    var tar2 = document.getElementsByClassName("lg-bignum-num");
    if (document.URL == "https://www.luogu.org/space/show?uid=84282")
    {
        tar1[2].innerHTML="管理员";
        tar2[2].innerHTML="1";
    }
})();