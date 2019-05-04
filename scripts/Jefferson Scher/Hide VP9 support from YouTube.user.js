// ==UserScript==
// @name        Hide VP9 support from YouTube
// @author      Jefferson "jscher2000" Scher
// @namespace   JeffersonScher
// @version     0.1
// @copyright   Copyright 2018 Jefferson Scher
// @license     BSD-3-Clause
// @description Hide VP9 support for Firefox 63. v0.1 2018-10-27
// @match       https://www.youtube.com/*
// @match       https://www.youtube-nocookie.com/*
// @match       https://www.youtu.be/*
// @run-at      document-start
// @grant       none
// ==/UserScript==

// Modified from https://github.com/erkserkserks/h264ify/tree/master/src/inject as of 2018-05-16 (MIT license)

var mse = window.MediaSource;
if (mse){
  // Set up replacement for MediaSource type support function
  var nativeITS = mse.isTypeSupported.bind(mse);
  mse.isTypeSupported = ourITS(nativeITS);
}
// Here's the replacement
function ourITS(fallback){
  // type is a string (hopefully!) sent by the page
  return function (type) {
    if (type === undefined) return '';
    // We only reject VP9
    if (type.toLowerCase().indexOf('vp9') > -1) return '';
    // Let Firefox handle everything else
    return fallback(type);
  };
}
