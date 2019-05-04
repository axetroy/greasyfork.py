// ==UserScript==
// @name         Reddit redirect external links to comments page
// @namespace    
// @version      1.3
// @description  Replace all external post links with the comment link. Every external Link will redirect to the comments page instead of the external url (currently works on home, subreddits and user profiles with the standard reddit theme). Also adds an "(Open external Link)" link after the post title, if you still want to visit the external url.
// @author       TheExoduser
// @match        *://*.reddit.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

// Check if jQuery is available
if (typeof jQuery === 'undefined') {
    console.error("jQuery not available! Links have not been replaced!");
    return;
}

// On page load, run the replace function
$(document).ready(function() {
    parseAndReplaceLinks("#siteTable");
});

// Parse and replace all post links with the corresponding comment links
function parseAndReplaceLinks( parent ) {
    var posts = null;
    var itemLink = null;
    var commentLink = null;

    if(window.location.href.match('(http|https):\/\/(?:www.)reddit.com\/.*\/comments\/.*')) {
        // Do nothing if on comments page
        console.log("No comments replaced");
        return;
    } else if(window.location.href.match('(http|https):\/\/(?:www.)reddit.com\/(u|user)\/.*')) {
        posts = $(parent + ' > .thing');

        $(posts).each(function (index) {
            if (($(this).find('p.parent').html()).length > 0) {
                itemLink = $(this).find('.parent a.title').attr('href');
                commentLink = $(this).find('.entry li.first:nth-child(2) > a').attr('href');

                if (itemLink.startsWith('https://') || itemLink.startsWith('http://')) {
                    if (!itemLink.match('(http|https):\/\/(?:www.)reddit.com\/r\/.*')) {
                        $(this).find('a.title').append(' <span class="domain">(<a href="' + $(this).find('a.title').attr('href') + '" target="_blank">Open external Link</a>)</span>');
                        $(this).find('a.title').attr('href', commentLink);
                    }
                } else {
                    // Internal Reddit link or already replaced -> no replace needed
                    return;
                }
            } else {
                itemLink = $(this).find('.entry a.title').attr('href');
                commentLink = $(this).find('.entry li.first > a').attr('href');

                if (itemLink.startsWith('https://') || itemLink.startsWith('http://')) {
                    if (!itemLink.match('(http|https):\/\/(?:www.)reddit.com\/r\/.*')) {
                        $(this).find('a.title').append(' <span class="domain">(<a href="' + $(this).find('a.title').attr('href') + '" target="_blank">Open external Link</a>)</span>');
                        $(this).find('a.title').attr('href', commentLink);
                        $(this).find('a.title').attr('data-href-url', commentLink);
                        $(this).find('a.title').removeAttr('data-outbound-url');
                        $(this).find('a.title').removeAttr('data-outbound-expiration');
                    }
                } else {
                    // Internal Reddit link or already replaced -> no replace needed
                    return;
                }
            }
        });
    } else if (window.location.href.match('(http|https):\/\/(?:www.)reddit.com\/.*') || window.location.href.match('(http|https):\/\/(?:www.)reddit.com\/r\/*')) {
        posts = $(parent + ' div.entry');

        $(posts).each(function (index) {
            itemLink = $(this).find('a.title').attr('href');
            commentLink = $(this).find('li.first > a').attr('href');

            if (itemLink.startsWith('https://') || itemLink.startsWith('http://')) {
                if (!itemLink.match('(http|https):\/\/(?:www.)reddit.com\/r\/.*')) {
                    $(this).find('a.title').append(' <span class="domain">(<a href="' + $(this).find('a.title').attr('href') + '" target="_blank">Open external Link</a>)</span>');
                    $(this).find('a.title').attr('href', commentLink);
                    $(this).find('a.title').attr('data-href-url', commentLink);
                    $(this).find('a.title').removeAttr('data-outbound-url');
                    $(this).find('a.title').removeAttr('data-outbound-expiration');
                }
            } else {
                // Internal Reddit link or already replaced -> no replace needed
                return;
            }
        });
    }
}

/////////////////////////////////////////////////////////////////////////////////////////
// Define mutation observer to detect changes by extensions like RES (infinite scroll)
var observer = new MutationObserver(function(mutations, observer) {
    parseAndReplaceLinks('.content #siteTable > #siteTable');
});

// Activate observer
observer.observe(document.querySelector('.content #siteTable'), {
    childList: true, 
    attributes: true
});
/////////////////////////////////////////////////////////////////////////////////////////
