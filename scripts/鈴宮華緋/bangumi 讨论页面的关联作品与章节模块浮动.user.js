// ==UserScript==
// @name         bangumi 讨论页面的关联作品与章节模块浮动
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  讨论页面的关联作品与章节模块浮动
// @author       You
// @include      /https?:\/\/(bgm\.tv|bangumi\.tv|chii\.in)\/((ep|blog)|(subject\/topic))/
// @grant        none
// ==/UserScript==

(function() {
    let columnB = $('#columnEpB').length ? $('#columnEpB') : ($('#columnB').length ? $('#columnB') : ($('#columnInSubjectB').length ? $('#columnInSubjectB') : null) );
    let top = columnB.offset().top - 51 - 10;
    console.log(columnB);
    function tofixed() {
        if($(window).scrollTop() >= top) {
            columnB.css({
                position : 'fixed',
                top : '52px',
                left : $('div.columns').offset().left + $('div.columns').children('div:first-child').outerWidth(true),
            });
        } else {
            columnB.css({
                position : 'relative',
                top : 'auto',
                left : 'auto',
            });
        }
    }
    $(window).ready(function() {
        tofixed();
    });
    $(window).scroll(function() {
        tofixed();
    });
    $(window).resize(function() {
        tofixed();
    });
})();