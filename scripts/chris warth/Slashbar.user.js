// ==UserScript==
// @name         Slashbar
// @namespace    http://github.com/cswarth
// @version      0.3
// @description  remove sidebars from slashdot.org
// @author       Chris Warth
// @include http://*slashdot.org/*
// @include https://*slashdot.org/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js 
// @run-at document-start
// ==/UserScript==

$(function () {
    "use strict";

    var main = $(".has-rail-right");
    if (main) {
        main.removeClass("has-rail-right");
    }
    $("#slashboxes").remove();
});