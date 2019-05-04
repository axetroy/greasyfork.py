// ==UserScript==
// @author       Xwth
// @name         Original Twitter Image
// @namespace    http://tampermonkey.net/
// @run-at       document-start
// @version      1
// @match        https://pbs.twimg.com/media/*
// @exclude      /^https?:\/\/pbs\.twimg\.com\/media\/.*\.(jpg|gif|png|jpeg|bmp|webp)\?name=orig(\/*)$/
// @description  simple twitter redirection
// ==/UserScript==

;(function() {
  window.stop()
  let url = location.href
  const re = /^https?:\/\/pbs\.twimg\.com\/media\/.*\.(?:jpg|gif|png|jpeg|bmp|webp)(?::large|:thumb|)(\/*)$/
  if (re.test(url)) {
    location.href = url.split(':')[1] + '?name=orig'
    return
  } else {
    location.href = url + '?name=orig'
    return
  }
})()
