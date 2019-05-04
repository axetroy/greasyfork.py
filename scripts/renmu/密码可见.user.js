// ==UserScript==
// @name         密码可见
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

window.onload=function(){
    var list=document.querySelectorAll("input[type=password]");
    for(var i=0;i<list.length;i++){
        (function(i){
            list[i].onmouseover=function(){
                list[i].setAttribute("type","text");
            };
            list[i].onmouseout=function(){
                list[i].setAttribute("type","password");
            };
        })(i);
    }
};