// ==UserScript==
// @name		Comic Adapter: Beyond the Western Deep
// @include	http*://*westerndeep.net*
// @icon		http://www.westerndeep.net/wp-content/uploads/fbrfg/favicon-32x32.png
// @grant		none
// @run-at		document-end
// @description		Прямая ссылка на картинку для её скачивания
// @version 0.0.1.20170618105816
// @namespace https://greasyfork.org/users/7568
// ==/UserScript==

var strip = document.getElementById('comic'), // ищем ссылку
	img = strip.getElementsByTagName('img')[0].getAttribute('src'), // ищем путь картинки
	dlink_p = document.createElement('p'), // готовим параграф
	dlink_a = document.createElement('a'); // готовим ссылку
dlink_a.setAttribute('href', img); // линк
dlink_a.setAttribute('target', '_blank'); // таргет
dlink_a.setAttribute('style', 'font-size: 20px'); // стилизуем ссылку
dlink_a.innerHTML = 'Прямая ссылка'; // обзываем
dlink_p.appendChild(dlink_a); // прицепляем ссылку в спан
strip.appendChild(dlink_p); // прицепляем спан в документ