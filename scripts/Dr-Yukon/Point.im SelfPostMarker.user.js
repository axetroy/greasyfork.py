// ==UserScript==
// @name           Point.im SelfPostMarker
// @description    Подкраска своих постов
// @icon           http://point.im/img/logo.png
// @include        http*://*.point.im/*
// @grant          none
// @version 0.0.1.20141212215102
// @namespace https://greasyfork.org/users/7568
// ==/UserScript==

var me = document.getElementById("menu-profile").href.replace(/.*\/\/(.+)\.point\.im.*/i,"$1"), // твоё имя из профиля
    divs = document.getElementById("comments").getElementsByClassName("post"); // массив комментариев
for (var i=0; i<divs.length; i++) { // обыск комментариев
 var comm = divs[i].getElementsByTagName("a")[0].href.replace(/.*\/\/(.+)\.point\.im.*/i,"$1"); // получаем имя комментатора
 if (comm == me) { // если комментатор - ты...
  divs[i].style = "background-color: #EEEEEE; border-radius:10px;"; //...залить коммент серым и скруглить
 }
}