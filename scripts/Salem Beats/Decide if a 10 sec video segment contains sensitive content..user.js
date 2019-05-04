// ==UserScript==
// @name         Decide if a 10 sec video segment contains sensitive content.
// @namespace    salembeats
// @version      1.1
// @description  .
// @author       Cuyler Stuwe (salembeats)
// @include      *
// @grant        GM_info
// ==/UserScript==

const VIDEO_CLICK_WAIT = 100;

let baseInputHasBeenReceived = false;

const DEBUG_RUN_IN_TOP_FRAME = false;
const DEBUG_RUN_IN_IFRAME_ONLY_BUT_DONT_REQUIRE_MTURK_REFERRER = false;
const DEBUG_ALWAYS_PASS_SANITY_CHECK = false;
const DEBUG_PAINT_TRIGGERED_FRAMES_RED = false;

const SANITY_CHECK_TEXT_STRING = "In this task, you will be given a YouTube video segment of at most 10 seconds.";

function isInMturkIframe() {
    if(DEBUG_RUN_IN_TOP_FRAME) {return true;}
    else if(DEBUG_RUN_IN_IFRAME_ONLY_BUT_DONT_REQUIRE_MTURK_REFERRER) {return (window !== window.top);}
    return ( window !== window.top && (document.referrer.includes("mturk.com/mturk/preview") || document.referrer.includes("mturk.com/mturk/accept") || document.referrer.includes("mturk.com/mturk/continue") || document.referrer.includes("mturk.com/mturk/return") || document.referrer.includes("mturk.com/mturk/previewandaccept") || document.referrer.includes("worker.mturk.com/projects/")));
}
if (!isInMturkIframe()) {return;}

function passSanityCheck() {
    if(DEBUG_ALWAYS_PASS_SANITY_CHECK) {return true;}
    if(SANITY_CHECK_TEXT_STRING && SANITY_CHECK_TEXT_STRING.length > 0) {
        return document.body.innerHTML.includes(SANITY_CHECK_TEXT_STRING);
    }
}

function runOnStart() {
    if(DEBUG_PAINT_TRIGGERED_FRAMES_RED) {
        document.body.style.backgroundColor = "red";
    }

    // CODE THAT RUNS AS SOON AS HIT IS LOADED GOES HERE

    setTimeout( () => {document.getElementById("video-placeholder").click();}, VIDEO_CLICK_WAIT);

    document.getElementById("yes-playable").click();

    document.getElementById("video-embed").insertAdjacentHTML("beforebegin", "" +
                                                              "<div>" +
                                                              "<strong id='aKey'>A:</strong> Safe English / " +
                                                              "<strong id='sKey'>S:</strong> Safe English + Text / " +
                                                              "<strong id='dKey'>D:</strong> Safe Foreign / " +
                                                              "<strong id='fKey'>F:</strong> Safe Foreign + Text " +
                                                              "<strong id='gKey'>G:</strong> Safe, No Words" +
                                                              "</div>" +
                                                              "<div>" +
                                                              "<strong id='jKey'>J:</strong> FPS Game / " +
                                                              "<strong id='kKey'>K:</strong> Cyka Blyat / " +
                                                              "<strong id='lKey'>L:</strong> Guess It's A Porno / " +
                                                              "<strong id='semicolonKey'>;:</strong> Sexy but not bannable" +
                                                              "</div>" +
                                                              "<div>" +
                                                              "<strong id='enterKey'>Enter:</strong> SUBMIT" +
                                                              "</div>" +
                                                              "");

    window.focus();
}

function resetAllLeftHandIndicators() {
    document.getElementById("aKey").style.color = "";
    document.getElementById("sKey").style.color = "";
    document.getElementById("dKey").style.color = "";
    document.getElementById("fKey").style.color = "";
    document.getElementById("gKey").style.color = "";
}

function resetAllRightHandIndicators() {
    document.getElementById("jKey").style.color = "";
    document.getElementById("kKey").style.color = "";
    document.getElementById("lKey").style.color = "";
    document.getElementById("semicolonKey").style.color = "";
}

function submitToSergey() {
    document.getElementById("submit").click();
}

function markAsSafeEnglishWithoutText() {
    baseInputHasBeenReceived = true;
    document.querySelector("input[name='speech-presence'][value='ENGLISH']").click();
    document.querySelector("input[name='text-presence'][value='NO_LANGUAGE_PRESENT']").click();
    document.querySelector("input[name='sensitivity'][value='NOT_SENSITIVE']").click();
}

function markAsSafeEnglishWithText() {
    baseInputHasBeenReceived = true;
    document.querySelector("input[name='speech-presence'][value='ENGLISH']").click();
    document.querySelector("input[name='text-presence'][value='ENGLISH']").click();
    document.querySelector("input[name='sensitivity'][value='NOT_SENSITIVE']").click();
}

