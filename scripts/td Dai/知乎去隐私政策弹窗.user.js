// ==UserScript==
// @name         知乎去隐私政策弹窗
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        *://www.zhihu.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    setInterval(function(){
        document.querySelector('html').style.overflow='auto';
        document.querySelector('.Modal-wrapper').style.display='none';
    },10);
    // Your code here...
})();