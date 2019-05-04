// ==UserScript==
// @name            YouTube (New Design) | "Expand All" Button for Video Comments
// @namespace       de.sidneys.userscripts
// @homepage        https://gist.githubusercontent.com/sidneys/6756166a781bd76b97eeeda9fb0bc0c1/raw/
// @version         3.0.0
// @description     Adds a new "Expand all" button to the video comment section which recursively expands all comments and replies. No more clicking "View all replies" or "Read more".
// @author          sidneys
// @icon            https://www.youtube.com/favicon.ico
// @include         http*://www.youtube.com/*
// @require         https://greasyfork.org/scripts/38888-greasemonkey-color-log/code/Greasemonkey%20%7C%20Color%20Log.js
// @require         https://greasyfork.org/scripts/38889-greasemonkey-waitforkeyelements-2018/code/Greasemonkey%20%7C%20waitForKeyElements%202018.js
// @run-at          document-end
// @grant           GM_addStyle
// ==/UserScript==

/**
 * @external
 */
/* global DEBUG */
/* global waitForKeyElements */


/**
 * @default
 * @constant
 */
DEBUG = false


/**
 * @default
 * @constant
 */
const urlPath = '/watch'

/**
 * Inject Stylesheet
 */
let injectStylesheet = () => {
    console.debug('injectStylesheet')

    GM_addStyle(`
    /* ==========================================================================
       ELEMENTS
       ========================================================================== */

    /* .expand-all-video-comments-spinner
       ========================================================================== */

    .expand-all-video-comments-spinner
    {
        background-color: transparent;
        background-image: url('https://i.imgur.com/z4V4Os8.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: 50%;
        margin: 0;
        transition: all 200ms ease-in-out;
        display: inline-block;
        filter: opacity(0);
        height: 2em;
        min-width: 2em;
    }

    .busy .expand-all-video-comments-spinner
    {
        filter: opacity(1);
    }

    /* .expand-all-video-comments-button
       ========================================================================== */

    .expand-all-video-comments-button
    {
        text-transform: uppercase;
        transition: all 200ms ease-in-out;
        filter: hue-rotate(180deg) saturate(500%);
        height: 2em;
        align-items: start;
        padding: 0.2em 0.57em;
        margin-left: 1em;
    }

    .busy .expand-all-video-comments-button
    {
        pointer-events: none;
        cursor: default;
        filter: saturate(0.1);
    }
    `)
}

/**
 * Set global busy mode
 * @param {Boolean} busy - Yes/No
 */
let setBusy = (busy) => {
    console.debug('setBusy', busy)

    let element = document.body

    if (Boolean(busy) === true) {
        element.classList.add('busy')
    } else {
        const timeout = setTimeout(() => {
            element.classList.remove('busy')
            clearInterval(timeout)
        }, 2000)
    }
}

/**
 * Expand all comments recursively
 */
let expandComments = () => {
    console.info('expandComments')

    // Wait for "View all N replies"
    waitForKeyElements('.more-button.ytd-comment-replies-renderer', (element) => {
        setBusy(true)
        element.click()
        console.info('Expanded:', '"View all N replies"')
        setBusy(false)
    })

    // Wait for "Read More"
    waitForKeyElements('.more-button.ytd-comment-renderer', (element) => {
        setBusy(true)
        element.click()
        console.info('Expanded:', '"Read More"')
        setBusy(false)
    })
}


/**
 * Generate button element
 */
let renderButton = () => {
    console.debug('renderButton')

    const containerElement = document.querySelector('ytd-comments-header-renderer > div#title')

    // Render button
    const buttonElement = document.createElement('paper-button')
    buttonElement.onclick = expandComments
    buttonElement.className = 'style-scope expand-all-video-comments-button'
    buttonElement.innerHTML = `
          <div id="icon-label" class="style-scope yt-dropdown-menu" style="line-height: 1.0;">Expand all</div>
    `
    containerElement.appendChild(buttonElement)

    // Render spinner
    const spinnerElement = document.createElement('paper-button')
    spinnerElement.className = 'style-scope expand-all-video-comments-spinner'
    containerElement.appendChild(spinnerElement)
}


/**
 * Init
 */
let init = () => {
    console.info('init')

    // Check URL
    if (!location.pathname.startsWith(urlPath)) { return }

    // Add Stylesheet
    injectStylesheet()

    // Wait for comments header
    waitForKeyElements('yt-sort-filter-sub-menu-renderer > yt-dropdown-menu', () => {
        renderButton()
    }, true)
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
