// ==UserScript==
// @name        ZBLOG订单搜索
// @description 供开发者搜索订单，附带隐藏未付订单；
// @link        https://greasyfork.org/zh-CN/scripts/25662
// @namespace   wdssmq.com
// @author      沉冰浮水
// @include     https://app.zblogcn.com/zb_users/plugin/AppBuy/shop/main.php*
// @include     https://app.zblogcn.com/?id=*
// @version     1.8
// @grant       none
// ==/UserScript==
var TheHtml,
    intVdg = 0,
    rmbFgu = 0;
$(function () {
  $('.SubMenu').append('<input id="search" style="float:left;margin-right: 2px;margin-top: 2px" type="text" value=""><a href="javascript:;" id="js-search"><span class="m-left">搜索</span></a>');
  $('#js-search').click(function () {
    // alert($("#search").val());
    fnRun($('#search').val());
  });
  fnHide('');
});
function fnHide(t) {
  $('tr').each(function () {
    TheHtml = $(this).html();
    if(/待付款/.test(TheHtml))
      $(this).remove();
    if(t === 'all')
      $(this).remove();
  });
}
function fnRun(q) {
  intVdg = 0;
  rmbFgu = 0;
  var RegPat = new RegExp(q + '.+已付款', '');
  // var RegPat = new RegExp(q, "");
  fnHide('all');
  fnAjax(1, RegPat);
}
function fnAjax(page, pat) {
  $.ajax({
    url: 'https://app.zblogcn.com/zb_users/plugin/AppBuy/main.php?page=' + page,
    type: 'get',
    success: function (data) {
      // if (/已付款/.test(data) && page < 3) {
      if (/已付款/.test(data)) {
        $(data).find('#divMain2 table tr').each(function () {
          TheHtml = $(this).html().replace(/[\n\s]+/g, ' ');
          if (pat.test(TheHtml) === true) {
            var match = TheHtml.match(/<td>([^<]+)<\/td> <td>已付款<\/td>/);
            oDate = new Date(Date.parse(match[1]));
            if (nDate === null)
              nDate = oDate;
            intVdg++;
            var Match = TheHtml.match(/\(([\d\.]+)\)/);
            rmbFgu += parseFloat(Match[1]) * 100;
            $('table:not(#tbStatistic) tbody').append('<tr>' + TheHtml + '</tr>\n');
          }
        });
        page++;
        fnAjax(page, pat);
      } else {
        var numDays = diff(nDate, oDate);
        var averDay = (rmbFgu / numDays / 100).toFixed(2);
        var averMon = (rmbFgu / (numDays / 30) / 100).toFixed(2);
        $('table:not(#tbStatistic) tbody').prepend('<tr><td colspan ="3"></td><td>' + intVdg + '</td><td>' + rmbFgu / 100 + '</td><td>' + averDay + '/天 | ' + averMon + '/30天</td><td>天数：' + numDays + '</td><td></td><td></td><td></td><td></td></tr>');
      } // fnHide("");

    }
  });
}

var nDate = null;
var oDate;
function diff(now, old) {
  return parseInt((now - old) / (1000 * 60 * 60 * 24));
}
//前台编辑链接
$(function () {
  if ($(".appinfo_table").text() === "")
    return false;
  if ($(".appinfo_table").text().indexOf($("#logincp p:nth-child(2)").text()) == -1)
    return false;
  var edtLink = "https://app.zblogcn.com/zb_system/admin/edit.php" + location.search + "&act=ArticleEdt";
  var domLink = $('<a title="编辑" target="_blank" href="' + edtLink + '">编辑</a>');
  domLink.css({
    color: "darkgray",
    "font-size": "14px",
    "padding-left": "0.5em"
  }).hover(function () {
    $(this).css({
      color: "#d60000"
    });
  }, function () {
    $(this).css({
      color: "darkgray"
    });
  });
  if ($(".appinfo_table h2 b").text().indexOf("(免费)") > -1)
    $(".appinfo_table h2 b").hide();
  $(".appinfo_table h2 b").before(domLink);
});
