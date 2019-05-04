// ==UserScript==
// @name         百度翻译自动发音
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       2234839456@qq.com
// @match        https://fanyi.baidu.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var Node=document.querySelector(".icon-sound");
    var event = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true
    });
    var observer = new MutationObserver(()=>{
        console.log(666);
        Node.dispatchEvent(event);
    });
    var observerOptions = {
        childList: true,
        attributes: true,
        subtree: true,
        characterDataOldValue:true//文本发生变化
    }
    var targetNode=document.querySelector(".trans-right");
    observer.observe(targetNode, observerOptions);
    // Your code here...
})();