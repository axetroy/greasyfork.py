// ==UserScript==
// @name           Neopets - Turn Off User Shop Coding
// @description    Removes user code from shops.
// @include        http://www.neopets.com/browseshop*
// @match          http://www.neopets.com/browseshop*
// @version        1.00
// @updated        18.03.2013
// @namespace https://greasyfork.org/users/6099
// ==/UserScript==

var e = document.getElementsByClassName('content')[0];
e.innerHTML = e.innerHTML.replace(/<!-- desc start -->[\s\S]*<!-- desc end -->/ig, "");