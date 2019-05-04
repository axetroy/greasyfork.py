// ==UserScript==
// @name       CS User Manuals Yes 
// @author     Cristo
// @version    0.1
// @description  Fills All Yes mturk
// @include       *
// @namespace https://greasyfork.org/users/1973
// ==/UserScript==

var elements = document.getElementsByTagName("input");
for (i = 0; i < elements.length; i++) {
    if (elements[i].value == "yes") {
        elements[i].checked = true;
    }
}