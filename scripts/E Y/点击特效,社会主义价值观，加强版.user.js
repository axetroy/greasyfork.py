// ==UserScript==
// @name         点击特效,社会主义价值观，加强版
// @namespace    http://tampermonkey.net/
// @version      0.38
// @description  1.随机颜色(可定制),2.随机大小(可定制),3.自动判断并引入jQuery,4.其他自定义
// @author       Cherry
// @match        http*
// @include      *
// @exclude      /(^[^:\/#\?]*:\/\/([^#\?\/]*\.)?xui\.ptlogin2\.qq\.com(:[0-9]{1,5})?\/.*$)/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';//说明:非原创,只是完善改进(我是在CSDN复制并加已修改的),
    //^(?!.*graph\.qq\.com).*$
    
    var T_color = "";//字体颜色,你不设置就是随机颜色,
    
    var T_size = [15,18];//文字大小区间,不建议太大
    
    var T_font_weight = "bold";//字体粗斜度-->normal,bold,900
    
    var AnimationTime = 1500;//文字消失总毫秒
    
    var Move_up_Distance = 180;//文字移动距离,正数代表上移，反之下移
    
    
    var URL = window.location.href;
    var i = URL.search("/graph\.qq\.com/");
    if(i!=-1){
        console.log("error");
        return;
    }

    if(typeof jQuery == 'undefined'){//很奇怪"百度知道"为毛没有引入jQuery
        var scr = document.createElement("script");
        scr.src = "https://code.jquery.com/jquery-latest.js";//-->need https
        scr.charset = "utf-8";
        scr.type = "text/javascript";
        //document.documentElement.appendChild(scr);//-->error
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(scr);
    }
    //
    setTimeout(function timer() {
            createSpecialEffects();

    },777);
    //
    //
    function createSpecialEffects(){
        try{
            $(document).ready(function(){});
           }catch(err){
            return;
        }
        var a_index = 0;
        $("html").click(function(e){
            var a = new Array("富强", "民主", "文明", "和谐", "自由", "平等", "公正" ,"法治", "爱国", "敬业", "诚信", "友善");
            var $i = $("<span/>").text(a[a_index]);
            a_index = (a_index + 1) % a.length;
            var x = e.pageX,y = e.pageY;
            var x_color =  "#" + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);//-->随机颜色
            //console.log(x_color);
            if(T_color.length>=4){
                x_color = T_color;
            }
            
            var x_size = Math.random()*(T_size[1]-T_size[0]) + T_size[0];
            x_size +=  "px";
            
            $i.css({
                "z-index": 99999,
                "top": y - 20,
                "left": x,
                "position": "absolute",
                "font-weight": "bold",
                "font-size":x_size,
                "color": x_color
            });
            $("html").append($i);
            $i.animate({"top": y-Move_up_Distance,"opacity": 0},AnimationTime,function() {
                $i.remove();
            });
        });
    }
    //



})();