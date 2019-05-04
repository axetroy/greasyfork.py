// ==UserScript==
// @name         Script for easily adding "█" in the input field
// @author       ████████████████
// @version      0.1
// @description  With shift key + 0 key, You can add "█" to the input field
// @match        *://*/*
// @grant        none
// @namespace https://greasyfork.org/users/203557
// ==/UserScript==

(function() {
    'use strict'
    document.addEventListener("keydown", (e)=>{
    if( e.shiftKey && e.key === "0" ) {
        const actv = document.activeElement
        const now = actv.selectionStart
        const str = actv.value
        actv.value = str.substr(0, now) + '█' + str.substr(now, str.length)
        actv.setSelectionRange( now + 1, now + 1 )
    }
})
})();