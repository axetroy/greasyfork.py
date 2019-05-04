// ==UserScript==
// @name         Azur Lane Wiki Lazy Load
// @namespace    https://fiery.me
// @version      1.0.3
// @description  Adds Lazy Load capability to IMG elements
// @author       Bobby Wibowo
// @match        *://azurlane.koumakan.jp/*
// @grant        none
// @require      https://cdn.jsdelivr.net/npm/vanilla-lazyload@10.19.0/dist/lazyload.iife.min.js
// @run-at       document-start
// ==/UserScript==

/* global LazyLoad */

(function() {
    'use strict';

    let count = 0
    const imgs = document.querySelectorAll('img')
    for (let i = 0; i < imgs.length; i++) {
        const src = imgs[i].src
        imgs[i].removeAttribute('src')
        imgs[i].removeAttribute('srcset')
        imgs[i].dataset.src = src
        imgs[i].classList.add('lazy')
        count++
    }

    window.alwpLazyLoad = new LazyLoad({ elements_selector: '.lazy' })

    console.log(`ALWLL: ${count}.`)
})();