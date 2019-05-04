// ==UserScript==
// @name           Point.im UnreadCommentMarker
// @description    Подкраска постов с непрочитанными комментами
// @icon           http://point.im/img/logo.png
// @include        http*://*.point.im/comments*
// @grant          none
// @version 0.0.1.20141212214848
// @namespace https://greasyfork.org/users/7568
// ==/UserScript==

var divs = document.getElementsByClassName("post"); // массив постов
for (var i=0; i<divs.length; i++) { // обыск постов
 var spans = divs[i].getElementsByClassName("unread"); // поиск метки непрочитанных комментов
 if (spans.length > 0) { // если в посте есть непрочитанные комменты...
  divs[i].style = "background-color: #EEFFEE; border-radius:10px;"; //...залить пост зеленоватым и скруглить
 }
}