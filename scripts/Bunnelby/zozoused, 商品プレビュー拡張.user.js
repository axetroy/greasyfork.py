// ==UserScript==
// @name        zozoused, 商品プレビュー拡張
// @description zozoused商品プレビューポップアップに各種情報を追加、お気に入りを可能に
// @namespace   http://foroneself.tumblr.com/
// @include     http://zozo.jp/shop/zozoused/image.html?*
// @include     http://zozo.jp/shop/zozoused/goods*/*/#bookmark
// @version     1.0.0
// @grant       none
// ==/UserScript==
(function () {
  var window = typeof unsafeWindow == 'undefined' ? window : unsafeWindow,
  document = window.document;
  var $ = window.jQuery;
  if (window.location.hash == '#bookmark') {
    $(function () {
      $('.bkmk input').trigger('click');
    });
    return;
  }
  var bookmarkStyle = 'background: url(/shop/img/heart_arrow.png) no-repeat -44px -32px;width: 44px;height: 44px;border: 0px !important;display: block;cursor: pointer;';
  var gid = window.location.search.match(/gid=(\d+)/) [1];
  var url = 'http://zozo.jp/shop/zozoused/goods/' + gid + '/';
  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'html',
    async: true,
    cache: false,
    success: function (res) {
      window.console.log(res);
      $('#thumbList h1 span').wrap($('<a />').attr('href', url));
      $('#tblItemSize', res).appendTo('#itemDetail');
      var cont = $('#goods .detailBlock .contbox', res).first();
      cont.text(cont.text().trim()).appendTo('#itemDetail');
      $('#goods .detailBlock .contbox dl', res).appendTo('#itemDetail');
      $('<input type="button" />').attr('style', bookmarkStyle).on('click', function () {
        $(this).off('click');
        $('<iframe />').attr('src', url + '#bookmark').attr('width', 0).attr('height', 0).appendTo('body');
      }).appendTo('h1');
    },
    beforeSend: function (xhr) {
      xhr.overrideMimeType('text/html;charset=SJIS');
    }
  });
}) ();
