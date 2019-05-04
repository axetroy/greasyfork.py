// ==UserScript==
// @name         Technology and Research - Evaluate Image Tags (31N4U9IG8SCUANMK8RGMSBW6KK2WSZ)
// @namespace    salembeats
// @version      1
// @description  .
// @author       Cuyler Stuwe (salembeats)
// @include      *
// @require      https://greasyfork.org/scripts/33041-mturk-frame-parent-interface-library/code/mTurk%20Frame-%3EParent%20Interface%20Library.js?version=239183
// ==/UserScript==

const TARGET_GID = "31N4U9IG8SCUANMK8RGMSBW6KK2WSZ";

var allRows;
var currentRow;
var currentRowRadios;
var currentTag;
var currentRowIndex = 0;

function unsetCurrentRow() {
    currentTag.style = "";
}

function nextRow() {
    currentRow.style.display = "none";
    currentRowIndex++;
}

function applyRow() {
    currentRow = allRows[currentRowIndex];
    currentRow.style.border = "5px dashed red";
    currentRowRadios = currentRow.querySelectorAll("input[type='radio']");
    currentTag = currentRow.querySelector("td");
    currentTag.style = "font-size: 2.0em; text-transform: uppercase;";
}

function entryPoint() {
    window.focus();
    allRows = document.querySelectorAll("tr");
    document.body.addEventListener("keydown", keyListener);
    applyRow();
}

function keyListener(event) {
    var keyNumber = Number(event.key);

    if(Number.isInteger(keyNumber) && keyNumber <= 5) {
        currentRowRadios[keyNumber - 1].click();
        unsetCurrentRow();
        nextRow();
        applyRow();
    }
    else if(event.keyCode === 13) {
        document.querySelector("#submitButton").click();
    }
}

mTurkParentWindow.runOnParentParametersKnown(function main() {
    if(mTurkParentWindow.getGID() === TARGET_GID && mTurkParentWindow.isAccepted()) {
        entryPoint();
    }
});