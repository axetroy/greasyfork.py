// ==UserScript==
// @name         Disable Yahoo Search Result URL Redirector
// @namespace    https://greasyfork.org/en/users/85671-jcunews
// @version      1.0.1
// @license      AGPLv3
// @description  Disable Yahoo URL redirector (i.e. user data tracking) on Yahoo Search result, and ensures that the referring URL (i.e. the search page) is not sent to the target site. This script also disable link tracking that let Yahoo knows which off-site link the user is clicking.
// @author       jcunews
// @match        *://*.yahoo.??/*
// @match        *://*.yahoo.co.??/*
// @match        *://*.yahoo.com/*
// @match        *://*.yahoo.com.??/*
// @grant        none
// ==/UserScript==

(() => {
  function patchYUI() {
    if (YUI.add.DYSRUR) return;
    var ya = YUI.add;
    YUI.add = function(a) {
      if (a === "srp-session-tracking") return;
      return ya.apply(this, arguments);
    };
    YUI.add.DYSRUR = true;
  }
  if (window.YUI) {
    patchYUI();
    var ac = Node.prototype.appendChild;
    Node.prototype.appendChild = function(a) {
      patchYUI();
      return ac.apply(this, arguments);
    };
    var ib = Node.prototype.insertBefore;
    Node.prototype.insertBefore = function(a) {
      patchYUI();
      return ib.apply(this, arguments);
    };
  }
  document.querySelectorAll('a').forEach((a,b) => {
    if (
      (b = a.href.match(/\/\/r\.search\.yahoo\.com\/.*=((?:https?|ftp)[^/&]+)/)) ||
      (b = a.href.match(/yahoo\.com\/.*rurl=((?:https?|ftp)[^&]+)/))
    ) {
      a.href = decodeURIComponent(b[1]);
      a.rel += (a.rel && " ") + "noreferrer";
    }
  });
})();
