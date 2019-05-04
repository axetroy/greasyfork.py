// ==UserScript==
// @name          Ebay Fix Desc Button
// @description   Ebay description button fix
// @namespace https://greasyfork.org/users/9560
// @include http://*.ebay.*/*
// @version 0.0.1.20150306065214
// ==/UserScript==

//If desc button visible, remove it and show the desc
if($("#vi_snippetdesc_btn")){
    $("#vi_snippetdesc_btn").hide()
    $("#vi-snippet-description-main").append($("#vi-desc-olay-main").html())
}