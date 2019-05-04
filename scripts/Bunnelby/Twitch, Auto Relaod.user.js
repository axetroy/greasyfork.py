// ==UserScript==
// @name         Twitch, Auto Relaod
// @namespace    http://tampermonkey.net/
// @version      0.51
// @description  try to take over the world!
// @author       You
// @match        https://www.twitch.tv/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    var CEKCK_INTERVAL = 3000;
    var WHITELIST = [];

    window.TwitchAutoReloadAndPauseLogger = false;
    if (window.TwitchAutoReloadAndPauseLogger) {
        console.log("enabled logger");
    }

    function triggerEvent(element, event) {
        if (document.createEvent) {
            // IE以外
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent(event, true, true ); // event type, bubbling, cancelable
            return element.dispatchEvent(evt);
        } else {
            // IE
            var evt = document.createEventObject();
            return element.fireEvent("on"+event, evt)
        }
    }

    setInterval(()=>{
        var $p = document.querySelector(".player");
        //  console.log($p);

        // state
        var data = {
            hrefChannel: location.pathname.split("/")[1],
            pausedElement:  document.querySelector(".js-paused-overlay") != null,
            offlineElement: document.querySelector(".recommendations-overlay") != null,
            errorElement: document.querySelector(".pl-error") != null,
        };

        // logger
        if (window.TwitchAutoReloadAndPauseLogger) {
            console.log(data);
        }
        // video page
        if (location.pathname.indexOf("/videos/") == 0) {
            return;
        }

        // stream paused
        if (data.pausedElement || data.offlineElement || data.errorElement) {
            // play
            console.log("follow channel, play streaming");
            triggerEvent(document.querySelector(".qa-pause-play-button"), "click");
        }
    }, CEKCK_INTERVAL);
})();