// ==UserScript==
// @name         PlayBlink Autojoin
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Autojoin over PlayBlink
// @author       Sergio Susa (http://sergiosusa.com)
// @match        http://playblink.com
// @grant        none
// ==/UserScript==
'use strict';

setTimeout(function(){

    $(".blink.blue")[0].click();

    setTimeout(function(){
        $(".wrapper .button.blue")[0].click();
    }, 4000);

    setTimeout(function(){
        $("#result_box .button.blue").click()
    }, 6000);

}, 5000);
