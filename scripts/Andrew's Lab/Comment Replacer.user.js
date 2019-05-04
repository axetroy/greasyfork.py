// ==UserScript==
// @name         Comment Replacer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       @TheUltimatum
// @match        http*://scratch.mit.edu/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.body.onload=function() {
        var comments=document.getElementsByClassName("comments")[0].getElementsByClassName("content");
        for (var comment in comments) {
            comments[comment].innerHTML=comments[comment].innerHTML.toString().replace("_test_","Potato!");
        }
    };
})();