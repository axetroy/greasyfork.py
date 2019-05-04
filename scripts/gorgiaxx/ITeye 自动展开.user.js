// ==UserScript==
// @name         ITeye 自动展开
// @namespace    iteye
// @version      0.1
// @description  ITeye 自动展开阅读
// @author       gorgias
// @match        *://*.iteye.com/blog/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var iteye = setInterval(function(){
        document.getElementById('btn-readmore').click()
    }, 100);
})();