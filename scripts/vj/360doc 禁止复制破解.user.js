// ==UserScript==
// @name         360doc 禁止复制破解
// @namespace    https://www.topcl.net
// @version      0.1
// @description  去除360doc禁止复制
// @author       vj
// @match        http://www.360doc.com/*
// @grant        none
// ==/UserScript==

$(function(){
    setTimeout(function(){
        document.body.oncopy=null;    
    },2000);
});