// ==UserScript==
// @name         Screencast Security for worker.mturk.com
// @namespace    salembeats
// @version      1
// @description  Hides personal information when screencasting worker.mturk.com.
// @author       You
// @match        https://worker.mturk.com/*
// @grant        none
// ==/UserScript==

const GENERIC_REDACTED_MESSAGE = "[REDACTED BY SCRIPT]";

if(location.href.includes("dashboard")) {
    document.querySelectorAll("td").forEach( (el) => {el.innerText = GENERIC_REDACTED_MESSAGE;});
}

let workerIDSpan = document.querySelector("span.copyable-content span");

if(workerIDSpan) {
    workerIDSpan.innerText = GENERIC_REDACTED_MESSAGE;
}

let workerNameLink = document.querySelector("a[href='/account']");

if(workerNameLink) {
    workerNameLink.innerText = GENERIC_REDACTED_MESSAGE;
}