// ==UserScript==
// @name        Absolute Dates on FP
// @namespace   http://www.google.com
// @description because hover is stupid
// @include     http://facepunch.com/showthread.php?*
// @include     http://www.facepunch.com/showthread.php?*
// @version     0
// @grant       none
// ==/UserScript==


var elems = document.getElementsByTagName('span'), i;
for (i in elems) {
    if (elems[i].className == "date") {
        var relTime = elems[i].innerHTML;
        elems[i].innerHTML = elems[i].title;
        elems[i].title = relTime;
    }
}