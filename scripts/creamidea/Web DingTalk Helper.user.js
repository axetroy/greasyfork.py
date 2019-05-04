// ==UserScript==
// @name         Web DingTalk Helper
// @namespace    http://creamidea.github.io/
// @version      0.0.2
// @license      MIT License (Expat)
// @description  make web dingtalk fullscreen
// @author       creamidea
// @email        creamidea@gmail.com
// @match        https://im.dingtalk.com/*
// @grant        none
// ==/UserScript==

(function () {
  var timer

  function resize() {
    $('#layout-main').css({
      'position': 'absolute',
      'top': 0,
      'left': 0,
      'marginLeft': 0,
      'marginTop': 0,
      'width': '100%',
      'height': '100%'
    }).find('#body').css('height', $('#layout-main').height() - $('#layout-main #header').height() - 1)
  }

  $(window).on('resize', resize)

  timer = setInterval(function () {
    if ($('#layout-main').length === 1) {
      resize()
      clearInterval(timer)
    }
  }, 1000)

})()
