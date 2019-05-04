// ==UserScript==
// @name         屏蔽知乎隐私协议
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include        http://*.zhihu.com/*
// @include        https://*.zhihu.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    setTimeout(function(){
        document.querySelector('span>.Modal-wrapper').parentNode.parentNode.parentNode.remove();
        setTimeout(function(){
            document.querySelector('html').style.cssText ="overflow: auto; margin-right: 17px;";
        },100);
    },100);
})();