// ==UserScript==
// @name     MAL Tag Line Breaks
// @description Allows you to enter line breaks in the tags quick edit field by pressing Shift+Enter
// @locale en
// @license MIT
// @version  1.0
// @grant    none
// @match https://*.myanimelist.net/animelist/*
// @match https://*.myanimelist.net/mangalist/*
// @run-at document-end
// @namespace https://greasyfork.org/users/203863
// ==/UserScript==

document.addEventListener('keydown', e => {
  if (e.keyCode === 13 && e.shiftKey && e.target.tagName === 'TEXTAREA') {
    e.stopPropagation()
  }
}, {capture: true})