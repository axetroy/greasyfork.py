// ==UserScript==
// @name         niconico video downloader
// @namespace    http://tampermonkey.net/
// @version      0.1.2
// @description  下载niconico的视频，或者解决偶尔视频打不开的问题。
// @author       axel10
// @match        https://www.nicovideo.jp/watch/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    setTimeout(function () {
    var data = document.getElementById("js-initial-watch-data").getAttribute("data-api-data");
    var jsonData = JSON.parse(data);
    var a = document.createElement("a");
    var url = jsonData.video.smileInfo.url;
    a.href = url;
    a.target = "_blank";
    a.innerHTML = "<br/>原视频";
    document.querySelector(".VideoTitle").appendChild(a);
},2500);
})();