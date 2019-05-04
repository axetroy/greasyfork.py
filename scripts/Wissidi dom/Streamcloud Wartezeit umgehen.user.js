// ==UserScript==
// @name        Streamcloud Wartezeit umgehen
// @author      Wissidi dom
// @namespace   *
// @description Beim Betreten einer StreamCloud.eu-Seite direkt zum Video gehen (ohne Wartezeit und mit browsereigenem Videoplayer)
// @include     *streamcloud.eu/*
// @version     1.2
// @grant       GM.xmlHttpRequest
// ==/UserScript==
window.addEventListener('load', function() {
  document.getElementsByTagName("head")[0].innerHTML = "<title>Streamcloud: Der einfache Weg Dateien zu teilen</title><link rel=\"icon\" href=\"http://streamcloud.eu/favicon.ico\" type=\"image/x-icon\">";
  var id = new String(document.getElementsByName("id")[0].value);
  var fname = new String(document.getElementsByName("fname")[0].value);
  var referer = new String(document.getElementsByName("referer")[0].value);
  var hash = new String(document.getElementsByName("hash")[0].value);
  GM.xmlHttpRequest({
    method: "POST",
    url: window.location.href,
    data: "op=download2&usr_login=&id=" + id + "&fname=" + fname + "&referer=" + referer + "&hash=" + hash + "&imhuman=Watch video now",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Referer": window.location.href
    },
    onload: function(response) {
      // window.location.href = response.responseText.split("file: \"")[1].split("\",")[0];
      var url = response.responseText.split("file: \"")[1].split("\",")[0];
      document.getElementsByTagName("body")[0].innerHTML = "<div style=\"width: 100%; font-size: 50px; text-align: center;\"><a href=\"" + url + "\">Direkt zum Video</a></div>";
    }
  });
});
