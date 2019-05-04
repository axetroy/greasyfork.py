// ==UserScript==
// @name           Stop asking to save auth-code
// @description    Will set the "remember this computer" check box off by default in Google 2-Step authentication. To never save this computer. Good for work computers.
// @include        https://accounts.google.com/*
// @version        1.0
// @namespace https://greasyfork.org/users/18002
// ==/UserScript==

document.getElementById("trustDevice").checked = false;