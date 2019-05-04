// ==UserScript==
// @name        douban_global_nav
// @namespace   
// @description align global nav's items to center
// @include      https://*.douban.com/*
// @include      http://*.douban.com/*
// @version     2.1
// ==/UserScript==

var top_bd = document.getElementsByClassName("bd")[0];
top_bd.style.width = "980px";
top_bd.style.margin = "0 auto";
top_bd.style.padding = "0 0 0 10px";
var top_menu = document.getElementById("db-global-nav");
top_menu.style.borderBottom = "3px solid #F8D575";