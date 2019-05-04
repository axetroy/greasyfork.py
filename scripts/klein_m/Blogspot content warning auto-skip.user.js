// ==UserScript==
// @name           Blogspot content warning auto-skip
// @include        *blogspot.*
// @include        *blogger.com/blogin.g?blogspotURL=*
// @description    Automatically skip Blogspot / Blogger content warning disclaimer
// @version        1.1
// @namespace https://greasyfork.org/users/8629
// ==/UserScript==

window.location.replace(document.getElementsByClassName('maia-button maia-button-primary')[0].href);
