// ==UserScript==
// @name Rickblock (WORKING VERSION)
// @include *
// @description The (WORKING) Rickroll blocker
// @run-at document-end
// @version 1.0
// @namespace https://greasyfork.org/en/users/11673-whatismyusername
// @grant none
// ==/UserScript==
var links = document.getElementsByTagName("a");
for (var i = 0; i < links.length; i++) {
    var linkto = links[i].getAttribute("href");
    var isrickroll = false;
    if (linkto)
       var isrickroll = (linkto.indexOf("dQw4w9WgXcQ") !== -1);
    if (isrickroll) {
        links[i].innerHTML = "(removed Rickroll)";
        links[i].setAttribute("href", "#");
    }
}