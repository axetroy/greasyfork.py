// ==UserScript==
// @name		Comic Adapter: Awkward Zombie
// @include	http*://*awkwardzombie.com*
// @icon		http://www.awkwardzombie.com/favicon.ico
// @grant		none
// @run-at		document-end
// @description		Замена оригинального синтаксиса названия и комментариев на синтаксис Комикслейта. Остаётся лишь скопипастить. И картинку залить.
// @version 0.0.1.20170618162030
// @namespace https://greasyfork.org/users/7568
// ==/UserScript==

var titler = document.getElementsByClassName("title")[0],
	num = document.getElementById("comic").getElementsByTagName('img')[0].getAttribute('src').replace(/.*comic(\d+).*/,"$1")
	blarg = document.getElementById("blarg"),
	comm = blarg.firstChild.nextSibling.nextSibling.nextSibling,
	tag = comm.nextSibling.nextSibling,	
	texter = '';

// ТИТУЛ
if (num < 1000) num = "0" + num; // наращивание номера
texter += "== AWKWARD ZOMBIE "+num+" ==<br>**"+titler.innerHTML.replace(/\s*/, "")+"**<br>{cnav}<br>{{"+num+".png}}<br>";

// ТЕГИ
if (tag != null) {
 texter += '{{tag>"'+tag.innerHTML.replace(/\n\t(.*)    $/, "$1")+'"}}<br>';
};

// КОММЕНТАРИИ
if (comm != null) {
 texter += comm.innerHTML.split('<br>')[2].replace(/[\s]*(.*)\t+$/, "$1").replace(/\<a href="([^"]+)"\>([^\<]+)\<\/a>/g,"[[$1|$2]]").replace(/\<i>([^\<]+)\<\/i>/g,"//$1//").replace(/\<em>([^\<]+)\<\/em>/g,"//$1//").replace(/\<strong>([^\<]+)\<\/strong>/g,"**$1**")+"<br>";
};

blarg.innerHTML = ''; // опустошение низа
titler.innerHTML = texter+"{cnav}";