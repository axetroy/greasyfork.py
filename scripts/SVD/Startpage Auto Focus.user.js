// ==UserScript==
// @name         Startpage Auto Focus
// @namespace    None
// @version      0.22
// @description  Press any key to focus the search bar, F1: Move to previous page, F2: Move to next page
// @author       SVD
// @match        https://*.startpage.com/*
// @grant        none
// ==/UserScript==

(function() {
    document.addEventListener('paste', (e) => {
        focus(e)
    })

    window.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.shiftKey || e.altKey) return // Ctrl, Shift, Alt
        if (e.keyCode > 32 && e.keyCode < 47) return // Home, Down, Arrow keys, Insert, Delete
        if (e.keyCode > 113 && e.keyCode < 124) return // Function keys
        if (e.keyCode === 9 || e.keyCode === 13 || e.keyCode === 19 || e.keyCode === 20 || e.keyCode === 32 || e.keyCode === 144 || e.keyCode === 179) return // Tab, Pause, Caps lock, Space, Num lock, Scroll Lock

        if (e.keyCode === 112 ||e.keyCode === 113) pageMove(e)

        focus(e)
    }, true)

    function focus (e) {
        let search = document.getElementById('query')
        if (search !== undefined) {
            if (document.activeElement !== search) {
                let len = search.value.length
                search.selectionStart = len
                search.selectionEnd = len
                search.focus()
            } else {
                if (e.keyCode === 27) search.blur() // Escape
            }
        }
    }

    function pageMove (e) {
        e.preventDefault()

        let btns = document.querySelectorAll('button.pagination__link')
        if (e.keyCode === 112) btns[0].click()
        else if (e.keyCode === 113) btns[1].click()
    }
})();