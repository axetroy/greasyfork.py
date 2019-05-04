// ==UserScript==
// @name      Google & baidu Switcher (use baidu)
// @namespace  https://openuserjs.org/scripts/t3xtf0rm4tgmail.com/Google_baidu_Switcher_(use_baidu)
// @author    F9y4ng
// @version    1.2.6
// @description  在百度的搜索结果页面增加google搜索跳转按钮，不懂跳墙使用GOOGLE的同学请自动忽略。
// @include        http://www.baidu.com/*
// @include        https://www.baidu.com/*
// @include        http://baidu.com/*
// @include        https://baidu.com/*
// @license        MPL-2.0
// @copyright      2015+, f9y4ng
// @grant          none
// ==/UserScript==

$(document).ready(function () {
  function baiduswitchgoogle() {
    $('.s_btn_wr').after('<div class="s_btn_wr bg" style="display:inline-block;margin-left:10px"><input type="button" id="ggyx" value="Google一下" class="bg s_btn" ></div>');
    $('#ggyx').on({
      click: function () {
        window.open("https://www.google.com/search?newwindow=1&hl=zh-CN&source=hp&q=" + encodeURIComponent($('#kw').val()));
        return false;
      }
    });
  }
  if (GetUrlParam("wd").length > 0 || window.location.href.lastIndexOf("/s?") > 0) {
    baiduswitchgoogle();
  }
  //2018/11/07 F9y4ng 检测从baidu首页进入的搜索（修正自动提交的Bug，百度太贱）
  if (/^http(s)?:\/\/(www\.)?baidu\.com\/$/ig.test(window.location.href)) {
    $("#kw").on("blur", function () {
      if ($('#kw').val().length > 0) {
        setTimeout(function () {
          if ($('#ggyx').length < 1 && GetUrlParam("wd").length > 0) {
            baiduswitchgoogle();
          }
        }, 600);
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