// ==UserScript==
// @name         Add Instagram Video Progressbar
// @namespace    https://greasyfork.org/en/users/85671-jcunews
// @description  Add a video playback progressbar at bottom of an Instagram video. This script also disables video looping. Both are configurable.
// @author       jcunews
// @version      1.0.3
// @license      GNU AGPLv3
// @match        *://www.instagram.com/*
// @exclude      *://www.instagram.com/stories/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function(vael, ie, ee, be) {

  //===== CONFIGURATION BEGIN =====

  var ProgressbarHeight       = 3; //in pixels. set to zero to hide
  var ProgressbarColor        = "#fff"; //e.g. "#fff" or "#e0e0e0" or "cyan"
  var ProgressbarElapsedColor = "#f00";

  var disableVideoLoop = true;

  //===== CONFIGURATION END =====

  function addBar(a, b) {
    if (disableVideoLoop) ie = this.parentNode.parentNode.parentNode.parentNode.lastElementChild;
    a = "aivp" + (new Date()).getTime();
    b = a + "bar";
    ee = document.createElement("DIV");
    ee.id = a;
    ee.innerHTML = `<style>
#${a} { position: absolute; opacity: .66; left: 0; right: 0; bottom: 0; height: ${ProgressbarHeight}px; background: ${ProgressbarColor} }
#${b} { width: 0; height: 100%; background: ${ProgressbarElapsedColor} }
</style><div id="${b}"></div>`;
    be = ee.lastElementChild;
    this.parentNode.insertBefore(ee, this);
    this.removeEventListener("canplay", addBar);
  }
  vael = HTMLVideoElement.prototype.addEventListener;
  HTMLVideoElement.prototype.addEventListener = function() {
    var ve, res, tm;
    function updBar() {
      be.style.width = Math.ceil((ve.currentTime / ve.duration) * ee.offsetWidth) + "px";
    }
    function startTimer() {
      if (disableVideoLoop) ve.loop = false;
      if (!tm) tm = setInterval(updBar, 100);
    }
    function stopTimer(ev) {
      if (ev.type === "ended") {
        be.style.width = "100%";
        if (disableVideoLoop) ie.click();
      }
      clearInterval(tm);
      tm = 0;
    }
    ve = this;
    res = vael.apply(this, arguments);
    if (!this.attributes["aivp_done"]) {
      this.setAttribute("aivp_done", "1");
      vael.call(this, "canplay", addBar);
      vael.call(this, "play", startTimer);
      vael.call(this, "playing", startTimer);
      vael.call(this, "waiting", stopTimer);
      vael.call(this, "pause", stopTimer);
      vael.call(this, "ended", stopTimer);
    }
    return res;
  };
})();
