// ==UserScript==
// @name        Zu Vivo-Video navigieren
// @namespace   *
// @author      Wissidi dom
// @description direkt zu der MP4-Datei von Vivo navigieren
// @include     http://vivo.sx/*
// @include     https://vivo.sx/*
// @include     http://www.vivo.sx/*
// @include     https://www.vivo.sx/*
// @version     1.1
// @grant       GM.xmlHttpRequest
// ==/UserScript==
window.addEventListener('load', function() {
  GM.xmlHttpRequest({
    method: 'GET',
    url:    window.location.href,
    onload: function (responseDetails) {
      var url = responseDetails.responseText.split("Core.InitializeStream ('")[1];
      url = url.split("');")[0];
      url = atob(url); //btoa for Base64-Encode
      url = url.replace("[\"", "").replace("\"]", "");
      url = url.split("\",\"")[0];
      url = url.replace("\\/", "/");
      url = url.replace("\\/", "/");
      url = url.replace("\\/", "/");
      url = url.replace("\\/", "/");
      url = url.replace("\\/", "/");
      window.location.href = url;
    }
  })
});