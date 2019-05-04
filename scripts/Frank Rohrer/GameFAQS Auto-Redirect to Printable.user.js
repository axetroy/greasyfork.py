// ==UserScript==
// @name        GameFAQS Auto-Redirect to Printable
// @namespace   rudicron
// @description Whenever a GameFAQs FAQ is loaded, redirect to the Printable Version of said FAQ.
// @include     http://www.gamefaqs.com/*/*/faqs/*
// @include     https://www.gamefaqs.com/*/*/faqs/*
// @exclude     http://www.gamefaqs.com/*/*/faqs/*?print=1*
// @exclude     https://www.gamefaqs.com/*/*/faqs/*?print=1*
// @include     http://gamefaqs.gamespot.com/*/*/faqs/* 
// @include     https://gamefaqs.gamespot.com/*/*/faqs/* 
// @exclude     http://gamefaqs.gamespot.com/*/*/faqs/*?print=1* 
// @exclude     https://gamefaqs.gamespot.com/*/*/faqs/*?print=1* 
// @version     1.2
// @grant       none
// @run-at      document-start
// ==/UserScript==

//attempt move before anything else runs (would really like to do this before css and other js are retrieved, but GM limitations.)
window.location.replace(window.location.href.concat("?print=1"));
