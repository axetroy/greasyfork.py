// ==UserScript==
// @name           Direct Image Link Twitter
// @description    Показывает прямые ссылки
// @include        http*://twitter.com*
// @grant          none
// @version 0.0.1.20160824110350
// @namespace https://greasyfork.org/users/7568
// ==/UserScript==

function linker () {
 var divs = document.querySelectorAll('.AdaptiveMedia'); // найти все дивы картинок
 for (var i = divs.length - 1; i >= 0; --i) { // обыск дивов
  var source = divs[i].querySelector('img').getAttribute('src') + ':large'; // найти путь картинки и дописать
  var plink = document.createElement('a'); // смастерить ссылку
  plink.setAttribute('href', source); // вставить путь картинки
  plink.innerHTML = source; // дать ссылку текстом
  divs[i].appendChild(plink); // и присобачить в документ
  divs[i].className = divs[i].className.replace('AdaptiveMedia','Adapt1veMedia'); // защита от повторной обработки
 }
}

setInterval(linker, 5000); // обрабатывать по циклу с паузой