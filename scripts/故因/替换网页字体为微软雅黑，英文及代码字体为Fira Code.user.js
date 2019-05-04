// ==UserScript==
// @name         替换网页字体为微软雅黑，英文及代码字体为Fira Code
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  替换网页字体为微软雅黑，代码字体为Fira Code
// @author       gooin@outlook.com
// @include     	http://*
// @include			https://*
// @grant        none
// @run-at			document-idle
// ==/UserScript==

(function() {
    'use strict';

    let bodyEle = document.getElementsByTagName('body')
    bodyEle[0].style.fontFamily="微软雅黑"
    bodyEle[0].style.fontFamily="Fira Code"
    let codeEle = document.getElementsByTagName('code')
    for(let code of codeEle){
        code.style.fontFamily="Fira Code"
    }
    let preEle = document.getElementsByTagName('pre')
    for(let code of preEle){
        code.style.fontFamily="Fira Code"
    }
})();