// ==UserScript==
// @name         Azur Lane Wiki Proxy
// @namespace    https://fiery.me
// @version      1.0.1
// @description  Attempt to proxy assets through DuckDuckGo
// @author       Bobby Wibowo
// @match        *://azurlane.koumakan.jp/*
// @grant        none
// @require      https://cdn.jsdelivr.net/npm/vanilla-lazyload@10.19.0/dist/lazyload.iife.min.js
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const proxy = 'https://proxy.duckduckgo.com/iur/?f=1&image_host={url}'

    const buildProxiedUrl = obj => {
        let temp = proxy
        Object.keys(obj).forEach(key => {
            temp = temp.replace(new RegExp(`{${key}}`, 'g'), encodeURIComponent(obj[key]))
        })

        // get rid of extras
        return temp.replace(/{\w+}/g, '')
    }

    let count = 0
    const imgs = document.getElementsByTagName('img')
    for (let i = 0; i < imgs.length; i++) {
        let src = imgs[i].src
        // prepend host origin for relative urls
        if (src.startsWith('/')) { src = location.origin + src }
        // prepend path name for relative urls that do not begin with /
        if (!/https?:\/\//.test(src)) { src = location.origin + location.pathname + '/' + src }
        // build
        const proxied = buildProxiedUrl({ url: src })
        // console.log(`ALWP: ${imgs[i].src} > ${proxied}.`)
        imgs[i].removeAttribute('src')
        imgs[i].removeAttribute('srcset')
        imgs[i].dataset.src = proxied
        imgs[i].classList.add('lazy')
        count++
    }

    window.alwpLazyLoad = new LazyLoad({ elements_selector: '.lazy' })

    console.log(`ALWP: ${count}.`)
})();