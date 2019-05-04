// ==UserScript==
// @name        Dropbox Login: uncheck remember-me
// @description Automatically UNchecks the "Remember me" field on Dropbox login page.
// @include     https://www.dropbox.com/login*
// @include     https://www.dropbox.com/
// @run-at      document-idle
// @grant       none
// @version     1.11
//
// Updated: 2018-07-11
// Author: https://github.com/Amarok24
// @namespace https://greasyfork.org/users/166103
// ==/UserScript==

function unCheck() {
    var inp = document.querySelector(".remember-me input");
    inp.attributes["aria-checked"] = "false";
    inp.checked = "";
}

window.setTimeout(unCheck, 1000);

document.getElementById("sign-up-in").addEventListener("click", unCheck);
