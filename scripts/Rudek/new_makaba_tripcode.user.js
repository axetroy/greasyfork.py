// ==UserScript==
// @name new_makaba_tripcode
// @version 1.0
// @author porgamest
// @match https://2ch.hk/rf/
// @match https://2ch.hk/rf/*
// @grant none
// @description none
// @namespace https://greasyfork.org/users/176859
// ==/UserScript==

(function() {
'use strict';
$("label[for=e-mail]").text("Трипкод");
document.getElementById("e-mail").name = "name";
document.getElementById("e-mail").placeholder = "трипкод";
document.getElementById("qr-e-mail").name = "name";
document.getElementById("qr-e-mail").placeholder = "трипкод";
})();