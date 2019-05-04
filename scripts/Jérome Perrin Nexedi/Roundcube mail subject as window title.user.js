// ==UserScript==
// @name         Roundcube mail subject as window title
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Use mail subject a window title when composing an email.
// @author       Jérome Perrin <jerome@nexedi.com>
// @match        https://*roundcubemail*/*
// @grant        none
// ==/UserScript==

$(function () {
    // set mail subject as window title
    $("#compose-subject").change(function () {
        document.title = "Roundcube Webmail :: " + $("#compose-subject").val();
    });
    $("#compose-subject").change();
});