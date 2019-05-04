// ==UserScript==
// @name        Opium Pulses giveaway Auto join
// @namespace   Opium Pulses auto
// @author      SaddestPanda
// @description Opium Pulses giveaway Auto joiner
// @include     http*://www.opiumpulses.com/giveaways*
// @homepage    https://greasyfork.org/en/scripts/19858-opium-pulses-giveaway-auto-join
// @supportURL  https://greasyfork.org/en/scripts/19858-opium-pulses-giveaway-auto-join/feedback
// @version     3.3
// @grant       none
// ==/UserScript==

var timehelper = 0;
thelength = $(".giveaways-page-item").length;
for (var i=0;i<thelength;i++) {
    if($(".giveaways-page-item")[i].innerHTML.indexOf("ENTERED") == -1) {
        if($(".giveaways-page-item")[i].innerHTML.indexOf("FREE") != -1) {
            JoinGA($(".giveaways-page-item")[i].querySelector(".giveaways-page-item-img-btn-enter").href);
        }
    }
}

function JoinGA(hreflink) {
    setTimeout(function () {
        $.post(hreflink);
        console.log("Entered giveaway: " + hreflink);
    }, Math.floor((timehelper * 450) + 450));
    timehelper++;
}
