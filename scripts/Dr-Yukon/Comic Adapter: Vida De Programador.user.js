// ==UserScript==
// @name		Comic Adapter: Vida De Programador
// @include	http*://*vidadeprogramador.com.br*
// @icon		https://vidadeprogramador.com.br/axethemes/vdp/images/favicon.png
// @grant		none
// @run-at		document-end
// @description         Замена оригинального синтаксиса названия, комментариев и тегов на синтаксис Комикслейта. Остаётся лишь скопипастить. И картинку залить.
// @version 0.0.1.20170702214834
// @namespace https://greasyfork.org/users/7568
// ==/UserScript==

var poster = document.getElementsByClassName("post"); // поиск выпусков

for (var i = 0; i < poster.length; i++) {
 var tir = poster[i].getElementsByClassName("tirinha")[0], // поиск признака выпуска
		texter = ''; // сборка
 if (tir != undefined) { // если признак выпуска есть
  // ТИТУЛ
  var titler = poster[i].getElementsByTagName('a')[0].innerHTML, // поиск названия
		num = tir.getElementsByTagName('img')[0].getAttribute('src').replace(/.*tirinha(\d+)\..*/g, "$1"); // поиск номера
  if (typeof(num*1) == "number") { // приведение к числу и проверка
   texter += "== Vida de Programador "+num+" ==<br>**"+titler+"**<br>{cnav}<br>{{"+num+".png}}<br>"; // первая часть сборки
  };
  // ТРАНСКРИПТ
  var trans = poster[i].getElementsByClassName("transcription")[0]; // поиск зоны транскрипта
  if (trans != undefined) { // если она нашлась
   var trans1 = trans.getElementsByTagName('p')[0]; // поиск внутреннего тега
   if (trans1 != undefined) { // если он нашёлся
    texter += '&lt;!--'+trans1.innerHTML+'--&gt;<br>'; // вторая часть сборки
   };
  };
  // ТЕГИ
  var tag = poster[i].getElementsByClassName("postmetadata")[0]; // поиск зоны тегов
  if (tag != undefined) { // если она нашлась
   texter += '{{tag>'; // третья часть сборки
   var atag = tag.getElementsByTagName("a"); // поиск отдельных тегов
   for (var j = 0; j < atag.length; j++) {
    texter += atag[j].innerHTML.replace(/ /g,"_")+" "; // обработка тегов
   };
   texter = texter.replace(/ $/g,"}}<br>"); // третья часть сборки
  };
  tag.innerHTML = ''; // опустошение зоны тегов
  trans.innerHTML = texter+"{cnav}"; // вставка сборки в зону транскрипта
 };
};