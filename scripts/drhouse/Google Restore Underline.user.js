// ==UserScript==
// @name Google Restore Underline
// @namespace GRU
// @description Restores underlining to Google title results.
// @version 123
// @run-at  document-ready
// @include http://www.google.*/*
// @include https://www.google.*/*
// @include https://123movies.gsx/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @author  drhouse
// @icon    https://cdn1.iconfinder.com/data/icons/company-identity/100/new-google-favicon-128.png
// ==/UserScript==

$(document).ready(function () {

    $('.r a h3').css('text-decoration','underline');
    
});