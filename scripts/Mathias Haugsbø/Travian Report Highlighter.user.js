// ==UserScript==
// @name         Travian Report Highlighter
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Hightlight reports with more than 1000 potential resources
// @author       Mathias Haugsbø
// @include        *://*.travian.*/berichte.php*
// @include        *://*/*.travian.*/berichte.php*
// @locale      EN
// ==/UserScript==

(function() {
    var limit = 1000;
    var arr = document.querySelectorAll(".carry");
    for (i=0; i<arr.length; i++) {
        if (Number(arr[i].alt.split("/")[1]) > limit) {
            arr[i].style.backgroundColor = "red";
        }
    }
})();