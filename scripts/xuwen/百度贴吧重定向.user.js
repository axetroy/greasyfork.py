// ==UserScript==
// @id             TiebaRedirect@jiayiming
// @name           百度贴吧重定向
// @version        1.1
// @namespace      jiayiming
// @author         jiayiming
// @description    重定向各类同素异形体到更科学的主域名tieba.baidu.com
// @include        http://tieba.baidu.com.cn/*
// @include        http://tieba.baidu.cn/*
// @include        http://c.tieba.baidu.com/*
// @include        http://xingqu.baidu.com/*
// @include        http://v.tieba.com/*
// @include        http://v.tieba.baidu.com/*
// @include        http://1111.baidu.com/*
// @include        http://post.baidu.*
// @run-at         document-start
// ==/UserScript==

//目前发现以下同素异形体
//http://tieba.baidu.com.cn
//http://tieba.baidu.cn
//http://post.baidu.cn
//http://post.baidu.com

document.location.href = document.location.href.replace('baidu.com.cn', 'baidu.com').replace('baidu.cn', 'baidu.com').replace('post.baidu.', 'tieba.baidu.').replace('c.tieba.baidu.', 'tieba.baidu.').replace('xingqu.baidu.', 'tieba.baidu.').replace('v.tieba.', 'tieba.').replace('1111.baidu.', 'tieba.baidu.');