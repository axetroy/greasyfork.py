// ==UserScript==
// @name         解除Steam商店、社区的百度云链接屏蔽限制
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  解除Steam商店、社区等的百度云链接屏蔽限制
// @author       Garen
// @match        https://store.steampowered.com/app/*
// @match        https://steamcommunity.com/id/*/recommended/*
// @match        https://steamcommunity.com/profiles/*/recommended/*
// @match        https://steamcommunity.com/app/*/reviews/*
// @grant        none
// ==/UserScript==

setInterval(function(){
    var arr = document.getElementsByClassName('collapsed_link');
    for(var i = 0,len = arr.length; i < len; i++){
        if(arr[i].style.display == "none"){
            arr[i].setAttribute('style', 'display:inline-block;color:#40E0D0;');
        }
    }
}, 1000);