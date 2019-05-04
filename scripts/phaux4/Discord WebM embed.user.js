// ==UserScript==
// @name        Discord WebM embed
// @description Embeds uploaded and linked WebM files
// @namespace   phaux
// @include     https://discordapp.com/*
// @version     4
// @grant       GM_addStyle
// ==/UserScript==

GM_addStyle(`
.message-group .comment video {
  max-width: 600px;
  max-height: 400px;
}
`)

setInterval(() => {
  for (let el of document.querySelectorAll('a[href$=".webm"], a[href$=".mp4"]')) {
    let v = document.createElement('video')
    v.src = el.href
    v.controls = true
    el.parentNode.replaceChild(v, el)
  }
}, 3000)
