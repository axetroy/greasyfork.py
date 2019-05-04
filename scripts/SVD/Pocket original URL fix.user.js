// ==UserScript==
// @name         Pocket original URL fix
// @namespace    None
// @version      0.2
// @description  Fix Pocket's original link
// @author       SVD
// @match        https://getpocket.com/a/*
// @grant        none
// ==/UserScript==

(function(){
    window.addEventListener('mousedown', (e) => {
        let target = e.target
        if (target.href && target.href.includes('https://getpocket.com/redirect?url=')){
            e.preventDefault()
            e.stopImmediatePropagation()
            let URL = target.href
            URL = URL.replace('https://getpocket.com/redirect?url=', '')
            URL = decodeURIComponent(URL)
            URL = URL.replace(/&formCheck=.*$/, '')
            window.open(URL, '_blank')
        }
    }, true)
})();