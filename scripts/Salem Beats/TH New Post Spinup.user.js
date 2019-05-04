// ==UserScript==
// @name         TH New Post Spinup
// @namespace    http://tampermonkey.net/
// @version      4.0
// @description  Starts up HITs through the web+panda:// protocol when they're posted on TurkerHub (You need to be on the most recent page and have Live Update enabled to use this script properly). Also requires a script that can actually handle the web+panda:// protocol.
// @author       Cuyler Stuwe (salembeats)
// @include      https://turkerhub.com/threads/*/*
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_getValue
// @grant        unsafeWindow
// @grant        GM_openInTab
// @require      https://greasyfork.org/scripts/37451-mturkexportparser/code/MturkExportParser.js?version=243720
// ==/UserScript==

const OPEN_IN_BACKGROUND_TAB = true;

const WINDOW_WIDTH = 520;
const WINDOW_HEIGHT = 350;

document.querySelector("#navigation div.styliumStickyWrapperInner").insertAdjacentHTML("beforeend", `
<div style="padding: 5px !important;">
<span style="color: white !important; font-weight: bold !important;">Daily Thread Settings (TH Post Spinup): </span>
<label for="once" style="float: right !important; margin-right: 5px !important;"><span style="color: white !important;"> Once</span></label>
<input type="checkbox" id="once" style="margin-right: 4px !important; float: right !important; vertical-align: center !important;"/>
<label for="autoGrabHITs" style="float: right !important; margin-right: 5px !important;"><span style="color: white !important;"> Grab New HITs Automatically via web+panda://</span></label>
<input type="checkbox" id="autoGrabHITs" style="margin-right: 4px !important; float: right !important; vertical-align: center !important;"/>
</div>
`);

let autoGrabHITsCheckbox = document.getElementById("autoGrabHITs");
let onceCheckbox         = document.getElementById("once");

let grabbedEnabledValue;
autoGrabHITsCheckbox.checked = ( (grabbedEnabledValue = GM_getValue("enabled")) !== undefined ? grabbedEnabledValue : true);

let onceValue;
onceCheckbox.checked = ( (onceValue = GM_getValue("once")) !== undefined ? onceValue : true);

autoGrabHITsCheckbox.addEventListener("change", e => {
    GM_setValue("enabled", e.target.checked);
});

onceCheckbox.addEventListener("change", e => {
    GM_setValue("once", e.target.checked);
});

function createPandaArgumentsString(resultsObject) {
    let pandaArgumentsString = "";

    let keys = Object.keys(resultsObject);

    for(let key of keys) {

        if(key !== "gid" && key !== "contextHTML") {

            if(pandaArgumentsString === "") {
                pandaArgumentsString += "?";
            }
            else {
                pandaArgumentsString += "&";
            }

            pandaArgumentsString += `${key}=${encodeURIComponent(resultsObject[key])}`;
        }
    }
    return pandaArgumentsString;
}

unsafeWindow.createPandaArgumentsString = createPandaArgumentsString;
unsafeWindow.MturkExportParser = MturkExportParser;

function processPost(element) {
    var postParser = new MturkExportParser(element);

    if(postParser.containsValidExport() && autoGrabHITsCheckbox.checked) {
        let results = postParser.getAllResults();

        let windowOpenLink = `web+panda://${results.gid}${createPandaArgumentsString(results)}`;

        if(onceCheckbox.checked && !windowOpenLink.includes("once=true")) {
            if(!windowOpenLink.includes("?")) {windowOpenLink += "?";}
            else {windowOpenLink += "&";}
            windowOpenLink += "once=true";
        }

        if(OPEN_IN_BACKGROUND_TAB) {
            GM_openInTab(windowOpenLink, OPEN_IN_BACKGROUND_TAB);
        }
        else {
            window.open(windowOpenLink, undefined, (`width=${WINDOW_WIDTH},height=${WINDOW_HEIGHT},left=${screen.width/2 - WINDOW_WIDTH/2},top=${screen.height/2 - WINDOW_HEIGHT/2}`));
        }
    }
}

let mutationObserver = new MutationObserver(function observe(mutations) {
    for(let mutation of mutations) {
        if(mutation.addedNodes.length > 0) {
            let addedNode = mutation.addedNodes[0];
            if(addedNode.nodeName === "LI" && addedNode.classList.contains("message")) {
                processPost(addedNode);
            }
        }
    }
});

mutationObserver.observe(document.body, {childList: true, subtree: true});