// ==UserScript==
// @name         Imgur: Disable Hotkeys
// @namespace    https://greasyfork.org/en/scripts/380439-imgur-disable-hotkeys
// @version      1
// @description  disable delete remove keyboard hotkey support on imgur website
// @author       webmaster.greasyfork
// @match          https://imgur.com/
// @match          https://imgur.com/gallery/*
// @include        *://imgur.com/*
// @run-at         document-end
// @grant        none
// ==/UserScript==

// https://stackoverflow.com/a/54741654/7411567

['keydown', 'keyup'].forEach((eventName) => {
  document.addEventListener(
    eventName,
    (e) => {
      e.stopPropagation();
    },
    true // capturing phase - very important
  );
});