// ==UserScript==
// @name         Bilibili番剧显示单集播放次数
// @namespace    http://tampermonkey.net/
// @version      1.5
// @include     http*://www.bilibili.com/bangumi/play/ss*
// @include     http*://www.bilibili.com/bangumi/play/ep*
// @description  看番时让B站显示单集的的播放量
// @author       ementt
// @grant        none
// ==/UserScript==

(function() {
    'use strict';


    var url = 'https://api.bilibili.com/x/web-interface/archive/stat';
    var search = function() {
        var aid = $('.info-sec-av');
        var avid = aid.text().substring(2);
        $.ajax({
            dataType:"JSONP",
            type:"get",
            data:{
                aid: avid,
                jsonp: 'jsonp'
            },
            url:url,
            success:function(response){
                var view = Number(response.data.view);
                if(!view){
                    $('.view-count span').text('--');
                }else if(view < 10000){
                    $('.view-count span').text(view);
                }else{
                    $('.view-count span').text(Math.floor(view/10000) + '万' );
                }
            },
         });
    };
    setTimeout(search, 1000)
    $('.info-sec-av').bind('DOMNodeInserted', search)
})();