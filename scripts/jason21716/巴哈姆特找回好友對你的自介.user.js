// ==UserScript==
// @name         巴哈姆特找回好友對你的自介
// @namespace    http://www.isaka.idv.tw/
// @version      0.1
// @description  讓消失的好友對你的自介回來！
// @author       Isaka(jason21716@巴哈姆特)
// @match        https://home.gamer.com.tw/*
// @grant        GM_xmlhttpRequest
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

(function() {
    'use strict';
    var selfDOM = $('.nav-member_imgbox img').attr('src');
    var regular_controller = /https:\/\/avatar2\.bahamut\.com\.tw\/avataruserpic\/\w\/\w\/(\w+)/g
    var selfDOMMatch = regular_controller.exec(selfDOM);s
    $('#BH-main_menu ul li:nth-child(5)').after('<li onmouseover="breadCrumbs_listMenu2(114, \'homeuid='+selfDOMMatch[1]+'\')"><a href="friend_2Me.php" undefined>好友自介</a></li>');
})();