// ==UserScript==
// @name         咸鱼搜索框 V 2018 12 05
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  咸鱼网页搜索框更新可烦了
// @author       Lengyue
// @match        https://2.taobao.com/*
// @match        https://s.2.taobao.com/*
// @require      https://cdn.bootcss.com/jquery/3.1.1/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var data =`
<style>
@font-face {
font-family: xy-iconfont;
src: url(//at.alicdn.com/t/font_1432608908_2844584.eot);
src: url(//at.alicdn.com/t/font_1432608908_2844584.eot?#iefix) format('embedded-opentype'),url(//at.alicdn.com/t/font_1432608908_2844584.woff) format('woff'),url(//at.alicdn.com/t/font_1432608908_2844584.ttf) format('truetype'),url(//at.alicdn.com/t/font_1432608908_2844584.svg#iconfont) format('svg')
}

.iconfont {
font-family: xy-iconfont;
font-size: 14px;
font-style: normal
}


.idle-search {
position: absolute;
right: 30px;
top: 27px;
width: 222px;
height: 36px;
background-color: #333
}

.input-search {
width: 164px;
height: 32px;
padding: 0 10px;
margin: 0;
border: 0;
outline: 0;
position: absolute;
left: 2px;
top: 2px;
font-size: 13px
}

.btn-search {
display: block;
width: 36px;
height: 36px;
position: absolute;
top: 0;
right: 0;
color: #fff;
background-color: #333;
border: 0;
margin: 0;
padding: 0;
cursor: pointer;
outline: 0
}

.btn-search .iconfont {
font-size: 18px
}

.btn-search .search-img {
position: absolute;
right: -65px;
top: -13px;
display: block;
width: 79px;
height: 60px;
background: url(//gtms02.alicdn.com/tps/i2/TB1VqSxHVXXXXb.XVXXqw4SJXXX-79-60.png) no-repeat 0 0;
_background: 0 0;
_filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='images/', sizingMethod='scale');
zoom:1}</style>

<div class="idle-search">
<form method="get" action="//s.2.taobao.com/list/list.htm" name="search" target="_top">
<input class="input-search" id="J_HeaderSearchQuery" name="q" type="text" value="" placeholder="搜闲鱼" />
<input type="hidden" name="search_type" value="item" autocomplete="off" />
<input type="hidden" name="app" value="shopsearch" autocomplete="off" />
<button class="btn-search" type="submit"><i class="iconfont">&#xe602;</i>
<span class="search-img"></span></button></form></div>`;
    $('.idle-header').append(data);
    $('.navbar-wrap').append(data);
})();