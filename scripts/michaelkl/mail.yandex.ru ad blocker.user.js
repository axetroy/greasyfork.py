// ==UserScript==
// @name           mail.yandex.ru ad blocker
// @name:ru        Блокировщик рекламы на mail.yandex.ru
// @namespace      http://tampermonkey.net/
// @version        0.2
// @description    Removes advertisements on the mail.yandex.ru service
// @description:ru Убирает рекламные блоке в почтовом сервисе mail.yandex.ru
// @author         michaelkl
// @match          *://mail.yandex.ru/*
// @grant          <> <! [CDATA []]> </>
// @require        https://code.jquery.com/jquery-3.2.1.min.js
// @license        MIT
// ==/UserScript==

(function() {
    'use strict';

    function removeAds()
    {
        // Top banner
        var m1 = $('.ns-view-infoline-box + div');
        if (m1.length && m1[0].className.match(/ns-view-\w+ ns-view-id-\d+/)) {
            m1.hide();
        }
        // Top banner in light mode
        var m2 = $('.b-toolbar + .b-direct-stripe');
        if (m2.length && m2[0].id.match(/yandex_direct_/)) {
            m2.hide();
        }
        // Left banner block
        var m3 = $('.ns-view-collectors-setup + div');
        if (m3.length && m3[0].className.match(/ns-view-\w+ ns-view-id-\d+/)) {
            m3.hide();
        }
    }
    document.addEventListener("DOMContentLoaded", removeAds);
    document.addEventListener("DOMSubtreeModified", removeAds);
})();