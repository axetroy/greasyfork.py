// ==UserScript==
// @name           Tabun SelfLink
// @description    Прямая ссылка на свои топики + подкрашивание комментов
// @include        http*://tabun.everypony.ru/*
// @grant          none
// @version 0.0.1.20150523131532
// @namespace https://greasyfork.org/users/7568
// ==/UserScript==

var nav = document.getElementById('dropdown-user'), // в документе - блок профиля
    link = nav.getElementsByTagName('a')[0], // в нём - ссылка аватарки
    name = link.href.match(/profile\/(.*)\//)[1], // в ней - имя1
    mess = document.createElement('a'), // новая ссылка топиков
    text = document.createTextNode('Мои топики'), // текст будущей ссылки
    auth = document.getElementsByClassName('comment-author'), // в документе - авторы комментов
    green = "background-color: #FFFFEE;"; // жёлтый стиль
mess.href = link.href + 'created/topics/'; // конструирование URL топиков
mess.setAttribute('class', 'username'); // копирование синего стиля
mess.appendChild(text); // присоединение текста
nav.insertBefore(mess, link.nextSibling); // вставка топиков после аватарки
for (i in auth) { // обыск комментаторов
  var name2 = auth[i].getElementsByTagName('a')[0].href.match(/profile\/(.*)\//)[1]; // имя комментатора
  if (name == name2) { // если комментатор = профиль
    var divauth = auth[i].parentNode.parentNode; // див коммента
    divauth.style = divauth.getElementsByClassName('comment-content')[0].style = green; // залить стилем
  }
}