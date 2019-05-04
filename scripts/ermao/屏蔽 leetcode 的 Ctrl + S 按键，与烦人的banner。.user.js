// ==UserScript==
// @name         屏蔽 leetcode 的 Ctrl + S 按键，与烦人的banner。
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       ermao
// @include      http*//*leetcode.com*

// @grant        none
// ==/UserScript==
// 参考 https://stackoverflow.com/questions/11000826/ctrls-preventdefault-in-chrome 上 BumbleB2na 用户的回答。
document.getElementById('region_switcher').style.display = "none";
document.addEventListener("keydown", function(e) {
    if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
        e.preventDefault();
    }
}, false);