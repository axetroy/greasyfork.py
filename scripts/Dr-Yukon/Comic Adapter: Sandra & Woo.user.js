// ==UserScript==
// @name		Comic Adapter: Sandra & Woo
// @include	http*://*sandraandwoo.com*
// @icon		http://www.sandraandwoo.com/favicon.ico
// @grant		none
// @run-at		document-end
// @version 0.0.1.20170618070025
// @namespace https://greasyfork.org/users/7568
// @description Замена оригинального синтаксиса названия и комментариев на синтаксис Комикслейта. Остаётся лишь скопипастить. И картинку залить.
// ==/UserScript==

var titler = document.getElementsByClassName("post-comic")[0].getElementsByTagName("h2")[0], // поиск блока титула
	entry = document.getElementsByClassName("entry")[0], // поиск блока примечаний
	entry_p = entry.getElementsByTagName("p"), // поиск параграфов в примечаниях
	entry_li = entry.getElementsByTagName("li"), // поиск списков в примечаниях
	trans = document.getElementsByClassName("transcript")[0], // поиск блока транскрипта
	tag_div = document.getElementsByClassName("tags")[0], // поиск блока тегов
	tag_a = tag_div.getElementsByTagName("a"), // список тегов
	texter = '', // заготовка для вики-кода
	texter1 = ''; // заготовка для транскрипта

// ТИТУЛ
texter += titler.innerHTML.replace(/\[(\d+)\] (.*)/, "== Sandra and Woo $1 ==<br>**$2**<br>{cnav}<br>{{$1.png}}<br>").replace(/^\[(\d+)\]$/, "== Sandra and Woo $1 ==<br>{cnav}<br>{{$1.png}}<br>"); // запись титульной части вики-кода
titler.innerHTML = titler.innerHTML.replace(/\[(\d+)\].*/, "$1"); // зачистка титула до номера

// ТРАНСКРИПТ
if (trans != null) { // если блок транскрипта не пустой
 texter1 += "&lt;!--"+trans.innerHTML+"--&gt;<br>"; // запись транскрипта в комментарий в вики-коде
 trans.parentNode.removeChild(trans); // удаление блока транскрипта
}

// ПАРАГРАФЫ ПРИМЕЧАНИЙ
for (var i = 0; i < entry_p.length; i++) {
 texter += "<br>"+entry_p[i].innerHTML.replace(/\<a href="([^"]+)"\>([^\<]+)\<\/a>/g,"[[$1|$2]]").replace(/\<em>([^\<]+)\<\/em>/g,"//$1//").replace(/\<strong>([^\<]+)\<\/strong>/g,"**$1**")+"\\\\<br>"; // докувикификация и запись параграфов примечаний в вики-код
}

// СПИСКИ ПРИМЕЧАНИЙ
for (var i = 0; i < entry_li.length; i++) {
 texter += "&nbsp;&nbsp;* "+entry_li[i].innerHTML.replace(/\<a href="([^"]+)"\>([^\<]+)\<\/a>/g,"[[$1|$2]]").replace(/\<em>([^\<]+)\<\/em>/g,"//$1//").replace(/\<strong>([^\<]+)\<\/strong>/g,"**$1**")+"<br>"; // докувикификация и запись списков примечаний в вики-код
}

texter += texter1; // добавить транскрипт

// ТЕГИ
if (tag_div != null) { // если блок тегов не пустой
 for (var i = 0; i < tag_a.length; i++) {
  tag_a[i].innerHTML = tag_a[i].innerHTML.replace(/ /g,"_"); // обработка каждого тега
 }
 texter += tag_div.innerHTML.replace(/, /g," ").replace(/└ Tags: (.*) \s+/,"{{tag>$1}}<br>"); // обработка строки с тегами и её запись в вики-код
 tag_div.parentNode.removeChild(tag_div); // удаление блока тегов
}

texter += "{cnav}"; // концовка вики-кода
texter = texter.replace("\\\\<br>&nbsp;&nbsp;*","<br>&nbsp;&nbsp;*"); // полировка
entry.innerHTML = texter; // запись собранного вики-кода вместо примечаний