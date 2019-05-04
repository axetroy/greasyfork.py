// ==UserScript==
// @name           Lepro WhoIsWho
// @version        2.1
// @author         Gipnokote
// @description    Наглядность половой принадлежности =) 2.1
// @namespace      https://leprosorium.ru/*
// @include        https://leprosorium.ru/*
// @include        https://*.leprosorium.ru/*
// ==/UserScript==

$$("div.ddi:not(:contains('Написала')) a.c_user").setStyle('color', 'blue');
$$("div.ddi:contains('Написала') a.c_user").setStyle('color', 'red');