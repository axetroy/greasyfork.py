// ==UserScript==
// @name         Disable Instagram Video Loop
// @namespace    https://greasyfork.org/en/users/85671-jcunews
// @description  Disable the looping of Instagram videos.
// @author       jcunews
// @version      1.0.1
// @license      GNU AGPLv3
// @match        *://www.instagram.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function(vael) {
  function disableLoop() {
    this.loop = false;
  }
  vael = HTMLVideoElement.prototype.addEventListener;
  HTMLVideoElement.prototype.addEventListener = function(typ) {
    var res = vael.apply(this, arguments);
    if (typ === "play") vael.call(this, typ, disableLoop);
    return res;
  };
})();
