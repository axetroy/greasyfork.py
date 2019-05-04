// ==UserScript==
// @name        One Piece
// @namespace   harnet.co.uk
// @include     http://www1.watchopnow.com/watch/*
// @version     1
// @grant       none
// @description:en This script automatically redirects to the English dubbed versions of episodes on watchopnow.com. (One piece anime streaming site).
// ==/UserScript==
window.onload = function () {
  var URL = window.location.href;
  if (URL.search(/(\/2)$/g) < 0) {
    var newURL = window.location.href + '/2';
    window.location.href = newURL;
  }
};
