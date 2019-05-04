// ==UserScript==
// @name		Comic Adapter: TwoKinds
// @include	http*://*twokinds.keenspot.com*
// @icon		http://cdn.twokinds.keenspot.com/favicon.ico
// @grant		none
// @run-at		document-end
// @description		Замена оригинального синтаксиса названия и комментариев на синтаксис Комикслейта. Остаётся лишь скопипастить. И картинку залить.
// @version 0.0.1.20170618084924
// @namespace https://greasyfork.org/users/7568
// ==/UserScript==

var titler1 = parseInt(document.getElementsByTagName("title")[0].innerHTML.split(': ')[0]), // номер
	titler2 = document.getElementsByTagName("h1")[0].innerHTML.split(': ')[1], // титул
	trans = document.getElementsByClassName("transcript-content")[0], // поиск блока транскрипта
	trans_p = trans.getElementsByTagName("p"), // поиск параграфов в транскрипте
	last_p = trans_p[trans_p.length-1]; // последний параграф
	texter = ''; // заготовка для вики-кода

if (titler1 < 1000) titler1 = "0" + titler1; // наращивание номера
texter += "== Twokinds "+titler1+" ==<br>**"+titler2+"**<br>{cnav}<br>{{"+titler1+".jpg}}<br>"; // запись титульной части вики-кода

// ТРАНСКРИПТ
if (trans != null) { // если блок транскрипта не пустой
 if (last_p.innerHTML.match("Page transcript provided").length != 0) { // если есть примечание
  trans.removeChild(last_p); // удаление примечания
 }
 texter += "&lt;!--"+trans.innerHTML+"--&gt;<br>"; // запись транскрипта в комментарий в вики-коде
}

texter += "{cnav}"; // концовка вики-кода
trans.innerHTML = texter; // запись собранного вики-кода вместо транскрипта