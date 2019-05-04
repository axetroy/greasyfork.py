// ==UserScript==
// @name         瓣书
// @namespace    http://cn.sepiggy/
// @version      0.0.2
// @description  提供图书资源地址 (支持 CSDN)
// @author       sepiggy
// @match        *://book.douban.com/subject/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    var csdnURL = "https://download.csdn.net/psearch/0/10/0/2/1/"
    var $bookName = $('h1 span').html();
    var $author = $('#info span:contains("作者") ~ a').html();
    // var queryURL = csdnURL + $bookName + " " + $author;
    var queryURL = csdnURL + $bookName;
    $('#info').append('<span class="pl">下载: </span>');
    $('#info').append('<a href="' + queryURL + '">csdn</a>');
})();
