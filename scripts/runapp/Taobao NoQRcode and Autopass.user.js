// ==UserScript==
// @name        Taobao NoQRcode and Autopass
// @namespace   http://runapp
// @include     https://login.taobao.com/*
// @version     1
// @grant       none
// @description 干掉淘宝登录页的扫码功能，以及左侧的广告
// ==/UserScript==
window.getCookie = function (c_name)
{
  if (document.cookie.length > 0)
  {
    c_start = document.cookie.indexOf(c_name + '=')
    if (c_start != - 1)
    {
      c_start = c_start + c_name.length + 1
      c_end = document.cookie.indexOf(';', c_start)
      if (c_end == - 1) c_end = document.cookie.length
      return unescape(document.cookie.substring(c_start, c_end))
    }
  }
  return ''
};
window.setCookie = function (c_name, value, expiredays)
{
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = c_name + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
}
window.taobaoQueue = [
  {
    c: 'login-newbg',
    fn: function (e) {
      e.style.backgroundImage = null;
      return true;
    }
  },
  {
    c: 'login-adlink',
    fn: function (e) {
      e.remove();
      return true;
    }
  },
  {
    i: 'J_QRCodeLogin',
    fn: function (e) {
      e.remove();
      return true;
    }
  },
  {
    i: 'J_Form',
    fn: function (e) {
      epp = document.getElementById('J_StaticForm').parentNode;
      epp.appendChild(e);
      document.getElementsByClassName('ph-label') [0].remove();
      f = document.createElement('input');
      f.type = 'checkbox';
      e.appendChild(f);
      e.appendChild(document.createTextNode('记住密码'));
      if (getCookie('taobaoAutoSave')) {
        console.log('reading from cookie');
        document.getElementById('TPL_username_1').value = getCookie('taobaoAutoUser');
        document.getElementById('TPL_password_1').value = getCookie('taobaoAutoPass');
        f.checked = true;
      } else {
        document.getElementById('TPL_username_1').value = '';
        f.checked = false;
      }
      e.onsubmit = function () {
        if (f.checked) {
          console.log('saving to cookie');
          setCookie('taobaoAutoUser', document.getElementById('TPL_username_1').value, 365);
          setCookie('taobaoAutoPass', document.getElementById('TPL_password_1').value, 365);
          setCookie('taobaoAutoSave', '1', 365);
        } else {
          setCookie('taobaoAutoUser', '', - 1);
          setCookie('taobaoAutoPass', '', - 1);
          setCookie('taobaoAutoSave', '', - 1);
        }
        return true;
      }
      return true;
    }
  },
]
document.body.style.background = '#CCC';
window.taobaoInterval = setInterval(function () {
  var j = window.taobaoQueue;
  for (i = 0; i < j.length; i++) {
    k = j[i].c ?
    document.getElementsByClassName(j[i].c) [0] :
    document.getElementById(j[i].i);
    if (k) {
      if (j[i].fn(k)) {
        j.splice(i, 1);
        i--;
      }
    }
  }
  if (j.length == 0) {
    clearInterval(window.taobaoInterval);
    console.log('done');
  }
}, 200);
