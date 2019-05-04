// ==UserScript==
// @name         Mturk Worker Site - Full HIT Text (No ellipsis)
// @namespace    salembeats
// @version      3
// @description  .
// @author       Cuyler Stuwe (salembeats)
// @include      https://worker.mturk.com/
// @include      https://worker.mturk.com/projects
// @include      https://worker.mturk.com/?page_size=*
// @include      https://worker.mturk.com/?page_number=*
// @include      https://worker.mturk.com/tasks
// @include      https://worker.mturk.com/status_details/*
// @grant        none
// ==/UserScript==

function fullHITText() {
    for(let truncatedTextElement of document.querySelectorAll(".text-truncate")) {
        truncatedTextElement.classList.remove("text-truncate");
    }

    for(let row of document.querySelectorAll(".desktop-row, .mobile-row")) {
        for(let divOrSpan of row.querySelectorAll("div,span")) {

            if(row.clientHeight < divOrSpan.clientHeight) {
                row.style.height = `${divOrSpan.clientHeight + Math.floor(divOrSpan.clientHeight * 0.3)}px`;
            }

        }
    }
}

fullHITText();

window.addEventListener("resize", fullHITText);