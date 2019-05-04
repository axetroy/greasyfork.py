// ==UserScript==
// @name         NoInstallAxureRP
// @namespace    NoInstallAxureRP
// @version      0.4
// @description  去掉chrome浏览器打开Axure生成的原型文件自动跳转
// @author       _ihhu
// @match        file:///*
// ==/UserScript==

(function() {
    'use strict';
    if(window.top!==window){
        return;
    }
    document.body.setAttribute("pluginDetected",true)
    // Your code here...
})();