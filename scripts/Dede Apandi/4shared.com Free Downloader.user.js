// ==UserScript==
// @name        4shared.com Free Downloader
// @namespace   BlackMac
// @Author      Shivesh96
// @description Auto Generate to 4server.info. thanks @Shivesh96
// @icon http://imag.malavida.com/mvimgbig/download-s/4shared-10666-0.jpg
// @include     http://www.4shared.com/android/*
// @include     http://www.4shared.com/archive/*
// @include     http://www.4shared.com/file/*
// @include     http://www.4shared.com/get/*
// @include     http://www.4shared.com/mobile/*
// @include     http://www.4shared.com/mp3/*
// @include     http://www.4shared.com/music/*
// @include     http://www.4shared.com/office/*
// @include     http://www.4shared.com/photo/*
// @include     http://www.4shared.com/rar/*
// @include     http://www.4shared.com/video/*
// @include     http://www.4shared.com/zip/*
// @include     http://www.4shared.com/mobile/*
// @version     1.0.5
// @grant       none
// ==/UserScript==

if (document.domain ="4shared.com")
 {
   var urlArray = window.location.href.split('/');
   var url="";
   for(var i = urlArray.length-1; i>2; i--)
     {
       url = urlArray[i]+"/"+url;
     }
   window.location.href="http://4shared.adlwap.com/"+url;
 }