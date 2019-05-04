// ==UserScript==
// @name        De-sidebar
// @namespace   www.julianvelazquez.com
// @description Deletes sidebar
// @include     https://www.reddit.com/*
// @require     http://code.jquery.com/jquery-2.2.0.js
// @version     1.01
// @grant       none
// ==/UserScript==

$(document).ready(function(){
    $(".side").remove(); 
    $(".rank").remove();
    $("#siteTable").css("width", "100%");
})