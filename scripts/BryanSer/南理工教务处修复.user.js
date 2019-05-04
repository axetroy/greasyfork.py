// ==UserScript==
// @name         南理工教务处修复
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  修复南京理工大学教务处教评无法弹出窗口的BUG 以及成绩认定处 无法滚动的问题
// @author       Bryan_lzh
// @include      *://202.119.81.11*:9080/*
// @grant        none
// @supportURL   https://github.com/BryanSer/NJUST-jwc-repair/issues
// ==/UserScript==

(function() {
    'use strict';
    window.showModalDialog = function(URL,name,specs){
        window.open(URL,name,specs,null);
    };
    var leftf = document.getElementById("leftFrame")
    if(leftf != undefined){
        leftf.scrolling = "yes";
    }
})();