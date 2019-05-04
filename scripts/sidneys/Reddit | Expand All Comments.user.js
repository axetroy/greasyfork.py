// ==UserScript==
// @name            Reddit | Expand All Comments
// @namespace       de.sidneys.userscripts
// @homepage        https://gist.githubusercontent.com/sidneys/759bdb70442597638d63c4ed170020c9/raw/
// @version         1.0.0
// @description     Automatically expands all comment replies within Reddit threads
// @author          sidneys
// @icon            https://www.redditstatic.com/desktop2x/img/favicon/apple-icon-180x180.png
// @include         http*://www.reddit.com/*/comments/*
// @require         https://greasyfork.org/scripts/38888-greasemonkey-color-log/code/Greasemonkey%20%7C%20Color%20Log.js
// @require         https://greasyfork.org/scripts/38889-greasemonkey-waitforkeyelements-2018/code/Greasemonkey%20%7C%20waitForKeyElements%202018.js
// @run-at          document-end
// ==/UserScript==

/**
 * @default
 * @constant
 */
DEBUG = false


/**
 * Expand all comments recursively
 */
let expandComments = () => {
    console.debug('expandComments');

    // Search for "X more replies" element
    waitForKeyElements('div[id^="moreComments"] p', (element) => {
        if (!element.innerText.match(/^(\d+) more/)) { return }
        element.click()

        console.debug('Comment thread expanded.');
    });
}

/**
 * Init
 */
let init = () => {
    console.info('init');

    expandComments()
};


/**
 * @listens window:Event#load
 */
window.addEventListener('load', () => {
    console.debug('window#load');

    init();
});
