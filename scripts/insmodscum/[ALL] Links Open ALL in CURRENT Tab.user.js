// ==UserScript==
// @name            [ALL] Links Open ALL in CURRENT Tab
// @author
// @description     Open ALL links in CURRENT tab.
// @downloadURL
// @grant
// @homepageURL     https://bitbucket.org/INSMODSCUM/userscripts-scripts/src
// @icon
// @include         http*://*
// @namespace       insmodscum 
// @require
// @run-at          document-start
// @updateURL
// @version         1.0
// ==/UserScript==

// rtfm: http://www.w3schools.com/tags/att_a_target.asp

var a = document.getElementsByTagName("a");
for( i=0; i < a.length; i++ )
a[i].target = "_self";