// ==UserScript==
// @name           La Crosse Tribune: Unblocker
// @description    Unblocks articles on the La Crosse Tribune website.
// @author         crank 
// @namespace      https://greasyfork.org/users/1112-crank
// @include    http://lacrossetribune.com/*
// @priority    9999
// @version        1.0
// ==/UserScript==

$("#blox-paywall-modal").remove();
$("#exposeMask").remove();

var elmDeleted = document.getElementById("t402-prompt-iframe");
elmDeleted.parentNode.removeChild(elmDeleted);
elmDeleted = document.getElementById("t402-inline-block");
elmDeleted.parentNode.removeChild(elmDeleted);
