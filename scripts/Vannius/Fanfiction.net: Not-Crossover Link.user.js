// ==UserScript==
// @name         Fanfiction.net: Not-Crossover Link
// @namespace    https://greasyfork.org/en/users/163551-vannius
// @version      1.5
// @license      MIT
// @description  Add link to not-Crossover page to Fanfiction.net.
// @author       Vannius
// @match        https://www.fanfiction.net/crossovers/*
// @match        https://www.fanfiction.net/*Crossovers/*
// @grant        GM_openInTab
// ==/UserScript==

(function () {
    // Config
    const OPEN_IN_NEW_TAB = true;

    // Functions
    // Replace and delete prohibited characters.
    function deleteProhibitedCharacter(text) {
        return text.replace(/['|\.|\/| & | - | + ]+/g, ' ').replace(/[,\+!:;\|☆★！？]+/g, '');
    }

    // Return imgTag with click event
    function addClickToNotCrossover(imgTag, url) {
        imgTag.addEventListener('click', function(e) {
            e.preventDefault();
            fetch(url, { method: 'GET',
                        mode: 'same-origin',
                        cache: 'default' })
                .then(response => response.text())
                .then(body => {
                const doc = document.implementation.createHTMLDocument('myBody');
                doc.documentElement.innerHTML = body;
                const content = doc.getElementById('content_wrapper_inner');

                const list = content.getElementsByClassName('z-list');

                let destination = '';
                if (list.length) destination = url; // Bingo.

                const candidates = content.querySelectorAll('.gui_normal a');
                if (candidates.length == 1) {
                    destination = candidates[0].href; // Only candidate.
                } else if (candidates.length > 1) {
                    destination = url; // Suggestion page. There can be sevaral candidates for same fandom.
                }

                // Move to Not-Crossover page.
                if (OPEN_IN_NEW_TAB) {
                    GM_openInTab(destination);
                } else {
                    window.location.href = destination;
                }
            }).catch(error=> console.log(error));
        });
        return imgTag;
    }

    // Main
    const splitPath = window.location.href.split('/');

    if (/^.+[-\_]and[-\_].+[-\_]Crossovers$/.test(splitPath[3])) {
        // Scrape each fandom link
        const divTag = document.getElementById('content_wrapper_inner');
        const titleTags = [divTag.children[1], divTag.children[2]];

        for (let titleTag of titleTags) {
            // Make joinTitle by replacing and deleting prohibited symbols
            const joinTitle = deleteProhibitedCharacter(titleTag.textContent).split(' ').join('-');
            const url = [window.location.origin, 'anime', joinTitle, ''].join('/');

            // Make link to Not-Crossover
            const imgTag = document.getElementById('content_wrapper_inner').children[0];
            const addImgTag = addClickToNotCrossover(imgTag.cloneNode(false), url);
            addImgTag.title = "Not-Crossover";
            addImgTag.style.transform = "scale(-1, 1)";

            // Add link and place adjustment
            const fragment = document.createDocumentFragment();
            fragment.appendChild(addImgTag);
            fragment.appendChild(document.createTextNode(' '));
            imgTag.parentNode.insertBefore(fragment, titleTag);
        }
    } else if (splitPath[3] == 'crossovers' || /^.+[-\_]Crossovers$/.test(splitPath[3])) {
        // Make title and url by splitPath[4] or splitPath[3]
        const title = (splitPath[3] == 'crossovers') ? splitPath[4] : splitPath[3].slice(0, - "-Crossovers".length);
        const url = [window.location.origin, 'anime', title, ''].join('/');

        // Make link to Not-Crossover
        const divTag = document.getElementById('content_wrapper_inner');
        const imgTag = (splitPath[3] == 'crossovers') ? divTag.children[2]: divTag.children[0];
        const addImgTag = addClickToNotCrossover(imgTag.cloneNode(false), url);
        addImgTag.title = "Not-Crossover";
        addImgTag.style.transform = "scale(-1, 1)";

        // Add link and place adjustment
        const fragment = document.createDocumentFragment();
        fragment.appendChild(document.createTextNode(' '));
        fragment.appendChild(addImgTag);
        imgTag.parentNode.insertBefore(fragment, imgTag.nextSibling);
    }
})();