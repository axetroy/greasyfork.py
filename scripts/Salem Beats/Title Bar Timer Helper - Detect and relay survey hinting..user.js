// ==UserScript==
// @name         Title Bar Timer Helper - Detect and relay survey hinting.
// @namespace    salembeats
// @version      4.2
// @description  Helper script for mTurk Title Bar Timer. Tells the script whether the worker frame is likely a survey that will be completed outside the HIT frame, and sets its behavior accordingly.
// @author       Cuyler Stuwe (salembeats)
// @include      *
// @grant        none
// @icon         https://i.imgur.com/Y68Qxdd.png
// @run-at document-idle
// ==/UserScript==

function isSurvey() {
    let qualtricsLinks = document.querySelectorAll("a[href*='qualtrics']");
    let surveyMonkeyLinks = document.querySelectorAll("a[href*='surveymonkey']");

    let hasSurveyLinks = Boolean(qualtricsLinks.length > 0 || surveyMonkeyLinks.length > 0);

    if(hasSurveyLinks) {return true;}

    let documentText = document.body.innerText.toLowerCase();

    let mentionsSurveyContent = Boolean( documentText.includes("qualtrics") || documentText.includes("surveymonkey") || documentText.includes("survey") || documentText.includes("study"));

    if(mentionsSurveyContent) {return true;}

    return false;
}

(function main() {

    if (window === window.top) {
        return;
    } // We only want to run in frames.

    if(!document.referrer.toLowerCase().includes("worker.mturk.com/projects")) {
        return;
    } // We only want to run in frames that are nested inside of an mturk work frame.

    let assignmentIDElement = document.querySelector("#assignmentId");
    let hitIDElement = document.querySelector("input[name='hitId']");
    if((!assignmentIDElement) && (!hitIDElement)) {
        return;
    } // If it doesn't have an assignment ID element or a HIT ID element, it's not a valid mTurk worker frame. We don't want it.

    window.addEventListener("message", function handleMessage(event) {
        if(event.data.msg === "Are you a survey HIT?") {
            // console.log("BABY FRAME: Dad asked whether I'm a survey.");
            if(isSurvey()) {
                window.parent.postMessage({msg: "I am a survey HIT."}, "*");
                // console.log("BABY FRAME: I told dad I am definitely a survey.");
            }
            else {
                window.parent.postMessage({msg: "I am not a survey HIT."}, "*");
                // console.log("BABY FRAME: I told dad I'm probably not a survey.");
            }
        }
    });

    window.parent.postMessage({msg: "I'm ready for you to ask me questions."}, "*");
    // console.log("BABY FRAME: I told dad that I'm ready for him to ask me questions.");
})();