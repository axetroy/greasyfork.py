// ==UserScript==
// @name        onnotfocus unload tab and save CPU!
// @namespace   onnotfocus unload tab and save CPU!
// @description This script detect if you are using a tab or not, if not it unload unused tab using display:none and save your CPU Usage, this script reduce CPU Usage drastically because it unload flash, gif, everything that cause animation and eat up your CPU Usage.
// @include     *
// @version     1
// @grant       none
// @run-at document-start
// ==/UserScript==

document.addEventListener("visibilitychange", function() {
if (document.visibilityState == "hidden") {
document.documentElement.style.display = "none";
}
else
{
document.documentElement.style.display = "block";
}
});