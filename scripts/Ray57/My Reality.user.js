// ==UserScript==
// @name       My Reality
// @version    0.1
// @description  Rage Against the Dying of the Light
// @match      https://www.reddit.com/r/DotA2/*
// @copyright  2012+, You
// @namespace https://greasyfork.org/users/10145
// ==/UserScript==

var x = document.getElementsByClassName("flair-teamsecret");
for (var i = 0; i < x.length; i++) {
    x[i].setAttribute("style","opacity:1.0; -moz-opacity:1.0; filter:alpha(opacity=100)");
}
