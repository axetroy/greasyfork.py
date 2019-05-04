// ==UserScript==
// @name         旺铺详情页编辑器修改视频名称
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  旺铺详情页编辑器修改视频名称,自动去掉禁止修改属性。
// @author       kinrt
// @match        *://xiangqing.wangpu.taobao.com/*
// @grant        none
// ==/UserScript==

(function() {
    function removeDisable() {
        var elements = document.querySelectorAll("input");
        for(var i=0;i<elements.length;i++){
            elements[i].removeAttribute("disabled");
        }
    }
    var t1 = window.setInterval(removeDisable,10);
})();