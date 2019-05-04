// ==UserScript==
// @name            YouTube (Classic) | Compact Subscription Feed
// @namespace       de.sidneys.userscripts
// @homepage        https://gist.githubusercontent.com/sidneys/cc6c87692bd1ea6ef9caf89e9d26f5d5/raw/
// @version         16.0.0
// @description     Compact YouTube Subscription feed. More information on less space.
// @author          sidneys
// @icon            https://www.youtube.com/favicon.ico
// @noframes
// @include         http*://www.youtube.com/*
// @require         https://greasyfork.org/scripts/38888-greasemonkey-color-log/code/Greasemonkey%20%7C%20Color%20Log.js
// @require         https://greasyfork.org/scripts/374849-library-onelementready-es6/code/Library%20%7C%20onElementReady%20ES6.js
// @grant           GM.addStyle
// @run-at          document-start
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
const urlPath = '/feed/subscriptions'


/**
 * Inject Stylesheet
 */
let injectStylesheet = () => {
    console.debug('injectStylesheet')

    GM.addStyle(`
    /* ==========================================================================
       GLOBAL
       ========================================================================== */

    .hide
    {
        opacity: 0 !important;
    }


    /* ==========================================================================
       FEED
       ========================================================================== */

    /* Feed Container
       ========================================================================== */

    .layout-list div#content
    {
        position: relative !important;
        margin-top: 2% !important;
        width: 95% !important;
    }

    .layout-list div.branded-page-v2-primary-col > div.yt-card
    {
        margin-top: 0 !important;
    }


    /* Feed Header
       ========================================================================== */

    .layout-list ol.section-list > li:first-child div.feed-item-container
    {
        border-top: none !important;
        background-image: linear-gradient(to bottom, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.25)) !important;
        background-repeat: no-repeat !important;
        background-size: 100% 45px !important;
    }

    .layout-list ol.section-list > li:first-child div.feed-item-container div.menu-container
    {
        margin-bottom: 20px !important;
    }

    .layout-list ol.section-list > li:first-child div.feed-item-container div.shelf-title-table
    {
        display: table !important;
        width: 100% !important;
    }

    .layout-list ol.section-list > li:first-child div.feed-item-container div.shelf-title-table h2
    {
        display: none !important;
    }

    .layout-list ol.section-list > li:first-child div.feed-item-container div.shelf-title-table .menu-container
    {
        display: block !important;
    }


    /* ==========================================================================
       FEED VIDEO ITEMS
       ========================================================================== */

    /* Background Stripes
       ========================================================================== */

    .layout-list ol.section-list > li:nth-child(odd)
    {
        background-color: rgba(0, 0, 0, 0.25) !important;
    }


    /* Video Container
       ========================================================================== */

    .layout-list div.feed-item-container
    {
        border-bottom: 1px solid #5a5a5a !important;
        border-top: none !important;
        padding-bottom: 1px !important;
        padding-top: 1px !important;
        border-width: 0.5px !important;
    }

    .layout-list div.feed-item-container:before,
    .layout-list div.feed-item-container:after
    {
        display: none !important;
    }

    .layout-list ul.expanded-shelf-content-list
    {
        margin: 0 !important;
    }

    .layout-list div.shelf-title-table
    {
        display: none !important;
    }

    .layout-list div.expanded-shelf-content-item
    {
        margin-bottom: 0 !important;
    }

    .layout-list .yt-lockup-dismissable.yt-uix-tile
    {
        height: 40px !important;
        background: none !important;
    }

    .layout-list .yt-lockup .yt-lockup-content
    {
        height: 100% !important;
        display: flex !important;
        align-items: center !important;
        justify-content: stretch !important;
    }

    .layout-list .yt-lockup-notifications-container:not(.hid)
    {
        border: none !important;
        height: 40px !important;
        display: flex !important;
    }

    .layout-list .yt-lockup-notifications-container:not(.hid) .service-endpoint-replace-enclosing-action-notification
    {
        height: unset !important;
        padding: unset !important;
        margin: auto !important;
    }


    /* Video Thumbnail
       ========================================================================== */

    .layout-list div.yt-lockup-thumbnail
    {
        width: 72px !important;
        margin: 5px 10px auto !important;
        height: 30px !important;
    }

    .layout-list div.yt-lockup-thumbnail .yt-thumb
    {
        position: absolute !important;
        top: 0 !important;
        bottom: 0 !important;
        left: 0 !important;
        right: 0 !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
    }

    .layout-list div.yt-lockup-thumbnail .yt-thumb img
    {
        width: 72px !important;
        height: auto !important;
    }

    .layout-list span.video-time
    {
        color: rgb(118, 118, 118) !important;
        font-size: 12px !important;
        background-color: transparent !important;
        white-space: nowrap !important;
        position: relative !important;
        right: unset !important;
        bottom: unset!important;
        padding: unset !important;
        height: unset !important;
        top: unset !important;
    }

    .layout-list .resume-playback-background:before
    {
        top: -37px !important;
        width: 72px !important;
        height: 41px !important;
        line-height: 36px !important;
        font-size: 1em !important;
    }

    .layout-list .resume-playback-background:after
    {
        font-size: 0.75rem !important;
        font-weight: !important;
    }

    .layout-list div.yt-lockup-thumbnail .video-actions.addto-watch-later-button-success
    {
        filter: contrast(150%) brightness(130%) saturate(180%);
        border: 1px solid rgb(0, 74, 0);
    }

    .layout-list div.yt-lockup-thumbnail .video-actions.addto-watch-later-button-success:hover
    {
        filter: saturate(0%) !important;
        background: rgb(180, 180, 180); !important;
    }


    /* Video Title
       ========================================================================== */

    .layout-list h3.yt-lockup-title
    {
        display: block !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        max-width: none !important;
        margin: 0 !important;
        padding: 0 !important;
        order: 1;
        height: 1.4rem !important;
    }

    .layout-list h3.yt-lockup-title .yt-ui-ellipsis:before,
    .layout-list h3.yt-lockup-title .yt-ui-ellipsis:after,
    .layout-list h3.yt-lockup-title .yt-ui-ellipsis-2:before,
    .layout-list h3.yt-lockup-title .yt-ui-ellipsis-2:after
    {
        display: none !important;
    }

    .layout-list h3.yt-lockup-title a
    {
        font-weight: 500 !important;
        display: inline !important;
        white-space: nowrap !important;
        text-overflow: ellipsis !important;
        overflow: hidden !important;
        background: none !important;
        font-size: 0.85rem !important;
        line-height: 0.75rem !important;
        margin-right: 0 !important;
    }

    .layout-list h3.yt-lockup-title > a:first-child {
        color: hsl(205.9, 80%, 65%);
    }

    .layout-list span.yt-channel-title-icon-verified
    {
        margin: 0 0 0 5px !important;
    }


    /* Channel
       ========================================================================== */

    .layout-list h3.yt-lockup-title a.g-hovercard
    {
        color: #1ea4e8 !important;
    }


    /* Video Description
       ========================================================================== */

    div:not(.multirow-shelf) div.yt-lockup-description
    {
        max-width: 70% !important;
        margin-top: 4px !important;
        display: none !important;
    }


    /* Video Badges
       ========================================================================== */

    .layout-list .yt-lockup-badges,
    .layout-list .yt-badge-item
    {
        margin: 0 !important;
        line-height: 100% !important;
        height: 100% !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
    }

    .layout-list .yt-badge
    {
        margin: 0 5px !important;
    }

    .layout-list .yt-uix-livereminder button
    {
        height: 100% !important;
    }


    /* Video Timestamp ("10 Minutes ago")
       ========================================================================== */

    .layout-list .yt-lockup-meta
    {
        margin-left: 10px !important;
        order: 2;
    }

    .layout-list ul.yt-lockup-meta-info
    {
        display: flex;
        flex-direction: row;
    }

    .layout-list ul.yt-lockup-meta-info > li::before
    {
        content: unset;
    }

    .layout-list ul.yt-lockup-meta-info > li:first-child
    {
        filter: opacity(0);
        transition: all 250ms ease-in-out;
        margin: 0 5px;
        order: 1337;
    }

    .layout-list ul.yt-lockup-meta-info > li:first-child:hover,
    .layout-list ul.yt-lockup-meta-info:hover > li:first-child
    {
        filter: opacity(1);
        color: rgba(0, 255, 155, 0.65) !important;
    }

    .layout-list .yt-lockup-badges
    {
        order: -13370;
    }

    /* Video Menu
       ========================================================================== */

    .layout-list .yt-uix-menu-container.yt-lockup-action-menu
    {
        position: relative;
        top: unset;
        right: unset;
        order: 100;
        margin-left: auto;
    }

    .layout-list .yt-lockup-notifications-container:not(.hid)
    {
        border: none !important;
        height: 40px !important;
        display: flex !important;
    }

    .layout-list .yt-lockup-notifications-container:not(.hid) .service-endpoint-replace-enclosing-action-notification
    {
        height: unset !important;
        padding: unset !important;
        margin: auto !important;
    }


    /* ==========================================================================
       POINTER EVENTS
       ========================================================================== */

    .layout-list div.yt-lockup-thumbnail,
    .layout-list h3.yt-lockup-title,
    .layout-list .yt-lockup-meta,
    .layout-list .yt-uix-button-lockup-action-menu
    {
        pointer-events: auto !important;
    }

    .layout-list .yt-lockup-dismissable.yt-uix-tile
    {
        pointer-events: none;
    }
    `)
}


