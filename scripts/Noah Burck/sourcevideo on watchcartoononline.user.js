// ==UserScript==
// @name         sourcevideo on watchcartoononline
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  redirect to the actual video
// @author       You
// @match        https://www.watchcartoononline.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.onload = function(){
        var source = $(".jw-video").attr("src");
        if(window.confirm("go to source video at " + source + "?")){
            tab = window.open(source, "_blank");
            tab.focus();
        }
    }
})();