// ==UserScript==
// @name         B站获取视频作品封面
// @namespace    https://zhang18.top
// @version      0.1
// @description  收集B站舞蹈小姐姐高清封面照片，添加查看封面按钮,打开右键另存就行，支持新旧版B站
// @author       ZLOE
// @match       https://www.bilibili.com/video/*
// @grant        none
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';
    window.setTimeout(function(){
        var img_url = $('meta[itemprop="thumbnailUrl"]').attr("content")
        //旧版
        var text = $(".trynew-btn").text()
        console.log(img_url)
        if (text == '试用新版'){
            $('.bilibili-player-video-btn-send').after('<div class="bpui-button" style="position: relative;top: 4px;height: 28px;margin-right: 10px;"><a href="'+img_url+'" style="line-height: 28px;color: white;" download="IMG" target="_blank">查看封面 ></a></div>');
        }
        else {
        //新版
        $('.bilibili-player-video-danmaku-root').css({'margin-left':'-40px',})
        $('.bilibili-player-video-btn-send').after('<div class="bilibili-player-video-btn-send  down_img" style="margin-left: 3px;background-color: rgb(0, 161, 214);"><a href="'+img_url+'" style="line-height: 28px;color: white;" download="IMG" target="_blank">查看封面</a></div>');
        }
    }, 2000);



    // Your code here...
})();