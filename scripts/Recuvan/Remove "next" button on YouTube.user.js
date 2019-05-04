// ==UserScript==
// @name        Remove "next" button on YouTube
// @namespace   youtube.com
// @description Removes the "next" button on youtube
// @include     https://www.youtube.com/
// @include     https://www.youtube.com/*
// @include     http://www.youtube.com/
// @include     http://www.youtube.com/*
// @include     http://youtube.com/
// @include     http://youtube.com/*
// @version     1
// @grant       none
// @author      Recuvan
// ==/UserScript==

var mybase = document.querySelector(".ytp-next-button.ytp-button");
mybase.style.display = "none";