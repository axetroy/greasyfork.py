// ==UserScript==
// @name         天翼云盘直接下载
// @icon         http://cloud.189.cn/logo.ico
// @version      0.13
// @namespace    http://jackxhe.cn
// @description  天翼云盘去除其登录弹框，点击即下载,不支持文件夹~
// @author       JackXhE
// @include      *//cloud.189.cn/t/*
// @include      *//m.cloud.189.cn/t/*
// ==/UserScript==

(function() {
    //移除转存Banner
    let saveBanner = document.getElementsByClassName("tips-save-box")[0]?document.getElementsByClassName("tips-save-box")[0]:document.getElementById('J_CloudWapBanner');
    saveBanner.remove();
    //getLink
    let downloadBtn = document.getElementsByClassName("btn-download")[0]?document.getElementsByClassName("btn-download")[0]:document.getElementsByClassName('J_Download')[0];
    let downUrl=this.downloadUrl?this.downloadUrl:this.longDownloadUrl;
    let fileName =document.getElementById('fileName')?document.getElementById('fileName').innerText:this.fileName;
    downloadBtn.href = downUrl+"&name="+fileName;
})();