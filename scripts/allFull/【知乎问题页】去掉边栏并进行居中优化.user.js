// ==UserScript==
// @name         【知乎问题页】去掉边栏并进行居中优化
// @namespace    http://css.thatwind.com/
// @version      1.1
// @description  去掉知乎问题页侧边栏并进行界面居中优化
// @author       遍智
// @match        *://www.zhihu.com/question/*
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';


    document.addEventListener("DOMContentLoaded",go);

    

    go();


    function go(){
        var x="div.Question-mainColumn{margin: auto !important;width: 100% !important;}div.Question-sideColumn,.Kanshan-container{display: none !important;}figure{max-width: 70% !important;}.RichContent-inner{line-height: 30px !important;margin: 40px 60px !important;padding: 40px 50px !important;border: 6px dashed rgba(133,144,166,0.2) !important;border-radius: 6px !important;}.Comments{padding: 12px !important;margin: 60px !important;}";
        var y=document.createElement('style');
        y.innerHTML=x;
        document.getElementsByTagName('head')[0].appendChild(y);
    }



})();