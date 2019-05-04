// ==UserScript==
// @name        必应翻译-自动To简体中文
// @namespace   BingTrans
// @description 页面载入之后目标语言自动为简体中文模式
// @include     https://www.bing.com/translator/ 

// @version     1
// @grant       none
// @run-at      document-end
// ==/UserScript==
var tt = setInterval(function(){
    if(document.querySelector(".destinationText") != null){
        clearInterval(tt);
        document.querySelector(".destinationText table td[value='zh-CHS']").click();
    }
}, 500);