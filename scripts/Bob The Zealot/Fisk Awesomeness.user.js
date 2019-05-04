// ==UserScript==
// @name         Fisk Awesomeness
// @namespace    https://www.torn.com/profiles.php?XID=2029670#/
// @version      1.0
// @description  Fisk!
// @author       MikePence
// @match        https://www.torn.com/*
// @grant        none
// ==/UserScript==

$(document).ready(function(){
    window.setInterval(function(){
        console.log("Fisk");
    }, 1);
});