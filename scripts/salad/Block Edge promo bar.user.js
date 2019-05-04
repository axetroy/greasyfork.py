// ==UserScript==
// @name         Block Edge promo bar
// @version      0.1.0
// @description  Add cookie to suppress MS Edge promo
// @author       salad: https://greasyfork.org/en/users/241444-salad
// @include      https://*.xbox.com/*
// @include      https://*.microsoft.com/*
// @include      https://*.live.com/*
// @grant        none
// @run-at document-start
// @namespace https://greasyfork.org/users/241444
// ==/UserScript==

(function() {

  let EpbCookie = 'uhf_hide_epb=true';

  let cookies = document.cookie.split('; ');

  let hasEpbCookie = cookies.includes(EpbCookie);

  if(!hasEpbCookie) {
    // assumes Edge won't still be around in 2021
    document.cookie = `${EpbCookie}; expires=2021-01-01T20:38:13.742Z`;
  }

})();
