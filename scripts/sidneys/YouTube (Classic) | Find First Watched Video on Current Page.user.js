// ==UserScript==
// @name            YouTube (Classic) | Find First Watched Video on Current Page
// @namespace       de.sidneys.userscripts
// @homepage        https://gist.githubusercontent.com/sidneys/b9ec981e5c460e7081eb9a04a4097923/raw/
// @version         18.0.0
// @description     Look up & display the first watched video on the current page
// @author          sidneys
// @icon            https://www.youtube.com/favicon.ico
// @noframes
// @include         http*://www.youtube.com/*
// @require         https://cdnjs.cloudflare.com/ajax/libs/zenscroll/4.0.2/zenscroll.js
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
/* global zenscroll */
Debug = false


/**
 * Zenscroll Configuration
 * @default
 */
window.noZensmooth = true


/**
 * Inject Stylesheet
 */
let injectStylesheet = () => {
    console.debug('injectStylesheet')

    GM.addStyle(`
        /* ==========================================================================
           MENU
           ========================================================================== */

        /* ul.appbar-nav-menu-custom
           ========================================================================== */

        ul.appbar-nav-menu-custom
        {
            position: absolute;
            right: 24px;
        }

        /* a.yt-uix-button-custom-search
           ========================================================================== */

        a.yt-uix-button-custom-search
        {
            width: auto !important;
            opacity: 0.75 !important;
            transition: opacity 250ms ease-in-out !important;
        }

        a.yt-uix-button-custom-search:hover
        {
            opacity: 1.0 !important;
        }

        a.yt-uix-button-custom-search svg
        {
            vertical-align: middle;
            height: 24px;
            fill: white;
        }

        /* .busy
           ========================================================================== */

        .busy
        {
            cursor: wait;
            animation: pulsating-opacity 500ms cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s infinite alternate;
        }

        .busy a.yt-uix-button-custom-search
        {
            pointer-events: none;
        }


        /* .highlighted-item
           ========================================================================== */

        .highlighted-item
        {
            border-color: rgb(255, 33, 23) !important;
            border-style: solid !important;
            border-width: 2px !important;
            background-image: linear-gradient(rgba(255, 33, 23, 0.5) 0%, rgba(255, 33, 23, 0) 25%, rgba(255, 33, 23, 0) 75%, rgba(255, 33, 23, 0.5) 100%) !important;
        }


        /* ==========================================================================
           VENDOR OVERRIDES
           ========================================================================== */

        /* .div.menu-container.shelf-title-cell
           ========================================================================== */

        div.menu-container.shelf-title-cell
        {
            padding-right: 0 !important;
        }


        /* ==========================================================================
           ANIMATIONS
           ========================================================================== */

        @keyframes pulsating-opacity
        {
            0% { filter: opacity(0.75); }
            25% { filter: opacity(0.75); }
            50% { filter: opacity(0.25); }
            75% { filter: opacity(0.75); }
            100% { filter: opacity(0.75); }
        }
    `)
}


/**
 * Highlighted Element Class
 */
const highlightedElementClassName = 'highlighted-item'

/**
 * Get button menu
 * @returns {Element|null}
 */
let getMenuElement = () => document.querySelector('#appbar-nav.appbar-content-hidable')

/**
 * Get 'Lookup' button
 * @returns {Element|null}
 */
let getLookupButtonElement = () => document.querySelector('a.yt-uix-button-custom-search')

/**
 * Get 'Load More' button
 * @returns {Element|null}
 */
let getLoadmoreButtonElement = () => document.querySelector('button.yt-uix-load-more:not(.yt-uix-load-more-loading)')

/**
 * Get 'Highlighted Item' element
 * @returns {Element|null}
 */
let getHighlightedElement = () => document.querySelector(`.${highlightedElementClassName}`)


/**
 * Lookup Loop
 */
