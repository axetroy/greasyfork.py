// ==UserScript==
// @name         锁定旧版B站播放器
// @namespace    http://tampermonkey.net/
// @version      1.2.0
// @description  锁定旧版B站播放器，禁止B站修改为新版播放器;
// @author       过去终究是个回忆
// @license      MIT
// @include      *://www.bilibili.com/video/av*
// @include      *://www.bilibili.com/bangumi/play/ep*
// @include      *://www.bilibili.com/bangumi/play/ss*
// @include      *://bangumi.bilibili.com/anime/*
// @include      *://bangumi.bilibili.com/movie/*
// @include      *://www.bilibili.com/bangumi/media/md*
// @include      *://www.bilibili.com/blackboard/html5player.html*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function getCookie(name) {
        var reg = "(^| )"+name+"=([^;]*)(;|$)",
            arr=document.cookie.match(new RegExp(reg,"g"));
        if(arr)
            return unescape(arr.pop().match(new RegExp(reg))[2]);
        else
            return null;
    }

    function setCookie(name,value, Days = 30, content = ""){
        var exp = new Date();
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString() + content;
    }

    function lockVersion() {
        if(getCookie("stardustvideo") !== "-1") {
            setCookie("stardustvideo", "-1", 365, ";domain=.bilibili.com;path=/");
            window.location.reload();
        }
    }

    function hideBtn() {
        var style = document.createElement("style");
        style.type = "text/css";
        style.innerHTML="#entryNew{ display: none!important; }";
        document.head.appendChild(style);
    }

    lockVersion();
    hideBtn();

})();