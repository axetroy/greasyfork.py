// ==UserScript==
// @name        TNM image search helper
// @namespace   http://webarchives.tnm.jp/
// @version     1.0.0.0
// @description 東京国立博物館の画像検索のタイトル置き換え＆オートページング/ expand titles & auto paging on TokyoNationalMuseum image search
// @include     http://webarchives.tnm.jp/imgsearch/*
// @exclude     
// ==/UserScript==

(function(){
function rename(result) {
  if(!result) return;
  var container = result.getElementsByClassName('container');
  for(var i = 0; i < container.length; i++) {
    var thumb = container[i].getElementsByClassName('thumb');
    var title = container[i].getElementsByClassName('title');
    if(thumb.length > 0 && title.length > 0) {
      title[0].textContent = thumb[0].title.replace(/＿/g, ' ');
    }
  }
}

function init() {
  var style = document.createElement('style');
  style.type = 'text/css';
  document.head.appendChild(style);
  style.sheet.insertRule('.container{margin-right: 20px; margin-top: 5px; width: 160px}', 0);
  style.sheet.insertRule('.number{text-align: left !important;}', 0);
  style.sheet.insertRule('#footer{margin-bottom: 160px !important;}', 0);

  rename(document.getElementById('search_result'));
}

function autopager() {
  if(document.body.scrollHeight <= window.innerHeight + window.scrollY) {
    function returnFalse() {
      return autopager.loading = false;
    }
    if(autopager.loading) return;
    autopager.loading = true;


    var next = pager.lastElementChild;
    if(!next || next.textContent != '>>Next') returnFalse();

    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var result = xhr.responseXML.getElementById('search_result');
      if(result) {
        rename(result);

        var pager = document.getElementById('pager');
        if(!pager) returnFalse();
        var result_summary = xhr.responseXML.getElementById('result_summary');
        if(result_summary) document.body.insertBefore(result_summary, pager);
        document.body.insertBefore(result, pager);

        var nextpager = xhr.responseXML.getElementById('pager');
        if(nextpager) document.body.insertBefore(nextpager, pager);
        document.body.removeChild(pager);
      }
      returnFalse();
    };
    xhr.open("get", next.href, true);
    xhr.responseType = 'document';
    xhr.send(null);
  }
}

autopager.loading = false;
window.addEventListener('scroll', autopager, false);
setTimeout(init(), 1000);
})();
