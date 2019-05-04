// ==UserScript==
// @name         Simple Panda Crazy Helper web+panda:// Handler (Unofficial Proof of Concept)
// @namespace    salembeats
// @version      3.1
// @description  Unofficial web+panda:// handler for Panda Crazy, implemented as a working proof of concept. Latest update: Triggers "only once" when receiving web+panda:// metadata indicating a survey.
// @author       Cuyler Stuwe (salembeats)
// @include      *worker.mturk.com/registerPCHwebpanda
// @include      *worker.mturk.com/handlePCHwebpanda*
// @grant        window.close
// @require      https://greasyfork.org/scripts/36173-panda-crazy-helper-emulation/code/Panda%20Crazy%20Helper%20Emulation.js?version=243586
// ==/UserScript==

const SHOULD_PLAY_SOUND                              = true;
const SHOULD_CLOSE_AT_END_IF_NO_ERRORS               = true;
const SHOULD_CLOSE_AT_END_IF_PANDA_CRAZY_NOT_RUNNING = true;
const SHOULD_TRY_TO_START_PC_IF_NOT_DETECTED         = true;
const SHOULD_CLOSE_OPENED_WINDOWS_ON_CLOSE           = false;

const PANDA_CRAZY_WAIT_FOR_STARTUP_TIME              = 3000;

const SUCCESS_SFX_BASE64 = "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";
const SFX_OGG_BASE64_PREFIX = "data:audio/ogg;base64,";
const startedSound  = new Audio(`${SFX_OGG_BASE64_PREFIX}${SUCCESS_SFX_BASE64}`);

var openedPandaCrazyInstanceHandle;

startedSound.addEventListener("ended", e => {
    if(SHOULD_CLOSE_AT_END_IF_NO_ERRORS) {
        closeWindowAndAnyOpenedWindows();
    }
});

function closeWindowAndAnyOpenedWindows() {
    window.close();
    if(openedPandaCrazyInstanceHandle && SHOULD_CLOSE_OPENED_WINDOWS_ON_CLOSE) {
        openedPandaCrazyInstanceHandle.close();
    }
}

function addNewHTML(html) {
    document.body.insertAdjacentHTML("beforeend", html);
}

function clearPage() {
    document.body.innerHTML = "";
    document.head.innerHTML = "";
}

function embedNewStyles() {
    document.head.insertAdjacentHTML("afterbegin", `
<style>
div {
margin: 5px;
}
div::before {
content: "Message: ";
color: orange;
}
</style>
`);
}

function isOnProtocolRegistrationURL() {
    return window.location.href.includes("worker.mturk.com/registerPCHwebpanda");
}

function validateGID(gid) {
    if(gid.length >= 30) {
        return gid.match(/3(?:[A-Za-z0-9]{29})/)[0].toUpperCase();
    }
    else {
        return null;
    }
}

function checkWhetherPandaCrazyIsRunning() {
    // TODO: Actually check whether Panda Crazy is running.
    return true;
}

function handlerActivate() {

    addNewHTML(`<div>Running web+panda:// proof of concept for Panda Crazy Helper.</div>`);

    let url;
    try {
        url = decodeURIComponent(new URL(document.location).searchParams.get("url"));
    }
    catch(err) {
        return; // Don't even run the script if the URL is too malformed to parse properly.
    }

    let extractedWebPandaURL = new URL(url);

    let gid = extractedWebPandaURL.href
    .replace(`${extractedWebPandaURL.protocol}`,"")
    .replace("//", "")
    .replace(extractedWebPandaURL.search,"");

    let validatedGID = validateGID(gid);

    if(validatedGID) {
        let once = Boolean(extractedWebPandaURL.searchParams.get("once") || (extractedWebPandaURL.searchParams.get("batchOrSurvey") && extractedWebPandaURL.searchParams.get("batchOrSurvey") === "survey"));

        let rid            = extractedWebPandaURL.searchParams.get("rid")            || undefined;
        let hitTitle       = extractedWebPandaURL.searchParams.get("hitTitle")       || undefined;
        let hitDescription = extractedWebPandaURL.searchParams.get("hitDescription") || undefined;
        let hitValue       = extractedWebPandaURL.searchParams.get("hitValue")       || undefined;
        let requesterName  = extractedWebPandaURL.searchParams.get("requesterName")  || undefined;

        // TODO: Actually check whether Panda Crazy is running.
        let isPandaCrazyRunning = checkWhetherPandaCrazyIsRunning();

        if(isPandaCrazyRunning) {
            PandaCrazy.addJob(validatedGID, once, {
                rid,
                hitTitle,
                requesterName,
                hitValue,
                hitDescription
            });
            if(SHOULD_PLAY_SOUND) {startedSound.play();}
            addNewHTML(`<div>Sent a Panda Crazy Helper message to add GID ${validatedGID} to Panda Crazy${(once ? " (only once)" : "" )}.</div>`);
            if(SHOULD_CLOSE_AT_END_IF_NO_ERRORS) {
                if(SHOULD_PLAY_SOUND) {
                } else {
                    closeWindowAndAnyOpenedWindows();
                }
            }
        }
        else {
            addNewHTML(`<div>Panda Crazy is not running. No action taken.</div>`);
            if(SHOULD_CLOSE_AT_END_IF_PANDA_CRAZY_NOT_RUNNING) {window.close();}
        }
    }
    else {
        addNewHTML(`<div>GID "${gid}" was not valid. No action taken.</div>`);
    }

}

function startPandaCrazy(settings = {  }) {

    const NO_WINDOW_NAME_NEEDED = undefined;

    if(Object.keys(settings).length === 0) {
        settings.width  = screen.availWidth / 2;
        settings.height = screen.availHeight / 2;
        settings.left   = (screen.availWidth / 2)  - (settings.width / 2);
        settings.top    = (screen.availHeight / 2) - (settings.height / 2);
    }

    openedPandaCrazyInstanceHandle = window.open("https://worker.mturk.com/requesters/PandaCrazy/projects",
                                                 NO_WINDOW_NAME_NEEDED,
                                                 `width=${settings.width},height=${settings.height},left=${settings.left},top=${settings.top}`);
}

function main() {
    clearPage();

    embedNewStyles();

    if(isOnProtocolRegistrationURL()) {

        addNewHTML(`<div>Check for a notification or an icon in the URL bar to allow this page to handle web+panda:// links.</div>`);

        navigator.registerProtocolHandler("web+panda",
                                          "https://worker.mturk.com/handlePCHwebpanda?url=%s",
                                          "Web Panda Handler (Panda Crazy)");
    }
    else if(SHOULD_TRY_TO_START_PC_IF_NOT_DETECTED) {

        addNewHTML(`<div>Checking whether Panda Crazy is running...</div>`);

        PandaCrazy.online().then(
            initialSuccessResponse => {
                handlerActivate();
            },
            initialFailureResponse => {

                addNewHTML(`<div>Panda Crazy not detected. Attempting to start Panda Crazy...</div>`);

                startPandaCrazy();

                setTimeout(() => {

                    PandaCrazy.online().then(
                        secondSuccessResponse => {
                            handlerActivate();
                        },
                        secondFailureResponse => {
                            alert("Panda Crazy is not installed, could not be started, or did not respond in time.");
                            closeWindowAndAnyOpenedWindows();
                        });

                }, PANDA_CRAZY_WAIT_FOR_STARTUP_TIME);
            });
    }
    else {
        handlerActivate();
    }
}

main();