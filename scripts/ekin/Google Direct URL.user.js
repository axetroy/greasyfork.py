// ==UserScript==
// @name         Google Direct URL
// @version      0.2
// @description  Direct URL in search results.
// @author       ekin@gmx.us
// @namespace    https://greasyfork.org/en/users/6473-ekin
// @include      /^https?://www\.google\.[a-z\.]+/.*/
// @grant        none
// ==/UserScript==

function remove_events() {
    var results = document.querySelectorAll("h3.r a");
    for(var i=0; i<results.length; i++) {
    results[i].removeAttribute("onmousedown");
    }
}

remove_events();

setInterval(function() {
    remove_events();
}, 100);