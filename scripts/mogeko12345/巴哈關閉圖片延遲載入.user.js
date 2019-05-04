// ==UserScript==
// @name         巴哈關閉圖片延遲載入
// @namespace    https://home.gamer.com.tw/Mogeko12345
// @version      1.0
// @description  關閉巴哈姆特的圖片延遲載入功能
// @author       mogeko12345
// @match        https://forum.gamer.com.tw/C.php*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var lazyloadImg = document.querySelectorAll("img.lazyload");
    lazyloadImg.forEach((img) => {
        img.classList.remove("lazyload");
        img.src = img.dataset.src;
    });
})();