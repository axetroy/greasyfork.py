// ==UserScript==
// @name       Dospy论坛自动签到
// @version    0.0.2
// @namespace    undefined
// @description  自动签到工具
// @include      http://bbs.dospy.com/*
// @license      GPL v3
// ==/UserScript==
var findtext = function (text) {
  let body = document.body || document.getElementsByTagName('body')[0] || document.lastElementChild;
  return body.innerText.match(text);
};
if (!findtext('今日已签到')) {
  var url = './getview.php?type=signadd';
  if (this.Ajax) {
    sajax = Ajax('JSON');
    sajax.post(url + '&inajax=1&rod=' + Math.random(), 'year=0' + "&month=0", showSign);
  } else {
    fetch('./getview.php?type=signadd' + '&inajax=1&rod=' + Math.random(), 'year=0' + "&month=0", {
      method: "POST"
    });
  }
}