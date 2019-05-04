// ==UserScript==
// @name         Emoji Time Previews
// @namespace    salembeats
// @version      1.1
// @description  .
// @author       Cuyler Stuwe (salembeats)
// @include      https://worker.mturk.com/*
// @exclude      https://worker.mturk.com/projects/*
// @exclude      https://worker.mturk.com/dashboard
// @grant        none
// ==/UserScript==

const LOVE_WAGE_EMOJI = "?";
const SMILE_WAGE_EMOJI = "?";
const MEH_WAGE_EMOJI = "?";

const LOVE_WAGE_MIN = 12;
const SMILE_WAGE_MIN = 8;
const MEH_WAGE_MIN = 6;

function maxSecondsToHitHourlyRate(hitPay, targetHourly) {
    const SECONDS_IN_HOUR = 3600;
    return (hitPay * SECONDS_IN_HOUR) / targetHourly;
}

function secondsToMMSS(seconds) {
    var minutes = Math.floor(seconds/60);
    var extraSeconds = seconds % 60;
    var minutesString = minutes.toLocaleString("en", {minimumIntegerDigits: 2});
    var secondsString = extraSeconds.toLocaleString("en", {minimumIntegerDigits: 2});
    return `${minutesString}:${secondsString}`;
}

function addInfoTo(expandedSection) {
    let hitCapsule = expandedSection.parentElement;
    let rewardSection = hitCapsule.querySelector("span.reward-column");
    let rewardAmountDollars = Number(rewardSection.innerText.trim().substr(1));

    let loveWageMMSS = secondsToMMSS(Math.round(maxSecondsToHitHourlyRate(rewardAmountDollars, LOVE_WAGE_MIN)));
    let smileWageMMSS = secondsToMMSS(Math.round(maxSecondsToHitHourlyRate(rewardAmountDollars, SMILE_WAGE_MIN)));
    let mehWageMMSS = secondsToMMSS(Math.round(maxSecondsToHitHourlyRate(rewardAmountDollars, MEH_WAGE_MIN)));

    expandedSection.innerHTML += `<strong>Target Completion Times:</strong> ${LOVE_WAGE_EMOJI}: <= ${loveWageMMSS} ${SMILE_WAGE_EMOJI}: ${loveWageMMSS} - ${smileWageMMSS} ${MEH_WAGE_EMOJI}: ${smileWageMMSS} - ${mehWageMMSS}`;
}

var bodyObserver = new MutationObserver(function(mutations) {
    for(let mutation of mutations) {
        if(mutation.addedNodes.length > 0) {
            let firstAddedNode = mutation.addedNodes[0];
            if(firstAddedNode.tagName === "DIV") {
                if(firstAddedNode.classList.contains("p-b-sm") && firstAddedNode.classList.contains("expanded-row")) {
                    addInfoTo(firstAddedNode);
                }
            }
        }
    }
});

bodyObserver.observe(document.body, {subtree: true, childList: true});