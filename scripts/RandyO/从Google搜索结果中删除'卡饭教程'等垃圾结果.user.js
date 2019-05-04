// ==UserScript==
// @name         从Google搜索结果中删除'卡饭教程'等垃圾结果
// @namespace    http://tampermonkey.net/
// @version      0.2.2
// @description  从Google搜索结果中删除'卡饭教程'等
// @author       RandyO
// @include /^https?\:\/\/encrypted.google.[^\/]+/
// @include /^https?\:\/\/www.google.[^\/]+/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var regs = [
        /kafan\.cn/,
        /dongnanshan\.com/,
        /so\.(.)+\.(com|cn)/,
        /hdnkm\.com/,
        /baba100\.com/,
        /link\.nalc\.com\.cn/,
        /www\.yiper\.cn/,
        /www\.xuyich\.com/,
        /hk\.kuaiso\.com/,
        /findeen\.com/,
        /jingyan\.baidu\.com/,
        /jqhnt\.com\.cn/,
        /www\.993113\.cn/,
        /bainei\.com/
    ];
    var divgs = Array.from(document.querySelectorAll('div.g'));
    divgs.forEach(function(div){
        var aNode = div.querySelector('a');
        var href = aNode.getAttribute('href');
        regs.forEach(function(reg){
            if(reg.test(href)){
                div.parentNode.removeChild(div);
            }
        });
    });
})();