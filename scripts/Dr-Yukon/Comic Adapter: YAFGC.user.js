// ==UserScript==
// @name		Comic Adapter: YAFGC
// @include	http*://*yafgc.net*
// @icon		http://yafgc.net/favicon.ico
// @grant		none
// @run-at		document-end
// @version 0.0.1.20170621064803
// @namespace https://greasyfork.org/users/7568
// @description Замена оригинального синтаксиса названия и комментариев на синтаксис Комикслейта. Остаётся лишь скопипастить. И картинку залить.
// ==/UserScript==

var put = document.getElementById("menubar-wrapper"),
	cont = document.getElementsByClassName("post-content")[0],
	titler = cont.getElementsByTagName("h2")[0],
	chap = cont.getElementsByClassName("comic-chapter")[0],
	chapa = chap.getElementsByTagName("a")[0],
	char = cont.getElementsByClassName("comic-characters")[0],
	loc = cont.getElementsByClassName("comic-locations")[0],
	ent = cont.getElementsByClassName("entry")[0],
	texter = '',
	rng, sel,
	prev = document.getElementsByClassName("navi-prev")[0];

prev.accessKey = "s";

// ТИТУЛ
texter += titler.innerHTML.replace(/^(\d+):? (.*)$/, "== Yet Another Fantasy Gamer Comic $1 ==<br>**$2**<br>{cnav}<br>{{$1.jpg}}");

// ГЛАВА
if (chap != null) {
 texter = texter.replace("<br>**","<br>**"+chapa.innerHTML+": ");
}

// ПЕРСОНАЖИ
if (char != null) {
 texter += "<br><br>"+char.innerHTML
 .replace("Characters:", "Персонажи:")
 .replace(/\<a href="http:\/\/yafgc.net\/character\/[^"]+" rel="tag"\>([^\<]+)\<\/a>/g,"[[?do=search&id=ns%3Agamer%3Ayafgc+$1|$1]]"); // мусор после href
}

// МЕСТНОСТЬ
if (loc != null) {
 if (char != null) {
  texter += "\\\\<br>";
 } else {
  texter += "<br><br>";
 }
 texter += loc.innerHTML
 .replace("Location:", "Местность:")
 .replace(/\<a href="http:\/\/yafgc.net\/location\/[^"]+" rel="tag"\>([^\<]+)\<\/a>/g,"[[?do=search&id=ns%3Agamer%3Ayafgc+$1|$1]]"); // мусор после href
}

// ПРОЧЕЕ
if (ent != null) {
 if (loc == null) {
  texter += "<br>";
 }
 texter += "<br>"+ent.innerHTML
 .replace(/\<br\>/g,"\\\\<br>")
 .replace(/\<a [^/>]+ href="([^"]+)"\>([^\<]+)\<\/a>/g,"[[$1|$2]]") // мусор до href
 .replace(/\<img src="([^"]+)"[^/>]+\>/g,"{{$1}}") // после src идёт alt
 .replace(/\<em>([^\<]+)\<\/em>/g,"//$1//")
 .replace(/\<strong>([^\<]+)\<\/strong>/g,"**$1**")
 +"{cnav}"; // докувикификация
} else {
 texter += "<br>{cnav}";
}
put.innerHTML = texter;

// ВЫДЕЛЕНИЕ
rng = document.createRange();
rng.selectNode(put);
sel = window.getSelection();
sel.removeAllRanges();
sel.addRange(rng);