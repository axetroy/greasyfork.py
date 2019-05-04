// ==UserScript==
// @name         斗鱼广告屏蔽
// @namespace    http://tampermonkey.net/
// @version      0.0.2
// @description  屏蔽部分斗鱼直播间广告
// @author       You
// @match        *://www.douyu.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var hidden_arr = new Array(
        ".room-ad-top",
        ".sq-wrap",
        ".no-login",
        ".chat-ad",
        ".fishop-anchor-recommands-box.expanded",
        //"#js-fans-rank",
        ".ft-sign-cont",
        ".tab-header",
        ".tab-body",
        "#js-chat-right-ad",
        ".column.rec",
        ".room-ad-video-down",
        ".room-ad-bottom",
        ".third-games-entry"
    );

    for (var i = 0; i < hidden_arr.length; i++){
        $(hidden_arr[i]).css("display", "none");
    }


})();