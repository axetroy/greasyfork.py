// ==UserScript==
// @name            Share-Online | Automatic Download Start
// @namespace       de.sidneys.userscripts
// @homepage        https://gist.githubusercontent.com/sidneys/28171e1efe984493309010581a389476/raw/
// @version         0.9.0
// @description     Automatically start Share-Online.com downloads as soon as they are ready
// @author          sidneys
// @icon            https://www.share-online.biz/favicon.ico
// @include         http*://www.share-online.biz/dl/*
// @require         https://greasyfork.org/scripts/38888-greasemonkey-color-log/code/Greasemonkey%20%7C%20Color%20Log.js
// @require         https://greasyfork.org/scripts/374849-library-onelementready-es6/code/Library%20%7C%20onElementReady%20ES6.js
// @run-at          document-start
// ==/UserScript==

/**
 * ESLint
 * @global
 */
/* global DEBUG */
/* global onElementReady */


/**
 * @default
 * @constant
 */
DEBUG = false


/**
 * Init
 */
let init = () => {
    console.debug('init')

    // Ready
    onElementReady('#dl_ticket > #dll > p > a > img[alt*="starten"]', false, (element) => {
        const anchorElement = element.closest('a')
        anchorElement.click()
    })
}

/**
 * @listens window:Event#load
 */
window.addEventListener('load', () => {
    console.debug('window#load')

    init()
})
