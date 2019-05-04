// ==UserScript==
// @name         Youtube WatchLater autoplay stop
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Youtube WatchLater autoplay stopper
// @author       Burlaka.net
// @match        *://youtube.com/*
// @match        *://*.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // script from "Nextvid Stopper for YouTube" chrome extension 
    var newScript = document.createElement("script");
    newScript.type = "text/javascript";
    newScript.innerText = "var NextVidEnabled = true;ytspf.enabled = false;ytspf.config['navigate-limit'] = 0;_spf_state.config['navigate-limit'] = 0;var NextVidStopperGetNextValues = function () {var nextLink = document.getElementsByClassName('playlist-behavior-controls')[0].getElementsByTagName('a')[1].href;var nextLinkStart = nextLink.search('v=');return nextLink.substr(nextLinkStart + 2, 8);};for (var key in _yt_www) {var stringFunction = '' + _yt_www[key];if (stringFunction.search('window.spf.navigate') != -1) {_yt_www[key] = function (a, b) {if (a.search(NextVidStopperGetNextValues()) == -1 || NextVidEnabled == false) {window.location = a;}};}}";
    document.body.appendChild(newScript);

})();