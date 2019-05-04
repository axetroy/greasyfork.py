// ==UserScript==
// @name         P9新标签打开帖子
// @namespace    undefined
// @version      0.80
// @description  让P9社区点击帖子可以打开新标签
// @author       法爷
// @match        *://*.psnine.com/*
// @grant        none
// ==/UserScript==

(function() {
    document.querySelectorAll('.inner.mt40 a,.inner.mt20 a,.box a,.showbar a').forEach(item => item.setAttribute('target','_blank'));
    document.querySelectorAll('.page a,.inav a').forEach(item => item.removeAttribute('target'));
    function $$(selector, context) {
        context = context || document;
        var elements = context.querySelectorAll(selector);
        return Array.prototype.slice.call(elements);}
    a=$$('ul.list li'); for (var i in a){ link=a[i].getAttribute('onclick'); link = link.split('=')[1]; a[i].setAttribute("onclick", "javascript:window.open("+ link + ", '_blank');");};
})();