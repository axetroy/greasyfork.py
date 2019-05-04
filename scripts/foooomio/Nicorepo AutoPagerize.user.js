// ==UserScript==
// @name         Nicorepo AutoPagerize
// @namespace    https://foooomio.net/
// @description  ニコニコ動画のニコレポにAutoPager機能を追加する
// @version      0.3
// @author       foooomio
// @license      MIT License
// @match        *://www.nicovideo.jp/my/top*
// @match        *://www.nicovideo.jp/user/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(() => {
  'use strict'

  const $ = document.querySelector.bind(document)

  const autopager = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting || entries[0].target.parentElement.classList.contains('loading')) return
    entries[0].target.click()
  })

  // bootstrap
  new MutationObserver((mutations, self) => {
    const target = $('.NicorepoPastFetcher .next-page-link')
    if (target) {
      autopager.observe(target)
      self.disconnect()
    }
  }).observe(
    $('#MyPageNicorepoApp') || $('#UserPageNicorepoApp'),
    { childList: true, subtree: true }
  )
})()