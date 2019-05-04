// ==UserScript==
// @name         CSDN 直接阅读全文
// @version      0.3
// @description  替你点阅读全文
// @author       bonboru93
// @match        http://blog.csdn.net/*/article/details/*
// @match        https://blog.csdn.net/*/article/details/*
// @grant        none
// @run-at       document-end
// @namespace https://greasyfork.org/users/208121
// ==/UserScript==

(function() {
    $("div.article_content").removeAttr("style");
    $("#btn-readmore").parent().remove();
})();