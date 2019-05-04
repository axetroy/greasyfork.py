// ==UserScript==
// @name         钉钉web版审批链接改正
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  修改钉钉web版消息中错误的审批链接,默认情况下钉钉在待办消息中给出的审批链接是错误的，无法直接点击打开，需要到工作台中审批中找待审批列表，才能打开。此脚本自动检查并修正这些链接。
// @author       easyt
// @match        https://im.dingtalk.com/*
// @grant        none
// ==/UserScript==

$(document).on("mouseover", 'div.msg-action.ng-binding' , function (event) {
    event.preventDefault(); //阻止默认动作
    event.stopPropagation(); // 阻止事件冒泡
    this.parentElement.href=this.parentElement.href.replace("%2Fmobile%2Fhomepage","%2Fpc%2Fquery%2Fpchomepage");
    //alert(this.parentElement.href);
});