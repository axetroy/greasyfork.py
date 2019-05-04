// ==UserScript==
// @name           highlight_anchor_target
// @namespace      https://greasyfork.org/de/users/157797-lual
// @include        *.html
// @version        0.5
// @description	   if url contains a target, the anchor in the site will be highlighted
// @author         lual
// @grant          GM_addStyle
// ==/UserScript==
//
// Some URIs refer to a location within a document.
// This kind of URI ends with "#" followed by an anchor identifier (called the fragment identifier).
// This script will highligt the anchor in the document.
//
// For fundamentals and as an example for using this script - see...
//   http://www.w3.org/TR/html401/intro/intro.html#fragment-uri
//
//
// changes:        2011-03-17 initial
//                 2017-11-01 publish on greasyfork
/////////////////////////////////////////////////////////////////////////////////////////////////////////

(function() {
    'use strict';
    GM_addStyle(`
      :target {
        color: black !important;
        background-color: #78F48F !important;
        border: 1px solid #27A53F !important;
        border-bottom: 1px solid #1B6329 !important;
        border-right: 1px solid #1B6329 !important;
        border-radius: 3px;
      }`);

})();
