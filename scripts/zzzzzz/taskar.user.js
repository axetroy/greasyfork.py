// ==UserScript==
// @name         taskar
// @namespace    https://github.com/turnon/taskar
// @version      0.0.3
// @description  add table of content in jira task browse page
// @author       block24block@gmail.com
// @match        http://task.reocar.com:8080/browse/*
// @grant        none
// @require https://greasyfork.org/scripts/372188-ateles/code/ateles.js?version=631434
// ==/UserScript==
Ateles(['dropdown', 'anchor'], (dd, anchor) => {
    let as = anchor({
        selector: _ => $('#description-val b'),
        text: b => b.innerText
    })

    dd(as, {
        direction: 'down_left',
        afterbegin: document.body,
        style: {
            shadow: true,
            link: 'color: white;',
            children: 'max-width: 500px;',
            id: 'position: fixed; top: 9px; right: 260px; width: 100px; z-index: 99999;'
        }
    })
})