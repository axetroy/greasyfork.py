// ==UserScript==
// @name         将京东手机版网页转换为PC版网页
// @author       星雨燃烧
// @namespace    None
// @version      0.11
// @description  将京东手机版分享过来的网页转换为PC版网页
// @author       BloodMoshe
// @match        http://item.m.jd.com/*
// @grant        none
// ==/UserScript==


(function(){
    if  (document.URL.match(/\d+/)>0)
    {
        location.href="http://item.jd.com/"+document.URL.match(/\d+/)+".html";
    }
    })();