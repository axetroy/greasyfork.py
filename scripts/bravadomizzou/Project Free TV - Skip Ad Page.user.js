// ==UserScript==
// @name         Project Free TV - Skip Ad Page
// @namespace    http://your.homepage/
// @version      0.20150509
// @description  Skip the Ad page and timer on Project Free TV
// @author       bravadomizzou
// @include      http://www.free-tv-video-online.info/interstitial2.html*
// @include      https://www.free-tv-video-online.info/interstitial2.html*
// @include      http://*.www.free-tv-video-online.info/interstitial2.html*
// @include      https://*.www.free-tv-video-online.info/interstitial2.html*
// @run-at       document-end
// ==/UserScript==

(function() {
    function getParam(val) {
        var result = "",
            tmp = [];
        var items = location.search.substr(1).split("&");
        for (var index = 0; index < items.length; index++) {
            tmp = items[index].split("=");
            if (tmp[0] === val) result = decodeURIComponent(tmp[1]);
        }
        return result;
    }
   
    var timer = document.getElementById("timer");
    var page = getParam("lnk");

    if (null !== timer && null !== page) {
        window.location = page;
    }
})();
