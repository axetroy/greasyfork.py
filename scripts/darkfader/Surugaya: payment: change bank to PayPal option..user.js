// ==UserScript==
// @name         Surugaya: payment: change bank to PayPal option.
// @namespace    http://darkfader.net/
// @version      0.1
// @description  Add paypal option even when it's not there.
// @author       Rafael Vuijk
// @match        https://www.suruga-ya.jp/cargo/order1
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.getElementById('edit-payment-bank').value = "paypal";
    document.getElementById('edit-payment-bank').nextSibling.nextSibling.innerHTML = "PayPal :)";
    document.getElementById('edit-payment-bank').nextSibling.click();
})();
