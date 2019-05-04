// ==UserScript==
// @name         Rock Paper Scroll
// @version      0.1.4
// @description  Rock, Paper, Shotgun's new design adds a horizontal scroll, for no good reason.
// @author       Ross Angus
// @match        https://www.rockpapershotgun.com/*
// @grant        GM_addStyle
// @namespace https://greasyfork.org/users/226099
// ==/UserScript==

(function() {
    'use strict';
    GM_addStyle('.leaderboards, .page, .header-desktop .container, .video-hub.in-article .video-player { width: auto !important; float: none;}');
    GM_addStyle('.ads-enabled .page > main .above { padding-right: 0;}');
    GM_addStyle('.video-hub.in-article .video-player .player-wrapper { margin-bottom: 1em;}');
    GM_addStyle('.video-hub.in-article .video-archive, #comments-mpu-first, #comments-mpu-last, #comments-right-rail, #comments-right-rail .comments-mpu-container, #right-rail .sidebar-mpu-container { position: static; width: auto;}');
    GM_addStyle('#page aside {display: none;');
    GM_addStyle('iframe {max-width: 100%; width: 100% !important; right: 0;');
    GM_addStyle('#recommendations, .billboard-container {overflow: auto;');
    GM_addStyle('.footer .about, .footer .events, .footer .explore, .footer .helpful-links, .footer .network, .footer .staff {width: 33%;');
    GM_addStyle('.header-desktop .account, .header-desktop .logo, .header-desktop .primary, .header-desktop .search, .header-desktop .secondary, .header-desktop .support-us {position: static; width: auto;');
    GM_addStyle('.header-desktop {height: auto;');
    GM_addStyle('.header-desktop .primary a, .header-desktop .secondary a {display: inline-block;');
    GM_addStyle('.spotlight {display: flex; justify-content: space-between;');
    GM_addStyle('.spotlight-item {flex-basis: calc(33.3333% - 16px);');
})();