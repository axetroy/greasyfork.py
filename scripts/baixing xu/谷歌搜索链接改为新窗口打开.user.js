// ==UserScript==
// @name         谷歌搜索链接改为新窗口打开
// @namespace    none
// @version      1
// @description  Google search link changed to new window open  //谷歌搜索链接改为新窗口打开
// @author       XBX
// @include      https://www.google.*/search*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var links = document.getElementById('res').getElementsByTagName('a');
    var len = links.length;
    for(var i = 0; i < len; i++){
        links[i].setAttribute('target','_blank');
    }
    // Your code here...
})();