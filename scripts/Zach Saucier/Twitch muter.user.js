// ==UserScript==
// @name         Twitch muter
// @namespace    https://zachsaucier.com/
// @version      0.2
// @description  To show how one can mute the autoplaying video on Twitch.tv
// @author       Zach Saucier
// @match        https://www.twitch.tv/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var mySetInvertal = setInterval(function() {
        var playerIframe = document.querySelector("#player iframe");
        if(playerIframe !== null) {
            var playerIframeDoc = playerIframe.contentWindow.document,
                videoElem = playerIframeDoc.querySelector("video"),
                volumeElem = playerIframeDoc.querySelector(".mute-button");

            function clickVolumeButton() {
                volumeElem.click();
                videoElem.removeEventListener("loadeddata", clickVolumeButton);
            }
            videoElem.addEventListener("loadeddata", clickVolumeButton);

            clearInterval(mySetInvertal);
        }
    }, 100);
})();