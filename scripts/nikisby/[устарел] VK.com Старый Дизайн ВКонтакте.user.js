// ==UserScript==
// @name         [устарел] VK.com Старый Дизайн ВКонтакте
// @namespace    nikisby
// @version      2.4
// @description  Возвращает старый дизайн VK.com на всех страницах и во всех вкладках
// @author       nikisby
// @match        https://new.vk.com/*
// @exclude      https://new.vk.com/about
// @exclude      https://new.vk.com/products
// @exclude      https://new.vk.com/dev
// @exclude      https://new.vk.com/dev/*
// @exclude      https://new.vk.com/blog
// @exclude      https://new.vk.com/blog/*
// @exclude      https://new.vk.com/widget_like.php?*
// @exclude      https://new.vk.com/video_ext.php?*
// @exclude      https://new.vk.com/widget_community.php?*
// @exclude      https://new.vk.com/doc*?hash=*
// @run-at       document-body
// @grant        none
// ==/UserScript==

function sendPost(url) {
    var form = document.createElement('form');
    form.method = 'post';
    form.action = url;
    document.body.appendChild(form);
    form.submit();
}

(function() {
    'use strict';
    var url;
    if (window.location.pathname == '/al_profile.php') {
        url = 'https://vk.com/' + window.location.search.toString().split(/[=&]/)[1];
        sendPost(url);
    } else {
        url = 'https://vk.com' + window.location.href.toString().split(window.location.host)[1];
        sendPost(url);
    }
})();