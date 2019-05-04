// ==UserScript==
// @name GMX logout unreminder 2015
// @author klein_m
// @namespace   https://greasyfork.org/users/8629
// @description Skips GMX logout reminder
// @include     https://navigator.gmx.net/remindlogout*
// @version     0.2
// ==/UserScript==

window.addEventListener('load', function() { 
   document.evaluate("//button[@class='button cta large']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click(); 
}, false);