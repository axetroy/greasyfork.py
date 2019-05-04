// ==UserScript==
// @name         Confirm SoundCloud leave (Alpha)
// @namespace    https://brennced.github.io/
// @version      0.1
// @description  Shows a confirm box when closing SoundCloud tab.
// @author       Brennced
// @match        https://soundcloud.com/*
// @grant        none
// ==/UserScript==

(function(){window.onbeforeunload=function(){return"Are you sure you want to leave? Your music will stop";};})();