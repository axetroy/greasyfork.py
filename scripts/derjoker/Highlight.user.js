// ==UserScript==
// @name         Highlight
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @description  Highlight & Recall.
// @author       Feng Ya
// @match        https://github.com/derjoker/highlight/blob/master/docs/*.md
// @grant        none
// ==/UserScript==

;(function () {
  'use strict'
  // Your code here...
  console.log('Highlight & Recall.')

  const css = document.createElement('style')
  css.type = 'text/css'
  css.innerHTML = `
    .highlight {
      color: #FBD26B;
      background-color: #FBD26B;
    }
    `
  document.head.appendChild(css)

  document.querySelector('.file').addEventListener('click', event => {
    document
      .querySelectorAll('.file strong')
      .forEach(highlight => highlight.classList.toggle('highlight'))
  })
})()
