// ==UserScript==
// @name        IFL - Load Full Article
// @namespace   Mikhoul
// @description Load complete article
// @include     http*://www.iflscience.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     1
// @grant    GM_addStyle
// ==/UserScript==


//--- Note that the contains() text is case-sensitive.
var TargetLink = $("a:contains('Full Article')")

if (TargetLink.length)
    window.location.href = TargetLink[0].href


// document.getElementsByClassName('.full-article')[0].click() ;
