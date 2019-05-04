// ==UserScript==
// @name         Twitter media-only filter toggle.
// @version      0.5
// @description  Toggle non-media tweets on and off, for the power-viewer!
// @author       Cro
// @match        https://twitter.com/*
// @run-at       document-idle
// @grant        GM_setValue
// @grant        GM_getValue
// @namespace https://greasyfork.org/users/10865
// ==/UserScript==
/* jshint esversion: 6 */

(function() {
    'use strict';
    // Die fast if we cannot hook into the button bar.
    let buttonBar = document.getElementById("global-actions");
    if (buttonBar === null) return;

    let hideIfTarget = function(node)
    {
        if (node.tagName &&
            node.tagName.toLowerCase() == "li" &&
            node.classList.contains("stream-item") &&
            node.querySelector("div.AdaptiveMediaOuterContainer") === null)
        {
            node.hidden = true;
        }
    };

    let observer = new MutationObserver(mutations => mutations.forEach(mutation => mutation.addedNodes.forEach(hideIfTarget)));
    let stream = document.getElementsByClassName("stream")[0];

    // UI
    let li = document.createElement("li");
    let button = document.createElement("button");
    let storageKey = "cro-media-toggle";

    button.onclick = function(event)
    {
        GM_setValue(storageKey, !GM_getValue(storageKey));
        let items = document.querySelectorAll("li.stream-item");

        if (GM_getValue(storageKey))
        {
            button.innerText = "Only Media Tweets";
            items.forEach(hideIfTarget);
            observer.observe(stream, { childList: true, subtree: true });
        }
        else
        {
            button.innerText = "All Tweets";
            items.forEach(node => node.hidden = false);
            observer.disconnect();
        }
    };

    buttonBar.appendChild(li);
    li.appendChild(button);
    button.click();
})();
