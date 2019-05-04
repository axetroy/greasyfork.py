// ==UserScript==
// @name         Tiktok Web Player Controls
// @namespace    https://kmcgurty.com
// @version      1
// @description  Stop your ears from getting blown out by every tiktok video
// @author       kmcgurty
// @match        https://m.tiktok.com/v/*
// @grant        none
// ==/UserScript==

var player = document.querySelector("#jp_video_0");
player.setAttribute("controls", "");
player.volume = 0.15;