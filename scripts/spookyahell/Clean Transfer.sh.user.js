/* globals jQuery, $ */
// ==UserScript==
// @name         Clean Transfer.sh
// @namespace    spookyahell
// @version      0.5.0
// @description  Clear the message at the bottom, we get it already transfer.sh is staying
// @author       spookyahell
// @match        https://transfer.sh
// @grant        none
// ==/UserScript==

(function () {
  var elementfound = $("[style='position: fixed; top: 85%; left: 50%; transform: translate(-50%, -50%); background-color: yellow; padding: 20px 20px; z-index: 100;']");
  elementfound.remove();
})();