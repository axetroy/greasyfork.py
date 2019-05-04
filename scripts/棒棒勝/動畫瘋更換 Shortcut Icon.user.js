// ==UserScript==
// @name         動畫瘋更換 Shortcut Icon
// @namespace    https://gnehs.net
// @version      1.0
// @description  更換巴哈 Icon，這樣比較可愛
// @author       gnehs
// @match        https://ani.gamer.com.tw/*
// @icon         https://i.imgur.com/2aijUa9.png
// @grant        none
// ==/UserScript==

(function() {
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'https://i.imgur.com/2aijUa9.png';
    document.getElementsByTagName('head')[0].appendChild(link);
})();