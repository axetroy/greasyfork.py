// ==UserScript==
// @name         这TM还叫贴吧？
// @namespace    https://greasyfork.org/scripts/23127
// @homepageURL  https://greasyfork.org/scripts/23127
// @version      0.9
// @description  去除PC贴吧帖子列表会自动播放的视频
// @author       dazzulay
// @match        *://tieba.baidu.com/f?*
// @grant        none
// ==/UserScript==

$(function(){
    var video_ad_counter = 0;
    var video_ad = setInterval(function(){
        // 20160911 PC贴吧视频贴广告
        /*
        var $ad_li = $('.j_m_flash[data-isfive="1"]').closest('.j_thread_list');
        if($ad_li.length>0){
            $ad_li.remove();
            clearInterval(video_ad);
            return false;
        }
        */
        // 20160911 PC贴吧自动播放的视频
        var $ad_li = $('a[data-video]');
        if($ad_li.length>0){
            $ad_li.remove();
            clearInterval(video_ad);
            return false;
        }
        ++video_ad_counter;
        if(video_ad_counter>10){
            clearInterval(video_ad);
            return false;
        }
    },200);
});