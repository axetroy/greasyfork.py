// ==UserScript==
// @name        Pause/Mute HTML5 Audio/Video On Leaving Tab
// @namespace   PauseMuteHTML5AudioVideoAudioOnLeavingTab
// @description Pause or mute HTML5 audio/video on leaving a tab and restore them back on returning.
// @version     1.0.2
// @license     AGPL v3
// @author      jcunews
// @include     *://*/*
// @grant       none
// q@run-at      document-start
// ==/UserScript==

//=== Configuration Start ===
var muteInsteadOfPause = false; //set to `true` to mute instead of pause
//=== Configuration End ===

var sHidden, sVisibilityChange, elements;

if ("undefined" !== typeof document.hidden) {
  sHidden = "hidden";
  sVisibilityChange = "visibilitychange";
} else if ("undefined" !== typeof document.webkitHidden) {
  sHidden = "webkitHidden";
  sVisibilityChange = "webkitvisibilitychange";
} else if ("undefined" !== typeof document.msHidden) {
  sHidden = "msHidden";
  sVisibilityChange = "msvisibilitychange";
}

function checkStatus() {
  if (!document[sHidden] && elements) {
    elements.forEach(function(v) {
      if (muteInsteadOfPause) {
        v.muted = false;
      } else v.play();
    });
  } else {
    elements = Array.prototype.slice.call(document.querySelectorAll("audio, video")).filter(
      function(v) {
        if (muteInsteadOfPause) {
          if (!v.muted) {
            v.muted = true;
            return true;
          }
        } else if (!v.paused) {
          v.pause();
          return true;
        }
        return false;
      }
    );
  }
}

function init() {
  document.removeEventListener(sVisibilityChange, checkStatus);
  document.addEventListener(sVisibilityChange, checkStatus);
}

init();

//Support for Structured Page Fragments. For e.g. YouTube
addEventListener("spfdone", init);
