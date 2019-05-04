// ==UserScript==
// @name         去除慕课网视频右侧组件
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.imooc.com/video/*
// @grant        none
// ==/UserScript==
(function() {
    var parent = document.getElementById("courseLayout");
    var doc = document.getElementById("courseRight");
    parent.removeChild(doc);
})();