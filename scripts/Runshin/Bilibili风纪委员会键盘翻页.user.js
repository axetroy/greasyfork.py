// ==UserScript==
// @name         Bilibili风纪委员会键盘翻页
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  使用键盘左右方向键对Bilbili风纪委员会被举报评论翻页。
// @author       Runshin
// @match        https://www.bilibili.com/judgement/vote*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.addEventListener('keyup', function(e){
        if(e.keyCode == 37){
            document.querySelector('a.prev').click();
        } else if(e.keyCode == 39){
            document.querySelector('a.next').click();
        }
    });
})();