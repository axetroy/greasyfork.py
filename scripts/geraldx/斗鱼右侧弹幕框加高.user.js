// ==UserScript==
// @name         斗鱼右侧弹幕框加高
// @namespace    https://www.douyu.com/
// @version      0.3
// @description  斗鱼右侧弹幕框加高，显示更多弹幕内容
// @author       Gerald
// @match        https://*.douyu.com/*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(document).ready(f);

function f() {
    setTimeout(changeHeight, 3500);
}

function changeHeight() {
    $("div#js-player-barrage").css("top", "0px");
    $("div.layout-Player-rank").css("display", "none");
}