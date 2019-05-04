// ==UserScript==
// @name         Diep.io oyunu , Diepiomods.com, Save Nickname
// @version      2.1
// @description  Diep.io Mods, Nickname saver
// @author       Diepiomods.com
// @match        *://diep.io/
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      diep.io
// @namespace    diepiomods.com
// ==/UserScript==
window.stop();
document.documentElement.innerHTML = null;
var s = '',
  doc = '';
GM_xmlhttpRequest({
  method: "GET",
  url: 'http://diep.io/d.js',
  onload: function(event) {
    s = event.responseText;
    s = s.replace(/\(function\((.)\){/i, '(function($1){var zoom=255;');
    s = s.replace(/wheel:function\(\){}/i, 'wheel:function(e){zoom *= Math.pow(.9, e);}');
    s = s.replace(/(.=\()\+.\[.>>[1-9]+\](\*\+.\[.>>[1-9]+\]\+ \+.\[.\+[1-9]+>>[1-9]+\]\)\/\(\+.\[.>>[1-9]+\]\+[0-9\.]+\);)/i, '$1zoom$2');
    s = s.replace(/D\.value="";/i, '');
    GM_xmlhttpRequest({
      method: "GET",
      url: 'http://diep.io/',
      onload: function(event) {
        doc = event.responseText;
        doc = doc.replace(/<script src="d\.js" async><\/script>/i, '');
        doc = doc.replace(/<\/body>/i, '<script>' + s + '</script><script>document.getElementById("textInput").value = localStorage.getItem("Nick");window.addEventListener("beforeunload", function() {localStorage.setItem("Nick", document.getElementById("textInput").value);});</script></body>');
        document.open();
        document.write(doc);
        document.close();
      }
    });
  }
});