// ==UserScript==
// @name        Direct link for Shirai Player
// @namespace   sleep-walker.cz
// @description direct download link used for Shirai player
// @include     http://shirai.cz/*
// @include     https://shirai.cz/*
// @version     1
// @grant       none
// ==/UserScript==

video_src = document.evaluate('//div/video/source/@src', document, null, 9, null).singleNodeValue;
if (video_src) {
    zdroj = document.evaluate('//span[@id="zdroj_1"]', document, null, 9, null).singleNodeValue.parentNode;
    zdroj.innerHTML += "<a href=\"" + video_src.value + "\" type=\"video/mp4\">Direct download</a>";
}