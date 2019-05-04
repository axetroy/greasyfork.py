// ==UserScript==
// @name         Яндекс ИКС
// @namespace    yandexiks
// @author       Зуенко Михаил
// @version      1.0
// @include      *
// @description  Отображает на каждом сайте иконку Яндекс ИКС
// ==/UserScript==

document.body.innerHTML += "<img src='https://yandex.ru/cycounter?" + location.hostname + "' style='position:fixed; right:0; z-index:1000000000000;bottom:0'>";
