// ==UserScript==
// @name         NGA强制新页面打开
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  实现NGA强制新页面打开的功能
// @author       Chikan
// @match        http://*.178.com/*
// @grant        none
// @require https://code.jquery.com/jquery-2.1.4.min.js
// ==/UserScript==
(function() {
    $('a').each(function(){
        if($(this).hasClass('topic')){
            $(this).attr('target','blank')
        }
    })