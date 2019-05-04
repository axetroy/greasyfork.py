// ==UserScript==
// @name         百度Material Design美化
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  百度搜索结果页面 Material Design 美化，并去除侧边栏及广告
// @author       千羽千鹤
// @match        https://www.baidu.com/*
// @grant        none

// ==/UserScript==
/* jshint -W097 */
'use strict';

// Your code here...
function change() {    
    $(".nums_text").not(":contains('幻世中文网')").append('<a style="margin-left: 5px;color: red;" target="_blank" href="https://www.hszw.org">看小说，上幻世中文网</a>');
$(".search_tool_si").not(":contains('幻世中文网')").append('<a style="margin-left: 5px;color: red;" target="_blank" href="https://www.hszw.org">幻世中文网</a>');
    $("#content_left > div").not(".c-container").remove();
    $("#content_right").remove();
    $(".c-container").css("box-shadow","0 2px 2px 0 rgba(0,0,0,.14)");
    $(".c-container").css("padding","16px");
    $(".c-container").css("border-radius","2px"); 
    $("#page > a").css("border-radius","3px");
    $("#page > .n").css("color","#ffffff");
    $("#page > .n").css("background","#3385ff");
    $(".c-container .m:contains('广告')").parent().parent().remove();
}
change();
var ref = "";
ref = setInterval(function(){
    change();
},1000);