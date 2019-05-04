// ==UserScript==
// @name         去掉登陆百度后默认搜索结果在新窗口打开
// @namespace    undefined
// @version      0.1.1
// @description  登陆百度后，百度首页点击百度一下默认会打开一个新窗口，太恶心了
// @author       x2009again
// @match        *://www.baidu.com/*
// @grant        none
// @run-at            document-end
// ==/UserScript==
document.getElementById('form').setAttribute("target","_self");