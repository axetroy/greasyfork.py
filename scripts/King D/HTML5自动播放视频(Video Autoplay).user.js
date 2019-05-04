// ==UserScript==
// @name         HTML5自动播放视频(Video Autoplay)
// @version      0.2
// @description  模拟Youtube效果，访问页面时自动播放<video>视频。
// @author       DKing
// @match        http://*/*
// @match        https://*/*
// @include      http://*/*
// @include      https://*/*
// @grant        none
// @namespace dking.com
// ==/UserScript==

var videos = document.getElementsByTagName('video');

var wait4load = setInterval(function(){
        if(document.visibilityState == 'visible' && videos.length > 0){
            clearInterval(wait4load);
            for(var idx =0;i++;i< videos.length){
                videos[idx].play();
            }
        }
},200);
