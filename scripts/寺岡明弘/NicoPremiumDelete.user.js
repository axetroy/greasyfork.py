// ==UserScript==
// @name         NicoPremiumDelete
// @namespace    https://twitter.com/teraokaakihiro
// @version      0.1
// @description  ニコニコ動画の「プレミアム登録」を消す
// @author       Akey
// @match        http://www.nicovideo.jp/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.getElementById("siteHeaderNotificationPremium").textContent="";
})();