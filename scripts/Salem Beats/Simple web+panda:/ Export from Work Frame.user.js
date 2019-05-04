// ==UserScript==
// @name         Simple web+panda:// Export from Work Frame
// @namespace    salembeats
// @version      1.5
// @description  .
// @author       You
// @include      https://worker.mturk.com/projects/*/tasks/*
// @grant        none
// ==/UserScript==

const metaElement = document.querySelector("[data-react-class*='reactComponents/common/ShowModal']");
const metaInfo    = JSON.parse(metaElement.dataset.reactProps).modalOptions;
const contactRequesterURL = new URL(`https://worker.mturk.com${metaInfo.contactRequesterUrl}`);

const hitTitle       = encodeURIComponent( metaInfo.projectTitle.trim()                                           );
const hitDescription = encodeURIComponent( metaInfo.description.trim()                                            );
const requesterName  = encodeURIComponent( metaInfo.requesterName.trim()                                          );
const gid            = encodeURIComponent( contactRequesterURL.searchParams.get("hit_type_message[hit_type_id]")  );
const rid            = encodeURIComponent( contactRequesterURL.searchParams.get("hit_type_message[requester_id]") );
const hitValue       = encodeURIComponent( metaInfo.monetaryReward.amountInDollars );

const webPandaURL = `web+panda://${gid}?hitTitle=${hitTitle}&hitDescription=${hitDescription}&rid=${rid}&requesterName=${requesterName}&hitValue=${hitValue.toLocaleString("EN", {minimumFractionDigits: 2})}`;
const webPandaURLOnce = webPandaURL + "&once=true";

const webPandaExport = "" +
      `Title: ${decodeURIComponent(hitTitle)} [${gid}]\r\n` +
      "\r\n" +
      `Requester: ${decodeURIComponent(requesterName)} [${rid}]\r\n` +
      "\r\n" +
      `Value: $${decodeURIComponent(hitValue)}\r\n` +
      "\r\n" +
      `Description: ${decodeURIComponent(hitDescription)}\r\n` +
      "\r\n" +
      `Link: ${webPandaURL}`;

const webPandaCopyButtonsHTML = `
<button name="button" class="wp-copy-button wp-link-only btn btn-secondary" style="margin-left: 30px; float: left;">
    w+p:// Link
</button>

<button name="button" class="wp-copy-button wp-once wp-link-only btn btn-secondary" style="margin-left: 15px; float: left;">
    Once
</button>

<button name="button" class="wp-copy-button wp-once wp-xport btn btn-secondary" style="margin-left: 15px; float: left;">
    XPort
</button>
`;
document.querySelector("[name='authenticity_token']").insertAdjacentHTML("afterend", webPandaCopyButtonsHTML);

var webPandaLinkFieldHTML = `
<style>
#webPandaLinkField {
    border: 0px;
    background: white;
    color: black;
    height: ${window.getComputedStyle(document.querySelector(".btn.btn-secondary")).getPropertyValue("height")};
    float: left;
    margin-left: 15px;
    width: 150px;
    pointer-events: none;
}
</style>
<textarea id="webPandaLinkField" disabled>
`;

document.querySelector(".wp-xport").insertAdjacentHTML("afterend", webPandaLinkFieldHTML);

var webPandaLinkField = document.getElementById("webPandaLinkField");

var copyOncePressed;
var xPortPressed;

document.body.addEventListener("click", e => {

    if(e.target.tagName &&
       e.target.tagName.toLowerCase() === "button" &&
       e.target.classList &&
       e.target.classList.contains("wp-copy-button")) {

        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        xPortPressed    = e.target.classList.contains("wp-xport");
        copyOncePressed = e.target.classList.contains("wp-once");

        webPandaLinkField.value = ( copyOncePressed ? webPandaURLOnce : webPandaURL ).trim();

        webPandaLinkField.removeAttribute("disabled");
        webPandaLinkField.setAttribute("style", "user-select: auto;");

        let programmaticSelectionRange = document.createRange();
        programmaticSelectionRange.selectNode(webPandaLinkField);

        window.getSelection().removeAllRanges();
        window.getSelection().addRange(programmaticSelectionRange);

        document.execCommand("copy");

        window.getSelection().removeAllRanges();

        webPandaLinkField.setAttribute("disabled", "");
        webPandaLinkField.setAttribute("style", "user-select: none;");

        if(xPortPressed) {
            webPandaLinkField.value = `WP-X => Clipboard!`;
        }
        else {
            webPandaLinkField.value = `WP${copyOncePressed ? "-1" : ""} => Clipboard!`;
        }
    }

}, true);

// Originally wanted to fix the padding issue above using a much simpler method, but found this clipboard API and wanted to practice this method instead.
// Clipboard modification seemed like something useful to be familiar with.
// Issue above is caused basically by the selection API only working normally with text nodes, and adding extra padding to other nodes.

document.addEventListener("copy", function(e) {

    const textData = e.clipboardData.getData("text/plain");
    const htmlData = e.clipboardData.getData("text/html");

    console.log(textData);

    if(e.target.id === "webPandaLinkField") {
        if(xPortPressed) {
            e.clipboardData.setData("text/plain", webPandaExport );
        }
        else {
            e.clipboardData.setData("text/plain", (copyOncePressed ? webPandaURLOnce : webPandaURL) );
        }
        e.preventDefault();
    }
});