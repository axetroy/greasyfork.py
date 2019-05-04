// ==UserScript==
// @name        Уведомление кто поёт на однокласснки
// @namespace   OK Music Notifications for ok.ru
// @description Уведомление кто поёт на однокласснки.
// @author      drakulaboy
// @version     2.0
// @include     *ok.ru*
// @grant       none
// @require     http://code.jquery.com/jquery-2.1.1.min.js
// @icon        http://i.imgur.com/wEsWOox.png
// ==/UserScript==

var title = '';
var artist = '';
var art = '';

var interval = setInterval(function () {
  if (!('Notification' in window)) {
    alert('этот браузер не поддерживает уведомлений');
    clearInterval(interval);
  }
  else if (title != $('.mus_player_artist').text() && artist != $('.mus_player_song').text() && art != $('.mus_player_cover-img').attr('src')) {
	title = $('.mus_player_song').text();
    artist = $('.mus_player_artist').text();
	art = $('.mus_player_cover-img').attr('src');
    notifyMe();
  }
}, 1000);

function notifyMe() {
  var details = {
    body: artist + '\n' + title,
	icon: art
  };
  if (Notification.permission === 'granted') {
    var notification = new Notification('Сейчас играет', details);
    notification.onclick = function(x) { window.focus(); this.cancel(); };
  }
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (permission === 'granted') {
        var notification = new Notification('Сейчас играет', details);
      }
    });
  }
}