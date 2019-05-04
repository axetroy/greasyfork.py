// ==UserScript==
// @name        海腾之眼（贴吧防和谐）
// @namespace   wdssmq
// @description 对贴吧发言进行混淆，浏览已加密内容时可自动还原；QQ群：189574683
// @link        https://greasyfork.org/zh-CN/scripts/24864
// @include     https://tieba.baidu.com/*
// @include     http://tieba.baidu.com/*
// @version     1.3.5
// @grant       none
// ==/UserScript==
(function () {
  function $n(e) {
    return document.querySelector(e);
  }
  function $na(e) {
    return document.querySelectorAll(e);
  }
  function fnEnCode(str) {
    var strTip = "安装海腾之眼可自动解密".split("");
    str = fntoggleDic(str);
    var n = str.length;
    var m = strTip.length;
    if (n < m) {
      str += "⑼⑻⑺⑹⑸⑷⑶⑵⑴";
      n = str.length;
    }
    var qev = n / m < 5 ? parseInt(n / m) : 4;
    var out = "",
    ggu;
    for (var x = 0; x < n; x++) {
      ggu = x / qev;
      while (ggu > strTip.length - 1) {
        ggu = ggu - strTip.length;
      }
      if (parseInt(ggu) === ggu) {
        out += "[" + strTip[ggu] + "]";
      }
      out += str[x];
    }
    return out;
  }
  function fnJuhua(inStr) {
    var code = String.fromCharCode(1161);
    var outStr = '';
    for (var i = 0, l = inStr.length; i < l; i++) {
      outStr += inStr.charAt(i) + code;
    }
    return "<p>" + outStr + "</p>";
  }
  function fnEnCodeRun() {
    var dgv,
    str;
    str = $n("#ueditor_replace").innerHTML;
    console.log(str);
    if (/--(.*)--/.test(str)) {
      while (/--(.*?)--/.test(str)) {
        dgv = /--(.*?)--/.exec(str);
        str = str.replace(dgv[0], "xn#" + fnEnCode(dgv[1]) + "#xf");
        str += fnJuhua(dgv[1]);
      }
    } else if (/xn#(.*?)#xf/.test(str) === false) {
      fnAddTips();
      str = str.replace(/<p>|<\/p>|<br>/g, "ā");
      str = str.replace(/ā+/g, "ā");
      if (str === "ā")
        str = "请在这里输入要加密的内容，并保留前后的短线";
      str = str.replace(/^ā|ā$/g, "");
      str = str.replace(/ā/g, "--</p><p>--");
      str = "<p>--" + str + "--</p>";
    } else {
      fnAddTips();
    }
    console.log(str);
    $n("#ueditor_replace").innerHTML = str;
  }
  function fnDeCode(str) {
    var dgv = null;
    while (/xn#(.*?)#xf/.test(str)) {
      dgv = /xn#([^#]+)#xf/.exec(str);
      console.log(dgv[0]);
      console.log(dgv[1]);
      str = str.replace(dgv[0], fntoggleDic(dgv[1].replace(/\[[^\]]+\]/g, "")));
      str = str.replace(/<\/?a[^>]+>/g, "");
    }
    return str;
  }
  function fnDeCodeRun() {
    var postList = $na('.d_post_content');
    for (var x = 0; x < postList.length; x++) {
      postList[x].innerHTML = fnDeCode(postList[x].innerHTML);
    }
  }
  function fnAddTips() {
    if ($n("#xnxf-dialog") === null) {
      var div = document.createElement("div");
      div.className = "dialogJ dialogJshadow";
      /*jshint multistr: true */
      var html = '\
          <div class="uiDialogWrapper">\
            <div class="dialogJcontent" style="text-align:center;font-size: 14px;padding: 11px 13px;">\
              <span style="color:red">请按以下格式输入或调整已有内容</span><br />--要加密的内容--\
            <\/div>\
          <\/div>';
      div.innerHTML = html;
      div.setAttribute("style", "position:fixed;bottom:37%;right:15px;z-index:10;opacity:0;display:none");
      div.setAttribute("id", "xnxf-dialog");
      $n("body").insertBefore(div, $n("body").childNodes[0]);
    }
    if ($n("#xnxf-dialog").style.display !== "none")
      return;
    fnFade($n("#xnxf-dialog"), "show");
    window.setTimeout(function () {
      fnFade($n("#xnxf-dialog"), "hide");
    }, 2222);
  }
  function fnFade(el, a) {
    var v;
    if (a === "show") {
      el.style.display = 'block';
      el.style.right = (document.documentElement.clientWidth - el.clientWidth) / 2 + document.documentElement.scrollLeft + "px";
    }
    var fnToggle = function (v) {
      return function () {
        el.style.opacity = v / 100;
        if (v === 0 && a === "hide") {
          el.style.display = "none";
        }
      };
    };
    for (var n = 0; n < 101; n++) {
      v = (a === "show") ? n : 100 - n;
      window.setTimeout(fnToggle(v), 5.5 * n);
    }
  }
  function fnPutButton() {
    var button = document.createElement("button");
    var textnode = document.createTextNode("加 密");
    button.appendChild(textnode);
    button.setAttribute("id", "PUnicode");
    if ($n("button.poster_submit") !== null) {
      button.className = "btn_default btn_middle";
    } else {
      button.className = "ui_btn ui_btn_m";
    }
    button.onclick = fnEnCodeRun;
    // $n(".j_floating").appendChild(button);
    $n(".j_floating").insertBefore(button, $n(".j_floating").childNodes[1]);
    if ($n('#PUnicode') === null) {
      window.setTimeout(fnPutButton, 300);
      console.warn($n('#PUnicode'));
    }
  }
  addEventListener('load', function () {
    console.warn('xnxf');
    fnPutButton();
    // fnEnCodeRun();
    fnDeCodeRun();
  });
  function fntoggleDic(str) {
    var objDic = {
      a: [
        'https://',
        'uRiS'
      ],
      b: [
        'http://',
        'uRi'
      ],
      c: [
        'pan.baidu.com',
        'dDdDp'
      ],
      d: [
        'www.',
        'w3D'
      ],
      e: [
        '[',
        '%5B'
      ],
      f: [
        ']',
        '%5D'
      ]
    };
    var out = str;
    for (var x in objDic) {
      out = out.replace(objDic[x][0], objDic[x][1]);
    }
    if (out === str) {
      for (var y in objDic) {
        out = out.replace(objDic[y][1], objDic[y][0]);
      }
    }
    out = out.replace(/&amp;nbsp;/g, " ");
    out = out.replace(/&nbsp;/g, " ");
    return out;
  }
})();
