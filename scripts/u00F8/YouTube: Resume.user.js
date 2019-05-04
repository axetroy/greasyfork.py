// ==UserScript==
// @name         YouTube: Resume
// @namespace    https://greasyfork.org/users/221926
// @version      1.0
// @description  resume videos where you left (time saved in indexedDB)
// @include      https://www.youtube.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
  'use strict'

  const MIN_TIME = 30
  const MIN_TIME_LEFT = 30
  const DELAY = 10

  let currentVideoId = null
  let lastSavedTime = -1

  // indexedDB
  let db = null
  const openDBRequest = window.indexedDB.open('YoutubeResume', 1)
  openDBRequest.onsuccess = function () { db = openDBRequest.result }
  openDBRequest.onupgradeneeded = function () { event.target.result.createObjectStore('videos', { keyPath: 'id' }) }

  function putTime (videoId, time) {
    if (time > lastSavedTime && time < lastSavedTime + DELAY) { return }
    db.transaction(['videos'], 'readwrite').objectStore('videos').put({ id: videoId, t: parseInt(time) })
    lastSavedTime = time
  }
  function deleteTime (videoId) {
    if (lastSavedTime === -1) { return }
    db.transaction(['videos'], 'readwrite').objectStore('videos').delete(videoId)
    lastSavedTime = -1
  }
  function getTime (videoId) {
    return new Promise((resolve, reject) => {
      const request = db.transaction(['videos']).objectStore('videos').get(videoId)
      request.onsuccess = function () { if (request.result) { resolve(request.result.t) } }
    })
  }

  // listeners
  function listener (ev) {
    const video = ev.target
    const params = new URLSearchParams(window.parent.location.search) // window.parent for iframe
    const videoId = params.get('v')
    if (videoId == null) { return }
    if (videoId === currentVideoId) { // save
      if (video.currentTime > MIN_TIME && video.duration - video.currentTime > MIN_TIME_LEFT) {
        putTime(videoId, video.currentTime)
      } else {
        deleteTime(videoId)
      }
    } else { // resume
      currentVideoId = videoId
      lastSavedTime = -1
      if (params.get('t') != null) { return }
      getTime(videoId).then(time => { if (currentVideoId === videoId && video.currentTime < time) { video.currentTime = time } })
    }
  }

  function addTimeUpdateListener (video) {
    video.addEventListener('timeupdate', listener)
  }

  new MutationObserver(mutationList => {
    mutationList.forEach(mutation => {
      Array.from(mutation.addedNodes).forEach(el => {
        if (el.tagName === 'VIDEO') {
          addTimeUpdateListener(el)
        } else if (el.tagName === 'IFRAME' && el.contentDocument != null) { // https://greasyfork.org/scripts/375525
          el.contentDocument.querySelectorAll('video').forEach(addTimeUpdateListener)
        }
      })
    })
  }).observe(document, { childList: true, subtree: true })
})()
