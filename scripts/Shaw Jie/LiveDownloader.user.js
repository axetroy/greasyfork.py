// ==UserScript==
// @name              LiveDownloader
// @namespace         http://tampermonkey.net/
// @version           0.1.3
// @icon              https://image.flaticon.com/icons/png/128/1246/1246264.png
// @description       Get the NetEasyCCLive、BilibiliLive stream download path
// @description:zh-CN 获取网易CC、Bilibili直播的直播串流下载地址
// @author            ShaoFan
// @require           https://greasyfork.org/scripts/375390-livestreamcatcher/code/LiveStreamCatcher.js?version=652509
// @include           http*://cc.163.com/*/
// @include           http*://live.bilibili.com/*
// ==/UserScript==

(function() {
    'use strict';

    const config = {
        debug: false,
        showByButton: true,
        currentPart:null,
        buttonText:'下载直播视频',
        pattner: [
            {site:'NetEasyCC', regex:/cc.163.com/, target:NetEasyCCfuncs },
            {site:'BilibiliLive', regex:/live.bilibili.com/, target:BilibiliLivefuncs },
        ],
    };

    let api;
    try{
        config.pattner.forEach((ele)=>{
            if(ele.regex.test(window.location.host)){
                config.currentPart = ele.site;
                api = ele.target;
            }
        });
    }catch (err) {
        console.error('无法找到对应的功能块');
        return;
    }

    var streamInterface = {
        createButton:function(){
            if(api.liveData == undefined) return;
            var point = config.currentPart + '_createButton';
            this[point]();
        },
        NetEasyCC_createButton:() => {
            var sublineButton = document.getElementById('menu-be-anchor');
            var link = document.createElement('a');
            link.className = 'user-do-item anchor-live';
            link.target = '_blank';
            link.href = api.liveData['videourl'];
            var icon = document.createElement('span');
            icon.className = 'def-font download';
            link.appendChild(icon);
            link.innerHTML += config.buttonText;
            $(sublineButton).after(link);
        },
        BilibiliLive_createButton:() => {
            var count = 6;
            var timmer = setInterval(()=>{
                var parent = document.getElementsByClassName('shortcuts-ctnr')[0];
                if(parent == undefined){
                    count--;
                    if(count == 0){
                        clearInterval(timmer);
                        console.log('按钮生成超时，请尝试重新加载');
                    }
                }else{
                    var link = document.createElement("div");
                    link.role = 'button';
                    link.className = 'shortcut-item f-left pointer';
                    link.style.background = '#01a1d6'
                    link.style.padding = '6px';
                    link.style.borderRadius = '1rem';
                    link.style.margin = '11px 0';
                    var text = document.createElement('div');
                    text.style.color = '#fff';
                    text.innerHTML = config.buttonText;
                    link.appendChild(text);
                    link.onclick = () => {window.open(api.liveData[0].url)};

                    parent.appendChild(link);
                    clearInterval(timmer);
                }
            },500)
        }
    }

    const run = () => {
        api.init();
        if(config.showByButton) streamInterface.createButton();
    }

    run();
})();