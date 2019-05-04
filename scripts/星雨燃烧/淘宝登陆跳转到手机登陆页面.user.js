// ==UserScript==
// @name         淘宝登陆跳转到手机登陆页面
// @version      0.1
// @description  不知道什么原因,QQ浏览器下面,用极速模式时淘宝不能直接登陆,所以有了这个东西
// @author       星雨燃烧
// @namespace    None
// @match        https://login.taobao.com/member/login.jhtml*
// @match        http://login.taobao.com/member/login.jhtml*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    location.href=document.URL.replace("https://login.taobao.com/member/login.jhtml","https://login.m.taobao.com/login.htm");
})();