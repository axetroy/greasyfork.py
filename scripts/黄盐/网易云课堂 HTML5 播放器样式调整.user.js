// ==UserScript==
// @name         网易云课堂 HTML5 播放器样式调整
// @namespace    https://greasyfork.org/zh-CN/users/104201
// @version      0.1
// @description  配合[视频站启用html5播放器使用],播放器不会出现滚动条,并且有控制按钮
// @author       黄盐
// @match        http://study.163.com/course/courseLearn.htm*
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    var GM_t = setInterval(function(){
        if(document.getElementsByTagName('video').length>0){
            window.clearInterval(GM_t);
            var ele = document.getElementById('lesson-learn-box');
            var style = window.getComputedStyle(ele) || ele.currentStyle;
            var GM_t2 = setInterval(function(){
                if(parseInt(style.height) > 200){
                    window.clearInterval(GM_t2);
                    GM_addStyle(`video{height:${parseInt(style.height)-5}px !important;width:auto !important;}`);
                    var a = document.getElementsByTagName('video');
                    a[0].setAttribute('controls','controls');
                }
                console.log('processing......');
            },500);
        }
    },500);

    // Your code here...
})();