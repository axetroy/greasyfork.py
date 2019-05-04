// ==UserScript==
// @name         让北理工网站正常一点
// @namespace    YinTianliang_i
// @version      0.3
// @description  让北理工网站能够在chrome/firefox/等上正常运行
// @author       YinTianliang
// @grant        unsafeWindow
// @match        *://10.5.2.80/*
// ==/UserScript==



unsafeWindow.findObj = function(n, d) {return $(n);};

document.getElementById('bottom').remove();
