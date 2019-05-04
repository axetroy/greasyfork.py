// ==UserScript==
// @name         Twitch: <message deleted>
// @namespace    https://greasyfork.org/users/221926
// @version      1.2
// @description  show deleted messages in twitch chat
// @include      https://www.twitch.tv/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
  'use strict'

  function saveMessage (el) {
    el.initialChildNodes = Array.from(el.childNodes)
  }

  function resetMessage (el) {
    while (el.initialChildNodes == null) { el = el.parentNode }
    while (el.lastChild) { el.removeChild(el.lastChild) }
    el.initialChildNodes.forEach(childNode => el.appendChild(childNode))
    el.style.backgroundColor = 'rgba(255, 0, 0, .05)'
    el.style.boxShadow = 'inset 4px 0 0 0 rgba(255, 0, 0, .2)'
  }

  new MutationObserver(mutationList => {
    mutationList.forEach(mutation => {
      Array.from(mutation.addedNodes).forEach(el => {
        switch (el.className) {
          case 'chat-line__message': saveMessage(el); break
          case 'chat-line__message--deleted-notice': resetMessage(el); break
        }
      })
    })
  }).observe(document, { childList: true, subtree: true })
})()
