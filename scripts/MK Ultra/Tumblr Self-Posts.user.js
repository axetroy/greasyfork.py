// ==UserScript==
// @include *://*.tumblr.com/*
// @exclude *://www.tumblr.com/*
// @grant GM_registerMenuCommand
// @grant GM_openInTab
// @name Tumblr Self-Posts
// @description Show only a Tumblr's self-posts using a third-party service (http://studiomoh.com/fun/tumblr_originals/?tumblr=)
// @version 0.0.2.20170409
// @namespace https://greasyfork.org/users/112442
// ==/UserScript==
function tumblrNewTab(){
    let name = window.location.host.split('.')[0];
    GM_openInTab( 'http://studiomoh.com/fun/tumblr_originals/?tumblr=' + name );
}
GM_registerMenuCommand( 'Show Self Posts', tumblrNewTab );
