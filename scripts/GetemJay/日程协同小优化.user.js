// ==UserScript==
// @name         日程协同小优化
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://lzx.lezhiyun.com/school/app.do?id=d5879e1883e94a0aacb3e5eb7970a1c3&topNavbarTheme=black
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var style = document.createElement('style');
    style.type = 'text/css';
    style.textContent = `
      .fc-day-grid-event .fc-content {
        text-overflow: clip!important;
        white-space: normal!important;
        overflow: auto!important;
      }
      .fc-basic-view .fc-body .fc-row {
        min-height: 140px !important;
        height: auto!important;
      }
    `
    var timer = setInterval(function () {
        var iframe = document.querySelector('#pageContent').contentWindow.document.querySelector('#pageContent')
        // iframe一开始是没有src的。。很坑
        if (iframe && iframe.getAttribute('src')) {
            iframe.onload = function () {
                var head = iframe.contentWindow.document.querySelector('head')
                head.appendChild(style)
                // 直接去我的日程
                var toMyDailyBtn = iframe.contentWindow.document.querySelector('.returnMyDaily')
                toMyDailyBtn.click()
                clearInterval(timer)
                timer = null
            }
        }
    }, 500)
})();