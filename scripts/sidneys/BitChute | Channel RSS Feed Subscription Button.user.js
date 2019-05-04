// ==UserScript==
// @name            BitChute | Channel RSS Feed Subscription Button
// @namespace       de.sidneys.userscripts
// @homepage        https://gist.githubusercontent.com/sidneys/9eb46f46ae81f048a5fe853ca4905ff0/raw/
// @version         2.1.0
// @description     Adds buttons for subscribing to any BitChute channel feed via RSS
// @author          sidneys
// @icon            https://i.imgur.com/4GUWzW5.png
// @noframes
// @include         *://www.bitchute.com/video/*
// @include         *://www.bitchute.com/channel/*
// @include         *://www.bitchute.com/subscriptions/*
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
 * Feed URL Protocol
 * @default
 * @constant
 */
const urlProtocol = 'feed://'


/**
 * Inject Stylesheet
 */
let injectStylesheet = () => {
    console.debug('injectStylesheet')

    GM.addStyle(`
        /* ==========================================================================
           ELEMENTS
           ========================================================================== */

        .feed-button.subscription-notify-button
        {
            right: 4px;
        }

        .feed-button.subscription-notify-button svg
        {
            width: 0.65em;
        }

        /* ==========================================================================
           OVERRIDES
           ========================================================================== */

        .subscription-button
        {
            right: 45px;
        }

        .subscription-notify-button
        {
            right: 20px;
        }
    `)
}


/**
 * Get Feed URL
 * @param {Element} containerElement - Feed Button Container
 * @returns {String} - Channel Feed URL
 */
let getFeedUrl = (containerElement) => {
    console.debug('getFeedUrl')

    let feedUrl

    // Parse Page for Channel URL
    if (window.location.pathname.startsWith('/channel')) {
        // Page: Channel
        feedUrl = window.location.href
    } else {
        // Page: Video, Subscriptions
        // Lookup Channel Link
        const parentElement = containerElement.classList.contains('subscription-container') ? containerElement : document.querySelector('p.video-author')
        const anchorElement = parentElement.querySelector('a')
        feedUrl = anchorElement.href
    }

    // URL Object
    const urlObject = new URL(feedUrl)

    return `www.bitchute.com/feeds/rss${urlObject.pathname}`
}

/**
 * Render Feed Button
 * @param {Element} siblingElement - Sibling Button
 */
let renderFeedButton = (siblingElement) => {
    console.debug('renderFeedButton')

    // Parent Element
    const parentElement = siblingElement.parentElement

    // Check if button exists
    if (parentElement.querySelector('.feed-button')) { return }

    // Feed URL
    const feedUrl = getFeedUrl(parentElement)

    // Create Button Element
    const buttonElement = document.createElement('a')
    buttonElement.classList.add('feed-button')
    buttonElement.title = `Open RSS Feed (${feedUrl})`
    buttonElement.target = '_blank'
    buttonElement.innerHTML = '<i class="fas fa-rss fa-fw fa-lg"></i>'

    if (siblingElement.classList.contains('channel-notify-button')) {
        buttonElement.classList.add('channel-notify-button')
    }

    if (siblingElement.classList.contains('subscription-notify-button')) {
        buttonElement.classList.add('subscription-notify-button')
    }

    // Button Events
    buttonElement.onclick = () => window.open(`${urlProtocol}${feedUrl}`,'_blank')

    // Append Button Element
    parentElement.appendChild(buttonElement)

    // DEBUG
    console.debug('Added Feed Button', feedUrl)
}


/**
 * Init
 */
let init = () => {
    console.info('init')

    // Add Stylesheet
    injectStylesheet()

    // Page: Channel, Video
    onElementReady('.channel-notify-button', false, (element) => {
        renderFeedButton(element)
    })

    // Page: Subscriptions
    onElementReady('.subscription-notify-button', false, (element) => {
        renderFeedButton(element)
    })
}

/** @listens window:Event#load */
window.addEventListener('load', init())
