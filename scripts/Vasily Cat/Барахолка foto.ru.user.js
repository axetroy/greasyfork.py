// ==UserScript==
// @name     Барахолка foto.ru  
// @version  1.3
// @description Убирает баннеры на барахолке foto.ru . Взято  за основу у Maranchuk Sergey <slav0nic0@gmail.com>
// @author   любитель
// @include http*://club.foto.ru/secondhand2/*
// @require https://cdnjs.cloudflare.com/ajax/libs/zepto/1.2.0/zepto.min.js
// @namespace https://greasyfork.org/users/3786
// ==/UserScript==

$('.left-banner, .right-banner, .bannerbox').remove();
$('body > div > div').width('100%');