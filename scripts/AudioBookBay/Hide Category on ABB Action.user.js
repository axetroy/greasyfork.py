// ==UserScript==
// @description Hide Specific Category
// @name     Hide Category on ABB Action
// @match    http://audiobookbay.nl/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @grant    GM_addStyle
// @version 0.0.1.20180113112640
// @namespace https://greasyfork.org/users/166367
// ==/UserScript==
//- The @grant directive is needed to restore the proper sandbox.

$(".post").has (".postInfo:contains('Action')").hide ();