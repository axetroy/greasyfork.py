// ==UserScript==
// @name        Remove Feedburner Link Information
// @namespace   http://userscripts.org/users/Scuzzball
// @include     *
// @version     1.0
// @description Removes tracking info from feedburner links
// ==/UserScript==

if(window.location.search.match(/utm_source=feedburner/))
{
    window.location.search = '';
}