// ==UserScript==
// @name         hupu拉黑
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  屏蔽特定用户主帖与回帖。fuck'em all!!!
// @author       Izzy
// @match        https://bbs.hupu.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var blacklist = ['出生没见过利物浦夺冠'];
    // 主帖
    $('.for-list li').each(function(index, li) {
        var $li = $(li);
        var author = $li.find('a.aulink').text();
        if (blacklist.indexOf(author) !== -1) {
            console.log('hupu black list: ', author, $li.find('.titlelink a').text());
            $li.hide();
        }
    });
    // 回帖
    $('.floor').each(function(index, floor) {
        var $floor = $(floor);
        var author = $floor.find('.u').eq(0).text();
        if (blacklist.indexOf(author) !== -1) {
            console.log('hupu black list: response', author);
            $floor.hide();
        }
    });
})();