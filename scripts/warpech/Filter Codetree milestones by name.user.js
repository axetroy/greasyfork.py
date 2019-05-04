// ==UserScript==
// @name         Filter Codetree milestones by name
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Adds a button to Codetree in the top right corner to filter milestones by name on the Issues and Milestones page
// @author       Marcin Warpechowski
// @match        https://codetree.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function filterElementByQuery(elem, query) {
        if(!query) {
            elem.removeAttribute("hidden");
            return;
        }

        const phrases = query.split(" or ");

        const countHits = (accumulator, phrase) => {
            phrase = phrase.trim();
            if(phrase && elem.getAttribute("data-id").toLowerCase().indexOf(phrase) > -1) {
                return accumulator + 1;
            }
            return accumulator;
        };
        const hits = phrases.reduce(countHits, 0);

        if(hits == 0) {
            elem.setAttribute("hidden","");
        }
        else {
            elem.removeAttribute("hidden");
        }
    }

    function filterElementsByName(query) {
        if (query) {
            button.innerHTML = "Filter milestones (active: " + query + ")";
            query = query.toLowerCase();
        }
        else {
            button.innerHTML = "Filter milestones";
        }
        document.querySelectorAll("tr[data-item=milestone], div.issue-group").forEach(elem => filterElementByQuery(elem, query));
    }

    function onButtonClick(elem) {
        const defaultQuery = localStorage.filterMilestonesUserScript || "";
        const query = window.prompt("Filter milestones (use \" OR \" to provide multiple keywords)", defaultQuery);
        if(typeof query == "string") {
            localStorage.filterMilestonesUserScript = query;
            filterElementsByName(query);
        }
    }

    const button = document.createElement("button");
    const container = document.querySelector(".navbar-identity");
    if(container) {
        button.classList.add("button", "tiny");
        container.appendChild(button);
        button.addEventListener("click", event=>onButtonClick(event.target));
        filterElementsByName(localStorage.filterMilestonesUserScript || "");

        var issuesList = document.querySelector('[data-component="issues"]');
        if(issuesList){
            var observer = new MutationObserver(mutationsList => filterElementsByName(localStorage.filterMilestonesUserScript || ""));
            observer.observe(issuesList, { childList: true });
        }
    }

})();