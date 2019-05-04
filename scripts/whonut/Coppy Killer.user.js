// ==UserScript==
// @name          Coppy Killer
// @namespace     http://code.physicynicism.com
// @description   Hides Coppy from tumblr (April Fool's Day joke 2015)
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include       https://www.tumblr.com/*
// @version       1.0
// ==/UserScript==

$(".coppy").hide()
$(".coppy coppy--dismissed").hide()
