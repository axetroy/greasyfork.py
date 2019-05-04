// ==UserScript==
// @name        Amazon keepa
// @description Amazon keepa plugin
// @author Maxeo | maxeo.net
// @license https://creativecommons.org/licenses/by-sa/4.0/
// @include     https://www.amazon.it/*/dp/*
// @include     https://www.amazon.it/dp/*
// @include     https://www.amazon.it/gp/product/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js
// @version     1.2.2
// @icon        https://greasyfork.org/system/screenshots/screenshots/000/006/429/original/asd.png
// @namespace https://greasyfork.org/users/88678
// ==/UserScript==
var prod_code;
if (prod_code = window.location.pathname.match(/^\/gp\/product\/(.*)\/.*$/)) {
  prod_code = prod_code[1]
} 
else if (prod_code = window.location.pathname.match(/^\/.*\/dp\/(.*)\/.*$/)) {
  prod_code = prod_code[1];
} 
else if (prod_code = window.location.pathname.match(/^\/dp\/(.*)\/.*$/)) {
  prod_code = prod_code[1];
}
else if(prod_code = window.location.pathname.match(/^\/gp\/product\/(.*)\\?.*$/)) {
  prod_code = prod_code[1];
} 
else if (prod_code = window.location.pathname.match(/^\/.*\/dp\/(.*)\\?.*$/)) {
  prod_code = prod_code[1];
}
else if (prod_code = window.location.pathname.match(/^\/dp\/(.*)\\?.*$/)) {
  prod_code = prod_code[1];
} 

$(document).ready(function () {
  iframedata = '<iframe style="width: 100%; height: 500px; border:0 none;" src="https://keepa.com/iframe_addon.html#8-0-' + prod_code + '" scrolling="no" id="' + prod_code + '"></iframe>'
  $('#centerCol').after(iframedata)
})
