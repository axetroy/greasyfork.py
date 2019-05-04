// ==UserScript==
// @id             habrahabr.ru-e7c04796-4bf7-4ec1-914c-c0f4d20e6b1e@scriptish
// @name           SoHabr redirect
// @version        1.1
// @namespace      http://darkdaskin.tk/
// @author         Dark Daskin
// @description    Redirects from unavailable posts to sohabr.net copies
// @include        http://habrahabr.ru/post/*
// @include        http://geektimes.ru/post/*
// @include        http://megamozg.ru/post/*
// @include        https://habrahabr.ru/post/*
// @include        https://geektimes.ru/post/*
// @include        https://megamozg.ru/post/*
// @run-at         document-end
// ==/UserScript==

var header = document.querySelector('#reg-wrapper h1');
if (header && header.innerHTML === 'Доступ к публикации закрыт') {
    location.host = 'sohabr.net';
}