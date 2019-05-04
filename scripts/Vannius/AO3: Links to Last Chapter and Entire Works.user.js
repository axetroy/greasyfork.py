// ==UserScript==
// @name         AO3: Links to Last Chapter and Entire Works
// @namespace    https://greasyfork.org/en/users/163551-vannius
// @version      1.91
// @license      MIT
// @description  Add links to last chapter and entire works right after title of story.
// @author       Vannius
// @match        https://archiveofourown.org/*
// @exclude      /^https:\/\/archiveofourown\.org\/(collections\/[^\/]+\/)?works\/\d+/
// @exclude      /^https:\/\/archiveofourown\.org\/collections$/
// @exclude      /^https:\/\/archiveofourown\.org\/collections(\?.+)$$/
// @grant        GM_xmlhttpRequest
// @connect      archiveofourown.org
// @grant        GM_openInTab
// ==/UserScript==

(function() {
    // Config
    // Open last chapter in new tab.
    const OPEN_IN_NEW_TAB = true;

    // Functions
    // Make and return a link button to last chapter.
    function makeLastLink(url) {
        const lastLink = document.createElement('a');

        // Add click event
        lastLink.addEventListener('click', function() {

            // Get url of last chapter
            GM_xmlhttpRequest({
                method: "GET",
                url: url,
                onload: response => {
                    const doc = document.implementation.createHTMLDocument('myBody');
                    doc.documentElement.innerHTML = response.responseText; // Parse body
                    const selectedTag = doc.getElementById('selected_id');

                    // If selectedTag === null, there isn't consent to veiw adult content in cookie.
                    const lastHref = selectedTag === null ?
                          url : url + '/chapters/' + selectedTag.children[selectedTag.children.length - 1].value;

                    // Move page
                    if (OPEN_IN_NEW_TAB) {
                        GM_openInTab(lastHref);
                    } else {
                        window.location.href = lastHref;
                    }
                }
            });
        });
        return lastLink;
    }

    // Main
    const articles = document.getElementsByClassName('blurb');
    for (let article of articles) {
        // Scrape each article
        const headerTag = article.getElementsByClassName('header module')[0];
        if (headerTag.className === "mystery header picture module") {
            continue;
        }
        const titleTag = headerTag.firstElementChild.firstElementChild;
        const series = (titleTag.href.indexOf("/series/") != -1) ? true : false;

        // When article isn't series page
        if (!series) {
            // Get number of chapters
            const chapters =
                  article.getElementsByTagName('dl')[0].getElementsByClassName('chapters')[1].textContent.split("/");

            // When chapter number isn't one
            if (chapters[0] != '1') {
                // Get href
                const spritedHref = titleTag.href.split('/');
                const href = spritedHref[3] === 'collections' ?
                      spritedHref.slice(0, 3).concat(spritedHref.slice(5)).join('/') : titleTag.href;

                // Make link to entire contents
                const entireLink = document.createElement('a');
                entireLink.href = href + "?view_full_work=true";
                entireLink.title = "Entire Contents";
                entireLink.appendChild(document.createTextNode('E'));

                // Make link button to last chapter.
                const lastLink = makeLastLink(href);
                lastLink.title = "Click Event: open last chapter";
                lastLink.appendChild(document.createTextNode('L'));

                // Add link to entire contents and link button to last chapter right after title of story.
                const fragment = document.createDocumentFragment();
                fragment.appendChild(document.createTextNode(' '));
                fragment.appendChild(entireLink);
                fragment.appendChild(document.createTextNode(' '));
                fragment.appendChild(lastLink);

                titleTag.parentNode.insertBefore(fragment, titleTag.nextSibling);
            }
        }
    }
})();