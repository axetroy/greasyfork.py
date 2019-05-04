// ==UserScript==
// @name         NoTwitterMoments
// @namespace    https://www.titaniumsystem.es
// @version      0.1
// @description  I don't like that new twitter "feature"
// @author       Gabriel Amador García
// @match        https://*.twitter.com/*
// @require http://code.jquery.com/jquery-latest.js
// @grant        none
// ==/UserScript==

$(document).ready(function() {
$('.moments')[0].innerHTML='';
});