let lookupHighlightedElement = () => {
    console.debug('lookupHighlightedElement')

    // Disable Lookup Button
    const lookupButtonElementParent = getLookupButtonElement().parentNode
    lookupButtonElementParent.classList.add('busy')

    let requestId
    let lookup = () => {
        // Look for element
        let targetElement = getHighlightedElement()

        // Element found
        if (targetElement) {
            // End lookup loop
            window.cancelAnimationFrame(requestId)

            // Scroll element into view
            zenscroll.center(targetElement, parseInt(document.documentElement.scrollHeight / 5), null, () => {
                // Enable search button
                lookupButtonElementParent.classList.remove('busy')
            })

            return
        }

        // Click "Load More" button
        const loadmoreButtonElement = getLoadmoreButtonElement()
        if (loadmoreButtonElement) {
            loadmoreButtonElement.click()
        }

        // Continue lookup loop
        requestId = window.requestAnimationFrame(lookup)
    }

    // Start lookup loop
    requestId = window.requestAnimationFrame(lookup)
}


/**
 * Render Lookup Button
 */
let renderLookupButton = () => {
    console.debug('renderLookupButton')

    const menuElement = getMenuElement()

    // Render List
    const listElement = document.createElement('ul')
    listElement.className = 'appbar-nav-menu appbar-nav-menu-custom'
    const itemElement = document.createElement('li')

    // Render button
    const anchorElement = document.createElement('a')
    anchorElement.className = 'yt-uix-button yt-uix-button-epic-nav-item yt-uix-button-custom-search'
    anchorElement.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
	         <path d="M12.3,2C6.6,2,2,6.6,2,12.3s4.6,10.3,10.3,10.3c0.3,0,0.6,0,0.9,0c-0.6-1-0.9-2.2-0.9-3.4c0-3.8,3.1-6.9,6.9-6.9 c1.2,0,2.4,0.3,3.4,0.9c0-0.3,0-0.6,0-0.9C22.6,6.6,18,2,12.3,2z M13.1,4.6v8.6H5.4v-1.7h6V4.6"/>
	         <path d="M24.1,22.6c0.7-1,1.1-2.2,1.1-3.6c0-3.4-2.8-6.2-6.2-6.2s-6.2,2.8-6.2,6.2s2.8,6.2,6.2,6.2c1.3,0,2.6-0.4,3.6-1.1l3.9,3.9 l1.5-1.5L24.1,22.6z M19.1,23.2c-2.3,0-4.1-1.8-4.1-4.1s1.8-4.1,4.1-4.1s4.1,1.8,4.1,4.1S21.3,23.2,19.1,23.2z"/>
        </svg>
    `

    // Events
    anchorElement.onclick = () => {
        lookupHighlightedElement()
    }

    // Commit
    itemElement.appendChild(anchorElement)
    listElement.appendChild(itemElement)
    menuElement.appendChild(listElement)
}

/**
 * Highlight First Watched Feed Item
 * @param {Element} resumeElement - "Resume" element
 */
let highlightFirstWatchedElement = (resumeElement) => {
    console.debug('highlightFirstWatchedElement')

    // Only highlight first element
    if (getHighlightedElement()) { return }

    // Lookup closest Feed Item element (varies per page)
    const element = resumeElement.closest('ul#browse-items-primary > li.feed-item-main > li.expanded-shelf-content-item-wrapper') ||
        resumeElement.closest('div#browse-items-primary > ol.section-list > li > ol.item-section') ||
        resumeElement.closest('ul#browse-items-primary > li.feed-item-container li.channels-content-item') ||
        resumeElement.closest('ul#browse-items-primary > li.feed-item-container')

    // Ensure Feed Item element
    if (!element) { return }

    // Highlight element
    element.classList.add(highlightedElementClassName)

    // Remove element background
    element.querySelectorAll('*').forEach(div => div.style.cssText = 'background: none !important;')

    // DEBUG
    // console.debug('First "Watched" Feed Item:', element.querySelector('.yt-lockup-content').innerText.replace(/\r?\n|\r/gm,' '));
}


/**
 * Init
 */
let init = () => {
    console.info('init')

    // Add Stylesheet
    injectStylesheet()

    // Create Lookup Button
    onElementReady('.yt-uix-menu-top-level-button-container', true, () => {
        renderLookupButton()
    })

    // Highlight first watched item
    onElementReady('span.resume-playback-background', false, (element) => {
        highlightFirstWatchedElement(element)
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
