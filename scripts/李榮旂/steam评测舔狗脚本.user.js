// ==UserScript==
// @name         steam评测舔狗脚本
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  如果不是真的喜欢，谁又愿意当个舔狗呢
// @author       You
// @match        https://steamcommunity.com/profiles/*/recommended*
// @match        http://steamcommunity.com/profiles/*/recommended*
// @match        http://steamcommunity.com/id/*/recommended*
// @match        https://steamcommunity.com/id/*/recommended*
// @grant        none
// ==/UserScript==

document.querySelectorAll('#leftContents .thumb_up').forEach(function (node) {
    node.parentNode.parentNode.click();
});