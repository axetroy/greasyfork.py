// ==UserScript==
// @name         酷家乐查看原图（F2）
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  ======================
// @author       Zero
// @match        https://www.kujiale.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var zero_state = 0;
    $(".room").append("<div class='zero-img'></div>");
    $(window).keydown(function(event){
        if(event.keyCode == 113){
            if(zero_state) {
                $(".main-pic").toggle();
                $(".zero-img").toggle();
            } else {
                $(".sub-pic-list").each(function(i){
                    $(this).children("span").each(function(j){
                        $(".zero-img").eq(i).append("<img src='" + $(this).attr("data-src") + "' style='width:100%'>");
                    });
                });
                $(".main-pic").toggle();
                zero_state = 1;
            }
        }
    });
})();