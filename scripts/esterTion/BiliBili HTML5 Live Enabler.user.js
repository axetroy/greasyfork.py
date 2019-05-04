// ==UserScript==
// @name      BiliBili HTML5 Live Enabler
// @version   170325.1
// @description Force enable HTML5
// @author    esterTion
// @match     http://live.bilibili.com/*
// @match     https://live.bilibili.com/*
// @run-at    document-idle
// @namespace https://greasyfork.org/users/24167
// ==/UserScript==

if(localStorage.LIVE_PLAYER_STATUS==undefined || localStorage.LIVE_PLAYER_STATUS.match('"type":"html5"')==null)
unsafeWindow.EmbedPlayer.loader();