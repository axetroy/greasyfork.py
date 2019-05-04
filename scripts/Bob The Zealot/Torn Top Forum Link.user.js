// ==UserScript==
// @name         Torn Top Forum Link
// @namespace    https://www.torn.com/profiles.php?XID=2029670
// @version      1.0
// @description  Bring back the forum link at the top!
// @author       Mike Pence
// @match        https://www.torn.com/*
// @match        http://www.torn.com/*
// @requires     https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js
// ==/UserScript==

$(document).ready(function(){
    $(".menu-items").append("<li><a href='/forums.php'>Forums</a></li>");
});