// ==UserScript==
// @name        Remove NicoNicoPedia Internal Links
// @namespace   yama-masa.com
// @description Clean off all the links to other articles in NicoNicoPedia.
// @include     http://dic.nicovideo.jp/*
// @version     1.1
// @grant       none
// ==/UserScript==
(function(){
Array.forEach(
document.body.querySelectorAll('a.auto,a.auto-hdn,a.dic'), function(ele) {
    ele.parentNode.replaceChild(ele.firstChild, ele)
})
})();