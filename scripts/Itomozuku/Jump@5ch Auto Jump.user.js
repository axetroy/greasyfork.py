// ==UserScript==
// @name         Jump@5ch Auto Jump
// @namespace    https://greasyfork.org/users/216002
// @version      1.0.1
// @description  Jump@5ch のページを開いたとき、自動でジャンプ先のページに移ります。
// @author       Itomozuku
// @match        *://jump.5ch.net/?*
// @grant        none
// @run-at       document-body
// ==/UserScript==

(function() {
  'use strict';

  function removeAllElements(tag) {
    var targetElements = document.querySelectorAll(tag);
    for (var i = 0; i < targetElements.length; i++) {
      targetElements[i].remove();
    }
  }

  window.stop();

  removeAllElements('div');
  removeAllElements('hr');

  var link = document.querySelector('a');

  if (!link.getAttribute('href')) return;

  link.click();
  link.innerText = 'Now Loading...';

})();