// ==UserScript==
// @name         QQ音乐付费音乐流畅版本下载
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  再收费歌曲听歌页面有个纯净下载
// @author       海绵宝宝
// @match        https://y.qq.com/portal/player.html
// @require       http://cdn.bootcss.com/jquery/1.11.1/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var k={};
    function p()
    {
        var url=$("source").attr("src");
        $("div[class='mod_songlist_toolbar']").append('<a href="'+url+'" class="mod_btn" download="门票p"><i class="mod_btn_green__icon_down"></i>纯净下载<span class="mod_btn__border"></span></a>');
    }
    k=function()
    {
        var y=$("#h5audio_media").text();
        if(!y)
        {
            var t=document.getElementsByTagName("a");//.click();
            for(var h=0; h<t.length;h++)
            {
                if(t[h].getAttribute("id")=="btnplay")
                {
                    t[h].click();
                }
            }
            setTimeout(p,3000);
        }
        else
        {alert(y);}
    };
    setTimeout(k,2000);
    // Your code here...
})();