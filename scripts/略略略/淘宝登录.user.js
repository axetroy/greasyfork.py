// ==UserScript==
// @name         淘宝登录
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://login.taobao.com/*
// @require      https://code.jquery.com/jquery-latest.js
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {

    setTimeout(t,100);

    function t() {
        var el = $("#J_LoginBox.module-quick");

        if(el.length) {
            el.removeClass("module-quick").addClass("module-static");
        }
        else{
            setTimeout(t,100);
           
        }
    }



    // Your code here...
})();