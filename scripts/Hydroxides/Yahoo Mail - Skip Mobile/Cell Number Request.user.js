// ==UserScript==
// @name        Yahoo Mail - Skip Mobile/Cell Number Request
// @namespace   Hydroxides
// @description Skip the request for adding a recovery mobile / cell phone number
// @include     https://edit.yahoo.com/progreg/commchannel?.done=*&skipcpw=1*
// @version     1
// @grant       none
// ==/UserScript==

window.addEventListener('load', function() {
    document.getElementById("skipbtn").click();
}, false);