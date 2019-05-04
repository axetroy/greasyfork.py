// ==UserScript==
// @name         ランキングページのニコニコニュースを隠す
// @namespace    https://twitter.com/jdoiwork
// @version      0.1
// @description  ニコニコ動画のランキングページ上のニコニコニュースランキングを隠します。
// @author       https://twitter.com/jdoiwork
// @match        https://www.nicovideo.jp/ranking/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    var a = document.querySelector(".contentBody.videoRcolumn.niconews").parentElement || { style: {}};
    a.style.display = "none";
    
    //console.log(a)
    //console.log(a.parentElement)
    //console.log()

})();