// ==UserScript==
// @name        vivo.sx Redirector
// @namespace   cndymn
// @include     http://vivo.sx/*
// @include     http://www.vivo.sx/*
// @include     http://static.vivo.sx/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js
// @version     1
// @description This script skips the countdown and redirects directly to stream.
// @grant       none
// ==/UserScript==


$('button#access').removeAttr ('disabled').html ('Continue to video');
document.getElementById("access").click();