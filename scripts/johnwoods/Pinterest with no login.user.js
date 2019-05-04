// ==UserScript==
// @name        Pinterest with no login
// @namespace   pinterest.com
// @version     0.2.0
// @description Allows to browse Pinterest without logging into the site.
// @include     http://*.pinterest.com/*
// @include     https://*.pinterest.com/*
// @require     http://code.jquery.com/jquery-latest.min.js
// @grant       GM_addStyle
// ==/UserScript==

GM_addStyle('.UnauthBanner { display: none !important; }');
GM_addStyle('.noScroll { overflow: auto !important; }');
GM_addStyle('.ModalManager { display: none !important; }');

$(document).ready(function() {
	$("body").removeClass("noTouch");
});
