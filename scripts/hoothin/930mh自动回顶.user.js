// ==UserScript==
// @name         930mh自动回顶
// @namespace    hoothin
// @version      0.1
// @description  在亲亲漫画翻页浏览时自动返回页首
// @author       hoothin
// @match        http://www.930mh.com/*
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';
    var next=document.querySelector(".img_land_next");
    if(next){
        next.addEventListener("click", function(){
            unsafeWindow.scrollTo(0, 0);
        });
    }
    var prev=document.querySelector(".img_land_prev");
    if(prev){
        prev.addEventListener("click", function(){
            unsafeWindow.scrollTo(0, 0);
        });
    }
})();