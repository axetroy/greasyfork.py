// ==UserScript==
// @name         破解批改网禁止复制
// @namespace    http://tampermonkey.net/
// @version      1.01
// @description  破解批改网作文区域禁止复制和拖拽的限制
// @author       Swust
// @match        *://www.pigai.org/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var canPaste=false;
    window.onload=function(){
        if($("#titleW"))
        {
            $('#titleW').after("<button id='canPaste'>破解粘贴</button>");
            $('#canPaste').click(function(){
                if(!canPaste){
                    $('#contents').unbind();
                    $('#canPaste').html("破解成功");
                    $('.tips2 li').html("正文已经可以粘贴");
                }
            });
        }
    };
})();