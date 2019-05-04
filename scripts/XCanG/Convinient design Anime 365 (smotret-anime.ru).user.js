// ==UserScript==
// @name         Convinient design Anime 365 (smotret-anime.ru)
// @name:ru      Удобный дизайн Anime 365 (smotret-anime.ru)
// @namespace    https://smotret-anime.ru/
// @version      0.1
// @description  ECMAScript 6, use babel, writed for addon Tapermonkey http://tampermonkey.net/
// @description:ru ECMAScript 6, используется babel, написано под аддон Tapermonkey http://tampermonkey.net/
// @author       XCanG
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser-polyfill.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser.min.js
// @run-at       document-ready
// @match        *://smotret-anime.ru/*
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
/* jshint ignore:end */
/* jshint esnext: true */

var s = document.createElement("style");
// Набор стилей для сайта, часть используется в JS:
s.innerHTML = `
.card, .card-panel, .m-new-episodes, #comments { /* Все меню позволяют увидеть спрятанный за окнами background (3 правила)*/
	background-color: rgba(255, 255, 255, 0.4);
	transition: background-color 1s ease;
}
.card:hover, .card-panel:hover, .m-new-episodes:hover, #comments:hover {
	background-color: rgba(255, 255, 255, 1);
}
.collection .collection-item, .collection.with-header .collection-header {
	background: none !important;
}
#vkwidget1, #vkwidget2, #vkwidget3, #vkwidget4, #vkwidget5, #vkwidget6, #vkwidget7, #vkwidget8, #vkwidget9, #vkwidget10, #vkwidget11, #vkwidget12, #vkwidget13 { /* iframe изменять напрямую очень непросто, но можно применить трюк с общей прозрачностью (2 правила) */
	opacity: 0.6;
	transition: opacity 1s ease;
}
#vkwidget1:hover, #vkwidget2:hover, #vkwidget3:hover, #vkwidget4:hover, #vkwidget5:hover, #vkwidget6:hover, #vkwidget7:hover, #vkwidget8:hover, #vkwidget9:hover, #vkwidget10:hover, #vkwidget11:hover, #vkwidget12:hover, #vkwidget13:hover {
	opacity: 1;
}
a, .green-text { /* Контор-стили на сложночитаемый текст (3 правила) */
	text-shadow: 0px 0px 3px #ffffff;
}
nav {
	background-color: white;
}
.ccs-input {
	border-radius: 20px;
	padding-left: 8px;
	padding-right: 8px;
	box-shadow: 0px 0px 5px 2px rgba(255, 255, 255, 1);
}
.fixed-nav { /* Теперь панель закреплена и всегда доступна пользователю (6 правил) */
	position: fixed;
	z-index: 100;
	animation: navslide 0.5s ease-out 0s 1 normal;
	background-color: rgba(255, 255, 255, 0.6);
	transition: background-color 0.3s ease;
}
.fixed-nav:hover {
	background-color: rgba(255, 255, 255, 1);
}
.fixed-nav > div > #logo-container {
	opacity: 0.6;
	transition: opacity 0.3s ease;
}
.fixed-nav:hover > div > #logo-container {
	opacity: 1;
}
@keyframes navslide {
	from { top: -70px; }
	to { top: 0px; }
}
@-webkit-keyframes navslide {
	from { top: -70px; }
	to { top: 0px; }
}
#theater:before { /* Неполноценный полноэкранный режим или "режим театрального просмотра" Иногда он очень нужен так как оставляет поля для навигации браузера или между окнами (4 правила) */
	content: "?";
}
.theater-small {
	width: 0px;
	position: relative;
	left: 745px; /* Позиционирование от которого нужно избавиться, но только если добавить кнопку непосредственно внутрь iframe (см. код JavaScript)*/
	top: 583px;
	cursor: pointer;
	z-index: 102;
}
.theater-full {
	width: 0px;
	position: fixed !important;
	bottom: 18px;
	right: 210px;
	cursor: pointer;
	z-index: 102;
}
.theater { /* Само окно плеера, растянутое на весь экран */
	position: fixed !important;
	top: 0 !important;
	left: 0 !important;
	width: 100vw !important;
	height: 100vh !important;
	z-index: 101;
}
.video-container { /* Контр-стиль для режима театра (1 правило) */
	overflow: visible;
}
`;
document.head.appendChild(s);

// Закрепляем панель навигации
var $logo = $("nav");
$logo.removeClass("white");
$(document).scroll(function() {
	if ($(this).scrollTop() > 70) { $logo.addClass("fixed-nav"); } else { $logo.removeClass("fixed-nav"); }
});

// Функция переключения театрального режима
function theaterMode() {
	$("#videoFrame").toggleClass("theater");
	$("#theater").toggleClass("theater-small").toggleClass("theater-full");
}

// Добавление кнопки театрального режима. Не очень хороший метод, так как добавляю на страницу как оверлей, а не внутрь iframe.
if ($(".m-translation-player").length) {
	$(".video-container").append("<div id=\"theater\" class=\"theater-small\"></div>");
	$("#theater").on("click", theaterMode);
}

/* jshint ignore:start */
]]></>).toString();
var c = babel.transform(inline_src);
eval(c.code);
/* jshint ignore:end */