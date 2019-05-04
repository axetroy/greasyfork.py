// ==UserScript==
// @name     club.foto.ru cleaner
// @version  1.1
// @description Удаляет боковые баннеры и меняет размер изображений в сообщениях на 100%
// @author   Maranchuk Sergey <slav0nic0@gmail.com>
// @include http*://club.foto.ru/forum/*
// @require https://cdnjs.cloudflare.com/ajax/libs/zepto/1.2.0/zepto.min.js
// @namespace https://greasyfork.org/users/3786
// ==/UserScript==

$('.left-banner, .right-banner').remove();
$('body > div > div').width('100%');
$('.forumPostBody img').attr('style', 'max-width: 100% !important');
