// ==UserScript==
// @name         edgenuity next clicker
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  it's all in the name
// @author       You
// @match        *learn.education2020.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var pageload, nextclicker, nextbutton, nextassn;
    
    function loadpage() {
        pageload = setInterval(function() {
            nextassn = document.getElementsByClassName("footnav goRight")[0];
            if (nextassn) {
                nextassn.click();
                clearInterval(pageload);
                setTimeout(loadpage, 1000);
            }
            
            nextbutton = document.getElementsByClassName("FrameRight")[0];
            if (nextbutton) {
                nextclicker = setInterval(function() {
                    nextbutton.click();
                    setTimeout(function () {
                        var invis = document.getElementById("invis-o-div");
                        if (invis) {
                            invis.setAttribute("style", "display: none;");
                        }
                    }, 500);
                }, 2000);
                clearInterval(pageload);
            }
        }, 1000);
    }
    
    loadpage();
})();