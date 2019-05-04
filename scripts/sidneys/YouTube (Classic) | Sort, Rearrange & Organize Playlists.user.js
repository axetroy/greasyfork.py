// ==UserScript==
// @name            YouTube (Classic) | Sort, Rearrange & Organize Playlists
// @namespace       de.sidneys.userscripts
// @homepage        https://gist.githubusercontent.com/sidneys/27e704ec4a1d9bad311d634cbab2f218/raw/
// @version         29.0.0
// @description     Organize and rearrange your YouTube playlists. Real server-side sorting by duration, title, channel and language.
// @author          sidneys
// @icon            https://www.youtube.com/favicon.ico
// @noframes
// @include         http*://www.youtube.com/*
// @require         https://cdn.jsdelivr.net/gh/sidneys/franc@franc@5.0.0-release/dist/franc-min.js
// @require         https://greasyfork.org/scripts/38888-greasemonkey-color-log/code/Greasemonkey%20%7C%20Color%20Log.js
// @require         https://greasyfork.org/scripts/374849-library-onelementready-es6/code/Library%20%7C%20onElementReady%20ES6.js
// @require         https://greasyfork.org/scripts/375023-library-queryselectorinterval/code/Library%20%7C%20querySelectorInterval.js
// @grant           GM.addStyle
// @run-at          document-start
// ==/UserScript==

/**
 * ESLint
 * @global
 */
/* global franc */
/* global onElementReady */
/* global querySelectorInterval */
/* global clearQuerySelectorInterval */
Debug = false


/**
 * @default
 * @constant
 */
const urlPath = '/playlist'

/**
 * Language detection whitelist
 * See {@link https://github.com/wooorm/franc/tree/master/packages/franc-min}
 * @default
 * @constant
 */
const languageList = ['eng', 'deu']

/**
 * Timer duration
 * @default
 * @constant
 */
const sortInterval = 500


/**
 * Inject Stylesheet
 */
let injectStylesheet = () => {
    console.debug('injectStylesheet')

    GM.addStyle(`
    /* ==========================================================================
       ELEMENTS
       ========================================================================== */

    /* .advanced-playlist-editor-container
       ========================================================================== */

    .advanced-playlist-editor-container
    {
        animation: fade-in 0.3s;
        opacity: 1 !important;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0.8rem 1.2rem;
        transition: all 1000ms ease-in-out;
    }

    .advanced-playlist-editor-container.fade-in
    {
        animation: fade-in 0.3s;
        opacity: 1 !important;
    }

    /* .advanced-playlist-editor-banner
       ========================================================================== */

    .advanced-playlist-editor-banner
    {
        order: 1337;
        font-size: 0.65em;
        filter: opacity(0.5);
        transition: all 1000ms ease-in-out;
        text-align: right;
    }

    /* .advanced-playlist-editor-spinner
       ========================================================================== */

    .advanced-playlist-editor-spinner
    {
        background-image: url('https://i.imgur.com/z4V4Os8.png');
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: 50%;
        order: 2;
        margin: 0 auto 0 1em;
        transition: all 500ms ease-in-out;
        filter: opacity(0);
    }

    /* .advanced-playlist-editor-button
       ========================================================================== */

    .advanced-playlist-editor-button-content
    {
        text-transform: capitalize;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 100%;
        display: inline-block;
        font-weight: 500;
        font-size: 9px;
    }

    .advanced-playlist-editor-button
    {
        order: 1;
        margin: 6px 3px;
        min-width: 80px;
        border-radius: 0 !important;
        transition: all 500ms ease-in-out !important;
        -webkit-font-smoothing: subpixel-antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .advanced-playlist-editor-button:hover
    {
        text-decoration: underline;
    }

    .advanced-playlist-editor-button:last-child
    {
        margin-right: 0 !important;
    }

    .advanced-playlist-editor-button b
    {
        font-weight: 800;
    }

    .advanced-playlist-editor-button.warning
    {
        background-color: rgb(255, 130, 50) !important;
        margin-right: 12px;
    }

    .advanced-playlist-editor-button.danger
    {
        background-color: rgb(240, 0, 0) !important;
        margin-right: 12px;
    }

    .advanced-playlist-editor-button.clear
    {
        margin-left: 5px;
    }

    /* .busy
       ========================================================================== */

    .busy .advanced-playlist-editor-button
    {
        pointer-events: none;
        cursor: default;
        filter: saturate(0.1);
    }

    .busy .advanced-playlist-editor-spinner
    {
        filter: opacity(1);
    }

    /* ==========================================================================
       ANIMATIONS
       ========================================================================== */

    @keyframes fade-in {
        from { opacity: 0 } to { opacity: 1 };
    }
    `)
}


