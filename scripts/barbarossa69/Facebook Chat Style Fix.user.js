// ==UserScript==
// @name			Facebook Chat Style Fix
// @namespace		FBChatFix
// @description		Temp Fix for Facebook Chat window styles in older versions of Mozilla.
// @include			https://*.facebook.com/*
// @include			http://*.facebook.com/*
// @grant			GM_addStyle
// @version 0.0.1.20160804082254
// ==/UserScript==

var Banner = document.getElementById('pagelet_bluebar');
if (Banner) {
	var h = (Banner.clientHeight+4)||40;
	GM_addStyle ("#pagelet_bluebar { position: fixed !important; width:100% !important; z-index:301 !important }");
	GM_addStyle ("#globalContainer { padding-top: "+h+"px !important; }");
}	

GM_addStyle ("#outdatedBrowserBanner { display: none; }");
GM_addStyle ("._5wd4 { display: block !important; overflow: visible !important; }");
GM_addStyle ("._ua0 { float: right !important; }");
GM_addStyle ("._ua1 { float: left !important; min-width:95% !important; }");
GM_addStyle ("._5wde { margin-bottom:3px !important; }");
GM_addStyle ("._31o4 { display: inline !important; vertical-align:top !important; }");
GM_addStyle ("._fmi { width: 99% !important; }");
GM_addStyle ("._5aj7 { width: 99% !important; }");
GM_addStyle (".UFICommentPhotoIcon { width: 28px !important; }");

//GM_addStyle ("._5qi9 { display: inline-block !important; }");
//GM_addStyle ("._50-v { margin-left: 2px !important; }");
//GM_addStyle ("._15p4 { min-width:150px !important; width: 95% !important; }");
