// ==UserScript==
// @name        Triple Alert!
// @description Places additional scheduled maintenance alerts at the top and bottom of mturk pages for triple alerting power.
// @version     1.2
// @author      DCI
// @namespace   http://www.mturkgrind.com/members/15-DCI
// @include     https://www.mturk.com/mturk/*
// @require     http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

$(".warning.message").clone().appendTo("body");  
$(".warning.message").clone().prependTo("body");    