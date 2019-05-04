// ==UserScript==
// @name        LIHKG App Url Replacer
// @description app shared link redirect to na.cx (web)
// @author	123321
// @version 	1.5
// @include 	http*://lihkg.com/thread/*

// @namespace 1
// ==/UserScript==

document.location.replace(document.location.href.replace('lihkg.com', 'lihkg.na.cx'));