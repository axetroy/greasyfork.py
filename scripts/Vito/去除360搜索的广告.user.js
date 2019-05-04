// ==UserScript==
// @name          去除360搜索的广告
// @description   去除360搜索页面的广告
// @include       https://www.so.com/*
// @version 0.0.1.20161031082655
// @namespace https://greasyfork.org/users/75930
// ==/UserScript==
function hiddenAd(){
    var ad = document.getElementById("m-spread-left");
    if(ad){
        ad.style.display="none";
    }
}
window.onload=hiddenAd();