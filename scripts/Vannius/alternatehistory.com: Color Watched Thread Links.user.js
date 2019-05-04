// ==UserScript==
// @name         alternatehistory.com: Color Watched Thread Links
// @namespace    https://greasyfork.org/en/users/163551-vannius
// @version      1.2
// @license      MIT
// @description  When watched thread links' ending aren't "unread", change color of those thread links.
// @author       Vannius
// @match        https://www.alternatehistory.com/forum/watched/threads*
// @grant        none
// ==/UserScript==

(function() {
    const titleTags = document.getElementsByClassName('title');
    for (let titleTag of titleTags) {
        const aTags = titleTag.getElementsByTagName('a');
        if (aTags.length > 0) {
            if (aTags[0].href.split('/').slice(-1) != 'unread') aTags[0].style.color = '#6597d1';
        }
    }
})();