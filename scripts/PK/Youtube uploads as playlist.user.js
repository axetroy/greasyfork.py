// ==UserScript==
// @name        Youtube uploads as playlist
// @namespace   pk-scripts
// @version     1.0
// @date        2018-10-20
// @description Create playlist of all uploaded videos from user.
// @author      pK
// @copyright   pK 2018
// @license MIT https://opensource.org/licenses/MIT
// @match          *://*.youtube.com/*
// ==/UserScript==

(function() {
    'use strict';

    if (document.getElementById("polymer-app") || document.getElementById("masthead") || window.Polymer) {
        setInterval(function() {
            if (window.location.href.indexOf("watch?v=") < 0) {
                return false;
            }
            if (document.getElementById("count") && document.getElementById("show-all-videos-playlist") === null) {
                Addytpolymer();
            }
        }, 100);
    } else {
        setInterval(function() {
            if (window.location.href.indexOf("watch?v=") < 0) {
                return false;
            }
            if (document.getElementById("watch7-subscription-container") && document.getElementById("show-all-videos-playlist") === null) {
                AddhtmlDV();
            }
        }, 100);
    }

    function AddhtmlDV() {
        if (document.getElementById("watch7-subscription-container")) {
            var wrap = document.getElementById('watch7-subscription-container');
            var button = "<div id='show-all-videos-playlist' style='display: inline-block; margin-left: 10px; vertical-align: middle;'>";
            button += "<a href=\""+ returnPLALISTURL() +"\" title=\"Create playlist\" target=\"_blank\"" +
                "style=\"display: inline-block; font-size: inherit; height: 22px; border: 1px solid rgb(0, 183, 90); border-radius: 3px; padding-left: 5px; cursor: pointer; vertical-align: middle; position: relative; line-height: 22px; text-decoration: none; z-index: 1; color: rgb(255, 255, 255);\">";
            button += "📖 ";
            button += "<span style=\"padding-right: 15px;font-weight: bold;font-family: 'Roboto';\">Playlist</span></a></div>";
            var style = "<style>#show-all-videos-playlist button::-moz-focus-inner{padding:0;margin:0}#show-all-videos-playlist a{background-color:#15388c}#show-all-videos-playlist a:hover{background-color:#ba160c}#show-all-videos-playlist a:active{background-color:rgb(0, 151, 74)}</style>";
            var tmp = wrap.innerHTML;
            wrap.innerHTML = tmp + button + style;
        }
    }

    function Addytpolymer() {
        var buttonDiv = document.createElement("span");
        buttonDiv.style.width = "100%";
        buttonDiv.id = "show-all-videos-playlist";
        var addButton = document.createElement("a");
        addButton.appendChild(document.createTextNode("Create Playlist"));
        addButton.style.width = "100%";
        addButton.style.backgroundColor = "#15388c";
        addButton.style.color = "white";
        addButton.style.textAlign = "center";
        addButton.style.padding = "5px 10px";
        addButton.style.margin = "0px 10px";
        addButton.style.fontSize = "14px";
        addButton.style.border = "0";
        addButton.style.cursor = "pointer";
        addButton.style.borderRadius = "2px";
        addButton.style.fontFamily = "Roboto, Arial, sans-serif";
        addButton.style.textDecoration = "none";
        addButton.href = returnPLALISTURL();
        addButton.target = "_blank";
        buttonDiv.appendChild(addButton);
        var targetElement = document.querySelectorAll("[id='count']");
        for (var i = 0; i < targetElement.length; i++) {
            if (targetElement[i].className.indexOf("ytd-video-primary-info-renderer") > -1) {
                targetElement[i].appendChild(buttonDiv);
            }
        }
    }
    function returnPLALISTURL(){
        if (window.location.href.indexOf("watch?v=") > -1 && window.location.href.indexOf("&list=") < 0) {
            console.log("https://www.youtube.com/playlist?list=UU"+ document.documentElement.innerHTML.match('channelId" content="(.*?)"')[1].substr(2));
            //window.location = "https://www.youtube.com/playlist?list=UU"+ document.documentElement.innerHTML.match('channelId" content="(.*?)"')[1].substr(2);
            return "https://www.youtube.com/playlist?list=UU"+ document.documentElement.innerHTML.match('channelId" content="(.*?)"')[1].substr(2);
        }
    }
})();
