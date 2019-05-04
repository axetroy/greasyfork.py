// ==UserScript==
// @name         免註冊看蘋果新聞(已失效)
// @namespace    http://tampermonkey.net/
// @version      1.1
// @include      https://tw.appledaily.com*
// @include      https://tw.news.appledaily.com*
// @include      https://tw.entertainment.appledaily.com*
// @include      https://tw.lifestyle.appledaily.com*
// @include      https://tw.sports.appledaily.com*
// @match        http://*/*
// @grant        none
// @description try to take over the world!
// ==/UserScript==

(function() {
    'use strict';

    var elements = document.getElementsByClassName("ndPaywall");
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }

   document.getElementsByClassName("ndArticle_margin")[0].style.display = null;
   document.getElementsByClassName("ndAritcle_headPic")[0].style.display = null;
   document.getElementsByClassName("mediabox")[0].style.display = null;


})();

