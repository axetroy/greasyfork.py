// ==UserScript==
// @name         京东只选自营
// @description  检测京东搜索关键词，自动添加 【自营】，顺便去掉各种返利追踪等尾巴
// @namespace    https://greasyfork.org/zh-CN/scripts/369241
// @version      0.5
// @author       lqzh
// @copyright    lqzh
// @include      http*://search.jd.com/Search?keyword=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var key = getUrlParam('keyword');
    if (key.indexOf("自营")==-1){
        window.location.href= "https://search.jd.com/Search?keyword=" +key +"%20自营" + "&enc=utf-8";
    }
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r != null) {
            return decodeURI(r[2]);
        }
        return null;
    }
})();