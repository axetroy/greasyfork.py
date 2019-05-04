// ==UserScript==
// @name        share.dmhy.org Search to rss
// @namespace   rss.dmhy.org.Search
// @description 將動漫花園資源網的搜尋轉為rss訂閱網址
// @include     http*://share.dmhy.org/topics/list?keyword=*
// @version     1.3
// @grant       none
// ==/UserScript==

document.getElementsByClassName("quick_search")[0].innerHTML = "<input id=\"rssbt\" class=\"formButton\" value=\"複製RSS\" type=\"button\">" + document.getElementsByClassName("quick_search")[0].innerHTML;

document.getElementById("rssbt").addEventListener('click', function(event) {

  var copyTextarea = document.querySelector('.quick_input');
  var st = encodeURIComponent(copyTextarea.value).replace(/\+/g,'%2B');
  
  copyTextarea.value = "https://share.dmhy.org/topics/rss/rss.xml?keyword=" + st;
  copyTextarea.select();

  try {
    var successful = document.execCommand("copy");  
    var msg = successful ? "successful" : "unsuccessful"; 
    document.getElementById("rssbt").value = "已複製";
  } catch(err) { 
    document.getElementById("rssbt").value = "複製失敗";
  }  
  
  copyTextarea.value = decodeURIComponent(st);

  window.getSelection().removeAllRanges();
  
});
