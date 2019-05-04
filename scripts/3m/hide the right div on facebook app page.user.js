// ==UserScript==
// @id             UKZFBRIGHTDIV_0001
// @name           hide the right div on facebook app page
// @version        1.0.0
// @namespace      
// @author         UKZ
// @description    hides the right div (app ads) within app on facebook
// @include        https://apps.facebook.com/*
// @run-at         document-end
// @require        http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

// removing right col display
$("div.hasRightCol").removeClass("hasRightCol");