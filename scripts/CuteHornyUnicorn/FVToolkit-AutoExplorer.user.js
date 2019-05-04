// ==UserScript==
// @name         FVToolkit-AutoExplorer
// @version      0.1b7
// @author       CuteHornyUnicorn
// @namespace    CuteHornyUnicorn
// @description  AutoExplorer for FV. Click once and it will click 'Explore Again' for you!
// @include      /^https?://www\.furvilla\.com/career/explorer/[0-9]+$/
// @grant        none
// ==/UserScript==

setInterval(function() {
    if (document.getElementsByClassName('modal-open')[0]) {
        var ClickittyClick = document.querySelector("div.modal-body > p.text-center");
        ClickittyClick.querySelector("a.btn").click();
    }
}, 500);