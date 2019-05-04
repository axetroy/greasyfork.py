// ==UserScript==
// @name             BiliBili HTML5
// @description      BiliBili调用官方HTML5播放器播放
// @namespace        https://greasyfork.org/zh-CN/users/821
// @author           颜太吓、tx9191
// @version          2.333
// @include          http://www.bilibili.com/video/av*
// @include          http://bangumi.bilibili.com/anime/v/*
// @run-at           document-start
// @grant            none
// ==/UserScript==
'use strict';
if (location.hostname == 'www.bilibili.com') {
    let H5script = document.createElement('script');
    H5script.setAttribute("type", "text/javascript");
    H5script.setAttribute("src", 'http://static.hdslb.com/js/simple.v2.min.js');
    document.getElementsByTagName("head")[0].appendChild(H5script);
    let style = document.createElement('link');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('type','text/css');
    style.setAttribute('href','http://static.hdslb.com/css/simple.v2.min.css');
    document.getElementsByTagName("head")[0].appendChild(style);
}
  
location.hostname == 'www.bilibili.com' && document.addEventListener('DOMContentLoaded', function BiliBili(e) {
    if (document.readyState == 'complete') {
        document.removeEventListener(e.type, BiliBili, !0);
        return;
    }
    let player = document.getElementById("bofqi");
    if (!player) return;
    document.removeEventListener(e.type, BiliBili, !0);
    //let cid = player.innerHTML.match(/cid=(\d+)/)[1];
    player.innerHTML = null;
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', 'http://interface.bilibili.com/playurl?platform=android&cid=' + cid + '&quality=3&otype=json&appkey=86385cdc024c0f6c&type=mp4', true);
    xmlHttp.send(null);
    xmlHttp.onload = function() {
        if (xmlHttp.status != 200) return;
        let url = JSON.parse(xmlHttp.responseText);
        if (url = url.durl) {
            (new BiliH5Player).create({
                get_from_local: !0,
                comment: 'http://comment.bilibili.com/' + cid + '.xml',
                image: document.getElementsByClassName('cover_image')[0].src,
                video_url: url[0].url
            })
            addOpecSlider()
            let innerVideo = player.querySelector('video')         
            innerVideo.onloadstart = function(){
                let muteBtn = player.querySelector('.btn-mute.hide')
                muteBtn.className = muteBtn.className.replace('hide','')
                //innerVideo.controls = true
                //innerVideo.loop = false
            }
        }
    }
}, true);
  
if (location.hostname == 'bangumi.bilibili.com') {
        document.addEventListener('DOMContentLoaded',function(){
            window.stop();
            location.href = document.querySelector('.v-av-link').href
        })
}
  
function addOpecSlider(){
    if(document.querySelector('#bofqi') != undefined){  
        let opacValue = 0.75
        let sliderStyle = document.createElement('style')
        sliderStyle.setAttribute('type', 'text/css')
        sliderStyle.innerHTML = '.player-container .comment-layer > div{opacity:' + opacValue + '!important;}'
        let opacSlider = document.createElement('INPUT')
        opacSlider.setAttribute('type', 'range')
        opacSlider.setAttribute('value', opacValue * 100)
        opacSlider.onchange = function () {
            setOpac(sliderStyle, opacSlider.value / 100)
        }
        let sliderContainer = document.createElement('span')
        sliderContainer.setAttribute('id', 'opec-slider-container')
        document.querySelector('head').appendChild(sliderStyle);
        sliderContainer.appendChild(opacSlider)
        let parentEle = document.querySelector('#bofqi .display .right')
        parentEle.insertBefore(sliderContainer,document.querySelector('.btn-repeat'))
        function setOpac(style, value) {
            style.innerHTML = '.player-container .comment-layer > div{opacity:' + value + '!important;}'  
        }
    }
}