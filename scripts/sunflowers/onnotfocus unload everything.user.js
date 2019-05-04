// ==UserScript==
// @name        onnotfocus unload everything
// @namespace   onnotfocus unload everything
// @description Final level of my onnotfocus series, this script is ultimate version of all those and it is really dangerous, it not only unload plugin animation, image animation, it also break textarea but save much more CPU than two previous version.
// @include     *
// @version     1
// @grant       none
// ==/UserScript==
var STOREDHTML = document.body.outerHTML;
document.addEventListener("visibilitychange", function() {
if (document.visibilityState == "hidden") {
document.body.outerHTML = "";
}
else
{
document.body.outerHTML = STOREDHTML;
}
});