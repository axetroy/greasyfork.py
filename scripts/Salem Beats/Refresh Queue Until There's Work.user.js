// ==UserScript==
// @name         Refresh Queue Until There's Work
// @namespace    salembeats
// @version      1
// @description  Refreshes the tasks page until there's work, and starts the first job once there is.
// @author       Cuyler Stuwe (salembeats)
// @match        https://worker.mturk.com/tasks
// @grant        none
// ==/UserScript==

let workButton = document.querySelector("a[href*='/projects/']");

if(workButton) {workButton.click();}

setTimeout(() => window.location.reload(), 2000);