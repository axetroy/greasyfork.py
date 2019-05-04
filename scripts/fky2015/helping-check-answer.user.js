// ==UserScript==
// @name         helping-check-answer
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  形势政策答题查询
// @author       FKYnJYQ
// @match        http://xg.info.bit.edu.cn/dangke/mod/quiz/attempt.php?attempt=*
// @grant        none
// @require    http://code.jquery.com/jquery-1.11.0.min.js
// ==/UserScript==

(function() {
    'use strict';
var st = $('.qtext').html();
window.open('https://www.baidu.com/s?wd='+st);
})();