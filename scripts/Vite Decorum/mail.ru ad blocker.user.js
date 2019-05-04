// ==UserScript==
// @name         mail.ru ad blocker
// @namespace    http://tampermonkey.net/
// @version      0.14
// @description  Removing advertisements on the mail.ru web services
// @author       Vite
// @match        *://*.mail.ru/*
// @grant        <> <! [CDATA []]> </>
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

(function() {
    'use strict';

    var host = document.location.host;
    if (host == 'm.my.mail.ru')
        host = 'my.mail.ru';
    if (host == 'touch.sport.mail.ru')
        host = 'sport.mail.ru';
    if (host.search('realty.mail.ru')>0)
        host = 'realty.mail.ru';
    if (host == 'm.games.mail.ru')
        host = 'games.mail.ru';
    if (host == 'wap.love.mail.ru')
        host = 'love.mail.ru';
    if (host == 'touch.otvet.mail.ru')
        host = 'otvet.mail.ru';

    var desktop = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? false : true;
    var tablet = /iPad|iPod/i.test(navigator.userAgent) ? true : false;
    var go_mail_home = document.location.href == document.location.protocol + '//go.mail.ru/' ? true : false;

    function mail()
    {
        if (desktop || tablet)
        {
            var b1 = $('#tgb');
            if (b1.length)
                b1.hide();
            var b2 = $('div[class="tgb-banner"]');
            if (b2.length)
                b2.hide();
            var b3 = $('div[class*="tgb"]');
            if (b3.length)
                b3.hide();
        }
        else
        {
            var m1 = $('#yandex_ad');
            if (m1.length)
                m1.hide();
        }
        var n1 = $('.mailru-visibility-check');
        if (n1.length)
            n1.parent().hide();
    }
    function e_mail()
    {
        if (desktop || tablet)
        {
            var b1 = $('.b-datalist__head');
            if (b1.length)
                b1.hide();
            var b2 = $('.b-letter__rb-line');
            if (b2.length)
                b2.hide();
            var b3 = $('#leftcol-banners');
            if (b3.length)
                b3.hide();
            var b4 = $('div[id*="preload_banner"]');
            if (b4.length)
                b4.hide();
        }
        else
        {
            var m1 = $('.advert-list-item');
            if (m1.length)
                m1.hide();
        }
        var n1 = $('.mailru-visibility-check');
        if (n1.length)
            n1.hide();
    }
    function go_mail()
    {
        if ((desktop || tablet) && go_mail_home)
        {
            var h1 = $('.trg-b-wrap.trg-b-banner-block');
            if (h1.length)
                h1.hide();
            var h2 = $('.reco-lg.reco-lg_label');
            if (h2.length)
                h2.hide();
        }
        if ((desktop || tablet) && !go_mail_home)
        {
            var rb1 = $('.rb-slot-side');
            if (rb1.length)
                rb1.hide();
            var rb2 = $('.rb-slot_side');
            if (rb2.length)
                rb2.hide();
            var b2 = $('.js-ad-label');
            if (b2.length)
                b2.parent().parent().parent().remove();
            var b3 = $('.yandex_ad.js-yandex_ad');
            if (b3.length)
                b3.hide();
            var b4 = $('.yadirect');
            if (b4.length)
                b4.hide();
        }
        else if (!go_mail_home)
        {
            var m1 = $('.direct.direct_top');
            if (m1.length)
                m1.hide();
        }
    }
    function my_mail()
    {
        if (desktop || tablet)
        {
            var b1 = $('.mm_right_block_media.b-fourth-pseudo-column');
            if (b1.length)
                b1.remove();
            var b2 = $('.b-fourth-pseudo-column_wrapper.double');
            if (b2.length)
                b2.remove();
            var b3 = $('.rb-banner');
            if (b3.length)
                b3.hide();
            var b4 = $('.mob-mm-trg.trg-b-banner-block');
            if (b4.length)
                b4.hide();
            var b5 = $('.b-photo__banner-bottom.show');
            if (b5.length)
                b5.remove();
        }
        else
        {
            var m1 = $('.mob-mm-trg.trg-b-banner-block');
            if (m1.length)
                m1.hide();
        }
    }
    function games_mail()
    {
        if (desktop || tablet)
        {
            var b1 = $('.b-content__banner.js-content__right-column__banner');
            if (b1.length)
                b1.hide();
            var b2 = $('.b-pc__right-column.js-pc__right-column');
            if (b2.length)
                b2.hide();
            var b3 = $('.rb-video-widget');
            if (b3.length)
                b3.hide();
        }
        var n1 = $('.mailru-visibility-check');
        if (n1.length)
            n1.hide();
    }
    function love_mail()
    {
        if (desktop || tablet)
        {
            var b1 = $('.banner_left');
            if (b1.length)
                b1.hide();
        }
    }
    function news_mail()
    {
        if (desktop || tablet)
        {
            var b1 = $('.branding-p');
            if (b1.length)
                b1.hide();
            var b2 = $('.rb-slot.js-module');
            if (b2.length)
                b2.hide();
            var b3 = $('.daynews__spring');
            if (b3.length)
                b3.hide();
            var b4 = $('.viewbox__side');
            if (b4.length)
                b4.hide();
            var b5 = $('.rb-video-widget');
            if (b5.length)
                b5.hide();
        }
        else
        {
            var m1 = $('.mailru-visibility-check');
            if (m1.length)
                m1.hide();
            var m2 = $('[id*="js-banner"]');
            if (m2.length)
                m2.hide();
        }
    }
    function sport_mail()
    {
        if (desktop || tablet)
        {

            var b1 = $('div[data-module="SlotModel"]');
            if (b1.length)
                b1.hide();
        }
        else
        {
            var m1 = $('div[id*="slot"]');
            if (m1.length)
                m1.hide();
        }
        var n1 = $('.mailru-visibility-check');
        if (n1.length)
            n1.hide();
    }
    function auto_mail()
    {
        if (desktop || tablet)
        {
            var b1 = $('.branding-p');
            if (b1.length)
                b1.hide();
            var b2 = $('.grid__item.grid__item_banner');
            if (b2.length)
                b2.hide();
            var b3 = $('div[data-module="SlotModel"]');
            if (b3.length)
                b3.hide();
            var b5 = $('.daynews__spring');
            if (b5.length)
                b5.hide();
            var b6 = $('.viewbox__side');
            if (b6.length)
                b6.hide();
            var b7 = $('.rb-video-widget');
            if (b7.length)
                b7.hide();
            var b8 = $('.article__item_source_coub');
            if (b8.length)
                b8.hide();
        }
        else
        {
            var m1 = $('.ad.ad_white');
            if (m1.length)
                m1.hide();
        }
        var n1 = $('.mailru-visibility-check');
        if (n1.length)
            n1.hide();
    }
    function cars_mail()
    {
        if (desktop || tablet)
        {
            var b1 = $('div[data-module="SlotModel"]');
            if (b1.length)
                b1.hide();
            var b2 = $('.single.single_padded');
            if (b2.length)
                b2.hide();
            var b3 = $('.spring.ya-direct.ya-direct_vertical');
            if (b3.length)
                b3.parent().parent().hide();
            var b4 = $('.js-springs__top-secondary.springs__top');
            if (b4.length)
                b4.hide();
        }
        var n1 = $('.mailru-visibility-check');
        if (n1.length)
            n1.hide();
    }
    function afisha_mail()
    {
        if (desktop || tablet)
        {
            var b1 = $('.branding-p');
            if (b1.length)
                b1.hide();
            var b2 = $('.pc-mimic.js-module');
            if (b2.length)
                b2.hide();
            var b3 = $('.rb-slot.js-module');
            if (b3.length)
                b3.hide();
        }
        var n1 = $('.mailru-visibility-check');
        if (n1.length)
            n1.hide();
    }
    function lady_mail()
    {
        if (desktop || tablet)
        {
            var b1 = $('.rb-slot.js-module');
            if (b1.length)
                b1.hide();
            var b3 = $('.daynews__spring');
            if (b3.length)
                b3.hide();
            var b4 = $('.tv__spring');
            if (b4.length)
                b4.hide();
            var b5 = $('.rb-video-widget');
            if (b5.length)
                b5.hide();
            var b6 = $('div[data-module="SlotModel"]');
            if (b6.length)
                b6.hide();
        }
        var n1 = $('.mailru-visibility-check');
        if (n1.length)
            n1.hide();
        var n2 = $('div[id*="yandex"]');
        if (n2.length)
            n2.hide();
    }
    function hi_tech_mail()
    {
        if (desktop || tablet)
        {
            var b1 = $('.branding-p');
            if (b1.length)
                b1.hide();
            var b2 = $('div[data-module="SlotModel"]');
            if (b2.length)
                b2.hide();
            var b6 = $('.rb-video-widget');
            if (b6.length)
                b6.hide();
            var b7 = $('aside[data-module="SlotModel"]');
            if (b7.length)
                b7.hide();
        }
        var n1 = $('.mailru-visibility-check');
        if (n1.length)
            n1.hide();
    }
    function tv_mail()
    {
        if (desktop || tablet)
        {
            var b1 = $('div[data-module="SpringsReload.Page"]');
            if (b1.length)
                b1.hide();
            var b2 = $('.rb_right');
            if (b2.length)
                b2.hide();
        }
        var n1 = $('.mailru-visibility-check');
        if (n1.length)
            n1.hide();
    }
    function realty_mail()
    {
        if (desktop || tablet)
        {
            var b1 = $('div[data-module="SlotModel"]');
            if (b1.length)
            {
                b1.hide();
                if (document.baseURI.search('realty.mail.ru/offer') != -1)
                {
                    b1.parent().hide();
                }
            }
            var b2 = $('div[class="parallax"]');
            if (b2.length)
                b2.hide();
        }
        else
        {
            var m1 = $('[id*="yandex_rtb"]');
            if (m1.length)
                m1.hide();
        }
        var n1 = $('.mailru-visibility-check');
        if (n1.length)
            n1.hide();
    }
    function cloud_mail()
    {
        if (desktop)
        {
            var b1 = $('a[href*="corp.mail.ru/adv"]');
            if (b1.length && b1.parents().length > 2)
                b1.parents()[3].remove();
            var b2 = $('div:contains("Директ")');
            if (b2.length && b2.parents().length > 2)
                b2.parents()[3].remove();
            var s1 = $('.b-layout__col_1_2');
            if (s1.length)
                s1.css('margin-right', 0);
        }
        var n1 = $('.mailru-visibility-check');
        if (n1.length)
            n1.hide();
    }
    function otvet_mail()
    {
        if (desktop || tablet)
        {
            var b1 = $('.column.column_right');
            if (b1.length)
                b1.children().hide();
            var b2 = $('[id*="yandex_rtb"]');
            if (b2.length)
                b2.hide();
            var b3 = $('div[class*=adv-slot]');
            if (b3.length)
                b3.hide();
        }
        else
        {
            var m1 = $('.trg-b-wrap.block');
            if (m1.length)
                m1.hide();
        }
    }
    function pogoda_mail()
    {
        if (desktop || tablet)
        {
            var b1 = $('div[data-module="SlotModel"]');
            if (b1.length)
                b1.hide();
            var b2 = $('.rb_body');
            if (b2.length)
                b2.hide();
        }
        var n1 = $('.mailru-visibility-check');
        if (n1.length)
            n1.hide();
    }
    function torg_mail()
    {
        if (desktop || tablet)
        {
            var rb1 = $('#top-rb-wrapper');
            if (rb1.length)
                rb1.hide();
            var rb2 = $('section[class="horizontal-promo-block clearfix"]');
            if (rb2.length)
                rb2.hide();
            var b1 = $('.promo_blocks');
            if (b1.length)
                b1.hide();
            var b2 = $('.block-target.block-target_horizontal');
            if (b2.length)
                b2.hide();
            var b3 = $('div[class*="adv_slot_"]');
            if (b3.length)
                b3.hide();
            var b4 = $('div[id*="yandex"]');
            if (b4.length)
                b4.hide();
        }
    }
    function top_mail()
    {
        if (desktop || tablet)
        {
            var b1 = $('.banner_240');
            if (b1.length)
                b1.hide();
        }
    }
    function deti_mail()
    {
        if (desktop || tablet)
        {
            var b1 = $('div[data-module="SlotModel"]');
            if (b1.length)
                b1.hide();
        }
        else
        {
            var m1 = $('.mailru-visibility-check');
            if (m1.length)
                m1.hide();
        }
    }
    function horo_mail()
    {
        if (desktop || tablet)
        {
            var b1 = $('div[data-module="SlotModel"]');
            if (b1.length)
                b1.hide();
        }
        var n1 = $('.mailru-visibility-check');
        if (n1.length)
            n1.hide();
    }
    function health_mail()
    {
        if (desktop || tablet)
        {
            var b1 = $('div[data-module*="SlotModel"]');
            if (b1.length)
                b1.hide();
            var b3 = $('.daynews__spring');
            if (b3.length)
                b3.hide();
            var b4 = $('.branding-p');
            if (b4.length)
                b4.hide();
            var b5 = $('.branding-footer');
            if (b5.length)
                b5.hide();
        }
        var n1 = $('.mailru-visibility-check');
        if (n1.length)
            n1.hide();
    }
    function removeAds()
    {
        switch (host)
        {
            case 'mail.ru':
                mail();
                break;
            case 'e.mail.ru':
                e_mail();
                break;
            case 'go.mail.ru':
                go_mail();
                break;
            case 'my.mail.ru':
                my_mail();
                break;
            case 'games.mail.ru':
                games_mail();
                break;
            case 'love.mail.ru':
                love_mail();
                break;
            case 'news.mail.ru':
                news_mail();
                break;
            case 'sport.mail.ru':
                sport_mail();
                break;
            case 'auto.mail.ru':
                auto_mail();
                break;
            case 'cars.mail.ru':
                cars_mail();
                break;
            case 'afisha.mail.ru':
                afisha_mail();
                break;
            case 'lady.mail.ru':
                lady_mail();
                break;
            case 'hi-tech.mail.ru':
                hi_tech_mail();
                break;
            case 'tv.mail.ru':
            case 'kino.mail.ru':
                tv_mail();
                break;
            case 'realty.mail.ru':
                realty_mail();
                break;
            case 'cloud.mail.ru':
                cloud_mail();
                break;
            case 'otvet.mail.ru':
                otvet_mail();
                break;
            case 'pogoda.mail.ru':
                pogoda_mail();
                break;
            case 'torg.mail.ru':
                torg_mail();
                break;
            case 'top.mail.ru':
                top_mail();
                break;
            case 'deti.mail.ru':
                deti_mail();
                break;
            case 'horo.mail.ru':
                horo_mail();
                break;
            case 'health.mail.ru':
                health_mail();
                break;
        }
    }
    document.addEventListener("DOMContentLoaded", removeAds);
    document.addEventListener("DOMSubtreeModified", removeAds);
})();
