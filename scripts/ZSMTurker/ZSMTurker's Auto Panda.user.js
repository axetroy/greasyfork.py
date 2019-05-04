// ==UserScript==
// @author      ZSMTurker
// @name        ZSMTurker's Auto Panda
// @namespace   https://greasyfork.org/users/2291
// @description Automatically changes preview links into panda links.
// @match       https://www.mturk.com/mturk/preview*
// @exclude     https://www.mturk.com/mturk/previewandaccept*
// @require     http://code.jquery.com/jquery-latest.min.js
// @version     0.1
// ==/UserScript==

var currentURL = location.href,
    currentURLSplit = currentURL.split( '?' ),
    newURL = currentURLSplit[ 0 ] + 'andaccept?' + currentURLSplit[ 1 ];

window.open( newURL, '_self' );