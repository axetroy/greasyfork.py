// ==UserScript==
// @name         Fanfiction.net: Link to Last Chapter
// @namespace    https://greasyfork.org/en/users/163551-vannius
// @version      1.3
// @license      MIT
// @description  Add link to last chapter to alert/favorites page of Fanfiction.net.
// @author       Vannius
// @match        https://www.fanfiction.net/alert/story.php*
// @match        https://www.fanfiction.net/favorites/story.php*
// @grant        GM_xmlhttpRequest
// @connect      fanfiction.net
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
                    const chapSelectTag = doc.getElementById('chap_select');

                    const baseUrl = url.split('/').slice(0, 5).join('/');
                    const title = url.split('/')[6];
                    // If chapSelectTag === null, story has only one chapter.
                    const lastChpater = chapSelectTag ? chapSelectTag[chapSelectTag.length - 1].value : 1;
                    const lastHref = [baseUrl, lastChpater, title].join('/');

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
    // Scrape alert or favorite page
    const storyTableTag = document.getElementById('gui_table1i').children[1];
    const trTags = storyTableTag.getElementsByTagName('tr');
    const storyTags = Array.from(trTags)
    .filter(tr => tr.children.length == 6)
    .map(tr => tr.firstElementChild.firstElementChild);

    for (let storyTag of storyTags) {
        // Make link button to last chapter.
        const lastLink = makeLastLink(storyTag.href);
        lastLink.title = "Click Event: open last chapter";
        lastLink.appendChild(document.createTextNode('L'));

        // Add link button to last chapter right after title of story and adjust placement.
        const fragment = document.createDocumentFragment();
        fragment.appendChild(document.createTextNode(' '));
        fragment.appendChild(lastLink);
        storyTag.parentElement.appendChild(fragment);
    }
})();