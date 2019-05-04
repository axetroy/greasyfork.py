// ==UserScript==
// @name         Clickable issue links in Codetree
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Make the links in the Codetree issues list clickable
// @author       Marcin Warpechowski
// @match        https://codetree.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function handleLeftClickInCodetree(event) {
        if(event.button == 0 && !event.ctrlKey && !event.metaKey) {
            event.preventDefault(); //skip on left button
            event.stopImmediatePropagation();
            var newEvent = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
            });
            event.target.parentNode.dispatchEvent(newEvent);
        }
    }

    function makeLinksClickable() {
        var issues = document.querySelectorAll("[data-item='issue'][data-github-url]");
        issues.forEach((issue)=>{

            var title = issue.querySelector(".issue-title");
            var link = title.querySelector("a");
            if(!link) {
                title.innerHTML = `<a href="${issue.dataset.githubUrl}" style="color: #69391c;">${title.innerHTML}</a>`;
                title.querySelector("a").addEventListener("click", event=>handleLeftClickInCodetree(event));

                var references = issue.querySelectorAll(".issue-reference-title");
                references.forEach((elem) => {
                    var refNumber = elem.parentElement.querySelector(".issue-reference-number");
                    var url = `https://github.com/${refNumber.dataset.originalTitle}/pull/${refNumber.innerText.replace("#","")}`;
                    elem.innerHTML = `<a href="${url}">${elem.innerHTML}</a>`;
                    elem.querySelector("a").addEventListener("click", event=>handleLeftClickInCodetree(event));
                });
            }

        });
    }

    var issuesList = document.querySelector('[data-component="issues"]');
    if(issuesList){
        var observer = new MutationObserver(mutationsList => makeLinksClickable());
        observer.observe(issuesList, { childList: true });
    }
    makeLinksClickable();

})();