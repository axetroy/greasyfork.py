// ==UserScript==
// @name         巴哈姆特找回消失的公會按鈕
// @namespace    http://www.isaka.idv.tw/
// @version      0.1
// @description  讓消失的公會按鈕回來！
// @author       Isaka(jason21716@巴哈姆特)
// @match        https://*.gamer.com.tw/*
// @grant        GM_xmlhttpRequest
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

(function() {
    'use strict';

    $('.TOP-my ul').prepend('<li><a id="topBar_guild" href="javascript:TOPBAR_show(\'guild\', \'\')"><img src="https://i2.bahamut.com.tw/top_icon1.png"></a></li>');
})();