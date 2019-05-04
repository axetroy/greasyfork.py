// ==UserScript==
// @name        NZBGet Enter Submit
// @namespace   https://arantius.com/misc/greasemonkey/
// @description Enhance the NZBGet interface's in page "forms" so that pressing enter will "submit" them.
// @include     https://home.arantius.com/nzbget/*
// @version     1
// @grant       none
// ==/UserScript==

function onKeyPress(event) {
  if (13 !== event.keyCode) return;
  var el = event.target;
  while (el) {
    if (el.classList.contains('modal')) {
      submitModal(el);
      break;
    }
    el = el.parentNode;
  }
}
window.addEventListener('keypress', onKeyPress, true);

function submitModal(modal) {
  var btns = modal.getElementsByClassName('btn-primary');
  for (var i = 0, btn = null; btn = btns[i]; i++) {
    // Elements that are display:none have no offset parent.
    if (btn.offsetParent) {
      btn.click();
      return;
    }
  }
}