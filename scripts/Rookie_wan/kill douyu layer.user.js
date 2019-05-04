// ==UserScript==
// @name kill douyu layer
// @namespace Violentmonkey Scripts
// @description remove douyu player page's some html
// @grant none
// @version 0.0.1.20161221161523
// ==/UserScript==
;(() => {
  let layers = ['#js-live-room-recommend', '#gift-content', '#js-stats-and-actions', '#js-live-room-normal-equal-left', '#js-live-room-normal-equal-right', '#js-chat-notice', '.sq-wrap', '#js-chat-cont', '#anchor-info', '#js-fans-rank', '.pay-task', '.chat-top-ad', '.room-ad-top']
  function loop () {
    if (layers.length > 0) {
      for (var i in layers) {
        let dom = document.querySelector(layers[i])
        if (dom && dom.parentNode) {
          dom.parentNode.removeChild(dom)
          layers.splice(i, 1)
        } else {
        }
      }
    }
    window.requestAnimationFrame(loop)
  }
  if (/douyu\.com/.test(window.location.href)) {
    window.requestAnimationFrame(loop)
  }
})()