// ==UserScript==
// @name         Links to Next and Previous Posts
// @namespace    https://greasyfork.org/en/users/163551-vannius
// @version      1.4
// @license      MIT
// @description  Add links to next and previous posts to each post
// @author       Vannius
// @match        https://www.alternatehistory.com/forum/threads/*
// @match        https://forums.spacebattles.com/threads/*
// @grant        none
// ==/UserScript==

(function () {
    if (window.location.host === "www.alternatehistory.com") {
        // Get hash links from divTags and store in hashLinks
        const divTags = document.getElementsByClassName('messageBarNumber');
        const hashLinks = Array.from(divTags).map((element) => element.children[0].href);
        // Very first post of thread's divTag.children[0].href don't have #.
        if (window.location.href.split('/')[6] === '') hashLinks[0] += '#' + divTags[0].parentNode.parentNode.id;

        for (let i = 0; i < divTags.length; i++) {
            // Add a link to next post
            if (i !== divTags.length - 1) {
                const nextPost = document.createElement('a');
                nextPost.title = "Next post";
                nextPost.href = hashLinks[i + 1];
                nextPost.appendChild(document.createTextNode('▼'));
                divTags[i].appendChild(nextPost);
            }
            // Add a link to prev post
            if (i !== 0) {
                const prevPost = document.createElement('a');
                prevPost.title = "Prev post";
                prevPost.href = hashLinks[i - 1];
                prevPost.appendChild(document.createTextNode('▲'));
                const fragment = document.createDocumentFragment();
                fragment.appendChild(prevPost);
                fragment.appendChild(document.createTextNode('\n'));
                divTags[i].insertBefore(fragment, divTags[i].children[0]);
            }
            // Add a link to current post
            if (i === 0 || i === divTags.length - 1) {
                const currentPost = document.createElement('a');
                currentPost.title = "Current post";
                currentPost.href = hashLinks[i];
                currentPost.appendChild(document.createTextNode('◈'));
                if (i === 0) {
                    const fragment = document.createDocumentFragment();
                    fragment.appendChild(currentPost);
                    fragment.appendChild(document.createTextNode('\n'));
                    divTags[i].insertBefore(fragment, divTags[i].children[0]);
                } else if (i === divTags.length - 1) {
                    divTags[i].appendChild(currentPost);
                }
            }
        }
    } else if (window.location.host === "forums.spacebattles.com") {
        // Get message ids from messageTags and make in hashLinks
        const messageTags = document.querySelectorAll('li .messageUserInfo');
        const hashLinks = Array.from(messageTags).map((element) =>
            window.location.origin + window.location.pathname + '#' + element.parentNode.id);

        for (let i = 0; i < messageTags.length; i++) {
            const divTag = document.createElement('div');
            divTag.style.textAlign = 'right';

            // Add a link to next post
            if (i !== messageTags.length - 1) {
                const nextPost = document.createElement('a');
                nextPost.title = "Next post";
                nextPost.href = hashLinks[i + 1];
                nextPost.appendChild(document.createTextNode('▼'));
                divTag.appendChild(nextPost);
            }

            // Add a link to current post
            if (i === 0 || i === messageTags.length - 1) {
                const currentPost = document.createElement('a');
                currentPost.title = "Current post";
                currentPost.href = hashLinks[i];
                currentPost.appendChild(document.createTextNode('◈'));
                divTag.appendChild(currentPost);
            }

            // Add a link to prev post
            if (i !== 0) {
                const prevPost = document.createElement('a');
                prevPost.title = "Prev post";
                prevPost.href = hashLinks[i - 1];
                prevPost.appendChild(document.createTextNode('▲'));
                divTag.appendChild(prevPost);
            }

            messageTags[i].insertBefore(divTag, messageTags[i].children[0]);
        }
    }
})();
