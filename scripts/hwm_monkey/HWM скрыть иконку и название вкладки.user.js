// ==UserScript==
// @name         HWM скрыть иконку и название вкладки
// @version      1.0.0
// @author       incognito
// @include      https://www.heroeswm.ru/*
// @include      https://www.lordswm.com/*
// @description  чтобы не палиться перед начальством если остались закрытые вкладки в браузере
// @require      https://code.jquery.com/jquery-3.1.1.slim.min.js
// @namespace https://greasyfork.org/users/237404
// ==/UserScript==

(function (undefined) {

    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'http://www.stackoverflow.com/favicon.ico';
    document.getElementsByTagName('head')[0].appendChild(link);

    document.title = 'google';

}());
