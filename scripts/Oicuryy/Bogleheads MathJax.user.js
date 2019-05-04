// ==UserScript==
// @name Bogleheads MathJax
// @description Adds MathJax to Bogleheads.org forum pages to render AsciiMath
// @version 0.1
// @include https://www.bogleheads.org/forum/*
// @namespace https://greasyfork.org/users/171115
// ==/UserScript==

var jsCode = document.createElement('script');
jsCode.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=AM_CHTML');
document.head.appendChild(jsCode);