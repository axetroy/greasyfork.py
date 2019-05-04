// ==UserScript==
// @name        HWM_Def_Pre_Notifications
// @namespace   Рианти
// @version     1.1
// @description Уведомления о начинающемся вскоре наборе в защиты (уведомляет когда вкладка битв становится оранжевой)
// @author      Рианти (fix by CheckT)
// @homepage    https://greasyfork.org/en/scripts/377640-hwm-def-pre-notifications
// @include       https://www.heroeswm.ru/*
// @include       https://www.lordswm.com/*
// @include       http://178.248.235.15/*
// @exclude       /^https{0,1}:\/\/(www\.(heroeswm\.ru|lordswm\.com)|178\.248\.235\.15)\/(login|war|cgame|frames|chat|chatonline|ch_box|chat_line|ticker|chatpost)\.php*/
// @exclude       https://www.heroeswm.ru/radio_files/*
// @exclude       https://www.heroeswm.ru/ticker.html*
// @exclude       https://www.lordswm.com/radio_files/*
// @exclude       https://www.lordswm.com/ticker.html*
// @exclude       http://178.248.235.15/radio_files/*
// @exclude       http://178.248.235.15/ticker.html*
// @exclude       */rightcol.php*
// @exclude       */ch_box.php*
// @exclude       */chat*
// @exclude       */ticker.html*
// @exclude       */frames*
// @exclude       */brd.php*
// @exclude       */war.php*
// @exclude       */cgame.php*
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// ==/UserScript==

// fix by CheckT
// old homepage       https://greasyfork.org/en/scripts/24881-hwm-def-pre-notifications

(function(){
  var sound = 'https://notificationsounds.com/wake-up-tones/breaking-some-glass-268/download/mp3';

  if(Notification.permission !== 'denied' && Notification.permission !== "granted"){
    Notification.requestPermission(function (permission) {
      if (permission === "granted") {
        var notification = new Notification("Теперь вы будете получать уведомления о предствоящих защитах.");
      } else {
        alert ('Без разрешения на уведомления вам будет доступно только уведомление звуковым сигналом.');
      }
    });
  }

  var lastCheckResult, lastNotifyTime, now, isActive, lastCheckTime;

  check(document);

  function check(dom){
    lastCheckResult = parseInt(GM_getValue('lastCheckResult', '1'));
    lastNotifyTime = parseInt(GM_getValue('lastNotifyTime', '0'));
    now = Date.now();
    isActive = dom.querySelector('body').innerHTML.indexOf('<font color="#ff9c00">Битвы</font>') > -1;

    if(isActive && !lastCheckResult && (now > 60 * 1000 + lastNotifyTime))
      notify();

    GM_setValue('lastCheckTime', now);
    GM_setValue('lastCheckResult', isActive ? 1 : 0);
    setTimeout(intervalCheck, 60 * 1000);
  }

  function intervalCheck(){
    now = Date.now();
    lastCheckTime = parseInt(GM_getValue('lastCheckTime', '0'));
    console.log(60 * 1000 + lastCheckTime - now);
    if (now >= 60 * 1000 + lastCheckTime){
      GM_setValue('lastCheckTime', now);
      requestPage(location.protocol + '//' + location.hostname + '/home.php', check);
    } else {
      setTimeout(intervalCheck, 60 * 1000 + lastCheckTime - now + Math.random() * 500); // Случайная прибавка позволяет избежать риска загрузки на лишних вкладках.
    }
  }

  function notify(){
    GM_setValue('lastNotifyTime', now);
    new Audio(sound).play();

    if (Notification.permission === "granted") {
      var notification = new Notification("Силы тьмы на подходе!");
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        if (permission === "granted") {
          var notification = new Notification("Силы тьмы на подходе!");
        }
      });
    }
  }

  function requestPage (url, onloadHandler){
    console.log('[HWM_Def_Pre_Notifications] loading: ', url);
    GM_xmlhttpRequest({
      overrideMimeType: 'text/plain; charset=windows-1251',
      synchronous: false,
      url: url,
      method: "GET",
      onload: function(response){
        onloadHandler(new DOMParser().parseFromString(response.responseText, 'text/html').documentElement);
      },
      onerror: function(){ requestPage (url, onloadHandler) },
      ontimeout: function(){ requestPage (url, onloadHandler) },
      timeout: 5000
    });
  }
})();