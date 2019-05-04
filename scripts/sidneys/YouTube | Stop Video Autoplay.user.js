// ==UserScript==
// @name            YouTube | Stop Video Autoplay
// @namespace       de.sidneys.userscripts
// @homepage        https://gist.githubusercontent.com/sidneys/0a5bea36f989d445cdfbd776023a94ca/raw/
// @version         3.0.0
// @description     Stop automatic video playback everywhere. Works on first page load & after navigating.
// @author          sidneys
// @icon            https://www.youtube.com/favicon.ico
// @noframes
// @include         http*://www.youtube.com/*
// @require         https://greasyfork.org/scripts/38888-greasemonkey-color-log/code/Greasemonkey%20%7C%20Color%20Log.js
// @run-at          document-start
// ==/UserScript==

/**
 * ESLint
 * @global
 */
Debug = false


/**
 * @default
 * @constant
 */
const urlPath = '/watch'


/**
 * Stop YouTube Video Player
 */
let stopPlayback = () => {
    console.debug('stopPlayback')

    // Video Playback Events
    const eventList = ['play', 'playing', 'timeupdate']

    eventList.forEach((eventName) => {
        const videoElement = document.querySelector('video')

        /** @listens video:Event */
        videoElement.addEventListener(eventName, () => {
            console.debug('videoElement', eventName)

            const playerElement = document.querySelector('.html5-video-player')

            // Pause Video
            playerElement.pauseVideo()

            // Status
            console.info('Stopped Playback', 'Media Event:', eventName, 'Player State:', playerElement.getPlayerState())
        }, { once: true })
    })
}


/**
 * Init
 */
let init = () => {
    console.info('init')

    // Check URL
    if (!window.location.pathname.startsWith(urlPath)) { return }

    // Stop Playback
    stopPlayback()
}


/**
 * Handle in-page navigation (classic YouTube)
 * @listens window:Event#spfdone
 */
window.addEventListener('spfdone', () => {
    console.debug('window#spfdone')

    init()
})

/**
 * Handle in-page navigation (modern YouTube)
 * @listens window:Event#yt-navigate-finish
 */
window.addEventListener('yt-navigate-finish', () => {
    console.debug('window#yt-navigate-finish')

    init()
})

/**
 * Handle in-page initial page loading, reloading
 * @listens document:Event#readystatechange
 */
document.addEventListener('readystatechange', () => {
    console.debug('document#readystatechange', document.readyState)

    if (document.readyState === 'interactive') { init() }
})
