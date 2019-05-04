// ==UserScript==
// @name         虎牙TV自动领取礼物
// @namespace    https://greasyfork.org/
// @version      1.0
// @description  实现虎牙TV自动挖宝
// @author       LEI
// @match        https://www.huya.com/*
// @grant        none
// ==/UserScript==

window.setInterval(function() {
    var btns = document.getElementsByClassName('player-box-stat3');
    for(var i=0;i<btns.length;i++){
        var btn = btns[i];
        if(btn.style.visibility=="visible"){
            btn.click();
            document.getElementById("player-box").style.display="none";
           }
    }
}, 60000);