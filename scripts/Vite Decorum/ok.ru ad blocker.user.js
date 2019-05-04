// ==UserScript==
// @name         ok.ru ad blocker
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Removing advertisements on the ok.ru social network
// @author       Vite
// @match        *://*.ok.ru/*
// @grant        <> <! [CDATA []]> </>
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// ==/UserScript==

(function() {
    'use strict';

    var host = document.location.host;
    if (host == 'www.ok.ru')
        host = 'ok.ru';
    
    function removeAds()
    {
        switch (host)
        {
            case 'ok.ru':
                var b1 = $('.feed_label:contains("Реклама")').parents('.feed-w');
                if (b1.length)
                    b1.hide();
                var b2 = $('.feed_label:contains("Новости")').parents('.feed.h-mod.__wide');
                if (b2.length)
                    b2.hide();
                var b3 = $('.feed.__no-ava.h-mod');
                if (b3.length)
                    b3.hide();
                var b4 = $('.dialogWrapperBanner');
                if (b4.length)
                    b4.hide();
                var h1 = $('#hook_Block_ViewportHeightAwareBanner');
                if (h1.length)
                    h1.hide();
                var h2 = $('#hook_Block_ForthColumnTopBanner');
                if (h2.length)
                    h2.hide();
                var h3 = $('#hook_Block_MessagesAdsPanel');
                if (h3.length)
                    h3.hide();
                var h4 = $('#hook_Block_LeftColumnBanner');
                if (h4.length)
                    h4.hide();
                var h5 = $('#hook_Block_MessagesBoost');
                if (h5.length)
                    h5.hide();
                var h6 = $('#hook_Block_TalkativeMyStatus');
                if (h6.length)
                    h6.hide();
                break;
            case 'm.ok.ru':
                var m1 = $('.item.it.feed-card.__adv');
                if (m1.length)
                    m1.hide();
                break;
        }
    }
    document.addEventListener("DOMContentLoaded", removeAds);
    document.addEventListener("DOMSubtreeModified", removeAds);
})();