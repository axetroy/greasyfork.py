// ==UserScript==
// @name            BitChute | Video Download Button
// @namespace       de.sidneys.userscripts
// @homepage        https://gist.githubusercontent.com/sidneys/b4783b0450e07e12942aa22b3a11bc00/raw/
// @version         22.0.0
// @description     Adds a Download Button to the BitChute Video Player. Supports WebTorrent and Native Mode.
// @author          sidneys
// @icon            https://i.imgur.com/4GUWzW5.png
// @noframes
// @include         *://www.bitchute.com/*
// @require         https://cdn.jsdelivr.net/npm/moment@2.24.0/moment.min.js
// @require         https://greasyfork.org/scripts/38888-greasemonkey-color-log/code/Greasemonkey%20%7C%20Color%20Log.js
// @require         https://greasyfork.org/scripts/374849-library-onelementready-es6/code/Library%20%7C%20onElementReady%20ES6.js
// @connect         bitchute.com
// @grant           GM.addStyle
// @grant           GM.download
// @grant           unsafeWindow
// @run-at          document-start
// ==/UserScript==

/**
 * ESLint
 * @global
 */
/* global onElementReady, moment */
Debug = false


/**
 * Video File Extension
 * @constant
 */
const videoExtension = 'mp4'


/**
 * Inject Stylesheet
 */
let injectStylesheet = () => {
    console.debug('injectStylesheet')

    GM.addStyle(`
        /* ==========================================================================
           ELEMENTS
           ========================================================================== */

        /* a.plyr__control__download
           ========================================================================== */

        a.plyr__control__download,
        a.plyr__control__download:hover
        {
            color: rgb(255, 255, 255);
            display: inline-block;
            animation: fade-in 0.3s;
            pointer-events: all;
            filter: none;
            cursor: pointer;
            white-space: nowrap;
            transition: all 500ms ease-in-out;
        }

        a.plyr__control__download:not(.plyr__control__download--download-ready)
        {
            opacity: 0;
            width: 0;
            padding: 0;
        }

        a.plyr__control__download--download-error
        {
            animation: 5000ms flash-red cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s;
        }

        a.plyr__control__download--download-started
        {
            color: rgb(48, 162, 71);
            pointer-events: none;
            cursor: default;
            animation:  1000ms pulsating-opacity cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s infinite alternate;
        }

        /* ==========================================================================
           ANIMATIONS
           ========================================================================== */

        @keyframes pulsating-opacity
        {
            0% { filter: opacity(1); }
            25% { filter: opacity(1); }
            50% { filter: opacity(0.75); }
            75% { filter: opacity(1); }
            100% { filter: opacity(1); }
        }

        @keyframes flash-red
        {
            0% { color: unset; }
            5% { color: rgb(239, 65, 54); }
            50% { color: rgb(239, 65, 54); }
            80% { color: rgb(239, 65, 54); }
            100% { color: unset; }
        }
    `)
}


/**
 * @callback saveAsCallback
 * @param {Error} error - Error
 * @param {Number} progress - Progress fraction
 * @param {Boolean} complete - Completion Yes/No
 */

/**
 * Download File via Greasemonkey
 * @param {String} url - Target URL
 * @param {String} filename - Target Filename
 * @param {saveAsCallback} callback - Callback
 */
let saveAs = (url, filename, callback = () => {}) => {
    console.debug('saveAs')

    // Parse URL
    const urlObject = new URL(url)
    const urlHref = urlObject.href

    // Trigger Download Request
    GM.download({
        url: urlHref,
        name: filename,
        saveAs: true,
        onerror: (download) => {
            console.debug('saveAs', 'onerror')

            callback(new Error(download.error ? download.error.toUpperCase() : 'Unknown'))
        },
        onload: () => {
            console.debug('saveAs', 'onload')

            callback(null)
        },
        ontimeout: () => {
            console.debug('saveAs', 'ontimeout')

            callback(new Error('Network timeout'))
        }
    })
}

/**
 * Sanitize Filename String
 * @param {String=} filename - Filename
 * @return {String} - Sanitized Filename
 */
let sanitize = (filename = '') => filename.trim().replace(/[^a-z0-9]/gi, '_')


/**
 * Parse Video Timestamp
 * @return {Object|void} - Moment.js Object
 */
