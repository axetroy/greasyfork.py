// ==UserScript==
// @name           Direct Image Link Drom
// @description    Показывает прямые ссылки под эскизами Дрома
// @icon           http://i.rdrom.ru/favicon.ico
// @include        http*://*.drom.ru*
// @grant          none
// @version 0.0.1.20150225113521
// @namespace https://greasyfork.org/users/7568
// ==/UserScript==

var drpic = document.getElementsByClassName("catalogImages");
for (x in drpic) {
 var drpath = drpic[x].href, dlink = document.createElement('a');
 dlink.setAttribute('href', drpath);
 dlink.setAttribute('style', 'font-size: 15px');
 dlink.innerHTML = "Прямая ссылка";
 drpic[x].parentNode.appendChild(document.createElement('br'));
 drpic[x].parentNode.appendChild(dlink);
}