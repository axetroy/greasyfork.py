// ==UserScript==
// @name           Point.im UnreadAutoClicker
// @description    Кликалка непрочитанных постов для пользователей Psi+
// @icon           http://point.im/img/logo.png
// @include        http*://*.point.im/recent*
// @grant          none
// @version 0.0.1.20141212214947
// @namespace https://greasyfork.org/users/7568
// ==/UserScript==

var limit = 10;
if (document.getElementsByClassName("unread")[0].innerHTML > limit) {document.getElementById('older').click();}