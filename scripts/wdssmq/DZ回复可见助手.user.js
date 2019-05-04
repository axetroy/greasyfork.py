// ==UserScript==
// @name        DZ回复可见助手
// @namespace   wdssmq
// @description 简化论坛中的回复可见操作（QQ群：189574683）
// @link        https://greasyfork.org/zh-CN/scripts/25941
// @version     1.3.2
// @include     *forum.php?mod=viewthread&tid=*
// @include     *forum.php?mod=post&action=reply*replysubmit=yes
// @include     *viewthread.php?tid=*
// @include     *thread*.html
// @grant       none
// ==/UserScript==
(function () {
  var lasScrollHeight = 0,
  cooName = location.href.replace(/:/g, ""),
  cooValue = parseInt(getcookie(cooName)) || 0;
  // cooValue = 0;

  //document.addEventListener('DOMContentLoaded', function () {fnMain(1);}, true);
  window.addEventListener('load', fnMain, true);
  //document.addEventListener("DOMNodeRemoved",function(e) {
  //console.log("remove",e.target);
  //});
  document.addEventListener("DOMNodeInserted", function (e) {
    console.log("insert", e.target.innerHTML);
    if (/showhide|本帖隐藏的内容/.test(e.target.innerHTML)) {
      fnEnd();
    }
  });
  function fnEnd() {
    if (!fnViewEl($n('.showhide'), 0)) {
      fnViewEl($n('.showhide'), 0);
    }
    if ($n('.showhide a')) {
      var domA = $n('.showhide a');
      if ($n(".showhide span a")) {
        domA = $n(".showhide span a");
      }
      if ($n(".showhide .download-con a")) {
        domA = $n(".showhide .download-con a");
      }
      var link = domA.href;
      if (domA.onclick) {
        showWindow('attachpay', link);
        return null;
      } else {
        if (link.indexOf("attachment") > -1) {
          link += "&isdown=1";
          domA.href = link;
          console.log(link);
        }
        window.open(link);
      }
    }
    if ($n('.showhide') && $n('#threadtitle h1')) {
      var title = $n('#threadtitle h1');
      var newname = text(title);
      newname = newname.replace(/\s-.+$/g, '');
      newname = newname.replace(/\..+(\.\d{4})/g, '$1');
      var ed2k = $n(".smalltextjuse a").href;
      ed2k = ed2k.replace(/%[^%]{2}\.?/g, '');
      $na(".showhide")[0].innerHTML = $na(".showhide")[0].innerHTML.replace(/<\/h4>/, "</h4>" + newname + "<br />" + ed2k + "<br />");
      $n('#inp-query').value = newname;
    }
  }
  function fnMain() {
    if ($n('.locked') && !$n('.showhide')) {
      if (cooValue < 5)
        setTimeout(fnMain, 467);
      else
        return;
      if (lasScrollHeight !== document.body.scrollHeight && cooValue !== 0) {
        lasScrollHeight = document.body.scrollHeight;
        return;
      }
      cooValue++;
      console.log(cooValue);
      setcookie(cooName, cooValue, 3600);
      if ($n('.locked a')) {
        var aryDomA = $na('.locked a'),
        domA = $n('.locked a'),
        link = $n('.locked a').href;
        aryDomA.forEach(function (el) {
          if (el.innerHTML.indexOf("回复") > -1) {
            domA = el;
            link = el.href;
          }
        });
        setTimeout(function () {
          fnViewEl(domA, 0);
        }, 1000);
        if (cooValue > 1)
          return;
        domA.addEventListener('mouseover', function () {
          if (domA.onclick) {
            // showWindow('attachpay', link);
            showWindow('reply', link);
            setTimeout(function () {
              $n("textarea").innerHTML = "感谢分享！";
            }, 700);
          }
        }, false);
      }
    }
    fnEnd();
  }
  function fnViewEl(el, n) {
    // console.log(n);
    if (el) {
      document.documentElement.scrollTop = n;
      if (!fnIsElInViewport(el)) {
        // document.documentElement.scrollTop = n;
        n += 50;
        return fnViewEl(el, n);
      } else {
        document.documentElement.scrollTop = n + (window.innerHeight || document.documentElement.clientHeight) / 3;
        return true;
      }
    } else {
      return false;
    }
  }
  function fnIsElInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */);
  }
  function text(e) {
    var t = '';
    //如果传递的是元素，则取其子元素，
    //否则假定它是一个数组
    e = e.childNodes || e;
    //检查所有子节点
    for (var j = 0; j < e.length; j++) {
      //如果它不是一个元素，追加其文本到返回值
      //否则，对其所有子元素递归处理
      t += e[j].nodeType != 1 ?
      e[j].nodeValue : text(e[j].childNodes);
    }
    //返回所得的文本
    return t;
  }
  function $n(e) {
    return document.querySelector(e);
  }
  function $na(e) {
    return document.querySelectorAll(e);
  }
})();
