// ==UserScript==
// @name         Vulcun Jackpot Autoclicker
// @namespace    http://your.homepage/
// @version      0.36
// @description  Autoclicker for the Vulcun's jackpot
// @author       You
// @match        https://vulcun.com/user/jackpot
// @grant        none
// ==/UserScript==

// Check my new Autolooter too: https://greasyfork.org/en/scripts/14315-vulcun-loot-autoclicker-streams-scan

function enterContest() {
    $('#submit-wager').each(function() {
        if($(this).attr('disabled') == 'disabled') {
           console.log("button disabled: skipped");
           return;
        }

        console.log(this);
        this.click();
        console.log("Button clicked");
    });
}

setInterval(enterContest, 30000);