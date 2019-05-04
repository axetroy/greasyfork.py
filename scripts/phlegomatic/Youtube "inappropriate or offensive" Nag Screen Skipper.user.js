// ==UserScript==
// @name         Youtube "inappropriate or offensive" Nag Screen Skipper
// @namespace    https://greasyfork.org/en/scripts/375457-youtube-inappropriate-or-offensive-nag-screen-skipper
// @version      0.0.1
// @description  Skips the "identified as inappropriate or offensive" screen.
// @author       Phlegomatic
// @match        https://www.youtube.com/verify_controversy?*
// @grant        none
// @run-at       document-end
// ==/UserScript==


var BTN = document.getElementsByClassName("yt-uix-button");

for (var i = 0; i < BTN.length; i ++) {
    if(BTN[i].getAttribute('onclick')==";return true;"){
           BTN[i].click();
       }
}
