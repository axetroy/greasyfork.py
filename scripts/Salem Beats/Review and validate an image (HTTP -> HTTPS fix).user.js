// ==UserScript==
// @name         Review and validate an image (HTTP -> HTTPS fix)
// @namespace    salembeats
// @version      1
// @description  .
// @author       Cuyler Stuwe (salembeats)
// @include      *
// @grant        GM_info
// ==/UserScript==

const SANITY_CHECK_TEXT_STRING = "Please review the image on the left, and answer the following questions about it:";

function isInMturkIframe() {
    return ( window !== window.top && (document.referrer.includes("mturk.com/mturk/preview") || document.referrer.includes("mturk.com/mturk/accept") || document.referrer.includes("mturk.com/mturk/continue") || document.referrer.includes("mturk.com/mturk/return") || document.referrer.includes("mturk.com/mturk/previewandaccept") || document.referrer.includes("worker.mturk.com/projects/")));
}
if (!isInMturkIframe()) {return;}

function passSanityCheck() {
    if(SANITY_CHECK_TEXT_STRING && SANITY_CHECK_TEXT_STRING.length > 0) {
        return document.body.innerHTML.includes(SANITY_CHECK_TEXT_STRING);
    }
}

function runOnStart() {
    let imageToFix = document.querySelector("img.imagecontainer");
    let originalImageSource = imageToFix.src;
    imageToFix.src = originalImageSource.replace("http:", "https:");
}

(function main() {

    if(!passSanityCheck()) {
        console.log(`FAILED SANITY CHECK: ${GM_info.script.name}`);
        return;
    }
    else {
        console.log(`PASSED SANITY CHECK: ${GM_info.script.name}`);
        runOnStart();
    }
})();