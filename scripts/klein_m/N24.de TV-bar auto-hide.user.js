// ==UserScript==
// @name           N24.de TV-bar auto-hide
// @include        *N24.de*
// @description    Automatically hide TV-bar
// @version        1.3
// @namespace      https://greasyfork.org/users/8629
// ==/UserScript==

window.addEventListener('load', function() { 
   document.evaluate("//div[@class='e_007']//a[@class='arrow']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click(); 
}, false);