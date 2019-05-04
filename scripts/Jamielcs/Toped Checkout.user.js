// ==UserScript==
// @name         Toped Checkout
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.tokopedia.com/cart/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

document.querySelectorAll('div.btn.proceed-button')[0].click();

})();