// ==UserScript==
// @name         Jump to Queue After Boot Out
// @namespace    salembeats
// @version      1
// @description  Back to Queue after boot-out.
// @author       You
// @include      https://worker.mturk.com/projects
// @grant        none
// ==/UserScript==

let reactAlertElement = document.querySelector(`div[data-react-class="require('reactComponents/alert/Alert')['PureAlert']"]`);

if(reactAlertElement) {
    let reactAlert = JSON.parse(reactAlertElement.dataset.reactProps);

    if(reactAlert.header.toLowerCase().includes("hit submitted")) {
        window.location.href = "http://worker.mturk.com/tasks";
    }
    else if(reactAlert.header.toLowerCase().includes("hit submitted")) {
        window.location.href = "http://worker.mturk.com/tasks";
    }
}