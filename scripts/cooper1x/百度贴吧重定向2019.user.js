// ==UserScript==
// @name           百度贴吧重定向2019
// @version        1.0
// @author         cooper1x
// @description    重定向贴吧域名，将样式错乱的新域名tieba.com重定向到老域名tieba.baidu.com
// @include        *//www.tieba.com/*
// @include        *//dq.tieba.com/*
// @run-at         document-start
// @namespace https://greasyfork.org/users/179487
// ==/UserScript==

//目前发现以下两个域名，其他的似乎都会自动重定向到tieba,baidu,com
//http://www.tieba.com
//https://dq.tieba.com/
var host = document.location.host
document.location.host = host.replace('dq.tieba.com','tieba.baidu.com').replace('www.tieba.com','tieba.baidu.com')