// ==UserScript==
// @name        HF GAuth remover
// @namespace   HF
// @description Remove the GAuth message.
// @include     http://www.hackforums.net/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @version     1.0
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// ==/UserScript==

$('.red_alet').remove();