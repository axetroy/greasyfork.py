// ==UserScript==
// @name         Fk Cnbeta
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  cnbeta红色广告栏自动点击关闭
// @author       inmyfree
// @match        *.cnbeta.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function FkCnbeta() {
        $("div").each(function(){
            if($(this).text() == "X"){
                //console.log($(this).text());
                $(this).click();
            }
        });
    }
    window.setInterval(FkCnbeta, 500);
    FkCnbeta();
})();