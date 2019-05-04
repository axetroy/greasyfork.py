// ==UserScript==
// @name         托福考满分海外IP屏蔽解除
// @namespace    https://kyokuheishin.github.io/
// @version      0.102
// @description  解除托福考满分网站对于海外IP的屏蔽遮罩+模糊
// @author       kyokuheishin
// @match        https://toefl.kmf.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var shieldBoxList = document.getElementsByClassName("shield-box js-shield-box");
    shieldBoxList[0].parentNode.removeChild(shieldBoxList[0]);
    var maskList = document.getElementsByClassName("practice-container js-practice-container");
    setTimeout(function(){
        maskList[0].classList.remove("blur");
    },1500);
})();