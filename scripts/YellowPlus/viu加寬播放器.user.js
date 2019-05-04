// ==UserScript==
// @name         viu加寬播放器
// @namespace    https://greasyfork.org/users/179168/
// @version      0.2
// @description  加寬非全螢幕模式下的viu播放器和隱藏水印
// @author       YellowPlus
// @match        https://www.viu.com/ott/hk/zh-hk/vod/*
// @grant        none
// @require      https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    $(document).ready(function(){
        $(".v-player").width(1170).height(658);
        $(".video-grid-s .video-cmd").parent().parent().prepend($(".v-player-list"));
        $(".fp-play-now").css("visibility", "hidden");
    });
})();