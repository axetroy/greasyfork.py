// ==UserScript==
// @name         米粉節2019
// @namespace    http://tampermonkey.net/
// @version      0.9
// @description  每一分鐘會點擊一次，"獲獎者:"會變成套件執行中!!
// @author       Lin
// @match        *://event.mi.com/tw/mff2019/sales/*
// @grant        none
// @require http://code.jquery.com/jquery-3.3.1.min.js

// ==/UserScript==

(function() {
    'use strict';
    function clickAuto(){
        $('#luckyBtn').removeClass("forbid")
        document.querySelector('#luckyBtn > div').click();
        setTimeout(function(){
            document.querySelector('#_luckyDraw > div > div > div.error-mask.lucky-mask > div > span').click();
            $("#_luckyDraw > div > div > div.error-mask.lucky-mask > div > span").click();

        },1000);
            }
    var p =document.querySelector('#_luckyDraw > div > div > div.winners > span');
    p.innerText = "套件執行中!!  ";
    clickAuto();
    window.setInterval (clickAuto, 60000);
})();