// ==UserScript==
// @name         Load all pages in Codetree
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Loads all following pages in Codetree into the current page
// @author       Marcin Warpechowski
// @match        https://codetree.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function getNextPage(currentDoc) {
        var mainDoc = document;
        var mainContainer = mainDoc.querySelector('[data-component="issues"]');
        var nextLink = currentDoc.querySelector("a[rel=next]");
        var mainPagination = mainDoc.querySelector('.pagination');
        if(mainContainer && mainPagination) {
            if(nextLink) {
                fetch(nextLink.href, {credentials:'include'})
                    .then(function (response) {
                    return response.text();
                })
                    .then(function (text) {
                    var parser=new DOMParser();
                    var doc=parser.parseFromString(text, "text/html");
                    var issues = doc.querySelectorAll('.issue-group:not([style])'); //elements with style attribute are hidden closed milestones
                    issues.forEach(elem => mainContainer.insertBefore(elem, mainPagination.parentElement));
                    getNextPage(doc);
                });
            }
            else {
                mainPagination.style.display = "none";
            }
        }
    }

    const button = document.createElement("button");
    const container = document.querySelector(".pagination");
    if(container) {
        button.classList.add("button", "tiny");
        button.innerHTML = "Load all pages";
        container.appendChild(button);
        button.addEventListener("click", (event)=>{
            getNextPage(document);
            button.disabled = true;
        });
    }

})();