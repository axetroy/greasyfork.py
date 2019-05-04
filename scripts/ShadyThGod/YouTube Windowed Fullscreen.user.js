// ==UserScript==
// @name         YouTube Windowed Fullscreen
// @namespace    ShadyThGod
// @version      1.0
// @description  Watch videos on YouTube fullscreen within your browsers screen.
// @author       ShadyThGod, navi.jador
// @include      *://www.youtube.com/*
// @run-at       document-end
// @icon         data:image/png;base64,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
// @grant        none
// ==/UserScript==

document.head.innerHTML += `<style>
div#movie_player.full_mode {
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  position: fixed;
}

body.full_mode {
  overflow: hidden;
}

#masthead-positioner.full_mode {
  z-index: initial;
}

.html5-video-container {
  height: 100%;
  width: 100%;
  position: absolute;
}

.ytp-chrome-bottom {
  padding-top: 0px !important;
}
.html5-main-video.full_mode {
  height: 100% !important;
  width: 100% !important;
  left: 0 !important;
  top: 0 !important;
}

.ytp-chrome-bottom.full_mode {
  width: 99% !important;
}

.ytp-upnext {
  top: 0px !important;
}

#movie_player.updated-full-mode {
  width: 100% !important;
  height: 100% !important;
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  z-index: 9999 !important;
  z-index: 2147483646 !important;
}

video.updated-full-mode {
  width: 100% !important;
  height: 100% !important;
  left: 0 !important;
  top: 0 !important;
}

body.updated-full-mode {
  overflow-y: hidden !important;
}

.svg-container {
  margin: 9px;
}

.ad-container:not(.ad-overlay) {
  top: 0px;
}

#T_hr {
  z-index: 9998 !important;
}
<style>`;

