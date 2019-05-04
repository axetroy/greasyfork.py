// ==UserScript==
// @name         Auto-Refresh GO-SEND Live Tracking
// @namespace    https://fiery.me
// @description  Automatically click reload button on GO-SEND Live Tracking pages.
// @version      1.0.0
// @author       Bobby Wibowo
// @match        https://gosend-livetracking.gojek.co.id/go-send/livetracking/detail/?*
// @grant        none
// ==/UserScript==

(async function() {
    'use strict';

    let reloadButton = null
    await new Promise(resolve => {
        const find = () => {
            console.log('Querying reload button...')
            const button = document.querySelector('#live-tracking--container #delivery--info .reload')
            if (!button) return setTimeout(() => find(), 1000)
            reloadButton = button
            resolve()
        }
        find()
    })
    const interval = setInterval(() => {
        if (!reloadButton) {
            console.log('Reload button went missing, clearing interval...')
            return clearInterval(interval)
        }
        console.log('Clicking reload button...')
        reloadButton.click()
    }, 2500)
})();