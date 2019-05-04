// ==UserScript==
// @name         Steam auto redeem key
// @description  Automatically accepts the agreement and activates a steam key, when opening a register key url.
// @namespace    https://greasyfork.org/en/users/10848
// @version      1.0
// @author       sergio91pt
// @match        https://store.steampowered.com/account/registerkey
// @match        https://store.steampowered.com/account/registerkey?*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.getElementById('accept_ssa').checked = true;

    if (document.querySelector('input[name="product_key"]').value !== '') {
        document.getElementById('register_btn').click();
    }
})();