function markAsSafeForeignWithoutText() {
    baseInputHasBeenReceived = true;
    document.querySelector("input[name='speech-presence'][value='FOREIGN']").click();
    document.querySelector("input[name='text-presence'][value='NO_LANGUAGE_PRESENT']").click();
    document.querySelector("input[name='sensitivity'][value='NOT_SENSITIVE']").click();
}

function markAsSafeForeignWithText() {
    baseInputHasBeenReceived = true;
    document.querySelector("input[name='speech-presence'][value='FOREIGN']").click();
    document.querySelector("input[name='text-presence'][value='FOREIGN']").click();
    document.querySelector("input[name='sensitivity'][value='NOT_SENSITIVE']").click();
}

function markAsSafeWithoutWords() {
    baseInputHasBeenReceived = true;
    document.querySelector("input[name='speech-presence'][value='NO_LANGUAGE_PRESENT']").click();
    document.querySelector("input[name='text-presence'][value='NO_LANGUAGE_PRESENT']").click();
    document.querySelector("input[name='sensitivity'][value='NOT_SENSITIVE']").click();
}

function markAsFPSGame() {
    document.querySelector("input[name='sensitivity'][value='SENSITIVE']").click();
    document.querySelector("input[name='categories'][value='VIOLENCE']").click();
    document.querySelector("input[name='categories'][value='WEAPONS_OR_WAR']").click();
    document.querySelector("input[name='severity'][value='SOME']").click();
    document.querySelector("input[name='mediums'][value='VISUALS']").click();
}

function markAsSwearing() {
    document.querySelector("input[name='sensitivity'][value='SENSITIVE']").click();
    document.querySelector("input[name='categories'][value='PROFANE_OR_OFFENSIVE_LANGUAGE']").click();
    document.querySelector("input[name='severity'][value='MANY']").click();
    document.querySelector("input[name='mediums'][value='SPEECH']").click();
}

function markAsPorn() {
    document.querySelector("input[name='sensitivity'][value='SENSITIVE']").click();
    document.querySelector("input[name='categories'][value='SEXUAL']").click();
    document.querySelector("input[name='categories'][value='NUDITY']").click();
    document.querySelector("input[name='severity'][value='MOST']").click();
    document.querySelector("input[name='mediums'][value='VISUALS']").click();
}

function markAsSexy() {
    document.querySelector("input[name='sensitivity'][value='SENSITIVE']").click();
    document.querySelector("input[name='categories'][value='SEXUAL']").click();
    document.querySelector("input[name='severity'][value='SOME']").click();
    document.querySelector("input[name='mediums'][value='VISUALS']").click();
}

function keyListener(event) {
    if(event.type === 'keydown') {

        if(event.target.type !== "text" && event.target.nodeName !== "TEXTAREA") {

            // SCRIPT KEYDOWN CODE GOES HERE
            switch(event.key.toLowerCase()) {
                case "a":
                    resetAllLeftHandIndicators();
                    document.getElementById("aKey").style.color = "green";
                    markAsSafeEnglishWithoutText();
                    break;
                case "s":
                    resetAllLeftHandIndicators();
                    document.getElementById("sKey").style.color = "green";
                    markAsSafeEnglishWithText();
                    break;
                case "d":
                    resetAllLeftHandIndicators();
                    document.getElementById("dKey").style.color = "green";
                    markAsSafeForeignWithoutText();
                    break;
                case "f":
                    resetAllLeftHandIndicators();
                    document.getElementById("fKey").style.color = "green";
                    markAsSafeForeignWithText();
                    break;
                case "g":
                    resetAllLeftHandIndicators();
                    document.getElementById("gKey").style.color = "green";
                    markAsSafeWithoutWords();
                    break;
                case "j":
                    resetAllRightHandIndicators();
                    document.getElementById("jKey").style.color = "green";
                    markAsFPSGame();
                    break;
                case "k":
                    resetAllRightHandIndicators();
                    document.getElementById("kKey").style.color = "green";
                    markAsSwearing();
                    break;
                case "l":
                    resetAllRightHandIndicators();
                    document.getElementById("lKey").style.color = "green";
                    markAsPorn();
                    break;
                case ";":
                    resetAllRightHandIndicators();
                    document.getElementById("semicolonKey").style.color = "green";
                    markAsSexy();
                default:
                    break;
            }
        }

        if(event.key === "Enter") {
            event.preventDefault();

            if(baseInputHasBeenReceived) {
                submitToSergey();
            }
            else {
                alert("Can't 'enter-to-submit' until you've selected something with the left hand.");
            }
        }

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