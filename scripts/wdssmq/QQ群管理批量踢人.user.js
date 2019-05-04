// ==UserScript==
// @name        QQ群管理批量踢人
// @namespace   wdssmq
// @description 自动选择20名成员
// @link        https://greasyfork.org/zh-CN/scripts/26812
// @include     http://qun.qq.com/member.html*
// @version     1.4
// @grant       none
// ==/UserScript==
function $n(e) {
  return document.querySelector(e);
}
function $na(e) {
  return document.querySelectorAll(e);
}

function fnRun() {
  if (!$n(".del-member.disabled"))
    return false;
  $n(".del-member.disabled").removeAttribute("disabled");
  $n(".del-member.disabled").className = "del-member";

  var mbList = $na('.mb .check-input');
  for (var x = 0; x < 20; x++) {
    mbList[x].setAttribute('checked', 'checked');
  }
  fnRun();
}
window.addEventListener('scroll', function () {
  fnRun();
});
$n('.select-result .submit').addEventListener('click', function () {
  t = setTimeout(function () {
      fnRun();
    }, 900);
}, false);
