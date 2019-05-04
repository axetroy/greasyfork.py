// ==UserScript==
// @name         Mobile zhihu.com restriction remover
// @namespace    http://litpweb.com/
// @version      0.1.1
// @description  去除知乎手机网页版只能查看一个答案全文的限制。
// @author       Tianpeng
// @match        https://www.zhihu.com/question/*
// @require      https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var answers = $("div.RichContent.is-collapsed.RichContent--unescapable.RichContent--withMask");
    answers.removeClass("is-collapsed");
    answers.children("div.RichContent-inner.RichContent-inner--collapsed").removeAttr("style");
})();