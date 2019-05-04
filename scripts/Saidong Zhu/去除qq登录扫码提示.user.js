// ==UserScript==
// @name         去除qq登录扫码提示
// @namespace    zsdroid
// @version      0.2.3
// @description  delete qrcode tips
// @author       zsdroid
// @match        https://xui.ptlogin2.qq.com/*
// @match        https://ssl.xui.ptlogin2.weiyun.com/*
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    var qr_tips = document.getElementById("qr_tips");
    qr_tips && qr_tips.parentNode.removeChild(qr_tips);
})();
