// ==UserScript==
// @name         Twitter counter eraser
// @name:ja      [Twitter] カウンターを非表示
// @description  Delete the Twitter's Reply/Favorite/Retweet Counter.
// @description:ja Twitterから、リプライ/お気に入り/リツイートのカウンターを削除。他人の承認が見てられない人のためのプラグインです。
// @namespace    masshiro.blog
// @version      1.2
// @author       masshiro
// @match        https://twitter.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode('.ProfileTweet-actionCountForPresentation,.MomentCapsuleLikesCount,.tweet-stats-container,[data-testid="viewCount"]{display:none !important;}'));
    document.getElementsByTagName('head')[0].appendChild(style);
})();