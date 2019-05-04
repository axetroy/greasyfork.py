// ==UserScript==
// @name        bongacams unlooker
// @namespace   *webcamsluts.ru*
// @match        https://rt.webcamsluts.ru/*
// @match     	 https://rt.bongacams2.com/*
// @match        https://ru.bongacams.com/*
// @match        http://rt.webcamsluts.ru/*
// @match     	 http://rt.bongacams2.com/*
// @match        http://ru.bongacams.com/*
// @description  Убирием попапы и ограничение по времени просмотра.
// @author       WayOnG
// @version     1.0
// @grant       none
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==



var timerId = setTimeout(function tick() {
$('.fancybox-desktop').remove();
  $('.fancybox-overlay-fixed').remove();
  timerId = setTimeout(tick, 200);
  localStorage.setItem('ls.tft', 0);
;
}, 200);

