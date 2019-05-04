// ==UserScript==
// @name         虎牙直播旧版网页全屏
// @namespace    http://www.huya.com/
// @version      0.1
// @description  剧场模式时屏蔽礼物栏，并开启弹幕输入框，屏蔽右下角订阅和暂停时左下角二维码
// @author       gesla
// @match        http*://www.huya.com/*
// @grant        none
// ==/UserScript==

'use strict'
const css = `
body.mode-page-full .room-player-wrap .room-player-main #player-wrap
  {
    height: 100% !important;
    width: 100% !important;
  }

body.mode-page-full .room-player-wrap .room-player-main #player-ctrl-wrap
  {
    bottom: -60px !important;
    padding:0 !important;
  }

body.mode-page-full .room-player-wrap .room-player-main:hover #player-ctrl-wrap
  {
    bottom: 0 !important;
  }

body.mode-page-full .room-player-wrap .room-player-main #player-full-input
  {
    display:block !important;
  }

#player-subscribe-wap
{
display:none !important;
}
#player-ctrl-wrap .player-app-qrcode
{
display:none !important;
}
`
let style = document.createElement('style')
style.innerHTML = css
document.querySelector('head').appendChild(style)


