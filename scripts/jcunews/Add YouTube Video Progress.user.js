// ==UserScript==
// @name         Add YouTube Video Progress
// @namespace    https://greasyfork.org/en/users/85671-jcunews
// @version      1.5.16
// @license      GNU AGPLv3
// @author       jcunews
// @description  Add progress bars (or dots) at bottom of YouTube video and progress text on the video page. On the progress text, the current video quality will have a "+" suffix if there's a higher one available. Hovering the mouse cursor onto the video quality text will show the current and available video quality IDs and short description.
// @match        https://www.youtube.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

//===== CONFIGURATION BEGIN =====

var progressbarDotStyle     = false; //show graphical progress as dots instead of bars
var progressbarDotStyleSize = 4; //Dot size (for width & height) in pixels if dot style is enabled
var progressbarHeight       = 2; //in pixels
var progressbarColor        = "rgb(0, 0, 0, 0.3)"; //e.g. opaque: "#fff" or "#e0e0e0" or "cyan"; or semi-transparent: "rgb(0, 0, 0, 0.3)" (i.e. 30% opaque)
var progressbarElapsedColor = "#f00";
var progressbarBufferColor  = "#33f";
var contentLoadProcessDelay = 0; //number of milliseconds before processing dynamically loaded contents (increase if slow network/browser)
//styles for progress text (non dark mode)
var progressTextStyles      = "margin-left:1ex;border:1px solid #ccc;border-radius:4px;padding:2px;background:#eee;text-align:center;font-size:9pt";
//styles for progress text (dark mode)
var progressTextStylesDark  = "margin-left:1ex;border:1px solid #eee;border-radius:4px;padding:2px;background:#111;text-align:center;font-size:9pt;color:#eee";

//===== CONFIGURATION END =====

var timerWaitInfo, timerProgressMonitor, timerWaitPlayer, timerDoubleCheck, vplayer, eleProgressText;
var resNums = {
  "light"  :  "144p", //(old ID)
  "tiny"   :  "144p",
  "small"  :  "240p",
  "medium" :  "360p", //nHD
  "large"  :  "480p", //WNTSC
  "hd720"  :  "720p", //HD 1K
  "hd1080" : "1080p", //FHD 2K
  "hd1440" : "1440p", //QHD
  "hd2160" : "2160p", //UHD 4K
  "hd2880" : "2880p", //UHD+ 5K
  "highres": "4320p", //FUHD 8K (YouTube's highest resolution [2019 April])
  "hd6480" : "6480p", //(fictional ID for 12K. Just in case...)
  "hd8640" : "8640p"  //(fictional ID for QUHD 16K. Just in case...)
};
var resDescs = {
  "light"  : "light\xa0(144p)",
  "tiny"   : "tiny\xa0(144p)",
  "small"  : "small\xa0(240p)",
  "medium" : "medium\xa0(360p nHD)",
  "large"  : "large\xa0(480p WNTSC)",
  "hd720"  : "hd720\xa0(720p HD 1K)",
  "hd1080" : "hd1080\xa0(1080p FHD 2K)",
  "hd1440" : "hd1440\xa0(1440p QHD)",
  "hd2160" : "hd2160\xa0(2160p UHD 4K)",
  "hd2880" : "hd2880\xa0(2880p UHD+ 5K)",
  "highres": "highres\xa0(4320p FUHD 8K)",
  "hd6480" : "hd6480\xa0(6480p 12K)",
  "hd8640" : "hd8640\xa0(8640p QUHD 16K)"
};
var fmts = [
  ['3GP',  'MP4V',   [13,17,36]],
  ['FLV',  'H263',   [5,6]],
  ['FLV',  'H264',   [34,35]],
  ['MP4',  'H264',   [18,22,37,38,59,78,82,83,84,85,91,92,93,94,95,96,132,133,134,135,136,137,138,151,160,212,264,266,298,299]],
  ['WebM', 'VP8',    [43,44,45,46,100,101,102,167,168,169,170,218,219]],
  ['WebM', 'VP9',    [242,243,244,245,246,247,248,271,272,278,302,303,308,313,315]],
  ['M4A',  'AAC',    [139,140,141,256,258]],
  ['M4A',  'DTS-ES', [325]],
  ['M4A',  'AC-3',   [328]],
  ['WebM', 'Vorbis', [171,172]],
  ['WebM', 'Opus',   [249,250,251]]
];
var fmtMaps = {};
fmts.forEach(a => a[2].forEach(f => fmtMaps[f] = [a[0], a[1]]));

