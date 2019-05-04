// ==UserScript==
// @name         MetaFilter inline video fishy icon
// @namespace    https://greasyfork.org/scripts/1528-metafilter-inline-video-fishy-icon
// @version      4.0
// @description  Replaces the inline video "play" icon with a picture of a triangular fish (for logged-in members)
// @include      http://metafilter.com/*
// @include      http://*.metafilter.com/*
// @include      https://metafilter.com/*
// @include      https://*.metafilter.com/*
// @match        http://metafilter.com/*
// @match        http://*.metafilter.com/*
// @match        https://metafilter.com/*
// @match        https://*.metafilter.com/*
// @grant        none
// ==/UserScript==
//
// Version 4.0: 2015-05-25 - Rewrote script so it works with the Modern theme.
//  Also now works with plutor's MeFi Deleted Posts greasemonkey script
//  (i.e. fish icon appears in deleted posts on front and index pages).
//
// Version 3.0: 2014-05-23 - Changed script URLs to point to greasyfork.org,
//  since userscripts.org hasn't been stable recently; replaced @namespace 
//  with script home page. BTW the profile preference option on MeFi has since
//  been relabeled "Use secure browsing" (from "Use SSL everywhere").
//
// Version 2.0: 2013-07-03 - Now works with the new "Use SSL everywhere" user
//  profile preference for logged-in MeFi members.  Also added support for
//  automatic script updates, as well as better compatibility with Chrome.
//
// Original fish image design created by Everaldo Coelho and YellowIcon.
// The image used in this script is a derivation from a vector version by
// Wikimedia Commons user Mouagip (image licensed under LGPL):
// <https://commons.wikimedia.org/wiki/File:Crystal_Clear_app_babelfish_vector.svg>
//
// This script was inspired by a MetaTalk comment from yellowbinder:
// <http://metatalk.metafilter.com/22278/Now-you-can-close-the-comments#1043232>

var modernfishify = function () {
   // Fishy icon png converted to base64
   var fishyicon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAOCAYAAAD0f5bSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAoxJREFUeNpckl1Ik1EYx//vu/fLbbrJ3CSdGm5qS+mDvi6MvFAHxi68kCAV80KJCLoJAoOoi4Iy6K6wuwoqvAgz+tCiQjGnaB/Eyq25dHMp2qZO58f77nX2LCGkA+fmnPM7z//5P3+m/TCwuQmoKo5Z7faK8OTUAwsnB1vqAWUdkAGs0hYzAG3m1luWZQGGDrEBN8dpjlY2nBk2FNpvhMdxWeCQnbr/f7EMkaLEQdLyiZDXV2MrLctwXX98IWJvueKf5t7LSzjIc1sV/kEpCeadJdDnWJDUaV2egd7VNAnY23gWUs1tR0C2PVuPoVrgt0H0Q6WyJiOZTNhc5xq6LQVZJiXoAaOGkHdoFxyn7+6ISEdeKytwCvQZTzBrsmZXF5U7Ayaz8ZIoh6FPZ8BbqH02BiQzSEEuSk+2YXbNeisyBSwtMdA0HjDOlbvqLuYX7t7nH+xGSYUNgpUgTTE1oiEL+9E/6MOjPtkSGp0VI2H1LVvsyB1PTA1/y9KJsOmN0CZekJ1uIDENxF8SPIjg9CwWjGWovVrXlm4WO7iFX54CxwlnqSosg+UUIDoDCLQjcWDGRBLf4VRjHuq5dMSGF5XY74Sf4yW+aj7kWw4OjXao82p2frKoCfDTHD4BYRHIKaeKXoTdk2MjnWhdjuIDJwjo9Xd1v5kLKF4+U3TK+tYmcfM4ySJofxVUqQYD7c33IzNz5yUDoiuLW5b/EA0Gr56UKHG5z/fZ3RMbFeLyxB4gvwQ/++5MjI98b07LQpSlISMVo+3x4HWQx3o/1o7cu9nJmFcR//oEgZ6H1wwW8oba3UiFkAxNsSn4b0xEGpxGC1kymp9PDnn4iVdfnioriS6dfiu1Kk2CIeiPAAMAYE4AKsjUBWkAAAAASUVORK5CYII=';

   // Use jQuery to add fishy icon to inline video link bg
   $('a.vid').css({'background-image': 'url('+fishyicon+')', 'background-repeat': 'no-repeat', 'background-position': 'center', 'border-color': 'transparent', 'border-style': 'none', 'border-width': '0', 'width': '13', 'height': '14'});

   // and hide default play icons
   $('a.vid svg, a.vid img').css({'visibility':'hidden'});
};

// Insert modernfishify script into page DOM (for Chromium compatibility). Assumes
// the page has already loaded jQuery.
var script = document.createElement('script');

script.type = "text/javascript";
script.textContent = '(' + modernfishify.toString() + ')();';
document.body.appendChild(script);

// Todo: make larger png and/or new svg image and use for Modern theme
 // .icon-icon_19502 and #icon-icon_19502 used for icon svg in Modern theme;
 //  youtube_yellow.png used in Classic & Plain themes, even for Vimeo.
