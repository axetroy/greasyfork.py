// ==UserScript==
// @name        Cloudflare Refresh
// @namespace   Refresh
// @description Refreshes every 10 seconds
// @include     http://www.syrnia.com*
// @version     1
// @grant       none
// ==/UserScript==
$(document).ready(function () {
  if (document.getElementById('cf-wrapper')) {
    setTimeout(function () { window.location.replace(window.location.href); }, 10000);
  }
});
