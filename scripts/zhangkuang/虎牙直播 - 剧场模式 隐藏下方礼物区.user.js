// ==UserScript==
// @name        虎牙直播 - 剧场模式 隐藏下方礼物区
// @description 虎牙直播 - 在虎牙官方现有版本的基础上，增加剧场模式 隐藏下方礼物区
// @namespace   http://www.huya.com/
// @author      ken
// @include     http*://www.huya.com/*
// @version     0.2
// @grant       none
// ==/UserScript==
//.mode-page-theater #J_mainRoom .room-core .room-core-r{display:none !important;}   .mode-page-theater #J_mainRoom .room-core .room-core-l{margin-right:0;}
var style=".mode-page-full .player-full-input{display:block !important;} .mode-page-full #player-gift-wrap,.mode-page-full #player-ctrl-wrap,.mode-page-full #player-wrap{transition: all 300ms ease-in;} ";

var node = document.createElement('style');
node.type='text/css';
node.innerHTML = style;

function displayMode(){
    $("#J_playerMain").mouseover(function(){
        $(".mode-page-full #player-gift-wrap").show();
        $(".mode-page-full #player-wrap").css("height","calc(100% - 60px)");
        $(".mode-page-full #player-ctrl-wrap").show();
    }).mouseout(function(){
        $(".mode-page-full #player-gift-wrap").hide();
        $(".mode-page-full #player-wrap").css("height","100%");
        $(".mode-page-full #player-ctrl-wrap").hide();
    });
}


(function() {
    document.getElementsByTagName('head')[0].appendChild(node);
    var mode=setInterval(function(){
        displayMode();
        if($(".addBtn").length>0){
            clearInterval(mode);
        }
    },500);
})();