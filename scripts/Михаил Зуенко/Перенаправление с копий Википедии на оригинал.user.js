// ==UserScript==
// @name         Перенаправление с копий Википедии на оригинал
// @description  Скрипт перенаправляет с копий Википедии (например, wiki2.org) на оригинал (ru.wikipedia.org).
// @version      0.6
// @author       Михаил Зуенко
// @include      http://wiki2.org/*
// @include      http://wp.wiki-wiki.ru/*
// @include      http://wiki.sc/*
// @include      http://wikiredia.ru/*
// @include      http://wikipedia.org/*
// @include      http://www.wikiznanie.ru/*
// @namespace    //
// @run-at document-start
// ==/UserScript==

if (window.location.hostname == "wiki2.org") {
    window.location.href = "http://wikipedia.org" + window.location.pathname;
}
if (window.location.hostname == "wp.wiki-wiki.ru") {
    window.location.href = "http://ru.wikipedia.org/wiki" + window.location.pathname.substring(13);
}
if (window.location.hostname == "wiki.sc") {
    window.location.href = "http://ru.wikipedia.org/wiki" + window.location.pathname.substring(10);
}
if (window.location.hostname == "wikiredia.ru") {
    window.location.href = "http://ru.wikipedia.org" + window.location.pathname;
}
if (window.location.hostname == "www.wikiznanie.ru") {
    window.location.href = "http://ru.wikipedia.org/wiki" + window.location.pathname.substring(20);
}
if (window.location.hostname == "wikipedia.org") {
    window.location.href = "http://ru.wikipedia.org" + window.location.pathname;
}