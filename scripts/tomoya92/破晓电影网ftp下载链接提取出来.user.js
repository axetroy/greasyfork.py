// ==UserScript==
// @name         破晓电影网ftp下载链接提取出来
// @namespace    DsfB2XVPmbThEv29bdxQR2hzid30iMF8
// @version      0.3
// @description  将poxiao电影下载ftp链接提取出来，放到下面供复制，原因：mac上点击链接不能调用迅雷
// @author       tomoya
// @include      http*://www.poxiao.com/movie/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var e_ftps = document.getElementsByTagName("input");
    for(i = 0; i < e_ftps.length; i++) {
        if(e_ftps[i].name == 'checkbox2') {
            var ftp = e_ftps[i].value.replace('xzurl=', '');
            var e_div = document.createElement('div');
            var e_a = document.createElement("a");
            e_a.href = ftp;
            e_a.innerHTML = ftp;
            e_div.appendChild(e_a);
            e_ftps[i].parentNode.appendChild(e_div);
        }
    }
})();