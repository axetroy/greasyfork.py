// ==UserScript==
// @name        Hide 'Edit' Buttons/Labels on Wikia websites
// @namespace   https://greasyfork.org/en/users/12018-zach-d
// @description Hides The 'Edit' Buttons on any Wikia Website
// @include     http://*.wikia.com/*
// @include     https://*.wikia.com/*
// @version     1
// @grant       none
// ==/UserScript==

for (i = 0; i < document.getElementsByClassName("editsection").length; i++) {
    document.getElementsByClassName('editsection')[i].style.visibility = 'hidden';
}