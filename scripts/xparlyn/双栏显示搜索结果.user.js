// ==UserScript==
// @name        双栏显示搜索结果
// @namespace   none
// @description 双栏显示baidu, sogou, so, google, bing的搜索结果
// @version     1.9.3
// @include     *://www.baidu.com/*
// @include     *://www.sogou.com/*
// @include     *://www.so.com/*
// @include     *://www.google.*/*
// @include     *://*.bing.com/*
// @grant       none
// @run-at      document-start
// ==/UserScript==

(function () {
    'use strict';
    var domURL = document.URL;
    var element = document.createElement('style');
    var fontStr = ':not([class*=icon]):not([class*=fa]):not([class*=logo]):not(i):not(strong):not(button){font-family:"Microsoft YaHei","Arial"}';
    if (domURL.indexOf('baidu.com') !== - 1) {
        element.innerHTML = '#content_right{display:none}.container_l{width:99vw !important}#content_left{width:90vw !important}.c-container{float:left;width:47%;margin-right:25px;}';
    }
    if (domURL.indexOf('sogou.com') !== - 1) {
        element.innerHTML = '#right{display:none}#main,.results{min-width:90vw !important;max-width:90vw !important;padding-right:0 !important;}.results>div{float:left;width:47% !important;margin-right:25px;}';
    }
    if (domURL.indexOf('so.com') !== - 1) {
        element.innerHTML = '#side{display:none}#main{width:90vw !important}.res-list{float:left;width:47%;margin-right:25px;}'
    }
    if (domURL.indexOf('google') !== - 1) {
        element.innerHTML = '#rhscol{display:none}#cnt #center_col{width: 90vw !important;}.g,g-section-with-header,.xERobd{float: left;width: 47% !important;margin: 0 0 28px 0 !important;}.mR2gOd{width:95%}.COEoid{margin: -4px 0 !important;}.k2Oeod.eSq3C{right:18px !important;}.g>div,.g>g-section-with-header{width:95%;}.P1usbc{display:none !important}#tw-container,#tw-container ~ .di8g3{width:90%}#brs .med{width:200px}#cnt #foot{width:1px !important}.vk_c{border: 0px solid #dfe1e5 !important;}'
    }
    if (domURL.indexOf('bing.com') !== - 1) {
        element.innerHTML = '#b_context{display:none}#b_results,#b_header{width:93vw}#b_results>li{float:left;width:45%;}#b_results>.b_msg,#b_results>.b_ans{float:none}'
    }
    element.innerHTML += fontStr;
    document.documentElement.appendChild(element);
}) ();
