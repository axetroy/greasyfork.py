// ==UserScript==
// @name         AO3: Links to First and Last Chapter
// @namespace    https://greasyfork.org/en/users/163551-vannius
// @version      1.31
// @license      MIT
// @description  Add links to first and last chapter to AO3.
// @author       Vannius
// @match        https://archiveofourown.org/works/*/chapters/*
// @grant        none
// ==/UserScript==

(function() {
    // selectedTag exists only when there are several chapters.
    const selectedTag = document.getElementById('selected_id');
    if (!selectedTag) return;

    // Make hrefs to first and last chapter.
    const firstHref = window.location.href.split('/').slice(0, 6).join('/') + '/' + selectedTag.children[0].value;
    const lastHref = window.location.href.split('/').slice(0, 6).join('/') + '/' + selectedTag.children[selectedTag.children.length - 1].value;

    // Search location to add new link tags.
    const chapterIndexTag = document.getElementById('chapter_index').parentElement;
    const prevTags = chapterIndexTag.parentElement.getElementsByClassName('previous');
    const nextTags = chapterIndexTag.parentElement.getElementsByClassName('next');
    const navigationTags = document.getElementById('feedback').getElementsByClassName('actions');

    // When '← Previous Chapter' exists
    if (prevTags.length) {
        // When '← Previous Chapter' != first chapter
        if (prevTags[0].firstChild.href != firstHref) {
            // Make a link tag to frist chapter
            const firstATag = document.createElement('a');
            firstATag.href = firstHref;
            firstATag.appendChild(document.createTextNode('«'));
            const firstLiTag = document.createElement('li');
            firstLiTag.className = 'chapter first';
            firstLiTag.appendChild(firstATag);

            // Add the link tag to page's top
            const fragment = document.createDocumentFragment();
            fragment.appendChild(firstLiTag);
            fragment.appendChild(document.createTextNode('\n\n'));
            prevTags[0].parentNode.insertBefore(fragment.cloneNode(true), prevTags[0]);

            // Add the link tag to page's end
            for (let i = 0; i < navigationTags[0].children.length; i++) {
                if (navigationTags[0].children[i].firstChild.textContent.search(/Previous/) != -1) {
                    navigationTags[0].insertBefore(fragment, navigationTags[0].children[i]);
                    break;
                }
            }
        }
    }

    // When 'Next Chapter →' exists
    if (nextTags.length) {
        // When 'Next Chapter →' isn't last chapter
        if (nextTags[0].firstChild.href != lastHref) {
            // Make a link tag to last chapter
            const lastATag = document.createElement('a');
            lastATag.href = lastHref;
            lastATag.appendChild(document.createTextNode('»'));
            const lastLiTag = document.createElement('li');
            lastLiTag.className = 'chapter last';
            lastLiTag.appendChild(lastATag);

            // Add the link tag to page's top
            const fragment = document.createDocumentFragment();
            fragment.appendChild(lastLiTag);
            fragment.appendChild(document.createTextNode('\n\n'));
            nextTags[0].parentNode.insertBefore(fragment.cloneNode(true), nextTags[0].nextElementSibling);

            // Add the link tag to page's end
            for (let i = 0; i < navigationTags[0].children.length - 1; i++) {
                if (navigationTags[0].children[i].firstChild.textContent.search(/Next/) != -1) {
                    navigationTags[0].insertBefore(fragment, navigationTags[0].children[i + 1]);
                    break;
                }
            }
        }
    }
})();