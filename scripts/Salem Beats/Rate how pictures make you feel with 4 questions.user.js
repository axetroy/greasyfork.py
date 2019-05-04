// ==UserScript==
// @name         Rate how pictures make you feel with 4 questions
// @namespace    salembeats
// @version      1.2
// @description  Click the emotion, then give sentiment values with number keys. Autosubmits when all data has been entered. groupId=3I2V0CCR8SKQYV7O1T2I5XK2C401JQ
// @author       Cuyler Stuwe (salembeats)
// @include      *
// @grant        GM_info
// ==/UserScript==

const DEBUG_RUN_IN_TOP_FRAME = false;
const DEBUG_RUN_IN_IFRAME_ONLY_BUT_DONT_REQUIRE_MTURK_REFERRER = false;
const DEBUG_ALWAYS_PASS_SANITY_CHECK = false;
const DEBUG_PAINT_TRIGGERED_FRAMES_RED = false;

function isInMturkIframe() {
    if(DEBUG_RUN_IN_TOP_FRAME) {return true;}
    else if(DEBUG_RUN_IN_IFRAME_ONLY_BUT_DONT_REQUIRE_MTURK_REFERRER) {return (window !== window.top);}
    return ( window !== window.top && (document.referrer.includes("mturk.com/mturk/preview") || document.referrer.includes("mturk.com/mturk/accept") || document.referrer.includes("mturk.com/mturk/continue") || document.referrer.includes("mturk.com/mturk/return") || document.referrer.includes("mturk.com/mturk/previewandaccept") || document.referrer.includes("worker.mturk.com/projects/")));
}
if (!isInMturkIframe()) {return;}

const SCALE_MAX = 7;
const NEW_EMOTION_DISPLAY_SIZE = 14;
const MY_AGE = "";

let currentOptionIndex = 0;
let allOptions = document.querySelectorAll("select");

function isKeyNumberKey(key) {
    return Number.isInteger(Number(key));
}

function allOptionsHaveAnswers() {
    for(let currentOption of allOptions) {
        if(!Number.isInteger(Number(currentOption.value[0]))) {
            return false;
        }
    }
    return true;
}

function optionIsAnswered(optionIndex) {
    return Number.isInteger(Number(allOptions[optionIndex].value[0]));
}

function submitHit() {
    document.querySelector("#submitButton").click();
}

const SANITY_CHECK_TEXT_STRING = "5. What is your age (in years)? [ex. 23] If answered on previous HIT, leave blank.";

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
    document.querySelector("input.form-control").value = MY_AGE;

    document.querySelector("select[name='Q3Emotion']").size = NEW_EMOTION_DISPLAY_SIZE;

    for(let currentOption of allOptions) {
        currentOption.addEventListener('change', function(e) {

            if(allOptionsHaveAnswers()) {
                submitHit();
            }
        });
    }

    let allEmotionOptions = document.querySelectorAll("optgroup[label='Select the closest matching emotion.'] option");
    for(let i = 0, length = allEmotionOptions.length; i < length; i++) {
        let emotionOption = allEmotionOptions[i];
        emotionOption.innerText = (i + 1) + " " + emotionOption.innerText;
    }

    const allLabels = document.querySelectorAll("label");
    allLabels[0].innerText = "(1) Bad <---> Good (7)";
    allLabels[1].innerText = "(1) Low Energy <---> High Energy (7)";
    allLabels[2].innerText = "Emotion:";
    allLabels[3].innerText = "(1) Fake <---> Real (7)";

    window.focus();
}

function keyListener(event) {
    if(event.type === 'keydown') {

        event.preventDefault();

        // SCRIPT KEYDOWN CODE GOES HERE
        if(isKeyNumberKey(event.key)) {
            let keyNumber = Number(event.key);
            if(keyNumber <= allOptions[currentOptionIndex].length) {
                let changeEvent = new Event('change');
                allOptions[currentOptionIndex].value = `${keyNumber}.`;
                allOptions[currentOptionIndex].dispatchEvent(changeEvent);

                if(currentOptionIndex < allOptions.length) {
                    currentOptionIndex++;

                    if(optionIsAnswered(currentOptionIndex)) {
                        currentOptionIndex++;
                    }
                }
            }

        }

    }
    else if(event.type === 'keyup') {

        // SCRIPT KEYUP CODE GOES HERE

    }
}

function clickListener(event) {
    if(currentOptionIndex === 2 && event.target.nodeName === "OPTION") {
        currentOptionIndex++;
        window.focus();
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