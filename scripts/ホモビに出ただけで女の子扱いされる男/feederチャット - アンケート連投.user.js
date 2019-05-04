// ==UserScript==
// @name         feederチャット - アンケート連投
// @author       NKTIDKSG
// @version      0.1
// @description  アンケート連投する。Chromeでは動作しないらしい。FireFoxで試そう。
// @match        *.x-feeder.info/*/
// @exclude      *.x-feeder.info/*/*/*
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.js
// @namespace https://greasyfork.org/users/203557
// ==/UserScript==
(() => {
  'use strict'
  const Q_id = 1 // アンケートの番号
  const A_id = 1 // 答えの番号
  const answer2 = (question_id, answer_id, callback_func) => {
    $.ajax({
      url: '/' + profileId + '/post_question.php',
      type: 'POST',
      dataType: 'text',
      data: {
        'q_id': question_id,
        'a_id': answer_id
      },
      success: function (result) {
        callback_func()
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        callback_func()
      }
    });
  }
  window.alert = window.console
  answer2(Q_id, A_id, () => {
    $.removeCookie('sid')
    $.removeCookie('name')
    location.reload()
  })
})();