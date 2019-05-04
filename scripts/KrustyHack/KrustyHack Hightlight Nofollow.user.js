// ==UserScript==
// @name       KrustyHack Hightlight Nofollow
// @namespace  http://www.nicolashug.com
// @version    0.1
// @description  simply highlight nofollow links on a page
// @match      *://*/*
// @copyright  2014+,  KrustyHack
// ==/UserScript==

(function() {
    var links = document.getElementsByTagName("a");
    for (i = 0; i < links.length; i++) {
        var link = links[i];
        var rel = link.rel;
        if(rel.indexOf("nofollow") !== -1) {
            link.style["background-color"] = "red";
            link.style["color"] = "white";
        }
    }
})();