// ==UserScript==
// @name        Hack wows 2bomb
// @namespace   http://runapp
// @include     http://wows.kongzhong.com/ztm/314cgj/content2.html
// @version     1
// @grant       none
// @description 空中网战舰世界活动领任务辅助，每次活动更新
// ==/UserScript==
(function () {
  var a = document.getElementsByClassName('main_con') [0];
  
  var b = document.createElement('button');
  b.innerHTML = 'Next';
  b.style = 'position: absolute;padding: 20px;left: 10%;top: 80%;z-index: 1000;';
  b.value = - 1;
  b.onclick = function (e) {
    var i = parseInt(e.target.value);
    i = i < 5 ? i + 1 : 0;
    for (j = 0; j < 6; j++) {
      a.children[j].style.display = j == i ? 'block' : 'none';
    }
    e.target.value = i;
  }
  document.body.appendChild(b);
  
  b = document.createElement('button');
  b.innerHTML = 'Go';
  b.style = 'position: absolute;padding: 20px;left: 10%;top: 85%;z-index: 1000;';
  b.onclick = function (e) {
    sign();
    gettask2();
    gettask3();
    gettask4();
    gettask5_1();
    gettask5_2();
    gettask5_3();
    gettask6();
  }
  document.body.appendChild(b);
}) ();
