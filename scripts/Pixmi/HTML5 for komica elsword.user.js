// ==UserScript==
// @name        HTML5 for komica elsword
// @namespace   none
// @description 關閉Flash崁入的YouTube影片，改成HTML5
// @include     http://*.mymoe.moe/*
// @include     http://*.mykomica.org/*
// @grant       none
// @require     https://ajax.aspnetcdn.com/ajax/jquery/jquery-1.12.1.js
// @version     0.4
// @author      Renian
// @license     MIT
// ==/UserScript==

$(document).ready(function() {
    $("a[href*='javascript:ytclick']").each(function() {
        var str = $(this).attr('href');
        var value = str.substring(20,31);
        $(this).replaceWith('<iframe type="text/html" width="560" height="315" src="https://www.youtube.com/embed/'+value+'?rel=0" frameborder="0" allowfullscreen></iframe>');
    })
});