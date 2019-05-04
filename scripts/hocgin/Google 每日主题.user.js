// ==UserScript==
// @name           Google 每日主题
// @author         hocgin
// @namespace      https://hocg.in/
// @version        0.1
// @description    Google 主页的主题
// @include        https://www.google.*
// @create         2017年01月29日00:54:22
// @lastmodified   2017年01月29日00:54:30
// @copyright      2017+, _
// @run-at         document-end
// @grant          none
// @note           第一版本只对主界面采用壁纸, 每日一更新
// ==/UserScript==

(function() {
    'use strict';
    var url = window.location.href;
    if(url.indexOf('q=') !== -1){
        return;
    }
    document.body.style.background = 'url("http://www.dujin.org/sys/bing/1920.php")';
    var eFooter = document.getElementById('footer');
    eFooter.style.opacity = '.8';
    console.log("Thx Bing.com");
})();