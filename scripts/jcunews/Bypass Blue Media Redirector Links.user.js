// ==UserScript==
// @name         Bypass Blue Media Redirector Links
// @namespace    https://greasyfork.org/en/users/85671-jcunews
// @description  Bypass Blue Media redirector links
// @author       jcunews
// @version      1.0.1
// @license      GNU AGPLv3
// @match        *://*/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function(a, rx) {
  function processPage() {
    Array.prototype.slice.call(document.links).forEach(function(e, b) {
      if (a = e.href.match(rx)) {
        a = (a[1] !== "h" ? "http" : "") + decodeURIComponent(a[1]);
        if (e.textContent === e.href) {
          e.textContent = a;
        } else if ((b = e.href.match(/^https?:\/\/(.*)/)) && (e.textContent === (b = decodeURIComponent(b[1])))) {
          e.textContent = b;
        }
        e.href = a;
      }
    });
  }
  rx = /^https?:\/\/bluemediafiles\.com\/creatinglinks[^?]+\?xurl=(s?:\/\/[^&]+)/;
  if (a = location.href.match(rx)) {
    location.href = (a[1] !== "h" ? "http" : "") + decodeURIComponent(a[1]);
  } else {
    addEventListener("spfprocess", processPage);
    addEventListener("spfdone", processPage);
    addEventListener("load", processPage);
  }
})();
