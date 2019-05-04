// ==UserScript==
// @name         Goto Queue After End
// @namespace    salembeats
// @version      1.1
// @description  Redirects you to your queue after you've finished your queue.
// @author       Cuyler Stuwe (salembeats)
// @include      *
// @grant        GM_info
// ==/UserScript==

const DEBUG_RUN_IN_TOP_FRAME = true;
const DEBUG_RUN_IN_IFRAME_ONLY_BUT_DONT_REQUIRE_MTURK_REFERRER = false;
const DEBUG_ALWAYS_PASS_SANITY_CHECK = false;
const DEBUG_PAINT_TRIGGERED_FRAMES_RED = false;

const SANITY_CHECK_TEXT_STRING = "no more hits assigned to you";

function isInMturkIframe() {
    if(DEBUG_RUN_IN_TOP_FRAME) {return true;}
    else if(DEBUG_RUN_IN_IFRAME_ONLY_BUT_DONT_REQUIRE_MTURK_REFERRER) {return (window !== window.top);}
    return ( window !== window.top && (document.referrer.includes("mturk.com/mturk/preview") || document.referrer.includes("mturk.com/mturk/accept") || document.referrer.includes("mturk.com/mturk/continue") || document.referrer.includes("mturk.com/mturk/return") || document.referrer.includes("mturk.com/mturk/previewandaccept") || document.referrer.includes("worker.mturk.com/projects/")));
}
if (!isInMturkIframe()) {return;}

function passSanityCheck() {
    if(DEBUG_ALWAYS_PASS_SANITY_CHECK) {return true;}
    if(SANITY_CHECK_TEXT_STRING && SANITY_CHECK_TEXT_STRING.length > 0) {
        return Boolean(document.querySelector("#alertBox")) && document.querySelector("#alertBox").innerText.includes("There are currently no HITs assigned to you");
    }
}

function runOnStart() {
    if(DEBUG_PAINT_TRIGGERED_FRAMES_RED) {
        document.body.style.backgroundColor = "red";
    }
    // CODE THAT RUNS AS SOON AS HIT IS LOADED GOES HERE
    document.location.href = "https://www.mturk.com/mturk/myhits";
}

function keyListener(event) {
    if(event.type === 'keydown') {

        // SCRIPT KEYDOWN CODE GOES HERE

    }
    else if(event.type === 'keyup') {

        // SCRIPT KEYUP CODE GOES HERE

    }
}

function clickListener(event) {

    // SCRIPT CLICK CODE GOES HERE
    switch(event.target) {
        default:
            break;
    }

}

(function main() {

    if(!passSanityCheck()) {
        console.log(`FAILED SANITY CHECK: ${GM_info.script.name}`);
        return;
    }
    else {
        console.log(`PASSED SANITY CHECK: ${GM_info.script.name}`);
    }

    runOnStart();

    document.addEventListener('keydown', keyListener);
    document.addEventListener('keyup', keyListener);
    document.addEventListener('click', clickListener);
})();