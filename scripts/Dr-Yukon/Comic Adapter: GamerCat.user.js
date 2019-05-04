// ==UserScript==
// @name		Comic Adapter: GamerCat
// @include	http*://*tapastic.com*
// @include	http*://*tapas.io*
// @icon		https://tapas.io/favicon.ico
// @grant		none
// @run-at		document-end
// @description		Прямая ссылка на картинку для её скачивания
// @version 0.0.1.20170614132850
// @namespace https://greasyfork.org/users/7568
// ==/UserScript==

var timer = 1000; // таймер

function linker () {
var stopper = document.getElementsByClassName('stopper'); // останавливалка
if (stopper.length == 1) return;
var strip = document.getElementsByClassName('art-image'), // ищем ссылку
	img = strip[0].getAttribute('src'), // ищем путь картинки
	dlink = document.createElement('a'); // готовим ссылку
dlink.setAttribute('href', img); // линк
dlink.setAttribute('class', 'stopper'); // линк
dlink.setAttribute('style', 'font-size: 20px'); // стилизуем
dlink.innerHTML = img; // обзываем
strip[0].parentNode.appendChild(dlink); // прицепляем
}

setInterval(linker, timer); // функция по таймеру