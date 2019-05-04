// ==UserScript==
// @name         极客时间视频自动切换高清并播放
// @namespace    shjanken
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://time.geekbang.org/course/detail/77-*
// @grant        none
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

(function() {
    'use strict';

    $(document).ready(function() {
        $('.dplayer-quality-item').ready(function(){
            setTimeout(function(){
                $('.dplayer-quality-item')[1].click();
            },2000);
        });
    });
})();