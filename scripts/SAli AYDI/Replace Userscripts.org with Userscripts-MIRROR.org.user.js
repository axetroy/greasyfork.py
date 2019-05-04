// ==UserScript==
// @name        Replace Userscripts.org with Userscripts-MIRROR.org
// @namespace   salih2014
// @description Replace Userscripts.org( Site down)  with Userscripts-MIRROR.org ( Cloning in progress)
// @include     http://*.*
// @include     https://*.*
// @exclude     http://userscripts.org/*
// @exclude     https://userscripts.org/*
// @exclude     http://userscripts.org:8080/*
// @exclude     https://userscripts.org:8080/*
// @version     1
// @grant       none
// ==/UserScript==

var targ = document.links;
for (i = 0; i < targ.length; i++)
{
 
    if ( targ[i] && targ[i].href && targ[i].href.match( 'https?:\/\/userscripts.org') ) {
        targ[i].href = targ[i].href.replace('://userscripts.org', '://userscripts-mirror.org');
    }
};