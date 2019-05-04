// ==UserScript==
// @name           Comicslate AutoPrevEdit
// @description    Автопереход в редактор предыдущей страницы
// @icon           https://comicslate.org/lib/tpl/tempe/images/flo.png
// @include        http*://comicslate.org/*
// @grant          none
// @run-at         document-end
// @version 0.0.1.20170621065527
// @namespace https://greasyfork.org/users/7568
// ==/UserScript==

var links = document.getElementsByClassName("wikilink1"); // найти все зелёные ссылки

for (i in links) {
 if (links[i].id == "navprev") { // навигация назад
  links[i].href += '?do=edit'; // добавить ссылку на редактор
  links[i].click(); // автокликер
 };
};