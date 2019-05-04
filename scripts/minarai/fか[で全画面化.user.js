// ==UserScript==
// @name fか[で全画面化
// @description Firefoxで全画面化のアラートを消すにはabout:config→full-screen-api.warning.timeout→-1
// @match *://*/*
// @grant none
// @version 0.1
// @namespace https://greasyfork.org/users/181558
// ==/UserScript==

(function() {
  document.addEventListener('keydown', function(e) {
    if (/input|textarea/i.test(e.target.tagName)) return;
    if (!e.getModifierState("Alt") && !e.getModifierState("Control") && !e.getModifierState("Shift") && (e.key == "f" || e.key == "[")) { // f [ 全画面化
      var y = window.pageYOffset;
      var doc = window.document;
      var docEl = doc.documentElement;
      var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
      var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
      if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) { requestFullScreen.call(docEl); } else { cancelFullScreen.call(doc); }
      setTimeout(window.scroll, 100, 0, y);
    }
  }, false);
  return
})();
