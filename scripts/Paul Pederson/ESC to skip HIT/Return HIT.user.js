// ==UserScript==
// @name         ESC to skip HIT/Return HIT
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Skip or return a HIT by pressing ESC
// @author       Karuption
// @match        https://worker.mturk.com/projects/*
// @grant        none
// ==/UserScript==

$(document).ready(function() {
    if( $(".force-inline").length != 0) {
        return;
    }
});

$(window).keydown(e => {

        if(e.which == 27) {
            $(".force-inline").submit();
        }
});