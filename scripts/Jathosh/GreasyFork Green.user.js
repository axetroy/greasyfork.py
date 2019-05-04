// ==UserScript==
// @version      1.1
// @name		GreasyFork Green
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @description Changes the Greasy Fork main color from Red to Green
// @include		https://greasyfork.org/*
// @namespace https://greasyfork.org/users/12866
// ==/UserScript==

$(document).ready(function() {
    $("a").css("color", "#00BA17");
    $("a:visited").css("color", "#006719");
    $("#main-header").css("background-color", "#006719");
    $("#Head").css("background-color", "#006719");
});