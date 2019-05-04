// ==UserScript==
// @name         微博原图
// @namespace    http://tampermonkey.net/
// @version      0.16
// @description  访问新浪微博图片的URL时会自动跳转到原图
// @author       halfasec
// @match        *.sinaimg.cn/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var originalLocator=window.location.href;
    console.log(originalLocator);
    var flagLarge=/thumbnail|thumb150|mw600|mw690|mw1024|small|bmiddle/.test(originalLocator);
    console.log(flagLarge);
    if(flagLarge){
    var fixedLocator=originalLocator.replace(/thumbnail|thumb150|mw600|mw690|mw1024|small|bmiddle/, "large");
    console.log(fixedLocator);
    window.location.href=fixedLocator;
    }
    window.addEventListener('keydown', event => {
      if (event.keyCode == 115) { // F4
        var searchLocator="https://www.google.com/searchbyimage?safe=off&site=search&image_url="+window.location.href;
        window.location.href=searchLocator;
      } });
})();