(function () {
  var page = document.getElementById("page");

  if (page) {
    var isFullMode = false;
    var isFullScreen = false;
    var isTheatreMode = (page.classList.contains("watch-wide") && page.classList.contains("watch-stage-mode") && !page.classList.contains("watch-non-stage-mode"));
    var initialTheatreMode = isTheatreMode;
    var controlsCreated = false;

    function afterNavigate() {
      if (location.pathname == "/watch" && !controlsCreated) {
        createElements();
      } else {
        try {
          if (isFullMode) {
            leaveFullBrowser();
          }
        } catch(err) {
        }
      }
    }

    afterNavigate();
    (document.body || document.documentElement).addEventListener('transitionend', function(e) {
      if ((e.propertyName == "width" && e.target.id == "progress") || (e.target.id == "appbar-guide-menu" && e.propertyName == "opacity")) {
        afterNavigate();
      }
    }, true);

    function toggleFullBrowser() {
      if (isFullMode) {
        leaveFullBrowser();
      } else {
        enterFullBrowser();
      }
    }


    function enterFullBrowser() {
      var original = document.getElementById("original-size");

      isFullMode = true;
      isTheatreMode = (page.classList.contains("watch-wide") && page.classList.contains("watch-stage-mode") && !page.classList.contains("watch-non-stage-mode"));
      initialTheatreMode = isTheatreMode;

      if (!isTheatreMode) {
        original.click();

        isTheatreMode = true;
      }

      document.getElementById("movie_player").classList.add("full_mode");
      document.body.classList.add("full_mode");
      document.getElementById("masthead-positioner").classList.add("full_mode");
      document.getElementsByClassName("ytp-chrome-bottom")[0].classList.add("full_mode");
      document.getElementsByClassName("html5-main-video")[0].classList.add("full_mode");

      var newControl = document.getElementById("full-size");
      original.style.display = "none";
      newControl.style.display = "inline-block";
      newControl.innerHTML = "<svg width=\"18\" height=\"18\" viewBox=\"0 0 1792 1792\" xmlns=\"http://www.w3.org/2000/svg\" class=\"svg-container\"><path d=\"M896 960v448q0 26-19 45t-45 19-45-19l-144-144-332 332q-10 10-23 10t-23-10l-114-114q-10-10-10-23t10-23l332-332-144-144q-19-19-19-45t19-45 45-19h448q26 0 45 19t19 45zm755-672q0 13-10 23l-332 332 144 144q19 19 19 45t-19 45-45 19h-448q-26 0-45-19t-19-45v-448q0-26 19-45t45-19 45 19l144 144 332-332q10-10 23-10t23 10l114 114q10 10 10 23z\" style=\"fill: white;\"></path></svg>";
      window.dispatchEvent(new Event('resize'));
    }

    function leaveFullBrowser() {
      isFullMode = false;

      document.getElementById("movie_player").classList.remove("full_mode");
      document.body.classList.remove("full_mode");
      document.getElementById("masthead-positioner").classList.remove("full_mode");
      document.getElementsByClassName("ytp-chrome-bottom")[0].classList.remove("full_mode");
      document.getElementsByClassName("html5-main-video")[0].classList.remove("full_mode");

      var original = document.getElementById("original-size");
      original.style.display = "inline-block";
      var newControl = document.getElementById("full-size");
      newControl.style.display = "inline-block";
      newControl.innerHTML = "<svg width=\"18\" height=\"18\" viewBox=\"0 0 1792 1792\" xmlns=\"http://www.w3.org/2000/svg\" class=\"svg-container\"><path d=\"M883 1056q0 13-10 23l-332 332 144 144q19 19 19 45t-19 45-45 19h-448q-26 0-45-19t-19-45v-448q0-26 19-45t45-19 45 19l144 144 332-332q10-10 23-10t23 10l114 114q10 10 10 23zm781-864v448q0 26-19 45t-45 19-45-19l-144-144-332 332q-10 10-23 10t-23-10l-114-114q-10-10-10-23t10-23l332-332-144-144q-19-19-19-45t19-45 45-19h448q26 0 45 19t19 45z\" style=\"fill: white;\"></path></svg>";

      if (!initialTheatreMode) {
        original.click();
      }

      window.dispatchEvent(new Event('resize'));
    }

    function createElements() {
      var original = document.getElementsByClassName("ytp-size-button")[0];
      var copy = original.cloneNode(true);
      original.id = "original-size";
      copy.id = "full-size";

      var controls = document.getElementsByClassName("ytp-right-controls")[0];
      var newControl = controls.insertBefore(copy, original);

      newControl.title = "Full Browser Mode";
      newControl.innerHTML = "<svg width=\"18\" height=\"18\" viewBox=\"0 0 1792 1792\" xmlns=\"http://www.w3.org/2000/svg\" class=\"svg-container\"><path d=\"M883 1056q0 13-10 23l-332 332 144 144q19 19 19 45t-19 45-45 19h-448q-26 0-45-19t-19-45v-448q0-26 19-45t45-19 45 19l144 144 332-332q10-10 23-10t23 10l114 114q10 10 10 23zm781-864v448q0 26-19 45t-45 19-45-19l-144-144-332 332q-10 10-23 10t-23-10l-114-114q-10-10-10-23t10-23l332-332-144-144q-19-19-19-45t19-45 45-19h448q26 0 45 19t19 45z\" style=\"fill: white;\"></path></svg>";

      var menu = document.getElementsByClassName("ytp-panel-menu")[0];
      menu.innerHTML = "<div class=\"ytp-menuitem\" id=\"loopVideo\" role=\"menuitemcheckbox\" aria-checked=\"false\" tabindex=\"0\"><div class=\"ytp-menuitem-label\">Loop Video</div><div class=\"ytp-menuitem-content\"><div class=\"ytp-menuitem-toggle-checkbox\"></div></div></div>" + menu.innerHTML;
      document.getElementById("loopVideo").addEventListener("click", function(e) {
        toggleLoop(this);
      })

      newControl.addEventListener("click", function() {
        toggleFullBrowser();
      });

      body.addEventListener("keyup", function(e) {
        if (e.keyCode == 27 && isFullMode) {
          leaveFullBrowser();
        }

        if (e.target.nodeName == "TEXTAREA" || e.target.nodeName == "INPUT" || e.target.classList.contains("comment-simplebox-text")) {
          //Ignore these two types.
        } else {
          if (e.keyCode == 84) {
            toggleFullBrowser();
          }

          if (e.keyCode == 70) {
            toggleIcon();
          }
        }
      });

      var fullScreenButton = document.getElementsByClassName("ytp-fullscreen-button")[0]
      fullScreenButton.addEventListener("click", function() {
        toggleIcon();
      })

      controlsCreated = true;
    }

    function toggleIcon() {
      var newControl = document.getElementById("full-size");

      if (isFullScreen && newControl.style.display != "inline-block") {
        newControl.style.display = "inline-block";
        isFullScreen = false;
      } else if (newControl.style.display == "inline-block") {
        newControl.style.display = "none";
        isFullScreen = true;
      }
    }

    function toggleLoop(element) {
      var videoPlayer = document.getElementsByTagName("video")[0];

      if (element.getAttribute("aria-checked") == "false") {
        element.setAttribute("aria-checked", true);
        videoPlayer.loop = true;
      } else {
        element.setAttribute("aria-checked", false);
        videoPlayer.loop = false;
      }
    }
  } else {
    //NEW LOGIC
    var isFullMode = false;
    var isFullScreen = false;
    var controlsCreated = false;

    document.body.addEventListener("yt-navigate-finish", function(event) {
      var video = document.querySelector("video[src^='blob:https://www.youtube.com'");

      if (video && !controlsCreated) {
        createControl();
      }
    });

    function toggleFullBrowser() {
      if (isFullMode) {
        leaveFullBrowser();
      } else {
        enterFullBrowser();
      }
    }


    function enterFullBrowser() {
      var original = document.getElementById("original-size");
      var newControl = document.getElementById("full-size");

      isFullMode = true;
      isTheatreMode = document.body.getElementsByTagName("ytd-watch")[0].hasAttribute("theater");
      initialTheatreMode = isTheatreMode;

      if (!isTheatreMode) {
        original.click();
        isTheatreMode = true;
      }

      document.getElementById("movie_player").classList.add("updated-full-mode");
      document.body.classList.add("updated-full-mode");
      document.getElementsByClassName("html5-main-video")[0].classList.add("updated-full-mode");
      original.style.display = "none";
      newControl.style.display = "inline-block";
      newControl.innerHTML = "<svg width=\"18\" height=\"18\" viewBox=\"0 0 1792 1792\" xmlns=\"http://www.w3.org/2000/svg\" class=\"svg-container\"><path d=\"M896 960v448q0 26-19 45t-45 19-45-19l-144-144-332 332q-10 10-23 10t-23-10l-114-114q-10-10-10-23t10-23l332-332-144-144q-19-19-19-45t19-45 45-19h448q26 0 45 19t19 45zm755-672q0 13-10 23l-332 332 144 144q19 19 19 45t-19 45-45 19h-448q-26 0-45-19t-19-45v-448q0-26 19-45t45-19 45 19l144 144 332-332q10-10 23-10t23 10l114 114q10 10 10 23z\" style=\"fill: white;\"></path></svg>";
      window.dispatchEvent(new Event('resize'));
    }

    function leaveFullBrowser() {
      var original = document.getElementById("original-size");
      var newControl = document.getElementById("full-size");

      isFullMode = false;
      document.getElementById("movie_player").classList.remove("updated-full-mode");
      document.body.classList.remove("updated-full-mode");
      document.getElementsByClassName("html5-main-video")[0].classList.remove("updated-full-mode");
      original.style.display = "inline-block";
      newControl.style.display = "inline-block";
      newControl.innerHTML = "<svg width=\"18\" height=\"18\" viewBox=\"0 0 1792 1792\" xmlns=\"http://www.w3.org/2000/svg\" class=\"svg-container\"><path d=\"M883 1056q0 13-10 23l-332 332 144 144q19 19 19 45t-19 45-45 19h-448q-26 0-45-19t-19-45v-448q0-26 19-45t45-19 45 19l144 144 332-332q10-10 23-10t23 10l114 114q10 10 10 23zm781-864v448q0 26-19 45t-45 19-45-19l-144-144-332 332q-10 10-23 10t-23-10l-114-114q-10-10-10-23t10-23l332-332-144-144q-19-19-19-45t19-45 45-19h448q26 0 45 19t19 45z\" style=\"fill: white;\"></path></svg>";

      if (!initialTheatreMode) {
        original.click();
      }

      window.dispatchEvent(new Event('resize'));
    }

    function createControl() {
      var original = document.getElementsByClassName("ytp-size-button")[0];
      var copy = original.cloneNode(true);

      original.id = "original-size";
      copy.id = "full-size";

      var controls = document.getElementsByClassName("ytp-right-controls")[0];
      var newControl = controls.insertBefore(copy, original);

      newControl.title = "Full Browser Mode";
      newControl.innerHTML = "<svg width=\"18\" height=\"18\" viewBox=\"0 0 1792 1792\" xmlns=\"http://www.w3.org/2000/svg\" class=\"svg-container\"><path d=\"M883 1056q0 13-10 23l-332 332 144 144q19 19 19 45t-19 45-45 19h-448q-26 0-45-19t-19-45v-448q0-26 19-45t45-19 45 19l144 144 332-332q10-10 23-10t23 10l114 114q10 10 10 23zm781-864v448q0 26-19 45t-45 19-45-19l-144-144-332 332q-10 10-23 10t-23-10l-114-114q-10-10-10-23t10-23l332-332-144-144q-19-19-19-45t19-45 45-19h448q26 0 45 19t19 45z\" style=\"fill: white;\"></path></svg>";

      newControl.addEventListener("click", function() {
        toggleFullBrowser();
      });

      document.body.addEventListener("keyup", function(e) {
        if (e.keyCode == 27 && isFullMode) {
          leaveFullBrowser();
        }

        if (e.target.nodeName == "TEXTAREA" || e.target.nodeName == "INPUT") {
          //Ignore these two types.
        } else {
          if (e.keyCode == 84) {
            toggleFullBrowser();
          }

          if (e.keyCode == 70) {
            toggleIcon();
          }
        }
      });

      var fullScreenButton = document.getElementsByClassName("ytp-fullscreen-button")[0];

      fullScreenButton.addEventListener("click", function() {
        toggleIcon();
      })

      controlsCreated = true;
    }

    function toggleIcon() {
      var newControl = document.getElementById("full-size");

      if (isFullScreen) {
        newControl.style.display = "inline-block";
        isFullScreen = false;
      } else {
        newControl.style.display = "none";
        isFullScreen = true;
      }
    }
  }
}());
