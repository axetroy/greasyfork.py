// ==UserScript==
// @name    enhanceSpotify
// @version 1.1.2
// @description Shows the currently playing song of the Spotify webplayer as notification, and adds hotkeys to control Spotify from any tab
// @author  CennoxX
// @contact cesar.bernard@gmx.de
// @homepage    https://twitter.com/CennoxX
// @namespace   https://greasyfork.org/users/21515
// @include     *
// @grant   GM_getValue
// @grant   GM_setValue
// ==/UserScript==
var notificationTime = 5000;
var oldTitle = '';
var oldSong = '';
document.addEventListener('keydown', function (e) {
  if (e.ctrlKey && e.altKey && e.keyCode == 80) // ctrl+alt+p
  GM_setValue('ctrl', '.spoticon-play-32,.spoticon-pause-32,.spoticon-play-16,.spoticon-pause-16');
  if (e.ctrlKey && e.altKey && e.keyCode == 188) // ctrl+alt+,
  GM_setValue('ctrl', '.spoticon-skip-back-24,.spoticon-skip-back-16');
  if (e.ctrlKey && e.altKey && e.keyCode == 190) // ctrl+alt+.
  GM_setValue('ctrl', '.spoticon-skip-forward-24,.spoticon-skip-forward-16');
}, false);
if (document.domain == 'open.spotify.com') {
  setInterval(function () {
    ctrl = GM_getValue('ctrl');
    if (ctrl) {
      document.querySelectorAll(ctrl) [0].click();
      GM_setValue('ctrl', '');
    }
    if (document.getElementsByClassName('spoticon-pause-16').length) {
      if (document.title != oldTitle) {
        oldTitle = document.title;
        song = document.title.split(' · ') [0];
        artist = document.title.split(' · ') [1];
        setTimeout(function () {
          album = window.getComputedStyle(document.getElementsByClassName('now-playing') [0].getElementsByClassName('cover-art-image') [0]).backgroundImage.slice(4, - 1).replace(/"/g, '');
        }, 1000);
        setTimeout(function () {
          var options = {
            body: artist,
            icon: album
          };
          if (!('Notification' in window)) {
            alert('This browser does not support desktop notification');
          }
          else if (Notification.permission === 'granted') {
            if (song != oldSong) {
              oldSong = song;
              var notification = new Notification(song, options);
              setTimeout(notification.close.bind(notification), notificationTime);
            }
          }
          else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
              if (permission === 'granted') {
                if (song != oldSong) {
                  oldSong = song;
                  var notification = new Notification(song, options);
              setTimeout(notification.close.bind(notification), notificationTime);
                }
              }
            });
          }
        }, 1000);
      }
    }
  }, 100);
}