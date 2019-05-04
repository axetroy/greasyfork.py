// ==UserScript==
// @name         500px Download
// @namespace    https://greasyfork.org/zh-CN/scripts/11183-500px-download
// @version      0.7
// @description  500px photo download
// @author       You
// @match        https://500px.com/photo/*
// @grant        none
// ==/UserScript==

var filename = window.location.pathname;
var link = $('.the_photo').attr("src");
$( ".like_favorite" ).append( '<div class="favorite_wrap"><a  target="_blank" href="'+link+'" title="Download..." download="500px'+filename+'.jpg"> <span class="icon-download" /></a></div>' );
