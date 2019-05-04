
// ==UserScript== 
// @name       RYM: bump button always on 
// @version    0.2 
// @description always display bump button on rym release pages
// @match      http://rateyourmusic.com/release/* 
// @match      https://rateyourmusic.com/release/* 
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js 
// @namespace https://greasyfork.org/users/2625
// @copyright  2015+, Fyodor Pandovich
// ==/UserScript==   

$(".my_catalog_bump:eq(0)").find(">:first-child").attr("style","display: block;") 