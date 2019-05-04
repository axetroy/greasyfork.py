// ==UserScript==
// @name         Facebook Alt+Q 回首頁
// @version      1.1.3
// @description Facebook Alt+Q 回首頁，適用於任何Facebook子網域，直接回到Facebook首頁。
// @namespace     haer0248
// @homepage      https://home.gamer.com.tw/haer0248
// @author       Michael Lin
// @match        https://www.facebook.com/*
//@include       https://www.facebook.com/*
//@include       https://m.facebook.com/*
//@include       https://facebook.com/*
//@include       https://developers.facebook.com/*
//@include       https://business.facebook.com/*
//@include       http://www.facebook.com/*
//@include       http://m.facebook.com/*
//@include       http://facebook.com/*
//@include       http://developers.facebook.com/*
//@include       http://business.facebook.com/*
// @run-at        document-start
// @grant        none
// ==/UserScript==

/**************************************************************

     需要增加網址或變更請增加/更改上方的 @include       <網址>

***************************************************************/
(function() {
    'use strict';
    document.onkeydown=function(event){
        var e = event || window.event;
        if (e.keyCode == 81 && e.altKey) {
            location.href ='https://www.facebook.com/';
        }
    }
})();