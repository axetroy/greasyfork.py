// ==UserScript==
// @name        Zu YouTV-Video navigieren
// @namespace   *
// @author      Wissidi dom
// @description direkt zu der MP4-Datei von YouTV navigieren
// @include     http://youtv.de/tv-sendungen/*
// @include     https://youtv.de/tv-sendungen/*
// @include     http://www.youtv.de/tv-sendungen/*
// @include     https://www.youtv.de/tv-sendungen/*
// @version     1.0
// @grant       GM.xmlHttpRequest
// ==/UserScript==
window.addEventListener('load', function() {
  GM.xmlHttpRequest({
    method: 'GET',
    url:    window.location.href,
    onload: function (responseDetails) {
      var url = responseDetails.responseText.split("<source src=\"")[1];
      url = url.split("\" type=\"video/mp4\"")[0];
      window.location.href = url;
    }
  })
});