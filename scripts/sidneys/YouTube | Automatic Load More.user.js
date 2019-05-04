// ==UserScript==
// @name            YouTube | Automatic Load More
// @namespace       de.sidneys.userscripts
// @homepage        https://gist.githubusercontent.com/sidneys/67865e15857546e4976c7b90cf9440d9/raw/
// @version         10.0.0
// @description     Automatically "Load More" button on most YouTube pages
// @author          sidneys
// @icon            https://www.youtube.com/favicon.ico
// @noframes
// @include         http*://www.youtube.com/*
// @require         https://greasyfork.org/scripts/38888-greasemonkey-color-log/code/Greasemonkey%20%7C%20Color%20Log.js
// @require         https://greasyfork.org/scripts/374849-library-onelementready-es6/code/Library%20%7C%20onElementReady%20ES6.js
// @run-at          document-start
// ==/UserScript==

/**
 * ESLint
 * @global
 */
/* global onElementReady */
Debug = false


/**
 * Init
 */
let init = () => {
    console.info('init')

    // Enable Auto "Load More"
    onElementReady('button.yt-uix-load-more:not(.yt-uix-load-more-loading)', false, (element) => {
        element.click()
    })
}


/**
 * @listens window:Event#load
 */
window.addEventListener('load', () => {
    console.debug('window#load')

    init()
})

/**
 * @listens window:Event#spfdone
 */
window.addEventListener('spfdone', () => {
    console.debug('window#spfdone')

    init()
})