/**
 * Get Feed Layout Type
 * @returns {Boolean} - true: List, false: Grid
 */
let getIsListLayout = () => !Boolean(document.querySelector('div.multirow-shelf'))

/**
 * Adapt feed item element
 * @param {Element} element - Feed item container
 */
let adaptFeedElement = (element) => {
    console.debug('adaptItemLayout')

    // DOM
    const titleElement = element.querySelector('h3.yt-lockup-title')
    const channelLinkElement = element.querySelector('div.yt-lockup-byline a')
    const timestampElement = element.querySelector('span.video-time')
    const metaElementList = element.querySelectorAll('div.yt-lockup-meta')
    const badgesElement = element.querySelector('div.yt-lockup-badges')
    const liveElement = element.querySelector('span.yt-badge-live')
    const livereminderElement = element.querySelector('span.yt-uix-livereminder')
    const menuElement = element.querySelector('div.yt-lockup-content div.yt-lockup-action-menu')
    const bylineElement = element.querySelector('div.yt-lockup-byline')
    const verifiedIconElement = bylineElement.querySelector('span.yt-channel-title-icon-verified')

    // Create Separator
    let elementSeparator = document.createElement('span')
    elementSeparator.innerText = ' | '

    // Title
    if (titleElement) {
        titleElement.insertBefore(elementSeparator, titleElement.firstChild)
    }

    // 'Verified' Icon
    if (titleElement && verifiedIconElement) {
        titleElement.insertBefore(verifiedIconElement, titleElement.firstChild)
        bylineElement.style.display = 'none'
    }

    // Channel
    if (channelLinkElement && titleElement) {
        titleElement.insertBefore(channelLinkElement, titleElement.firstChild)
    }

    // Timestamp
    if (timestampElement && menuElement) {
        menuElement.insertBefore(timestampElement, menuElement.firstChild)
    }

    // Live Badge
    if (liveElement && badgesElement && metaElementList && metaElementList[0] && metaElementList[0].style) {
        badgesElement.style.display = 'inline-block'
        metaElementList[0].style.display = 'inline-block'

        // Move Live Badge to front
        badgesElement.parentElement.insertBefore(badgesElement, metaElementList[0])
    }

    // Reminder Badge / Reminder Button
    if (livereminderElement && badgesElement && metaElementList && metaElementList[0] && metaElementList[1]) {
        badgesElement.style.display = 'inline-block'
        metaElementList.forEach((videoMetaDiv) => {
            videoMetaDiv.style.display = 'inline-block'
        })

        // Move Reminder Badge to front
        badgesElement.parentElement.insertBefore(badgesElement, metaElementList[0])
        // Move Reminder Button to front
        metaElementList[0].parentElement.insertBefore(metaElementList[1], metaElementList[0])
    }
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

    // Set document.body layout class
    getIsListLayout() ? document.body.classList.add('layout-list') : document.body.classList.remove('layout-list')

    // Observe
    onElementReady('.layout-list #browse-items-primary .section-list li .feed-item-container', false, (element) => {
        adaptFeedElement(element)
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
