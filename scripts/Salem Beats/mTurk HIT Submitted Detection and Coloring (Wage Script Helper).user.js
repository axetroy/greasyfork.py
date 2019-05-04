// ==UserScript==
// @name         mTurk HIT Submitted Detection and Coloring (Wage Script Helper)
// @version      22
// @description  Detects form submits to tell the wage script whether an unloaded HIT was submitted as opposed to being returned or expiring. Latest: More detection methods for trickier HITs. Might need to be tweaked for any HITs with "submit" buttons that don't actually "submit" the HIT (I think Pinterest does this...).
// @author       Cuyler Stuwe (salembeats)
// @include      *
// @namespace    salembeats
// @icon         https://i.imgur.com/Y68Qxdd.png
// ==/UserScript==

const DEBUG = false;

function isInMturkIframe() {
    return (
        window !== window.top &&
        (
            document.referrer.includes("mturk.com/mturk/preview") ||
            document.referrer.includes("mturk.com/mturk/accept") ||
            document.referrer.includes("mturk.com/mturk/continue") ||
            document.referrer.includes("mturk.com/mturk/return") ||
            document.referrer.includes("mturk.com/mturk/previewandaccept") ||
            document.referrer.includes("worker.mturk.com/projects/")
        )
    );
}
if (!isInMturkIframe()) {return;}

if(DEBUG) {
    console.log("%cIM IN UR HIT WATCHIN 4 SUBMITZ", "color: white; background-color: red; font-size: 50px;");
    console.log('%c       ', 'font-size: 100px; background: url(http://cdn.nyanit.com/nyan2.gif) no-repeat;');
}

var submitHasBeenHandled = false;

function drawDiv() {
    var submittedDiv = document.createElement("div");
    submittedDiv.style = '' +
        'pointer-events: none;' +
        'position: fixed;' +
        'z-index: 999;' +
        'top: 0%;' +
        'left: 0%;' +
        'opacity: 0.5;' +
        'width: 100%;' +
        'height: 100%;' +
        'background-color: rgb(0, 255, 0);';

    document.body.appendChild(submittedDiv);
}

function submitDetected() {
    if(submitHasBeenHandled) {return;}
    window.parent.postMessage({hitSubmitClicked: true}, "*");
    // window.parent.postMessage({hitIsOver: true}, "*"); // TODO: Move this elsewhere so we get accurate submission loss on Worker.
    drawDiv();
    submitHasBeenHandled = true;
}

(function main() {
    let submitButton = document.querySelector("input[type='submit']");
    if(submitButton) {
        submitButton.addEventListener("click", submitDetected);
    }

    let forms = document.querySelectorAll("form");
    for(let form of forms) {
        form.addEventListener("submit", submitDetected);
    }

    document.body.addEventListener("click", e => {
        let type = e.target.getAttribute("type");
        let id = e.target.id;

        if(type === "submit") {
            submitDetected();
        }
        else if(e.target.id && e.target.id.match(/\bsubmit\b/i)) {
            submitDetected();
        }
        else if(e.target.href && e.target.href.match(/\bsubmit\b/i)) {
            submitDetected();
        }
        else if(e.target.className && e.target.className.match(/\bsubmit\b/i)) {
            submitDetected();
        }
    });

})();

