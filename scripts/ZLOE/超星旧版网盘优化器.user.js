// ==UserScript==
// @name         超星旧版网盘优化器
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  为什么要优化旧版呢，因为新版不支持超清视频，而且播放器巨差。
// @author       ZLOE https://zhang18.top
// @match        *pan.ananas.chaoxing.com/*
// @grant        none
// @require https://cdn.bootcss.com/dplayer/1.25.0/DPlayer.min.js
// @require https://cdn.jsdelivr.net/npm/hls.js

// ==/UserScript==

(function() {
    'use strict';

    function Dp(){
        try{
            var type = data.http.split('.')[4];
            if (type=='jpg' || type == 'png'){
                console.log("图片")
            }
            else{
                $('div').remove();
                $('body').before("<div id='Dp' style='max-width: 960px;height: 620px;margin: 0 auto;'></div>")
                const dp = new DPlayer({
                    container: document.getElementById('Dp'),
                    autoplay: true,
                    video: {
                        quality: [{
                            name: '超清',
                            url: data.httphd,
                            type: 'auto'
                        }, {
                            name: '标清',
                            url: data.http,
                            type: 'auto'
                        }],
                        defaultQuality: 0,
                    }
                });
            }
        }catch(err){
            $('div').remove();
                $('body').before("<div id='Dp' style='    max-width: 960px;height: 620px;margin: 0 auto;'></div>")
                const dp = new DPlayer({
                    container: document.getElementById('Dp'),
                    autoplay: true,
                    video: {
                        url: data.download,
                        type: 'auto',
                    }});
        }
    }

    function addCssFile(){
        var css = document.createElement("link");
        css.setAttribute("rel", "stylesheet");
        css.setAttribute("type", "text/css");
        css.setAttribute("href", "https://syrme.top/static/DPlayer.min.css");
        css.onload = function(){ }
        document.getElementsByTagName("head")[0].appendChild(css);
    }

    function Rmove(){
        $('#filelist').attr('class','list-list');
    }

    // 主程序
    var number = window.location.href.length;
    if (number>32){
        addCssFile()
        Dp()
    }
    else{
        Rmove()
    }

    // Your code here...
})();