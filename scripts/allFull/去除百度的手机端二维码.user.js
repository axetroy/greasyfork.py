// ==UserScript==
// @name         去除百度的手机端二维码
// @namespace    http://css.thatwind.com/
// @version      1.1
// @description  去除百度首页下方的手机端二维码
// @author       遍智
// @match        *://www.baidu.com/
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';


    document.addEventListener("DOMContentLoaded",go);



    go();


    function go(){
        var x="#qrcode{display:none;}";
        var y=document.createElement('style');
        y.innerHTML=x;
        document.getElementsByTagName('head')[0].appendChild(y);
    }



})();