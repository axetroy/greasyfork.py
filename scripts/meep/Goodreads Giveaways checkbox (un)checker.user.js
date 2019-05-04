// ==UserScript==
// @name        Goodreads Giveaways checkbox (un)checker
// @namespace   Joseph
// @description Checks the "I have read and agree to terms and conditions..." box and unchecks the "Also add this book to my to-read shelf" box.
// @include     https://www.goodreads.com/giveaway/enter/*
// @include     http://www.goodreads.com/giveaway/enter/*
// @version     2
// ==/UserScript==

var terms = document.getElementById("terms");
terms.checked = true;

var want_to_read = document.getElementById("want_to_read");
want_to_read.checked = false;