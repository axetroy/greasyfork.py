// ==UserScript==
// @name         Remove_adportal_kickass
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Remove the shitty adwall when you click on a download button
// @author       You
// @match        https://kickass2.st/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log("Tempermonky script started...");
    var buttons = document.getElementsByTagName("a");
    for(var i=0; i<buttons.length; i++){
        if(buttons[i].href.indexOf("mylink.me.uk") != -1){
            var url_encoded = buttons[i].href.split("?url=")[1];
            var url_decoded = decodeURIComponent(url_encoded);
            buttons[i].href = url_decoded;
        }
    }
})();