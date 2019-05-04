// ==UserScript==
// @name         Twitch pauser
// @namespace    https://zachsaucier.com/
// @version      0.2
// @description  To show how one can pause the autoplaying video on Twitch.tv
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
                playPause = playerIframeDoc.querySelector(".js-control-playpause-button");

            function clickPlayButton() {
                playPause.click();
                videoElem.removeEventListener("loadeddata", clickPlayButton);
            }
            videoElem.addEventListener("loadeddata", clickPlayButton);

            clearInterval(mySetInvertal);
        }
    }, 100);
})();