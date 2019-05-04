// ==UserScript==
// @name         解除书荒网30秒搜索限制
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  解除书荒网两次搜索时间必须相隔30s的限制
// @match        *://www.15huang.com/*
// @author       tianxin
// @grant        none
// ==/UserScript==

const TIME_STAMP_COOKIE_KEY = 'olqyclastsearchtime';
// 设置 cookie
let setCookie = (name,value,days) => {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        let expires = "; expires="+date.toGMTString();
    }
    document.cookie = name+"="+value+expires+"; path=/";
}
// 获取 cookie
let getCookie = (name) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
// 删除cookie
let deleteCookie = (name) => {
    return setCookie(name,"",-1);
}
(function() {
    'use strict';
    let expireTime = getCookie(TIME_STAMP_COOKIE_KEY);
    let currentTime = Date.parse(new Date()) / 1000;
    if(expireTime && expireTime > currentTime){
        deleteCookie(TIME_STAMP_COOKIE_KEY);
        setCookie(TIME_STAMP_COOKIE_KEY,currentTime - (Math.ceil(Math.random()*30) + 30));
    }
})();