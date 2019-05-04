// ==UserScript==
// @name        Outlook without Ads
// @namespace   feifeihang.info
// @description Remove ads from Outlook
// @include     https://*.mail.live.com/*
// @version     1
// @grant       none
// ==/UserScript==
(function (window, document, undefined) {
  var style = document.createElement('style');
  style.innerHTML = '.WithRightRail {right: 0 !important;}' +
    ' #RightRailContainer {display: none !important;}';
  document.head.appendChild(style);
}) (this, this.document);
