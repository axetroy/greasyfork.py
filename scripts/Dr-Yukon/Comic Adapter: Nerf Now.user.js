// ==UserScript==
// @name		Comic Adapter: Nerf Now
// @include	http*://*nerfnow.com*
// @icon		http://www.nerfnow.com/favicon.png
// @grant		none
// @run-at		document-end
// @description		Замена оригинального синтаксиса на синтаксис Комикслейта. Остаётся лишь скопипастить. И картинку залить.
// @version 0.0.1.20170613152456
// @namespace https://greasyfork.org/users/7568
// ==/UserScript==

var insert = document.getElementById('nav_previous'), // линк предыдущего номера стрипа в навигаторе
	number = parseInt(insert.getElementsByTagName('a')[0].href.match(/[^\/]+$/)) + 1, // парсинг содержимого, получение текущего номера стрипа
	line = document.createElement('li'), // будущий счётчик
	bold = document.createElement('strong'), // тег жирного текста
	num = document.createTextNode(number); // нода с текущим номером
bold.appendChild(num); // зажирнение
line.appendChild(bold); // вставка в счётчик
insert.appendChild(line); // вставка счётчика в навигатор

var comm = document.getElementsByClassName("comment")[0], // поиск поля комментов
//	title = document.getElementById("comic").getElementsByTagName('img')[0].title,
	ps = comm.getElementsByTagName("p"), // получение параграфов в поле комментов
	lastp = ps.length-1; // номер последнего параграфа
if (ps[lastp].innerHTML == "&nbsp;") { // если последний параграф из поля комментов пустой
 comm.removeChild(ps[lastp]); // удалить его
};
//var texter = "== Nerf Now "+number+" ==<br>**"+title+"**<br>{cnav}<br>{{"+number+".png}}<br>"+comm.innerHTML+"{cnav}"; // сборка вики-кода из текущего номера и содержимого поля комментов
var texter = "== Nerf Now!! "+number+" ==<br>{cnav}<br>{{"+number+".png}}<br>"+comm.innerHTML+"{cnav}"; // сборка вики-кода из текущего номера и содержимого поля комментов
texter = texter.replace(/\<a href="([^"]+)"\>([^\<]+)\<\/a>/g,"[[$1|$2]]").replace(/\<em>(.+?)\<\/em>/g,"//$1//"); // докувикификация
comm.innerHTML = texter; // замена поля комментов на вики-код