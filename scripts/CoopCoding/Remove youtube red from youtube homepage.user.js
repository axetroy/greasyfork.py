// ==UserScript==
// @name         Remove youtube red from youtube homepage
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Removes youtube red videos from the youtube homepage
// @author       You
// @match        https://www.youtube.com/
// @grant        none
// ==/UserScript==


document.querySelector('.yt-simple-endpoint.style-scope.ytd-shelf-renderer[href="/channel/UCqVDpXKLmKeBU_yyt_QkItQ"]')
  .parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.remove()

setTimeout(() => {
  document.querySelector('.yt-simple-endpoint.style-scope.ytd-shelf-renderer[href="/channel/UCqVDpXKLmKeBU_yyt_QkItQ"]')
  .parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.remove()
}, 1500)