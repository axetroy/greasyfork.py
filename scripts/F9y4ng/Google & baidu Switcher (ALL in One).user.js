// ==UserScript==
// @name      Google & baidu Switcher (ALL in One)
// @namespace  https://openuserjs.org/scripts/t3xtf0rm4tgmail.com/Google_baidu_Switcher_(ALL_in_One)
// @author    F9y4ng
// @version    1.4.5.8
// @description  分别在百度和google的搜索结果页面增加搜索跳转按钮，使用到外链微软CDN的jquery-1.7.2.min.js，不懂跳墙使用GOOGLE的同学请自动忽略。自动判断百度和google对JQUERY的载入，并动态载入Jquery.js。
// @icon            data:image/x-icon;base64,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
// @include         /^https?\:\/\/[a-zA-Z0-9]*.google.[^\/]+/
// @include        http://www.baidu.com/*
// @include        https://www.baidu.com/*
// @license        MPL-2.0
// @copyright      2015+, f9y4ng
// @grant          none

// ==/UserScript==

if ("undefined" == typeof (jQuery)) {
  loadJs("for_google", "https://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.2.min.js", callbackFunction);
}
else {
  $(document).ready(function () {
    function baiduswitchgoogle() {
      $('.s_btn_wr').after('<div class="s_btn_wr bg" style="display:inline-block;margin-left:10px">\
                <input type="button" id="ggyx" value="Google一下" class="bg s_btn" ></div>');
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
    //2018/11/07 F9y4ng 检测从baidu首页进入的搜索（修正自动提交的Bug）
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
}

function callbackFunction() {
  $(document).ready(function () {
    function googleswitchbaidu() {
      $('#tsf').prepend('<div id="sfdiv_bd" style="display:inline-block;position:relative;height:0px;width:110px;right:-115px;\
        top:0px;float:right;"><button id="bdyx" class="lsbb kpbb" style="width:120px;height:49px;margin-top:-2px;cursor:pointer;\
        display: flex;border-radius: 8px;border: 1px solid #dfe1e5;box-shadow: none;border-radius: 24px;" type="button"><span \
        class="sbico" id="bdyxss" style="color:#fff"><svg focusable="false" style="fill: #fff;" xmlns="http://www.w3.org/2000/svg"\
         viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 \
         4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z">\
         </path></svg></span><span id="bdyxwz" style="font-size:16px;">百度一下</span></button></div>');
      $('#sfdiv_bd').off("click").on({
        click: function () {
          var kw = $('input[name="q"]').val();
          //获取属性标签容错
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
    var ua = myBrowser();
    if (ua == "FF" || ua == "Edge") {
      $('#bdyxwz').css('margin-top', '10px');
      $('#bdyxss').css('margin', '12px 2px 0 4px');
    }
    else {
      $('#bdyxwz').css('margin-top', '0px');
      $('#bdyxss').css('margin', '2px 2px 0 4px');
    }
    var elm = $('#bdyx');
    var startPos = $(elm).offset().top;
    $.event.add(window, "scroll", function () {
      var p = $(window).scrollTop();
      $(elm).css('height', ((p) > startPos - 5) ? '37px' : '49px');
      if (ua == "FF" || ua == "Edge") {
        $('#bdyxwz').css('margin-top', ((p) > startPos) ? '5px' : '10px');
        $('#bdyxss').css('margin', ((p) > startPos) ? '7px 2px 0 4px' : '12px 2px 0 4px');
      }
    });
  });
}

function loadJs(sid, jsurl, callback) {
  var nodeHead = document.getElementsByTagName('head')[0];
  var nodeScript = null;
  if (document.getElementById(sid) === null) {
    nodeScript = document.createElement('script');
    nodeScript.setAttribute('type', 'text/javascript');
    nodeScript.setAttribute('src', jsurl);
    nodeScript.setAttribute('id', sid);
    if (callback !== null) {
      nodeScript.onload = nodeScript.onreadystatechange = function () {
        if (nodeScript.ready) {
          return false;
        }
        if (!nodeScript.readyState || nodeScript.readyState == "loaded" || nodeScript.readyState == 'complete') {
          nodeScript.ready = true;
          callback();
        }
      };
    }
    nodeHead.appendChild(nodeScript);
  }
  else {
    if (callback !== null) {
      callback();
    }
  }
}

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

function myBrowser() {
  var userAgent = navigator.userAgent;
  if (userAgent.indexOf("Firefox") > -1) {
    return "FF";
  }
  if (userAgent.indexOf("Edge") > -1) {
    return "Edge";
  }
}