/**
 * Get Container Element
 * @returns {Element}
 */
let getContainerElement = () => document.querySelector('.advanced-playlist-editor-container')

/**
 * Generate menu container element
 */
let renderContainerElement = () => {
    console.debug('renderContainerElement')

    if (getContainerElement()) { return }

    const element = document.createElement('div')
    element.className = 'advanced-playlist-editor-container yt-card'
    element.innerHTML = `
            <div class="advanced-playlist-editor-spinner yt-uix-button yt-uix-button-size-default"></div>
            <div class="advanced-playlist-editor-banner">${GM.info.script.name}<br>${GM.info.script.version}</div>
        `

    document.querySelector('#content > .branded-page-v2-container').insertBefore(element, document.querySelector('.branded-page-v2-col-container'))

    element.classList.add('fade-in')
}

/**
 * Generate button element
 * @param {function} click - OnClick handler
 * @param {String=} label - Button Label
 * @param {String=} className - Additional CSS Class
 */
let renderButtonElement = (click = () => {}, label = '', className = '') => {
    console.debug('renderButtonElement')

    // Create button
    const element = document.createElement('button')
    element.className = 'yt-uix-button yt-uix-button-size-default yt-uix-button-default advanced-playlist-editor-button'
    if (!!className) { element.classList.add(className) }
    element.innerHTML = `<span class="yt-uix-button-content advanced-playlist-editor-button-content">${label}</span>`
    element.onclick = click

    // Render button
    getContainerElement().appendChild(element)
}

/**
 * Set global busy mode
 * @param {Boolean} isBusy - Yes/No
 */
let setBusy = (isBusy) => {
    console.debug('setBusy')

    if (isBusy) {
        getContainerElement().classList.add('busy')
    } else {
        getContainerElement().classList.remove('busy')
    }
}

/**
 * Convert timestamp ('HH:mm:ss') to duration (seconds)
 * @param {String} timestamp - Timestamp in 'HH:mm:ss' format
 * @returns {Number} Duration in seconds
 */
let convertTimestampToSeconds = (timestamp = '00:00:00') => {
    console.debug('convertTimestampToSeconds')

    let p = timestamp.split(':')
    let s = 0
    let m = 1

    while (p.length > 0) {
        s += m * parseInt(p.pop(), 10)
        m *= 60
    }

    return s
}

/**
 * Virtual Youtube Playlist
 * @typedef {YoutubePlaylistItem[]} YoutubePlaylist
 */

/**
 * Virtual Youtube Playlist Item
 * @typedef {Object} YoutubePlaylistItem
 * @property {Number} position - Playlist position
 * @property {String} videoId - YouTube video id
 * @property {String} channel - YouTube video creator
 * @property {String} title - Video title
 * @property {Number} duration - Video duration in seconds
 * @property {String} language - Language
 * @property {Element} element - DOM element
 */

/**
 * Get current Virtual Youtube Playlist
 * @returns {YoutubePlaylist} Virtual Youtube Playlist
 */
const getVirtualPlaylist = () => {
    console.debug('getVirtualPlaylist')

    // Get list of items
    const elementList = Array.from(document.querySelectorAll('tr.pl-video'))

    // Build virtual Playlist from all items
    return elementList.map((/** Element */ element, index) => {
        // Position (Current position)
        const position = index + 1

        // Video id (fallback to '')
        const videoId = element.dataset.videoId || ''

        // Channel (fallback to '' for items without Channel, e.g. "Deleted", "Private")
        const channel = element.querySelector('.pl-video-owner') ? element.querySelector('.pl-video-owner').innerText : ''

        // Title (fallback to '' )
        const title = element.dataset.title || ''

        // Duration (fallback to 1 – for items without timestamp, e.g. Livestream)
        const duration = element.querySelector('.timestamp') ? convertTimestampToSeconds(element.querySelector('.timestamp').innerText) : 1

        // Language
        const language = franc(title, { whitelist: languageList })

        return {
            position: position,
            videoId: videoId,
            channel: channel,
            title: title,
            duration: duration,
            language: language,
            element: element
        }
    })
}


/**
 * Sort current Virtual YouTube Playlist
 * @param {Array} attributeList - Sorting attributes
 * @returns {YoutubePlaylist} Virtual YouTube Playlist (sorted)
 */
