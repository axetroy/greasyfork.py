// ==UserScript==
// @name         Bilibili 一键截图( ; )
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  截图干嘛愣着啊
// @author       You
// @match        https://www.bilibili.com/video/*
// @match        https://www.bilibili.com/bangumi/*
// @run-at       document-idle
// @require      https://greasyfork.org/scripts/376248-abab/code/%E2%86%91%E2%86%92%E2%86%93%E2%86%90ABAB.js?version=674271
// @grant        none
// ==/UserScript==

(function() {
    !(function getStarted() {
        !!window.HOOKED_DATA? main(): requestAnimationFrame(getStarted)
    })()

    function main() {
        let keyCode = 59
        document.addEventListener('keypress', e => e.keyCode === keyCode && player.screenshot({time: 2000, isStatic: true, background: '#000', hi: 1, width: player.getWidth(), height: player.getHeight(), quality: 100}))
        // document.addEventListener('keypress', e => e.keyCode === 39 && player.screenshot({time: 2000, isStatic: false, background: '#000', hi: .7, width: player.getWidth(), height: player.getHeight(), quality: 80}))
    }
})();