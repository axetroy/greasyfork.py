// ==UserScript==
// @name            屏蔽虎穴甜瓜上的无良抱枕社团
// @namespace       http://weibo.com/myimagination
// @author          @MyImagination
// @version			0.89
// @description     屏蔽那些在虎穴甜瓜上乱刷商品的无良抱枕社团
// @include         http://www.toranoana.jp/cgi-bin/R2/d_search.cgi*
// @include         https://www.melonbooks.co.jp/search/search.php*
// @include         http://www.toranoana.jp/mailorder/cot/genre/*
// @run-at          document-end
// @grant           none
// ==/UserScript==
(function () {
    var ToranoanaMelonbooks;
  if (window.location.href.indexOf('toranoana') > 0) {
    ToranoanaMelonbooks = 'p.info a:nth-child(2)'; //toranoana
  } else {
    ToranoanaMelonbooks = 'p.circle a:nth-child(2)'; //melonbooks
  }
  $(ToranoanaMelonbooks).each(function () {
    if ($(this).text() == 'Moe' || $(this).text() == 'eb' || $(this).text() == '雨の日アリス' || $(this).text() == '絶対萌域' || $(this).text() == '麦芽堂' || $(this).text() == 'Utdream') {
      $(this).closest('li').remove(); //toranoana
      $(this).closest('div.product.clearfix').remove(); //melonbooks
    }
  });
}) ();