let parseTimestamp = () => {
    console.debug('parseTimestamp')

    // Parse
    const dateElement = document.querySelector('.video-publish-date')

    if (!dateElement) { return void 0 }

    // Format
    const dateText = dateElement.textContent.split('at').pop()
    const dateMoment = moment.utc(dateText, 'HH:mm UTC on MMMM Do, YYYY')
    const timestamp = dateMoment.format('YYYY-MM-DD')

    // Return
    return timestamp
}

/**
 * Parse Video Author
 * @return {String|void} - Video Author
 */
let parseAuthor = () => {
    console.debug('parseAuthor')

    // Parse
    const authorElement = document.querySelector('p.video-author > a')

    if (!authorElement) { return }

    // Format
    const authorText = authorElement.textContent

    // Return
    return authorText
}

/**
 * Parse Video Title
 * @return {String|void} - Video Title
 */
let parseTitle = () => {
    console.debug('parseTitle')

    // Parse
    const titleElement = document.querySelector('h1.page-title') || document.querySelector('title')

    if (!titleElement) { return }

    // Format
    const titleText = titleElement.textContent

    // Return
    return titleText
}


/**
 * Generate Filename
 * @return {String} Filename
 */
let generateFilename = () => {
    console.debug('generateFilename')

    let fileNameComponents = []

    // Add timestamp, author, title
    fileNameComponents.push(parseTimestamp())
    fileNameComponents.push(sanitize(parseAuthor()))
    fileNameComponents.push(sanitize(parseTitle()))

    // Sanitize
    fileNameComponents = fileNameComponents.filter(Boolean)

    // Join
    const fileName = fileNameComponents.join('  ')

    // Return
    return `${fileName}.${videoExtension}`
}


/**
 * Render download button
 * @param {String} url - Target URL
 */
let renderDownloadButton = (url) => {
    console.debug('renderDownloadButton')

    // Parse URL
    const urlObject = new URL(url)
    const urlHref = urlObject.href

    // Set filename
    const filename = generateFilename() || urlObject.pathname.url.split('/').pop()

    // Parent
    const parentElement = document.querySelector('.plyr__controls')

    // Button Element
    const anchorElement = document.createElement('a')
    anchorElement.className = 'plyr__control plyr__control__download'
    anchorElement.innerHTML = `
        <svg role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path>
        </svg>
        <span class="plyr__tooltip">Download Video</span>
    `
    anchorElement.href = urlHref
    anchorElement.download = filename
    anchorElement.target = '_blank'
    anchorElement.rel = 'noopener noreferrer'
    anchorElement.type = 'video/mp4'

    parentElement.appendChild(anchorElement)
    anchorElement.classList.add('plyr__control__download--download-ready')

    // Add Events
    anchorElement.onclick = (event) => {
        // Cancel regular download
        event.preventDefault()

        // Reset classes
        anchorElement.classList.remove('plyr__control__download--download-error')
        anchorElement.classList.add('plyr__control__download--download-started')

        // Start download
        saveAs(urlHref, filename, (error) => {
            // Error
            if (error) {
                anchorElement.classList.remove('plyr__control__download--download-started')
                anchorElement.classList.add('plyr__control__download--download-error')

                return
            }

            // Success
            anchorElement.classList.remove('plyr__control__download--download-started')
        })
    }

    /**
     * Filename
     * @type {String}
     */
    console.debug('Video Download button added for URL:', urlHref)
}


/**
 * Init
 */
let init = () => {
    console.info('init')

    // Add Stylesheet
    injectStylesheet()

    // Wait for HTML video player (.plyr)
    onElementReady('.plyr', false, () => {
        // Check if BitChute is using WebTorrent Player or Native Player
        if (unsafeWindow.webtorrent) {
            console.info('Detected WebTorrent Video Player.')

            // WebTorrent Player: Wait for WebTorrent
            const torrent = unsafeWindow.webtorrent.torrents[0]
            torrent.on('ready', () => {
                // Render Download Button
                renderDownloadButton(torrent.urlList[0])
            })
        } else {
            console.info('Detected Native Video Player.')

            // Native Player: Wait for <source> Element
            onElementReady('source', false, (element) => {
                // Render Download Button
                renderDownloadButton(element.src)
            })
        }
    })
}


/**
 * @listens document:Event#readystatechange
 */
document.addEventListener('readystatechange', () => {
    console.debug('document#readystatechange', document.readyState)

    if (document.readyState === 'interactive') { init() }
})
