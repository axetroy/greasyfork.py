// ==UserScript==
// @name         论坛导读隐藏指定板块
// @namespace    https://greasyfork.org/zh-CN/users/141921
// @version      0.1
// @description  论坛导读隐藏指定板块，如隐藏吾爱破解论坛导读中的投诉举报区和证据区
// @author       Vinx
// @include      http://*/forum.php?mod=guide&view=*
// @include      https://*/forum.php?mod=guide&view=*
// @require      https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js
// @grant        none
// ==/UserScript==

var Boards = {
  'www.52pojie.cn': [
	"投诉举报区",
	"证据区",
	"水漫金山",
	"影视推荐",
  ],
  'wuyou.net': [
	"超级灌水区",
  ]

};

(function() {
    'use strict';
    var J;
    if (typeof jQuery != 'undefined') {  //避免与原网页中的Jquery冲突
        J = jQuery.noConflict(true);
    }

    var board = Boards[window.location.host];

    J("tbody[id^='normalthread_']").each(function(index,element){
        for(var i = 0; i < board.length; i++)
        {
            if(J(element).find(".by a").text().indexOf(board[i]) >= 0)
            {
                J(element).hide();
            }
        }
    });
    // Your code here...
})();