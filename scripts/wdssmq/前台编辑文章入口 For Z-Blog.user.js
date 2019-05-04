// ==UserScript==
// @name        前台编辑文章入口 For Z-Blog
// @description 置百丈玄冰而崩裂，掷须臾池水而漂摇。
// @namespace   wdssmq
// @include     http://*/post/*.html
// @include     https://*/post/*.html
// @version     20180921
// @grant       none
// ==/UserScript==
(function () {
  if (!window.jQuery) {
    return false;
  }
  var $ = window.jQuery;
  $(function () {
    $('.js-edt').each(function () {
      var id = $(this).data('id');
      $(this).html('[<a href="'+window.bloghost+'zb_system/cmd.php?act=ArticleEdt&id=' + $(this).data('id') + '">编辑</a>]');
    });
    if ($('#edtDateTime').length === 1) {
      $('#edtDateTime').datetimepicker('setDate', (new Date()));
    }
  });
})()
