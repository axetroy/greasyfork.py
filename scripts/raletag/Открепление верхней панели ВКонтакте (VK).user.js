// ==UserScript==
// @name         Открепление верхней панели ВКонтакте (VK)
// @namespace    FIX
// @version      1.4
// @description  Открепление верхней панели в социальной сети ВКонтакте (новый дизайн) при прокрутке страницы.
// @copyright    2016-2017, raletag
// @author       raletag
// @include      *://vk.com/*
// @exclude      *://vk.com/notifier.php*
// @exclude      *://vk.com/*widget*.php*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    var ishide = false,
        MO = window.MutationObserver,
        style = document.createElement("style");
    function h () {
        var playing = document.body.querySelector('#top_audio_player').classList.contains('top_audio_player_playing'),
        exclude = (window.location.pathname.indexOf('/gim') === 0 || window.location.pathname === '/im' || window.location.pathname === '/al_im.php' || document.body.querySelector('.app_container')),
        scroll = (document.body.scrollTop > 42);
        if (!ishide&&!playing&&!exclude&&scroll) { // скрыть
            document.body.querySelector('#page_header_cont').style.display = 'none';
            document.body.classList.add('headefix');
            ishide = true;
            //console.log('HIDE TOP PANEL');
        } else if ((ishide&&(playing||exclude||!scroll))) { // показать
            document.body.querySelector('#page_header_cont').style.display = null;
            document.body.querySelector('#side_bar_inner').style.marginTop = null;
            document.body.classList.remove('headefix');
            ishide = false;
            //console.log('SHOW TOP PANEL');
        }
    }
    style.innerHTML='.headefix .ui_search_fixed {top: 0px!important;} .headefix .side_bar_inner{margin-top: 0px;} .headefix .photos_period_delimiter_fixed{margin: 0px 0 0 -20px!important;} .headefix ._audio_rows_header.audio_rows_header.fixed{top:0px!important;} .headefix #stl_bg {padding-top: 20px!important;}';
    (document.head||document.body||document.documentElement||document).appendChild(style);
    window.addEventListener ('scroll', h, false);
    if (MO) {
        new MO(h).observe(document.body.querySelector('#top_audio_player'), {attributes: true, attributeFilter: ['class']});
    }
    h();
})();