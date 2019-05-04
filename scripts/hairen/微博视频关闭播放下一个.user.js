// ==UserScript==
// @name         微博视频关闭播放下一个
// @version      1.0.3
// @description  微博视频自动播放
// @include      http*://weibo.com/tv/*
// @match        http*://weibo.com/tv/*
// @run-at       document-start
// @grant        unsafeWindow
// @license      MIT
// @namespace https://greasyfork.org/users/177790
// ==/UserScript==

(function() {
    setTimeout(function(){
        if($CONFIG.islogin==0){
               document.querySelector(".wb_tv_switch> input[type='checkbox']").remove();
           }
    } ,3000);
})();