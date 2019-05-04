// ==UserScript==
// @name         Video Background Play Fix
// @namespace    https://greasyfork.org/en/users/50-couchy
// @version      1.0
// @description  Prevents YouTube and Vimeo from pausing videos when minimizing or switching tabs. Cross-browser port of https://addons.mozilla.org/en-US/firefox/addon/video-background-play-fix/
// @author       Couchy
// @match        *://*.youtube.com/*
// @match        *://*.vimeo.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // Page Visibility API
    Object.defineProperties(document, { 'hidden': {value: false}, 'visibilityState': {value: 'visible'} });
    window.addEventListener('visibilitychange', evt => evt.stopImmediatePropagation(), true);

   // Fullscreen API
   window.addEventListener('fullscreenchange', evt => {
       Object.defineProperties(document,
          { 'fullscreenEnabled': {value: true},
            'fullscreen': {value: true},
            'fullscreenElement': {value: document.fullscreenElement}
          });
      window.addEventListener('fullscreenchange', evt => evt.stopImmediatePropagation(), true);
      }, { capture: true, once: true });
})();