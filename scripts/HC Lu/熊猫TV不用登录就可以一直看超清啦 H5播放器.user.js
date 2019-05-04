// ==UserScript==
// @name         熊猫TV不用登录就可以一直看超清啦 H5播放器
// @namespace    http://tampermonkey.net/
// @version      0.7
// @description  不用登录就可以一直看超清啦；启用了H5播放器，妈妈再也不用担flash问题啦；屏蔽了右侧弹幕，不喜欢弹幕的同学再也不用屏蔽啦；直播间列表点击后在新的页面打开直播间
// @author       HC
// @match        http://www.panda.tv/*
// @include        *://www.panda.tv/*
// @grant        none
// ==/UserScript==

(function() {
    localStorage.setItem('panda.tv/user/player', '{"useH5player":true}');
    localStorage.setItem('panda.tv/user/setting','{"forbid_chat_gift":"1","ftq_flash_show":"0","ftq_room_notice":"0","color_speak_card":"0","forbid_flash_gift":"0","chat_msg_color":"","forbid_chat_notice":"1","cate_sort":""}');
    WebSocket = function () {};
})();
$(document).ready(function () {
    var path = window.location.pathname;
    var reg = /[a-zA-Z]+/;    
    if (reg.test(path)) {
        document.querySelectorAll('.video-list-item-wrap').forEach(function (e) {
            e.setAttribute('target', '_blank');
        });        
    }
    delete EventSource;
    PANDA_MONITOR = {
        'commonParams': {}
    };
    
});