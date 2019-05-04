// ==UserScript==
// @name         EFLession循环播放脚本
// @namespace    com.uestc.rjw
// @version      0.1
// @encoding    utf-8
// @description  EFLession课程中心循环播放脚本
// @author       rjw
// @include      http://www.englishtown.cn/community/dailylesson/lesson.aspx*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    setInterval(function(){
        var repeats = document.getElementsByClassName('repeatBtn');
        if(repeats != undefined && repeats.length > 0){
            repeats[0].click();
        }
    }, 10000);
})();