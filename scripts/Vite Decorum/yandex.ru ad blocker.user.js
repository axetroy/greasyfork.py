// ==UserScript==
// @name         yandex.ru ad blocker
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Removing advertisements on the yandex.ru services (testing version)
// @author       Vite
// @match        *://*.yandex.ru/*
// @grant        <> <! [CDATA []]> </>
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// ==/UserScript==

(function() {
    'use strict';

    var host = document.location.host;
    if (host == 'www.yandex.ru')
        host = 'yandex.ru';
    if (host == 'm.market.yandex.ru')
        host = 'market.yandex.ru';
    if (host == 'm.realty.yandex.ru')
        host = 'realty.yandex.ru';
    if (host == 'm.news.yandex.ru')
        host = 'news.yandex.ru';
    if (host == 'm.rabota.yandex.ru')
        host = 'rabota.yandex.ru';
    if (host == 'm.tv.yandex.ru')
        host = 'tv.yandex.ru';
    var desktop = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? false : true;
    var tablet = /iPad|iPod/i.test(navigator.userAgent) ? true : false;
    
    function yandex()
    {
        if (desktop || tablet)
        {
            var b1 = $('.container.container__banner.container__line');
            if (b1.length)
                b1.hide();
            var b2 = $('.serp-item.t-construct-adapter__adv.serp-adv-item').val('label[Реклама]');
            if (b2.length)
                b2.hide();
            var b3 = $('.incut__wrapper.incut__wrapper_footer_yes');
            if (b3.length)
                b3.hide();
            /* pogoda */
            var b4 = $('div[class*="adv_pos"]');
            if (b4.length)
                b4.hide();
            var b5 = $('div:contains("Яндекс.Директ")');
            for (var i = 0; i < b5.length; i++)
            {
                if (b5.get(i).textContent == 'Яндекс.Директ')
                    b5.get(i).parentElement.remove();
            }
        }
        else
        {
            var m1 = $('.body__topblocks');
            if (m1.length)
                m1.hide();
            var m2 = $('.serp-item.serp-adv-item').val('aria-label[Реклама]');
            if (m2.length)
                m2.hide();
            var m3 = $('#ya-direct-footer');
            if (m3.length)
                m3.hide();
            /* pogoda */
            var m4 = $('div[id*="yandex_rtb"]');
            if (m4.length)
                m4.hide();
        }
    }
    function afisha_yandex()
    {
        if (desktop || tablet)
        {
            var b1 = $('.sidebar__direct');
            if (b1.length)
                b1.hide();
            var b2 = $('.sidebar__yabs');
            if (b2.length)
                b2.hide();
        }
        var n1 = $('[id*="yandex_direct"]');
        if (n1.length)
            n1.hide();
    }
    function avia_yandex()
    {
        if (desktop || tablet)
        {
            var b1 = $('#antidirect');
            if (b1.length)
                b1.hide();
        }
    }
    function market_yandex()
    {
        if (desktop || tablet)
        {
            var b1 = $('[id*="yandex_rtb"]').parent();
            if (b1.length)
                b1.hide();
            var b2 = $('.i-slider__inner.n-images-set.i-slider_loaded_yes');
            if (b2.length)
                b2.css('max-width', 'none');
        }
    }
    function music_yandex()
    {
        if (desktop || tablet)
        {
            /* It is necessary to make a correct disabling of advertising */
            var b2 = $('.ads-block.smalladv.ads-block_side');
            if (b2.length)
                b2.hide();
            var b3 = $('.ads-block__no-ads');
            if (b3.length)
                b3.hide();
        }
    }
    function news_yandex()
    {
        var n1 = $('div[aria-label="Реклама"]');
        if (n1.length)
            n1.remove();
    }
    function rabota_yandex()
    {
        if (desktop || tablet)
        {
            var b1 = $('[id*="yandex_ad"]');
            if (b1.length)
                b1.parent().hide();
        }
        else
        {
            var m1 = $('[id*="yandex_direct"]');
            if (m1.length)
                m1.hide();
        }
    }
    function realty_yandex()
    {
        if (desktop || tablet)
        {
            /* baners */
            var b1 = $('[id*="AdFox_banner"]');
            if (b1.length)
                b1.hide();
            var b3 = $('[id*="yandex_ad"]');
            if (b3.length)
                b3.parent().hide();
            var b4 = $('.b-guadeloupe__label');
            if (b4.length)
                b4.parent().parent().parent().hide();
            /* style */
            var c1 = $('.layout__cell.layout__cell_type_left');
            if (c1.length)
                c1.css('padding', 0);
            var c2 = $('.search-links.clearfix');
            if (c2.length)
            {
                c2.css('margin-left', -10);
                c2.css('margin-right', -10);
            }
            var c3 = $('.search-links-group');
            if (c3.length)
            {
                c3.css('margin', 10);
                c3.css('max-width', 600);
            }
            var c4 = $('.add-links.clearfix');
            if (c4.length)
            {
                c4.css('margin-left', -10);
                c4.css('margin-right', -10);
            }
            var c5 = $('.add-links__col');
            if (c5.length)
                c5.css('margin', 10);
            var c6 = $('.premium-offers.i-bem');
            if (c6.length)
            {
                c6.css('margin-left', -10);
                c6.css('margin-right', -10);
            }
            var c7 = $('.premium-offers__title');
            if (c7.length)
                c7.css('margin', 10);
            var c8 = $('.premium-offers__item');
            if (c8.length)
            {
                c8.css('margin', 10);
                c8.css('max-width', 600);
            }
        }
        else
        {
            var m1 = $('.guadeloupe__item-info-ad');
            if (m1.length)
                m1.parent().parent().parent().hide();
        }
    }
    function taxi_yandex()
    {
        if (desktop || tablet)
        {
            var b1 = $('.direct');
            if (b1.length)
                b1.hide();
        }
    }
    function tv_yandex()
    {
        if (desktop || tablet)
        {
            var b1 = $('.tv-grid__item-adv');
            if (b1.length)
                b1.hide();
            var b2 = $('.adv-manager_position_bottom');
            if (b2.length)
                b2.remove();
        }
        else
        {
            var m1 = $('.tv-grid__item-adv.adv-manager__wrapper');
            if (m1.length)
                m1.hide();
        }
    }
    function removeAds()
    {
        switch (host)
        {
            case 'yandex.ru':
                yandex();
                break;
            case 'afisha.yandex.ru':
                afisha_yandex();
                break;
            case 'avia.yandex.ru':
                avia_yandex();
                break;
            case 'market.yandex.ru':
                market_yandex();
                break;
            case 'music.yandex.ru':
                music_yandex();
                break;
            case 'news.yandex.ru':
                news_yandex();
                break;
            case 'rabota.yandex.ru':
                rabota_yandex();
                break;
            case 'realty.yandex.ru':
                realty_yandex();
                break;
            case 'taxi.yandex.ru':
                taxi_yandex();
                break;
            case 'tv.yandex.ru':
                tv_yandex();
                break;
        }
    }
    document.addEventListener("DOMContentLoaded", removeAds);
    document.addEventListener("DOMSubtreeModified", removeAds);
})();