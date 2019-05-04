// ==UserScript==
// @name         Surugaya: auto agree to terms
// @namespace    http://darkfader.net/
// @version      0.1
// @description  Agree to terms allows for slightly quicker payment process
// @author       Rafael Vuijk
// @match        https://www.suruga-ya.jp/cargo/orderkiyaku
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var xpath = "//input[@id='edit-comfirm-yes']";
    var results = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < results.snapshotLength; i++) {
        var e = results.snapshotItem(i);
        e.click();
    }
})();