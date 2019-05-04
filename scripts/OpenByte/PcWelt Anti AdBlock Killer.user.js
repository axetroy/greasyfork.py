// ==UserScript==
// @name            PcWelt Anti AdBlock Killer
// @namespace       openbyte/pwaak
// @description     Blocks the Anti Adblock on pcwelt.de
// @require			https://greasyfork.org/scripts/34634-object-watch-polyfill/code/objectwatch%20polyfill.js?version=226939
// @include         http*://pcwelt.de*
// @include         http*://*.pcwelt.de*
// @version         1.0.0
// @run-at          document-start
// @grant           none
// ==/UserScript==


if (window.onbeforescriptexecute)
  window.addEventListener("beforescriptexecute", function(e) {
      e.target.innerText = e.target.innerText.replace(regex, "$10$2");
  }, false);
else window.watch("idgStorage", function() {
    if (window.idgStorage.adBlock)
        window.idgStorage.adBlock = "0";
    window.idgStorage.watch("adBlock", function() {
        if (window.idgStorage.adBlock !== "0")
            window.idgStorage.adBlock = "0";
    });
});