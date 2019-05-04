// ==UserScript==
// @name           发现到酷安
// @version        1.1
// @namespace      
// @author         cnyuensui
// @description    为各大应用市场添加发现到酷安按钮。支持Google Play、豌豆荚、应用宝、百度应用、360手机助手、小米应用商店、网易应用中心、当乐网、手机乐园、应用汇。 基于@tastypear的“酷安网一键发现”修改的！
// @grant none
// @include        *www.wandoujia.com/apps/*
// @include        *play.google.com/store/apps/details?id=*
// @include        *shouji.baidu.com/*/*.html
// @include        *zhushou.360.cn/detail/index/*
// @include        *shouji.com.cn/*/*.html
// @include        *android.myapp.com/myapp/detail.htm*
// @include        *.d.cn/*
// @include        *appchina.com/app/*
// @include        *m.163.com/android/software/*.html
// @include        *app.mi.com/details?id=*
// @include        http://www.coolapk.com/faxian/create
// @run-at         document-end
// ==/UserScript==
var shareStr = '发现到酷安';
var cashareUrl = 'http://www.coolapk.com/faxian/create#';
var url = window.location.toString();
var share = document.createElement('a');
share.setAttribute('href', cashareUrl + url);
share.setAttribute('id', 'CASHARE');
share.setAttribute('target', '_blank');
share.innerHTML = shareStr;
var CASHARE;
function insertAfter(newEl, targetEl)
{
  var parentEl = targetEl.parentNode;
  if (parentEl.lastChild == targetEl) {
    parentEl.appendChild(newEl);
  } else {
    parentEl.insertBefore(newEl, targetEl.nextSibling);
  }
}
function setInnerHtml() {
  if (url.indexOf('wandoujia.com') >= 0) {
    var item = document.getElementsByClassName('install-btn') [0];
	var div = document.createElement('div');
	share.setAttribute('style', 'color:#FFF');
    div.setAttribute('class', 'install-btn');
    div.appendChild(share);
    insertAfter(div, item);
  } else if (url.indexOf('play.google.com') >= 0) {
    url = window.location.toString();
    share.setAttribute('href', cashareUrl + url);
    var install = document.getElementsByClassName('apps large play-button buy-button-container is_not_aquired_or_preordered') [0];
    var spn = document.createElement('span');
    spn.setAttribute('class', 'apps large play-button buy-button-container is_not_aquired_or_preordered');
    var inner = document.createElement('span');
    share.setAttribute('style', 'color:#FFF');
    spn.appendChild(inner);
    inner.appendChild(share)
    insertAfter(spn, install);
  } else if (url.indexOf('shouji.baidu.com') >= 0) {
    var apk = document.getElementsByClassName('apk') [0];
    share.setAttribute('class', 'apk');
    share.setAttribute('style', 'color:#FFF');
    insertAfter(share, apk);
  } else if (url.indexOf('zhushou.360.cn') >= 0) {
    var item = document.getElementsByClassName('item-1') [2];
    var li = document.createElement('li');
    share.setAttribute('style', 'color:#F00');
    li.setAttribute('class', 'scmt-result');
    li.appendChild(share);
    insertAfter(li, item);
  } else if (url.indexOf('myapp.com') >= 0) {
    var btn = document.getElementsByClassName('det-name') [0];
    var div = document.createElement('div');
    div.setAttribute('class', 'T_ComEventAppIns com-install-btn');
    share.setAttribute('style', 'color:#F60');
    div.appendChild(share)
    insertAfter(div, btn);
  } else if (url.indexOf('m.163.com') >= 0) {
    var btn = document.getElementsByClassName('f-h1') [0];
    var div = document.createElement('div');
    div.setAttribute('class', 'button-cmn button-s1');
    share.setAttribute('style', 'color:#F00:font-family: 宋体; font-size: 12px;');
    div.appendChild(share)
    insertAfter(div, btn);
  }
    else if (url.indexOf('appchina.com') >= 0) {
    var item = document.getElementsByClassName('download-button') [0];
    var div = document.createElement('div');
    div.setAttribute('class', 'report-button');
    share.setAttribute('style', 'color:#FFF;font-family:\'宋体\'');
    div.appendChild(share)
    insertAfter(div, item);
  }else if (url.indexOf('app.mi.com') >= 0) {
    var btn = document.getElementsByClassName('download') [0];
    var div = document.createElement('div');
    div.setAttribute('class', 'download');
    share.setAttribute('style', 'color:#F0F0F0;font-family:\'新宋体\'');
    div.appendChild(share)
    insertAfter(div, btn);
  }
    else if (url.indexOf('android.d.cn') >= 0) {
    var item = document.getElementsByClassName('de-head-btn de-mob-btn') [0];
    var li = document.createElement('li');
    li.setAttribute('class', 'de-head-btn de-pc-btn');
    share.setAttribute('style', 'color:#FFF;font-family:\'宋体\'');
    li.appendChild(share);
    insertAfter(li, item);
  } else if (url.indexOf('shouji.com.cn') >= 0) {
    var item = document.getElementsByClassName('dlshow') [0];
    item.appendChild(share);    
  } else {
  }
}
function insertRun() {
  setInterval(function () {
    try {
      CASHARE = document.getElementById('CASHARE');
    } catch (e) {
      CASHARE = null;
    }
    if (CASHARE == null) {
      setInnerHtml();
    }
  }, 1000);
}
if (url.indexOf('coolapk.com') >= 0) {
  var target = url.substring(url.indexOf('#')+1, url.lenth);
  var input = document.getElementById('discoveryQueryInput').value=target;
  var btn = document.getElementsByClassName('btn btn-success') [0];
  btn.click();
} else {
  insertRun();
}
