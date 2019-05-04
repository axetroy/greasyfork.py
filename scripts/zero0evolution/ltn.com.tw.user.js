// ==UserScript==
// @name ltn.com.tw
// @namespace ltn.com.tw
// @include /^https?\:\/\/(?:[\w]+\.)?ltn\.com\.tw\//
// @grant none
// @description 刪掉總是在移動的文字
// @version 0.0.1.20171117131601
// ==/UserScript==

window.onload = function(){
  $("html>body>.boxTitle[data-desc='置頂選單']").each(
    function(index,elem){
      elem.remove()
    }
  )
  $("div#main div.marquee-bottom.marquee-bottom-head.boxTitle.boxText").each(
    function(index,elem){
      elem.remove()
    }
  )
}