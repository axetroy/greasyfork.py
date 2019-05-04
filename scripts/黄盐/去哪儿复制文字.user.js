// ==UserScript==
// @name         去哪儿复制文字
// @namespace    https://greasyfork.org/zh-CN/users/104201
// @version      0.2
// @description  手机版去哪儿页面支持复制文字，(๑ˇεˇ๑).¸¸♪ 爱怎么复制就怎么复制。适用于去哪儿度假。
// @author       黄盐
// @match        https://touch.dujia.qunar.com/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.querySelectorAll("body *").forEach((ele)=>{
      ele.setAttribute("contentEditable",true);
    });
})();