let sortVirtualPlaylist = (attributeList) => {
    console.debug('sortVirtualPlaylist')

    // Get current Virtual YouTube Playlist
    let virtualPlaylist = getVirtualPlaylist()

    virtualPlaylist = virtualPlaylist.sort((a, b) => {
        if (a[attributeList[0]] > b[attributeList[0]]) { return -1 }
        if (a[attributeList[0]] < b[attributeList[0]]) { return 1 }

        if (!attributeList[1]) { return 0 }

        if (a[attributeList[1]] > b[attributeList[1]]) { return -1 }
        if (a[attributeList[1]] < b[attributeList[1]]) { return 1 }

        return 0
    })

    // DEBUG
    virtualPlaylist.forEach((video) => {
        console.debug('[SORTED]', `[#${video.position}]`, `[${video.channel}]`, video.title, `(${video.duration}s)`, `(${video.language})`)
    })

    // Return sorted Virtual YouTube Playlist
    return virtualPlaylist
}


/**
 * Apply sorting to DOM
 * @param {YoutubePlaylist} virtualPlaylist - Virtual YouTube Playlist
 */
let renderVirtualPlaylist = (virtualPlaylist) => {
    console.debug('renderVirtualPlaylist')

    setBusy(true)

    // Hide overflow menu for each item (to prevent scrolling)
    document.querySelectorAll('tr.pl-video .yt-uix-menu *').forEach((element) => {
        element.style = 'display: none !important'
    })

    // Empty Virtual Playlist
    // Remove all
    if (virtualPlaylist.length === 0) {
        let requestId
        let lookup = () => {
            const element = document.querySelector('.pl-video-edit-remove')

            if (!element) {
                window.cancelAnimationFrame(requestId)
                setBusy(false)

                return
            }

            element.click()
            requestId = window.requestAnimationFrame(lookup)
        }

        requestId = window.requestAnimationFrame(lookup)

        return
    }

    let index = 0
    const interval = setInterval(() => {
        const virtualPlaylistItem = virtualPlaylist[index]

        // Click "Move to Bottom"
        if (virtualPlaylistItem) {
            virtualPlaylistItem.element.querySelector('.pl-video-edit-more').click()
            virtualPlaylistItem.element.querySelector('.pl-video-edit-move-bottom').click()
        }

        // Iterate
        if (index < virtualPlaylist.length) {
            index++
        }

        // Last iteration
        if (index === virtualPlaylist.length) {
            // Complete
            clearInterval(interval)
            // Enable overflow menu for each item
            document.querySelectorAll('tr.pl-video .yt-uix-menu *').forEach((element) => {
                element.style = 'display: auto !important'
            })
            setBusy(false)
        }
    }, sortInterval)
}


/**
 * Add Button: Sorting
 * @param {Array} attributeList - Sorting attributes
 */
let addSortButton = (attributeList) => {
    console.debug('addSortButton')

    const label = `⬆︎ ${attributeList.join(' | ')}`

    renderButtonElement(() => {
        // Transform Playlist
        const virtualPlaylist = sortVirtualPlaylist(attributeList)
        // Render
        renderVirtualPlaylist(virtualPlaylist)
    }, label)
}

/**
 * Add Button: Reverse
 */
let addReverseButton = () => {
    console.debug('addReverseButton')

    const label = `⬆︎⬇︎ Reverse`
    const className = 'warning'

    renderButtonElement(() => {
        // Transform Playlist
        const virtualPlaylist = getVirtualPlaylist().reverse()
        // Render
        renderVirtualPlaylist(virtualPlaylist)
    }, label, className)
}

/**
 * Add Button: Remove All
 */
let addRemoveAllButton = () => {
    console.debug('addRemoveAllButton')

    const label = `╳ Remove All`
    const className = 'danger'

    renderButtonElement(() => {
        // Transform Playlist
        const virtualPlaylist = []
        // Render
        renderVirtualPlaylist(virtualPlaylist)
    }, label, className)
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

    // Wait for Playlist Menu
    onElementReady('.playlist-actions', true, () => {
        // Add container
        renderContainerElement()
        // Add buttons
        addSortButton(['channel'])
        addSortButton(['channel', 'duration'])
        addSortButton(['language'])
        addSortButton(['language', 'duration'])
        addSortButton(['duration'])
        addSortButton(['title'])
        addReverseButton()
        addRemoveAllButton()
    })

    // Click "Load More" / Show entire Playlist
    querySelectorInterval(document.documentElement, 'button.browse-items-load-more-button', (element) => {
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
 * Handle in-page navigation (classic YouTube)
 * @listens window:Event#spfdone
 */
window.addEventListener('spfdone', () => {
    console.debug('window#spfdone')

    init()
})
