// ==UserScript==
// @name         Sports-replace-feed
// @version      0.2
// @namespace    replace-feed-to-mynews
// @description  Скрипт меняет "Мою ленту" и ссылку (sports.ru/feed/) на "Новости", устанавливая при этом на них ссылку sports.ru/my/news/
// @include        https://www.sports.ru/*
// @author       dimisa
// @grant        none
// ==/UserScript==

window.setTimeout(
	function check() {
    var anchors = document.querySelectorAll('a[href^="/feed/"]');
Array.prototype.forEach.call(anchors, function (element, index) {
element.href = "https://www.sports.ru/my/news/";
element.text = "Новости";
});
        window.setTimeout(check, 100);
	}, 100
);