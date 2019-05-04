// ==UserScript==
// @name        Remove banner and avatar from GameFAQs profiles
// @namespace   temp
// @description:en  Remove banner and avatar from gamefaqs.com community profiles.
// @include     http://www.gamefaqs.com/community/*
// @version     1
// @grant       none
// ==/UserScript==

var pod_header = document.getElementsByClassName('pod_profile_header')[0];
pod_header.style.display="none";