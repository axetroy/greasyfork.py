// ==UserScript==
// @name         Smallpdf 解除使用限制
// @namespace    https://limx.win/post/technology/smallpdf_crack
// @version      1.3
// @description  解除 smallpdf.com 免费用户每小时只能使用两次的限制
// @author       WingLim
// @supportURL      https://limx.win/post/technology/smallpdf_crack
// @contributionURL https://limx.win/post/technology/smallpdf_crack
// @match        *://smallpdf.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    localStorage.removeItem("usage"); //删除usage
    var interval = 10000;//间隔时间，单位为毫秒
    setInterval(function(){
        if(localStorage.usage){//检测是否存在usage，是则删除
            localStorage.removeItem('usage');
        }
    },interval);
})();