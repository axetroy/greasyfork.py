// ==UserScript==
// @name    Контроль музыки везде на Одноклассники OK.RU с клавишами
// @version 1.0
// @description нажимаем Ctrl+Alt+P для воспроизведение/пауза музыки (первый раз надо с мышкой), Ctrl+Alt+,(запятая) для предыдушей песни, Ctrl+Alt+.(точка) следующую песню
// @author  drakulaboy
// @namespace   https://greasyfork.org/en/users/213-drakulaboy
// @include *
// @match   *ok.ru*
// @icon    http://i.imgur.com/wEsWOox.png
// @grant   GM_getValue
// @grant   GM_setValue
// ==/UserScript==
(function (d) {
  d.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.altKey && e.keyCode == 80) // ctrl+alt+p
      GM_setValue('ctrl', '.mus_player-controls_i.__pause.__play,.mus_player-controls_i.__pause');
    if (e.ctrlKey && e.altKey && e.keyCode == 188) // ctrl+alt+,
      GM_setValue('ctrl', '.mus_player-controls_i.__back');
    if (e.ctrlKey && e.altKey && e.keyCode == 190) // ctrl+alt+.
      GM_setValue('ctrl', '.mus_player-controls_i.__forward');
  }, false);
  if (d.domain == 'ok.ru') {
    setInterval(function () {
      ctrl = GM_getValue('ctrl');
      if (ctrl) {
        d.querySelectorAll(ctrl) [0].click();
        GM_setValue('ctrl', '');
      }
    }, 100);
  }
}) (document);