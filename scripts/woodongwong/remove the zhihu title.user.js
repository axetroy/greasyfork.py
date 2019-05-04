// ==UserScript==
// @name         remove the zhihu title
// @namespace    https://github.com/woodongwong/
// @version      0.1
// @description  将知乎的醒目标题移除掉！
// @author       woodong wong
// @match        https://www.zhihu.com/question/*
// @grant        none
// ==/UserScript==

(function() {
    var pageHeader = window.document.getElementsByClassName('PageHeader');
    if (pageHeader.length > 0) {
         pageHeader[0].getElementsByClassName('QuestionHeader-title')[0].innerHTML = '';
    }
})();