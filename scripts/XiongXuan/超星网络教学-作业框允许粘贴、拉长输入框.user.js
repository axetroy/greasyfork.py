// ==UserScript==
// @name         超星网络教学-作业框允许粘贴、拉长输入框
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  本脚本用于解决超星网络教学里做作业的输入框无法粘贴的问题，在南昌航空大学的网络课堂中适用有效，其他大学并未测试
// @author       XiongXuan
// @match        https://mooc1-2.chaoxing.com/work/*
// @grant        none
// @require    http://code.jquery.com/jquery-1.11.0.min.js
// ==/UserScript==

(function() {
    'use strict';
    var textareaId = document.getElementsByTagName('textarea')[0].id; //获取输入框的id
    UE.getEditor(textareaId).removeListener('beforepaste', myEditor_paste); //移除输入框的监听
})();

$(document).ready(function() {
    $("div#edui1_iframeholder").height('1000px'); //修改输入框的高度，改为1000px。如有需要可以修改这个数值
 });