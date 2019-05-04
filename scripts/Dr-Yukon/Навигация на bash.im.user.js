// ==UserScript==
// @name        Навигация на bash.im
// @description Стрелки вперёд-назад у номера цитаты
// @include     http://bash.im/quote/*
// @icon        http://bash.im/favicon.ico
// @grant       none
// @version 0.0.1.20160330050710
// @namespace https://greasyfork.org/users/7568
// ==/UserScript==

var link = document.getElementsByClassName('id')[0]; // ссылка на текущий номер
    number = link.href.match(/[^\/]+$/), // выдрать из неё номер
    numberback = parseInt(number) - 1, // предыдущий
    numbernext = numberback + 2, // следующий
    linkback = document.createElement('a'), // заготовка новых ссылок
    linknext = document.createElement('a'),
    textback = document.createTextNode('[<<]'), // и текстов
    textnext = document.createTextNode('[>>]');
linkback.href = '/quote/'+numberback; // одевание на новые ссылки путей с номерами
linknext.href = '/quote/'+numbernext;
linkback.className = linknext.className = 'id'; // присвоение класса
linkback.style = link.style = linknext.style = 'margin: -3px; position: relative;'; // группирование всех трёх элементов
linkback.appendChild(textback); // вставка текстов
linknext.appendChild(textnext);
link.parentNode.insertBefore(linkback,link); // вставка новых ссылок
link.parentNode.appendChild(linknext);
