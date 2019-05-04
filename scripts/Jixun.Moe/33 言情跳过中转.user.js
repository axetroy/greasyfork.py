// ==UserScript==
// @name         33 言情跳过中转
// @namespace    moe.jixun.123yq
// @version      1.0.3
// @description  跳过中转页，直达目录页。
// @author       Jixun
// @include      http://www.33yq.com/xiaoshuo_*.html
// @include      http://www.33yq.org/xiaoshuo_*.html

// @include      http://www.33yq.com/read/*
// @include      http://www.33yq.org/read/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
    var id = location.pathname.match(/\d+/)[0];
    if (location.pathname.indexOf('/xiaoshuo') === 0) {
        // http://www.123yq.org/read/../id/
        location.pathname = '/read/' + id.slice(0, 2) + '/' + id;
    }

    addEventListener('DOMContentLoaded', function () {
        [].forEach.call(document.getElementsByTagName('a'), function (a) {
            a.removeAttribute('target');
        });
    }, false);

    var s  = '#intro > p:not(.introtxt) { display: none } \n';
    s     += '.introtxt { font: 11pt "Microsoft YaHei UI"; height: 13em; line-height: 1.7; }';
    var style = document.createElement('style');
    style.textContent = s;
    document.head.appendChild(style);
})();
