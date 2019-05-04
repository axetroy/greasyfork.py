// ==UserScript==
// @name <BLINK> text
// @name:es Texto <BLINK>
// @author Titanio 2.0 | TetraTitanio
// @description Bring back the <BLINK> HTML tag!
// @description:es ¡Trae de vuelta la etiqueta HTML <BLINK>!
// @version 0.3
// @license Creative Commons BY-NC-SA
// @include http://*/*
// @include https://*/*
// @namespace http://tampermonkey.net/
// ==/UserScript==

(function() {
    var blinks = document.getElementsByTagName('blink');
    var visibility = 'hidden';
    window.setInterval(function() {
      for (var i = blinks.length - 1; i >= 0; i--) {
        blinks[i].style.visibility = visibility;
      }
      visibility = (visibility === 'visible') ? 'hidden' : 'visible';
    }, 250);
  })();
