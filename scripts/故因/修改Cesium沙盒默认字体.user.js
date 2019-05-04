// ==UserScript==
// @name         修改Cesium沙盒默认字体
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Cesium沙盒代码块字体太丑，改为 Fira Code!
// @author       gooin
// @match        https://cesiumjs.org/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    window.setTimeout(function(){
        let codeArea = document.getElementsByClassName('CodeMirror-scroll')
        console.log(codeArea)
        codeArea[0].style.fontFamily='微软雅黑'
        codeArea[0].style.fontFamily='Fira Code'
    },12000)

})();