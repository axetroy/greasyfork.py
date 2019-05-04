// ==UserScript==
// @name         Auto-Return "Please Return" HITs
// @namespace    salembeats
// @version      2
// @description  Requires mTurk Parent Window Command Accepter installed.
// @author       Cuyler Stuwe (salembeats)
// @include      *
// @require      https://greasyfork.org/scripts/33041-mturk-frame-parent-interface-library/code/mTurk%20Frame-%3EParent%20Interface%20Library.js?version=239183
// @grant        none
// ==/UserScript==

function drawAutoReturnOverlay() {
    var autoReturnOverlay = document.createElement("div");

    autoReturnOverlay.style = ''               +
        'pointer-events: none;'                +
        'position: fixed;'                     +
        'display: flex;'                       +
        `z-index: ${Number.MAX_SAFE_INTEGER};` +
        'top: 0%;'                             +
        'left: 0%;'                            +
        'opacity: 0.5;'                        +
        'width: 100%;'                         +
        'height: 100%;'                        +
        'background-color: rgb(255, 0, 0);'    +
        'align-items: center;'                 +
        'justify-content: center;'             +
        '';

    autoReturnOverlay.innerHTML = `
        <style>
            .auto-return {
                width: 100%;
                font-size: 4.0em;
                color: white;
                text-align: center;
                font-family: monospace;
            }
            .auto-return>div {
                text-align: center;
            }
            .emoji-holder {
            }
        </style>
        <div class="auto-return">
            <div>AUTO-RETURNED</div>
            <div>(ALREADY COMPLETED / OPEN)</div>
            <div class="emoji-holder">?</div>
        </div>
    `;

    document.body.appendChild(autoReturnOverlay);
}

if(window === window.top) {return;}
if(!document.referrer.toLowerCase().includes("worker.mturk.com/projects")) {return;}

mTurkParentWindow.runOnParentParametersKnown(() => {
    const filteredHitTextLowercase = document.body.innerText.toLowerCase().replace(/["']/g, "");
    if(filteredHitTextLowercase.includes("you have already completed the maximum") ||
       filteredHitTextLowercase.includes("please click return hit to avoid any impact on your approval rating")) {
        window.addEventListener("beforeunload", drawAutoReturnOverlay);
        mTurkParentWindow.returnHIT();
    }
});