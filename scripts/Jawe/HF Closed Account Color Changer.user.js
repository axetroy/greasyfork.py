// ==UserScript==
// @name HF Closed Account Color Changer
// @author Jawe - http://www.hackforums.net/member.php?action=profile&uid=2219785
// @description Userscript to change color of closed users on HackForums.
// @version 1.0
// @include *hackforums.net*
// @language english
// @namespace https://greasyfork.org/users/24272
// ==/UserScript==

var spans = document.getElementsByTagName("span");
for(var i = spans.length - 1; i >= 0; i--) {
    if(spans[i].style.color === "rgb(56, 56, 56)") {
        var span = spans[i];
        span.style.color = "rgb(90, 90, 90)";
    }
}