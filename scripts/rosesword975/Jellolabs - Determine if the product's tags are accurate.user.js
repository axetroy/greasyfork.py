// ==UserScript==
// @name        Jellolabs - Determine if the product's tags are accurate
// @author      rosesword975
// @description Sets "true" as a default
// @namespace   https://greasyfork.org/en/users/13132-rosesword975
// @include     https://www.mturkcontent.com/dynamic/*
// @require     http://code.jquery.com/jquery-2.1.0.min.js
// @version     1.0
// @grant       none
// ==/UserScript==

// Select "true" as default
$("input[value='true']").click();

