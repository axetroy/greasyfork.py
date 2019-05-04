// ==UserScript==
// @name         豆瓣名人相册列表显示大图
// @namespace    http://tampermonkey.net/
// @version      0.1.20171208
// @description  show big image in images list for celebrity on douban
// @author       塞北的雪
// @match        http://movie.douban.com/*/photos/*
// @match        https://movie.douban.com/*/photos/*
// @grant        none
// ==/UserScript==
//TestURL:https://movie.douban.com/celebrity/1274514/photos/?type=C&start=120&sortby=size&size=a&subtype=a

(function() {
    'use strict';
    if($)
    {
        $('.article ul.poster-col3 li div.cover img').each(function(i){
            this.src=this.src.replace('/m/','/raw/').replace('.webp','.jpg');
        });
    }
})();