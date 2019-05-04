// ==UserScript==
// @name       Nofollow Links - Red Dotted Border
// @namespace  http://www.gratissaker.com/
// @version    0.2
// @description  This script adds a red dotted border to all nofollow links on all URLs.
// @match      *://*/*
// @copyright  2017+, CodeNode - GratisSaker.com
// ==/UserScript==

(function() {
  
    var links = document.getElementsByTagName("a");
  
    for (i = 0; i < links.length; i++) {
        var link = links[i];
        var rel = link.rel;

        if(rel.indexOf("nofollow") !== -1) {
            link.style["border"] = "dotted red";
            link.style["border-width"] = "1px 1px 2px 1px";
        }
    }
  
})();