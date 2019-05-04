// ==UserScript==
// @name         Remove Youtube Thumbs Down, Dec 2018
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  removes the thumbs down from youtube
// @author       Me?
// @include     http://www.youtube.com/*
// @include     https://www.youtube.com/*
// @grant        none
// ==/UserScript==
let removed = false;
const thumb_down_id = "path.style-scope[d='M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l.01.01L1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z']";
timerStart = function() {
  if (!removed) {
    let test_endpoint = document.querySelectorAll(thumb_down_id);
    test_endpoint.forEach(function(userItem) {
      target=userItem.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
      target.parentNode.removeChild(target);
    });
  }
}
document.body.addEventListener('DOMSubtreeModified', timerStart, false);