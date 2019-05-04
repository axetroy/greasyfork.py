// ==UserScript==
// @name         Youtube plus
// @description  Small CSS tweaks to youtube with color theme settings
// @grant        GM_addStyle
// @include *://youtube.com/*
// @include *://www.youtube.com/*
// @run-at document-load
// @version 1.5
// @namespace https://greasyfork.org/users/3167
// ==/UserScript==

var defaultcolor = "hsla(3, 60%, 47%, 1)";

var customcolor = defaultcolor;

var firstrun = false;

if (typeof(Storage) !== "undefined") {
  if (localStorage.yt_custom_color) {
      customcolor = localStorage.yt_custom_color;
  } else {
      firstrun = true;
      localStorage.yt_custom_color = customcolor;
  }
}

console.log("yt_custom_color", customcolor);

var stylesheet = `
body {
    /* --yt-custom-color: " + customcolor + "; */
}
.ytp-pause-overlay {
    display: none;
}
#player-ads { display: none; }
body, ytd-app {
    --yt-brand-paper-button-color: var(--yt-custom-color) !important;
    --yt-brand-color: var(--yt-custom-color) !important;
}
paper-button.ytd-subscribe-button-renderer {
    background: var(--yt-custom-color);
}
a.yt-simple-endpoint.yt-formatted-string, ytd-guide-entry-renderer[active] path.style-scope.yt-icon {
    color: var(--yt-custom-color);
}
#progress.ytd-thumbnail-overlay-resume-playback-renderer, .ytp-red2 .ytp-swatch-background-color, .ytp-red2 .ytp-swatch-background-color-secondary, .ytp-play-progress.ytp-swatch-background-color, .ytp-swatch-background-color-secondary {
    background-color: var(--yt-custom-color);
}
path#lozenge-path, #logo path.style-scope.yt-icon, path.style-scope.ytd-topbar-logo-renderer {
    fill: var(--yt-custom-color);
}
div#top div#player {
    max-height: calc(100vh - var(--ytd-masthead-height, 56px));
}
`;

if (typeof GM_addStyle != "undefined") {
  GM_addStyle (stylesheet);
} else {
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = stylesheet;
  document.head.appendChild(css);
}

var customcolorpicker = document.createElement('input');
customcolorpicker.type = "color";
customcolorpicker.onchange = "setcustomcolor(this.value);";
customcolorpicker.style = "display: none;";
customcolorpicker.addEventListener("change", function() {
    setcustomcolor(this.value);
  
});


var setcustomcolor = function (colorinput) {
  console.log("Changing color theme to: " + colorinput);
  customcolor = colorinput;
  document.body.style.setProperty('--yt-custom-color', customcolor);

  localStorage.yt_custom_color = customcolor;

  var savedcolor = localStorage.yt_custom_color;
  console.log("Saved color theme: " + savedcolor);
  
}
unsafeWindow.setcustomcolor = setcustomcolor;

var pickcustomcolor = function () {
    console.log("click");
    customcolorpicker.click();
}
unsafeWindow.pickcustomcolor = pickcustomcolor;

var resetcustomcolor = function () {
    unsafeWindow.setcustomcolor(defaultcolor);
}
unsafeWindow.resetcustomcolor = resetcustomcolor;


console.log("Youtube++ loaded!");

setcustomcolor(customcolor);

