// ==UserScript==
// @name         虎牙去除全屏礼物
// @namespace     none
// @version      0.2
// @description  原版为z.houbin的虎牙清爽版，修改：1.不隐藏周榜，2.全屏时根据鼠标移出和移入显示声音弹幕播放控制条，3.部分直播间顶部有推荐图，隐藏推荐图并调整播放器位置。（背景图为我自己添加，若不需要注释掉即可）
// @author       fengsy
// @match        *://www.huya.com/*
// @grant        none
// ==/UserScript==

(function () {
    let css = '#player-gift-wrap{display:none !important;height:0 !important}';//底部礼物
    css += '.player-wrap{height:100% !important}';//视频播放高度修正
    css += '.player-ctrl-wrap{bottom:0px !important}';//视频播放高度修正
    //css += '#J-weekRank{display:none !important;}';//周榜
    css += '#chatRoom{height:70% !important;}';//修正评论高度
    css += '#chatRoom > div{height:100% !important;}';//修正评论高度
    css += '.msg-nobleEnter{display:none !important;height:0px !important}';//进入直播间
    css += '#system-warnTips{display:none !important;height:0px !important}';//
    css += '.tit-h-send{display:none !important;height:0px !important}';//礼物
    css += '.room-footer{display:none !important;height:0px !important}';//动态

    loadStyle(css);
    displayMode();
    hideTop();

    function loadStyle(css) {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.rel = 'stylesheet';
        style.appendChild(document.createTextNode(css));
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(style);
    }
    //鼠标移入移出显示播放器控制条
    function displayMode(){
        $("#J_playerMain").mouseover(function(){
            $(".mode-page-full #player-ctrl-wrap").show();
            $(".mode-page-full #player-wrap").css("height","100%");
            $(".mode-page-full #player-ctrl-wrap").show();
        }).mouseout(function(){
            $(".mode-page-full #player-ctrl-wrap").hide();
            $(".mode-page-full #player-wrap").css("height","100%");
            $(".mode-page-full #player-ctrl-wrap").hide();
        });
    }
    //根据直播间是否有顶部推荐图，隐藏推荐图
    function hideTop(){
        if(document.getElementById("J_spbg"))
        {
           // document.getElementById("main_col").style.backgroundColor='#000000';
            //如不需要背景图，注释下面两行即可
            document.getElementById("main_col").style.backgroundImage='url(http://desk.fd.zol-img.com.cn/t_s1920x1200/g5/M00/01/0F/ChMkJlbKwn6IEp7rAAOX_LxBBHoAALGowMadvkAA5gU194.jpg )';
            document.getElementById("main_col").style.backgroundSize='100% 100%';
            //end
            document.getElementById("J_spbg").style.display="none";
            document.getElementById("J_mainRoom").style.padding="100px 5px 0 20px";
        }
    }
})();