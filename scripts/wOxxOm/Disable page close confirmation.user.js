// ==UserScript==
// @name        Disable page close confirmation
// @description Disable page close confirmation (onBeforeUnload)
// @namespace   http://nags.must.die
// @version     1.1
// @grant       none
// @run-at      document-end
// ==/UserScript==

window.onbeforeunload = null;
window.onunload = null;

window.addEventListener('beforeunload', function(e) {
  window.onbeforeunload = null;
  window.onunload = null;
});
