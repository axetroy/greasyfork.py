// ==UserScript==
// @name         Twitch: Auto Theater Mode
// @namespace    https://greasyfork.org/users/221926
// @version      1.0.r
// @description  automatically enable theater mode
// @include      https://www.twitch.tv/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
  'use strict'

  let pathname = ''
  new MutationObserver(() => {
    if (pathname !== location.pathname) {
      const button = document.getElementsByClassName('qa-theatre-mode-button')[0]
      if (button != null) {
        if (document.querySelector('[class*=--theatre-mode]') == null) { button.click() }
        pathname = location.pathname
      }
    }
  }).observe(document.getElementsByTagName('title')[0] || document, { childList: true, subtree: true })
})()
