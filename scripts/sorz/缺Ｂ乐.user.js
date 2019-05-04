// ==UserScript==
// @name        缺Ｂ乐
// @description 将 AcFun 站名替换为更为合适的 缺Ｂ乐。
// @namespace   org.sorz.lab.queble
// @include     http://www.acfun.tv/*
// @version     1
// @grant       none
// ==/UserScript==

String.prototype.correct = function () {
  return this.toString()
           .replace(/AcFun/gi, '缺Ｂ乐')
           .replace(/\bAC\b/g, '缺Ｂ');
}

function correctText() {
   var $this = $(this);
    $this.text($this.text().correct());
}

$(document).ready(function () {
  document.title = document.title.correct();
  $('.title').each(correctText);
  $('a.tag').each(correctText);
  $('h1').each(correctText);
  $('h2').each(correctText);
  $('#footer-inner').find('a').each(correctText);
  $('.bottom-footer').find('p').each(correctText);
});