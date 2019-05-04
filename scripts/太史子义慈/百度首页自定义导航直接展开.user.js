// ==UserScript==
// @name         百度首页自定义导航直接展开
// @namespace    qs93313@sina.cn
// @version      0.11
// @description  就是百度首页自定义导航直接展开啊
// @author       太史子义慈
// @match        *://*.baidu.com/*
// @match        *://*.baidu.com
// @grant        none
// ==/UserScript==

window.onload = function(){
    var s_main = document.querySelector("#s_main");
    if(s_main){
        var s_more_bar = document.getElementsByClassName("s-more-bar")[0];
        s_more_bar.click();
    }
};