// ==UserScript==
// @name         Bilibili AutoWide
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Bilibili Player Auto WideScreen!
// @author       cuzfinal
// @include     http*://www.bilibili.com/video/av*
// @include     http*://www.bilibili.com/watchlater/*
// @include     http*://www.bilibili.com/bangumi/play/ep*
// @include     http*://www.bilibili.com/bangumi/play/ss*
// @include     http*://bangumi.bilibili.com/anime/*/play*
// @include     http*://bangumi.bilibili.com/movie/*
// @exclude     http*://bangumi.bilibili.com/movie/
// @grant        MIT Lisence
// ==/UserScript==

(function () {
  'use strict';

  // Your code here...
  const select = id => document.querySelector(id)
  const getVideo = () => select('#bilibiliPlayer video')
  
  const wideScreen = () => {
    const btn = select('.bilibili-player-video-btn-widescreen')
    btn.click()
    setTimeout(() => {
      MoObserve()      
    }, 0)
  }

  const mo = new MutationObserver(wideScreen)
  const MoObserve = () => {
    mo.disconnect()
    mo.observe(getVideo(), {
      attributes: true,
      childList: false,
      subtree: false,
    })
  }

  const run = () => {
    wideScreen()
    console.log('Bilibili Auto WideScreen!')
  }

  const origin = PlayerMediaLoaded
  PlayerMediaLoaded = () => {
    origin()
    run()
  }

  MoObserve()
})();