// ==UserScript==
// @name         有道词典自动发音
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       LepeCoder
// @match        http://dict.youdao.com/w/*
// @grant        none
// ==/UserScript==

(function() {
    document.cookie="search-popup-show=-1; expires=Thu, 18 Dec 2033 12:00:00 GMT; path=/";
    document.getElementsByClassName('voice-js')[1].click();
    document.getElementsByClassName('dialog-guide-download')[0].style.display="none";


    // Your code here...
})();