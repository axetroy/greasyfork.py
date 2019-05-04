// ==UserScript==
// @name         大🥚
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  try to take over the world!
// @author       yetone
// @match        https://www.douban.com/people/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const meowIds = [
        '144859503', // 大蛋
    ]
    const combineText = (...areas) => areas.filter(a => a !== null && a.innerText !== null).reduce((acc, c) => acc + c.innerText, '')
    const isCat = () => {
        const img = document.querySelector('img.userface')
        if (img === null) return false
        const match = img.src.match(/\/[a-z]+(\d+)\-\d+\.jpe?g$/);
        if (match === null) return false
        if (meowIds.indexOf(match[1]) >= 0) return true
        const introArea = document.querySelector('#intro_display')
        const infoArea = document.querySelector('#db-usr-profile')
        const allText = combineText(introArea, infoArea)
        return allText.match(/喵|猫|虎|🐱|🐯/) !== null
    }
    if (!isCat()) return
    const followBtn = document.querySelector('.user-opt .add_contact')
    if (followBtn !== null) {
        followBtn.innerText = '关注此喵'
    }
    const userCsArea = document.querySelector('.user-opt .user-cs')
    if (userCsArea !== null) {
        userCsArea.innerText = '已关注此喵'
    }
})();