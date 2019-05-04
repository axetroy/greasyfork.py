// ==UserScript==
// @name         Aliexpress Url Cleaner
// @version      0.2
// @description  Removes unnecessary parameters to Aliexpress urls
// @match        *://*.aliexpress.com/*
// @namespace    https://greasyfork.org/users/168
// @run-at       document-body
// @grant        none
// ==/UserScript==

function whenReady() {
    return new Promise((resolve) => {
        function completed() {
            document.removeEventListener('DOMContentLoaded', completed);
            window.removeEventListener('load', completed);
            resolve();
        }

        if (document.readyState === 'complete' ||
            document.readyState === 'interactive') {
            resolve();
        } else {
            document.addEventListener('DOMContentLoaded', completed);
            window.addEventListener('load', completed);
        }
    });
}


let reg = /((?:https?:)?\/\/(?:\w+\.)?aliexpress\.com\/(?:store\/product\/[^\/]+\/\d+_\d+|item\/[^\/]+\/\d+)\.html)(\?[^#\r\n]+)?(#.+)?/i;

function toCanonical(original) {
    let match = original.match(reg);
    if (match) {
        return match[1] + (match[3] || '');
    }
    return null;
}

let canonical = toCanonical(window.location.href);
if (!canonical) {
    let link = document.querySelector('head > link[rel=canonical]');
    if (link) {
        canonical = toCanonical(link.href + window.location.hash);
    }
}
if (canonical) {
    window.history.replaceState(history.state, document.title, canonical);
}

whenReady().then(() => {
    document.querySelectorAll('a').forEach((e) => {
        let canonical = toCanonical(e.href);
        if (canonical) {
            e.href = canonical;
        }
    });
});
