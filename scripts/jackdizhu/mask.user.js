// 遮罩插件
// ==UserScript==
// @name         mask
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  mask ext
// @author       jackdizhu
// @match        *:///*
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  console.log('mask ext init');
  function addMask() {
    let iframeD = document;
    if (iframeD.querySelector('#addedMask')) {
      return false;
    }
    let Div = iframeD.createElement('div');
    Div.id = "addedMask";
    Div.style = `
          position: fixed;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          z-index: 9999;
          background: rgba(0,0,0,0.35);
          `;
    Div.onclick = function (event) {
      let _this = event.target;
      // console.dir(_this, 11);
      if (_this === Div) {
        _this.parentNode.removeChild(_this);
      }
    }
    iframeD.body.appendChild(Div);
    // console.dir(iframeD);
  }
  let time = 0
  document.body.addEventListener('mousedown', function (event) {
    time = new Date().getTime();
  });
  document.body.addEventListener('mouseup', function (event) {
    let time1 = new Date().getTime();
    console.log(time1 - time, '--')
    if (time1 - time > 500 && time1 - time < 1500) {
      addMask()
    }
  });
})();