// ==UserScript==
// @name       贴吧去登陆
// @description 贴吧去登陆提示
// @version    0.1
// @include        http://tieba.baidu.com/*
// @include        http://tieba.baidu.com/p/*
// @include        http://tieba.baidu.com/f?ct=*
// @include        http://tieba.baidu.com/f?kz=*
// @exclude        http://tieba.baidu.com/i/
// @namespace https://greasyfork.org/users/12375
// ==/UserScript==
var islogin = document.createElement('script');
islogin.innerHTML = "PageData.user.is_login = true;";
document.head.appendChild(islogin);