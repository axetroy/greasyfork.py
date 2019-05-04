// ==UserScript==
// @name         去除贴吧#滑稽godie#活动标签
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description 去除贴吧#滑稽godie#活动标签 ，替换#滑稽 go die#为滑稽表情，滑稽图片链接为滑稽吧吧头像
// @author       You
// @match        http://tieba.baidu.com/*
// @grant        none
// ==/UserScript==



(function(){
    var strHTML=window.document.body.innerHTML;

    //用于匹配的正则表达式
    var strMatch={
        xz:/#滑稽go die#<\/a>/g
    };

    //用于替换的滑稽表情图片链接
    var strURL=[]; 
    strURL.xz="</a><img src='https://ss0.baidu.com/6LZXsjikBxIFlNKl8IuM_a/tb/0861f65d.jpg' size='5207' width='36' height='36'>";


   strHTML = strHTML.replace(strMatch.xz,strURL.xz);

    window.document.body.innerHTML=strHTML;
})();