function processInfo() {
  if (window.vidprogress || (location.pathname !== "/watch")) return;
  clearTimeout(timerWaitInfo);
  (function waitInfo(a) {
    if (a = document.querySelector("#info-contents #info, #watch7-user-header")) {
      eleProgressText = document.createElement("SPAN");
      eleProgressText.id = "vidprogress";
      eleProgressText.innerHTML = '<span id="curq" style="font-weight:500"></span><span id="curtime" style="display:inline-block;margin-left:1ex"></span>';
      eleProgressText.style.cssText = document.documentElement.attributes["dark"] ? progressTextStylesDark : progressTextStyles;
      if (window["body-container"]) {
        a.appendChild(eleProgressText);
      } else a.insertBefore(eleProgressText, a.querySelector("#flex"));
    } else timerWaitInfo = setTimeout(waitInfo, 200);
  })();
}

function processPlayer() {
  function zerolead(n){
    return n > 9 ? n : "0" + n;
  }

  function sec2hms(sec) {
   var c = sec % 60, d = Math.floor(sec / 60);
   return (d >= 60 ? zerolead(Math.floor(d / 60)) + ":" : "") + zerolead(d % 60) + ":" + zerolead(c);
  }

  function getPlayer() {
    return (vplayer = document.querySelector(".html5-video-player"));
  }

  function updProgress(a, b, c, d, e, f, g, l){
    if (eleProgressText) {
      if (document.documentElement.attributes["dark"]) {
        if (eleProgressText.style.cssText !== progressTextStylesDark) eleProgressText.style.cssText = progressTextStylesDark;
      } else if (eleProgressText.style.cssText !== progressTextStyles) eleProgressText.style.cssText = progressTextStyles;
    }
    a = getPlayer();
    if (a && window.vidprogress2b && a.getCurrentTime) try {
      if (window.curtime) try {
        b = a.getPlaybackQuality();
        c = resNums[b] || b;
        (d = a.getAvailableQualityLevels()).pop();
        curq.textContent = c + (d.indexOf(b) > 0 ? "+" : "");
        e = a.getVideoStats();
        g = fmtMaps[e.afmt] || ("a" + e.afmt);
        if (e.fmt) { //has video
          if (f = fmtMaps[e.fmt]) {
            f = `${f[0]} ${f[1]}`;
          } else f = "vid" + e.fmt;
          if (e.afmt) { //video & audio
            if (g = fmtMaps[e.afmt]) {
              e = ` [${f} ${g[1]}]`;
            } else e = ` [${f} aud${e.afmt}]`;
          } else { //no audio. video only
            e = ` [${f}]`;
          }
        } else if (e.afmt) { //no video. audio only
          if (f = fmtMaps[e.afmt]) {
            e = ` [${f[0]} ${f[1]}]`;
          } else e = ` [aud${e.afmt}]`;
        } else e = "";
        curq.title = `Current: ${resDescs[b] || b}${e}\nAvailable: ${d.map(b => resDescs[b] || b).join(", ")}`;
      } catch(b) {
        curq.textContent = "???";
        curq.title = "";
      }
      b = a.getCurrentTime();
      if (b >= 0) {
        l = a.getDuration();
        if (!a.getVideoData().isLive) {
          if (window.curtime) {
            curtime.textContent = sec2hms(Math.floor(b)) + " / " + sec2hms(Math.floor(l)) + " (" + Math.floor(b * 100 / l) + "%)";
          }
          if (progressbarDotStyle) {
            vidprogress2b.style.left = Math.ceil((b / l) * vidprogress2.offsetWidth) + "px";
            vidprogress2c.style.left = Math.ceil((a.getVideoBytesLoaded() / a.getVideoBytesTotal()) * vidprogress2.offsetWidth) + "px";
          } else {
            vidprogress2b.style.width = Math.ceil((b / l) * vidprogress2.offsetWidth) + "px";
            vidprogress2c.style.width = Math.ceil((a.getVideoBytesLoaded() / a.getVideoBytesTotal()) * vidprogress2.offsetWidth) + "px";
          }
        } else {
          if (window.curtime) curtime.textContent = "LIVE";
          if (progressbarDotStyle) {
            vidprogress2b.style.left = "100%";
          } else vidprogress2b.style.width = "100%";
        }
      } else throw 0;
    } catch(a) {
      if (window.curtime) curtime.textContent = "???";
      if (progressbarDotStyle) {
        vidprogress2b.style.left = "0px";
        vidprogress2c.style.left = "0px";
      } else {
        vidprogress2b.style.width = "0px";
        vidprogress2c.style.width = "0px";
      }
    }
  }

  function resumeProgressMonitor() {
    if (timerProgressMonitor) return;
    updProgress();
    timerProgressMonitor = setInterval(updProgress, 200);
  }

  function pauseProgressMonitor() {
    clearInterval(timerProgressMonitor);
    timerProgressMonitor = 0;
    updProgress();
  }

  clearInterval(timerProgressMonitor);
  timerProgressMonitor = 0;
  clearTimeout(timerWaitPlayer);
  timerWaitPlayer = 0;
  clearInterval(timerDoubleCheck);
  timerDoubleCheck = 0;
  (function waitPlayer(v) {
    if (!window.vidprogress2 && getPlayer() && (a = vplayer.parentNode.querySelector("video"))) {
      b = document.createElement("DIV");
      b.id = "vidprogress2";
      b.style.cssText = `opacity:.66;position:absolute;z-index:10;bottom:0;width:100%;height:${
progressbarDotStyle ? progressbarDotStyleSize : progressbarHeight}px;background:${progressbarColor}`;
      v = progressbarDotStyle ? "width:" + progressbarDotStyleSize + "px;margin-left:-" + Math.floor(progressbarDotStyleSize / 2) + "px;" : "";
      b.innerHTML = `<div id="vidprogress2c" style="position:absolute;${v}height:100%;background:${progressbarBufferColor}"></div>
<div id="vidprogress2b" style="position:absolute;${v}height:100%;background:${progressbarElapsedColor}"></div>`;
      vplayer.appendChild(b);
      if (vplayer.getPlayerState() === 1) resumeProgressMonitor();
      //useful: onLoadedMetadata(), onStateChange(state), onPlayVideo(info), onReady(playerApi), onVideoAreaChange(), onVideoDataChange(info)
      //states: -1=notReady, 0=ended, 1=playing, 2=paused, 3=ready, 4=???, 5=notAvailable?
      vplayer.addEventListener("onLoadedMetadata", resumeProgressMonitor);
      vplayer.addEventListener("onStateChange", function(state) {
        if (state === 1) {
          resumeProgressMonitor();
        } else pauseProgressMonitor();
      });
    } else timerWaitPlayer = setTimeout(waitPlayer, 200);
  })();

  function doubleCheck() {
    if (getPlayer() && vplayer.getPlayerState) {
      if (vplayer.getPlayerState() === 1) {
        resumeProgressMonitor();
      } else pauseProgressMonitor();
    }
  }
  if (!timerDoubleCheck) timerDoubleCheck = setInterval(doubleCheck, 500);
}

addEventListener("yt-page-data-updated", processInfo);
addEventListener("yt-player-released", processPlayer);
addEventListener("load", function() {
  processInfo();
  processPlayer();
});
addEventListener("spfprocess", function() {
  setTimeout(function() {
    processInfo();
    processPlayer();
  }, contentLoadProcessDelay);
});
