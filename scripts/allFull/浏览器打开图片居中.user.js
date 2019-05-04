// ==UserScript==
// @name         浏览器打开图片居中
// @namespace    http://css.thatwind.com/
// @version      1.0
// @description  让在浏览器中打开的图片居中
// @author       遍智
// @match        *://*/*.png
// @match        *://*/*.jp*g
// @match        *://*/*.gif
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';



    document.addEventListener("DOMContentLoaded",go);

    go();


    function go(){
        var x="img{position:absolute;left:0;right:0;margin:auto;}";
        var y=document.createElement('style');
        y.innerHTML=x;
        document.getElementsByTagName('head')[0].appendChild(y);
    }

})();