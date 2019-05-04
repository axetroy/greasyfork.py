// ==UserScript==
// @name         Bing背景图片一键下载
// @namespace    http://imycy.top/
// @version      0.6
// @description  在Bing首页，点击右下角的二维码图标后，会自动下载背景图片。供学习javascript用，尊重图片版权。建议使用Google浏览器，其他浏览器可能不兼容
// @author       纪晨阳
// @match        *://cn.bing.com/*
// @grant        纪晨阳
// ==/UserScript==

(function() {
    'use strict';
    document.getElementById("shBingAppQR").onclick=function(){get_backgroundImage()};
    function get_backgroundImage()
    {
        var str = getComputedStyle(document.getElementById("bgDiv"), "style").backgroundImage;
        var url = str.split('"')[1];
        var imageName = url.split('_')[0].split('.')[3]+".jpg";
        var alink = document.createElement("a");
        alink.href = url;
        alink.download = imageName;
        alink.click();
    }
    // Your code here...
})();