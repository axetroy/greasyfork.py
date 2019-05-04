// ==UserScript==
// @name Online YouTube Downloader v0.7 (MP3, MP4, M4A and WEBM) - Offmp3.app
// @description Alternative to: YouTube Multi Downloader. This script helps to add a download button. Presents the fastest ways to transfer and ensure quality. Supported Services: YouTube, SoundCloud, Mixcloud, Facebook, Bandcamp, Twitter, Dailymotion, Vimeo, Instagram and ReverbNation.
// @namespace https://greasyfork.org/users/152924
// @homepageURL https://greasyfork.org/scripts/376246
// @supportURL https://greasyfork.org/scripts/376246/feedback
// @author Punisher
// @version 0.7
// @date 2019-03-17
// @compatible chrome
// @compatible firefox
// @compatible opera
// @compatible safari
// @license CC BY-NC-ND 4.0 International. https://creativecommons.org/licenses/by-nc-nd/4.0/
// @match *://*.youtube.com/*
// ==/UserScript==

(function() {
    if (document.getElementById("polymer-app") || document.getElementById("masthead") || window.Polymer) {
    setInterval(function() {
        if (window.location.href.indexOf("watch?v=") < 0) {
            return false;
        }  
        if (document.getElementById("meta-contents") && document.getElementById("punisher") === null) {
            Addytpolymer();
        }
    }, 100);
      
    setElement = function(url) {
       var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
       var match = String(url).match(regExp);
       return (match&&match[7].length==11)? match[7]: false;
    };

} else {
    
    setInterval(function() {
        if (window.location.href.indexOf("watch?v=") < 0) {
            return false;
        }      
        if (document.getElementById("watch8-sentiment-actions") && document.getElementById("punisher") === null) {
            AddhtmlDV();
        }
    }, 100);
  
    setElement = function(url) {
       var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
       var match = String(url).match(regExp);
       return (match&&match[7].length==11)? match[7]: false;
    };
}

function AddhtmlDV() {
    if (document.getElementById("watch8-sentiment-actions")) {
        var wrap = document.getElementById('watch8-sentiment-actions');
        var button = "<div id='punisher' style='display: inline-block; margin-left: 10px; vertical-align: middle;'>";
        button += "<a href=\"//offmp3.app/process?url=" + decodeURIComponent(document.URL) + "\" title=\"Download\" target=\"_blank\"" + "style=\"display: inline-block; font-size: inherit; height: inherit; border: 1px solid rgb(112, 112, 112); border-radius: 3px; padding-left: 28px; cursor: pointer; vertical-align: middle; position: relative; line-height: 22px; text-decoration: none; z-index: 1; color: rgb(255, 255, 255);\">";
        button += "<i style=\"position: absolute; display: inline-block; left: 6px; top: 3px; background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIiB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMTYgMTYiIGlkPSJzdmcyIiB4bWw6c3BhY2U9InByZXNlcnZlIj48cGF0aCBkPSJNIDQsMCA0LDggMCw4IDgsMTYgMTYsOCAxMiw4IDEyLDAgNCwwIHoiIGZpbGw9IiNmZmZmZmYiIC8+PC9zdmc+); background-size: 12px; background-repeat: no-repeat; background-position: center center; width: 16px; height: 16px;\"></i>";
        button += "<span style=\"padding-right: 12px;\">Download</span></a></div>";
        var style = "<style>#punisher button: -moz-focus-inner {padding: 0; margin:0} #punisher a {background-color: #003030} #punisher a:hover {background-color: #003030} #punisher a:active {background-color: #003030}</style>";
        var tmp = wrap.innerHTML;
        wrap.innerHTML = tmp + button + style;
    }
}

function Addytpolymer() {
    var buttonDiv = document.createElement("span");
    buttonDiv.id = "punisher";
    buttonDiv.style.width = "100%";
    buttonDiv.style.marginTop = "5px";
    buttonDiv.style.padding = "12px 0";
    var addButton = document.createElement("a");
    addButton.appendChild(document.createTextNode("DOWNLOAD"));
    addButton.style.width = "100%";
    addButton.style.cursor = "pointer";
    addButton.style.height = "inherit";
    addButton.style.backgroundColor = "#003030";
    addButton.style.color = "#ffffff";
    addButton.style.padding = "10px 22px";
    addButton.style.margin = "0px 0px";
    addButton.style.border = "0";
    addButton.style.borderRadius = "2px";
    addButton.style.fontSize = "1.4rem";
    addButton.style.fontFamily = "inherit";    
    addButton.style.textAlign = "center";
    addButton.style.textDecoration = "none";
    addButton.href = "//offmp3.app/process?url=" + decodeURIComponent(document.URL),
    addButton.target = "_blank";
    buttonDiv.appendChild(addButton);
    
    var targetElement = document.querySelectorAll("[id='subscribe-button']");
    if(targetElement){
      for(var i = 0; i < targetElement.length; i++){
        if(targetElement[i].className.indexOf("ytd-video-secondary-info-renderer") > -1){
            targetElement[i].appendChild(buttonDiv);
        }
      }
    }
}
})();