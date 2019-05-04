// ==UserScript==
// @name            Full Reddit Comments
// @version         0.3
// @description     Refresh to dedicated comment page
// @author          Drazen Bjelovuk
// @match           *://www.reddit.com/*
// @grant           none
// @run-at          document-start
// @namespace       https://greasyfork.org/users/11679
// @contributionURL https://goo.gl/dYIygm
// ==/UserScript==

(function() {
  'use strict';

  document.onclick = (e) => {
    if (e.metaKey) return;
    var parent = e.target.parentElement
    var clickId = parent.dataset.clickId;
    if (clickId && clickId === 'comments') {
      e.preventDefault();
      window.location = parent.getAttribute('href');
    }
  };
})();