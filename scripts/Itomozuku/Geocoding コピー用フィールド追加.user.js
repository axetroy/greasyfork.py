// ==UserScript==
// @name         Geocoding コピー用フィールド追加
// @namespace    https://greasyfork.org/users/216002
// @version      1.0.0
// @description  座標をテキストフィールドで表示します。
// @author       Itomozuku
// @match        https://www.geocoding.jp/?q=*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  var latlngElement = document.querySelector('.latlng');

  if (!latlngElement) return;

  var posNodes = latlngElement.querySelectorAll('.latlng b');
  var latlngText = posNodes.item(0).innerHTML + ', ' + posNodes.item(1).innerHTML;

  var copyInput = document.createElement('input');
  copyInput.value = latlngText;
  copyInput.style.marginLeft = '20px';

  copyInput.onfocus = function() {
    copyInput.select();
  };

  latlngElement.appendChild(copyInput);
})();