// ==UserScript==
// @name         LetyShops CashBack
// @namespace    FIX
// @version      0.0.3
// @description  LetyShops CashBack for mobile site aliexpress.com
// @author       raletag
// @include      *://m.aliexpress.com/*
// @include      *://m.*.aliexpress.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    var left = document.querySelector('.drawer-box.box-list'),
        leftadd = document.createElement('li'),
        menu = document.querySelector('.header-main .position-right .mini-dropdown .mini-d-list'),
        menuadd = document.createElement('li'),
        referer = (encodeURIComponent(window.location.href) || 'https%3a%2f%2fm.aliexpress.com%2f'),
        alicashbackurl = '//letyshops.ru/view/13366481?ext_referrer=' + referer + '&utm_source=userscript';
    if (menu) {
        menuadd.className = 'ms-rc-ripple ms-rc-custom';
        menuadd.innerHTML = '<a href="' + alicashbackurl + '" type="cashback">[Кэшбэк]</a>';
        menu.appendChild(menuadd);
    }
    if (left) {
        leftadd.className = 'drawer-cart ms-rc-ripple ms-rc-custom';
        leftadd.innerHTML = '<a href="' + alicashbackurl + '" data-stat="menu_page::menu_cart::cart_button"><i class="ic-md ic-shoppingcart-md"></i><span>[Активировать кэшбэк]</span></a>';
        left.appendChild(leftadd);
    }
})();