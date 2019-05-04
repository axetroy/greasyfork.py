// ==UserScript==
// @name            YouTube (Classic) | Expand Video Comments
// @namespace       de.sidneys.userscripts
// @homepage        https://gist.githubusercontent.com/sidneys/2597e8ad1e6be8cad0265c74c4b0dcdc/raw/
// @version         18.0.0
// @description     Adds an "Expand Comments" button to recursively all visible comment threads.
// @author          sidneys
// @icon            https://www.youtube.com/favicon.ico
// @noframes
// @include         http*://www.youtube.com/*
// @require         https://greasyfork.org/scripts/38888-greasemonkey-color-log/code/Greasemonkey%20%7C%20Color%20Log.js
// @require         https://greasyfork.org/scripts/374849-library-onelementready-es6/code/Library%20%7C%20onElementReady%20ES6.js
// @grant           GM.addStyle
// @run-at          document-end
// ==/UserScript==

/**
 * ESLint
 * @global
 */
/* global onElementReady */
Debug = false


/**
 * @default
 * @constant
 */
const urlPath = '/watch'

/**
 * Timespan for spinner to show
 * @constant
 */
const busyDuration = 3000

/**
 * Inject Stylesheet
 */
let injectStylesheet = () => {
    console.debug('injectStylesheet')

    GM.addStyle(`
    /* ==========================================================================
       ELEMENTS
       ========================================================================== */

    /* .expand-video-comments-spinner
       ========================================================================== */

    .expand-video-comments-spinner,
    .expand-video-comments-spinner:hover
    {
        background-color: transparent;
        background-image: url('https://i.imgur.com/z4V4Os8.png');
        background-size: 75%;
        background-repeat: no-repeat;
        background-position: 50%;
        margin: 0 auto 0 1em;
        transition: all 1000ms ease-in-out;
        display: inline-block;
        filter: opacity(0);
    }

    .expand-video-comments-spinner--busy
    {
        filter: opacity(1);
    }

    /* .expand-video-comments-button
       ========================================================================== */

    .expand-video-comments-button
    {
        transition: all 1000ms ease-in-out;
        filter: hue-rotate(180deg) saturate(500%);
    }

    .expand-video-comments-button--busy
    {
        pointer-events: none;
        filter: hue-rotate(180deg) saturate(0%);
    }

    /* .comment-replies-renderer-pages
       ========================================================================== */

    .yt-uix-expander:not(.yt-uix-expander-collapsed) .comment-replies-renderer-pages
    {
        animation: fadeIn 500ms ease-in-out;
    }

    /* ==========================================================================
       ANIMATIONS
       ========================================================================== */

    /* fadeIn
       ========================================================================== */

    @keyframes fadeIn {
      0% {
        filter: opacity(0);
        display: block;
      }
      100% {
        filter: opacity(1);
      }
    }
    `)
}


/**
 * Get Button Element
 * @returns {Element}
 */
let getButtonElement = () => document.querySelector('.expand-video-comments-button')

/**
 * Get Spinner Element
 * @returns {Element}
 */
let getSpinnerElement = () => document.querySelector('.expand-video-comments-spinner')

/**
 * Set global busy mode
 * @param {Boolean} busy - Yes/No
 */
let setBusy = (busy) => {
    // console.debug('setBusy')

    if (busy) {
        getButtonElement().classList.add('expand-video-comments-button--busy')
        getSpinnerElement().classList.add('expand-video-comments-spinner--busy')
    } else {
        const timeout = setTimeout(() => {
            getButtonElement().classList.remove('expand-video-comments-button--busy')
            getSpinnerElement().classList.remove('expand-video-comments-spinner--busy')
            clearTimeout(timeout)
        }, busyDuration)
    }
}

/**
 * Enable Comment Expansion
 */
let enableCommentExpansion = () => {
    console.debug('enableCommentExpansion')

    // Expand "View N replies" (below first comment in comment threads)
    onElementReady('section.comment-thread-renderer div.yt-uix-expander-collapsed-body > button.yt-uix-button:not(.yt-uix-button-action-menu)', true, (element) => {
        setBusy(true)
        element.click()
        setBusy(false)

        // DEBUG
        console.debug('Expanded "View N replies".')
    })

    // Expand "Read More" (inside long comments)
    onElementReady('section.comment-thread-renderer div.comment-text-toggle-link.read-more > button.yt-uix-button:not(.yt-uix-button-action-menu)', true, (element) => {
        setBusy(true)
        element.click()
        setBusy(false)

        // DEBUG
        console.debug('Expanded "Read More".')
    })

    // Expand "Show more replies" (inside comment threads)
    onElementReady('section.comment-thread-renderer div.yt-uix-expander-body > button.comment-replies-renderer-paginator:not(.yt-uix-button-action-menu)', true, (element) => {
        setBusy(true)
        element.click()
        setBusy(false)

        // DEBUG
        console.debug('Expanded "Show more replies".')
    })
}


/**
 * Generate button element
 */
let renderButton = () => {
    console.debug('renderButton')

    const containerElement = document.querySelector('.comments-header-renderer')

    // Render button
    const buttonElement = document.createElement('div')
    buttonElement.onclick = enableCommentExpansion
    buttonElement.className = 'yt-uix-menu comment-section-sort-menu expand-video-comments-button'
    buttonElement.style.cssText = 'margin-left: 0.25rem;'
    buttonElement.innerHTML = `
    <button type="button" class="yt-uix-button yt-uix-button-size-default yt-uix-button-default yt-uix-menu-trigger">
        <span class="yt-uix-button-content">Expand Comments</span>
    </button>
    `
    containerElement.appendChild(buttonElement)

    // Render spinner
    const spinnerElement = document.createElement('div')
    spinnerElement.className = 'yt-uix-button expand-video-comments-spinner'
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
    onElementReady('.comments-header-renderer', false, () => {
        renderButton()
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
