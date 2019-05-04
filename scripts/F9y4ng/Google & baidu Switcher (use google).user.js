// ==UserScript==
// @name      Google & baidu Switcher (use google)
// @namespace  https://openuserjs.org/scripts/t3xtf0rm4tgmail.com/Google_baidu_Switcher_(use_google)
// @author    F9y4ng
// @version    1.2.8.4
// @description  在google的搜索结果页面增加baidu搜索跳转按钮，使用到外链微软CDN的jquery-1.7.2.min.js，不懂跳墙使用GOOGLE的同学请自动忽略。
// @include         /^https?\:\/\/[a-zA-Z0-9]*.google.[^\/]+/
// @license        MPL-2.0
// @copyright      2015+, f9y4ng
// @grant          none
// @require      http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.2.min.js
// ==/UserScript==

$(document).ready(function () {
  function googleswitchbaidu() {
    $('#tsf').prepend('<div id="sfdiv_bd" style="display:inline-block;position:relative;height:10px;width:110px;right:-115px;top:6px;float:right;">\
        <button id="bdyx" class="lsbb kpbb" style="height:45px;margin-top:4px;cursor:pointer" type="button"><span class="sbico" style="color:#fff;margin-top:-4px">\
        <svg focusable="false" style="fill: #fff;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0\
        0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 \
        9.5 11.99 14 9.5 14z"></path></svg></span><span style="font-size:16px;">百度一下</span></button></div>');
    $('#sfdiv_bd').off("click").on({
      click: function () {
        var kw = $('input[name="q"]').val();
        //获取属性标签不是很稳妥，下面继续容错
        if ("undefined" == typeof (kw)) {
          kw = GetUrlParam("q");
        }
        window.open("https://www.baidu.com/s?ie=utf-8&rqlang=cn&wd=" + encodeURIComponent(kw));
        return false;
      }
    });
  }
  if (window.location.hash.lastIndexOf("q=") > 0 || window.location.search.lastIndexOf("q=") > 0) {
    googleswitchbaidu();
  }
  //2018/11/07 F9y4ng GOOGLE首页自动提交搜索修正
  if (/^http(s)?:\/\/(www\.)?google\.\w+(\.\w+)?\/$/ig.test(window.location.href) || GetUrlParam("q") === null || GetUrlParam("q") === "") {
    var gfm = $('input[name="q"]');
    if ("undefined" == typeof (gfm)) {
      gfm = $("input[role='combobox']");
    }
    gfm.off('click').on({
      blur: function () {
        if (gfm.val().length > 0) {
          $("form").submit();
        }
      }
    });
  }
});

function GetUrlParam(paraName) {
  var url = document.location.toString();
  var arrObj = url.split("?");
  if (arrObj.length > 1) {
    var arrPara = arrObj[1].split("&");
    var arr;
    for (var i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split("=");
      if (arr !== null && arr[0] == paraName) {
        return arr[1];
      }
    }
    return "";
  }
  else {
    return "";
  }
}
