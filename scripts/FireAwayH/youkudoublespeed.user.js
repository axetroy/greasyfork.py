// ==UserScript==
// @name         youkudoublespeed
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://v.youku.com/v_show/id*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(function(){
        $(".control-rate-btn").click();
        $(".settings-item[data-val=2]").click();
        $(".control-next-video").on("click", function(){
            setTimeout(function(){
                $(".control-rate-btn").click();
                $(".settings-item[data-val=2]").click(); }, 5000);
        });
    }, 5000);
})();