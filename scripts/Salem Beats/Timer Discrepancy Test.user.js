// ==UserScript==
// @name         Timer Discrepancy Test
// @namespace    salembeats
// @version      2.2
// @description  Timer descrepancy test to demonstrate background tab timer throttling. Runs on TurkerHub and displays results in the tab's title bar.
// @author       You
// @include      https://turkerhub.com/threads/*/*
// @include      https://worker.mturk.com/?filters[search_term]=pandacrazy=on
// @grant        none
// ==/UserScript==

const ARE_WE_PARANOID_ABOUT_THIS_SCRIPTS_CPU_HIT = true;

var INTERVAL_TIME = 700;

var lastTimestamp;
var mostRecentTimestamp;
var lastGap;

setInterval(() => {
    lastTimestamp = mostRecentTimestamp;
    mostRecentTimestamp = performance.now();

    if(lastTimestamp !== undefined && mostRecentTimestamp !== undefined) {
        lastGap = mostRecentTimestamp - lastTimestamp;
        let deviationAmount = Math.abs(INTERVAL_TIME - lastGap);
        let deviationPercentage = (deviationAmount / INTERVAL_TIME) * 100;
        document.title = `${deviationPercentage.toLocaleString("EN", {maximumFractionDigits: 2})}% dev ${INTERVAL_TIME}ms`;

        if(ARE_WE_PARANOID_ABOUT_THIS_SCRIPTS_CPU_HIT) {
            let suchWorkMuchTimeTimestamp = performance.now();
            let holyCrapThatTookForeverGap = suchWorkMuchTimeTimestamp - mostRecentTimestamp;
            console.log(`HOLY FUCK, CALCULATING AND CHANGING THE TITLE TOOK`, holyCrapThatTookForeverGap, `MILLISECONDS! HOW WILL THE SITE EVER FUNCTION?!`);
        }
    }
}, INTERVAL_TIME);