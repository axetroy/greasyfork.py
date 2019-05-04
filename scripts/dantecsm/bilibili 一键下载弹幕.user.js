// ==UserScript==
// @name         bilibili 一键下载弹幕
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  添加弹幕下载按钮
// @author       dantecsm
// @match        https://www.bilibili.com/video/*
// @match        https://www.bilibili.com/bangumi/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let oid
    let isBangumi = !!__INITIAL_STATE__.epInfo
    let locking = false
    let canView = false

    !(function loop() {
        if(locking === false) {
            locking = true
            oid = isBangumi? __INITIAL_STATE__.epInfo.cid: cid
            canView? createBtn(): createBtnSp()
            $('.bilibili-player-video-hint').remove()
        }

        if(!(canView = !!$('video').length) || !(window.player && player.getState && player.getState() === 'READY')) locking = false
        requestAnimationFrame(loop)
    })()

    function createBtn() {
        var $btn = $('.bilibili-player-video-btn-send')
        var $btnClone = $btn.clone()

        if($btn.length >= 2) return

        $btn.before($btnClone)
            .css({'padding-left': '10px'})
            .children('span').text('发送')

        $btnClone.attr('id', 'danmakuDownloader')
            .on('click', danmakuDownload)
            .removeClass('disabled')
            .css({'padding-left': '10px', 'margin-right': '-2px'})
            .children('span').text('下载')
    }

    function createBtnSp() {
        var $btnSp = $('.pwe-popup-pay')
        var $btnSpClone = $btnSp.clone()

        if($btnSp.length >= 2) return

        $btnSp.css({'margin': '10px auto'}).after($btnSpClone)
        $btnSpClone.on('click', danmakuDownload)
            .css({'margin': '10px auto'}).text('下载弹幕')
    }

    function danmakuDownload() {
        var a = document.createElement('a')
        a.download = $('h1[title]').text()
        a.href = `https://api.bilibili.com/x/v1/dm/list.so?oid=${oid}`
        a.click()
    }
})();