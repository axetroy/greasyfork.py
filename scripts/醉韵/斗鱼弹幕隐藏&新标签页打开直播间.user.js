// ==UserScript==
// @name        斗鱼弹幕隐藏&新标签页打开直播间
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  try to take over the world!
// @author       You
// @match        http://www.douyu.com/*
// @match        https://www.douyu.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

   $('#js-chat-cont').hide();
   $('.comment_list a.url').attr({target:"_blank"}); 


})();