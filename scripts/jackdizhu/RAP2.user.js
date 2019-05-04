// RAP2
// ==UserScript==
// @name         RAP2
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  RAP2 ext
// @author       jackdizhu
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  console.log('RAP2 ext init');
  function logInfo() {
    // 打印 RAP2 Mock 数据
    let objArr = [
      [],
      []
    ]
    let arr1 = document.querySelectorAll('.PropertyList')
    for (let i = 0; i < arr1.length; i++) {
      const ele = arr1[i]

      let delArr = []
      let arr = ele.querySelectorAll('.SortableTreeTableRow .flex-row')
      if (arr) {
        for (let i = 0; i < arr.length; i++) {
          const ele = arr[i]
          let arr2 = ele.querySelectorAll('.td')
          for (let j = 0; j < arr2.length; j++) {
            const ele = arr2[j]

            delArr[i] = delArr[i] || {}
            if (j === 0) {
              delArr[i].key = ele.textContent
            } else if (j === arr2.length - 1) {
              delArr[i].text = ele.textContent
            }
          }
        }
      }
      objArr[i] = delArr
    }
    console.log(JSON.stringify(objArr));
  }

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
      top: 0;
      width: 540px;
      height: 42px;
      z-index: 9999;
      background: rgba(0,0,0,0.35);`;
    Div.onclick = function (event) {
      let _this = event.target;
      // console.dir(_this, 11);
      if (_this === Div) {
        _this.parentNode.removeChild(_this);
      }
    }
    iframeD.body.appendChild(Div);
    setTimeout(() => {
      let Ele = document.querySelector('#addedMask');
      Ele.innerHTML = `
      <form action="/account/login" method="post" style="display: inline;white-space: nowrap;">
        <input type="text" name="email" value="">
        <input type="text" name="password" value="">
        <input type="text" name="captcha" value="">
      </form>
      `;
      }, 100)
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
      logInfo()
    }
  });
})();