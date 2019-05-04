// ==UserScript==
// @name         Steam Age Warning Nag Screen Skipper
// @namespace    https://greasyfork.org/en/scripts/370848-steam-age-warning-nag-screen-skipper
// @version      0.0.1
// @description  Skips the "Content may not be appropriate for all ages" screen.
// @author       Phlegomatic
// @match        https://steamcommunity.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==


var EBId = document.getElementById("age_gate_btn_continue");

if(EBId!=null){
 document.getElementById("age_gate_btn_continue").click();
}


