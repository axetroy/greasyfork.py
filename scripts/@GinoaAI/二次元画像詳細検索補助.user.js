// ==UserScript==
// @name 	二次元画像詳細検索補助
// @description 右クリックから画像を二次元画像詳細検索で検索を行う
// @author 	GinoaAI
// @namespace 	https://greasyfork.org/ja/users/119008-ginoaai
// @version 	1.0
// @match 	*://*
// @match 	*://*/*
// @match 	*://*/*/*
// @include 	http://*/*
// @include 	https://*/*
// @icon 	https://pbs.twimg.com/profile_images/1099150852390977536/nvzJU-oD_400x400.png
// @grant	GM_openInTab
// ==/UserScript==

if (!("contextMenu" in document.documentElement && "HTMLMenuItemElement" in window)) return;
var body = document.body;
body.addEventListener("contextmenu", initMenu, false);
var menu = body.appendChild(document.createElement("menu"));
menu.outerHTML = '<menu id="haoimage" type="context">\
                    <menuitem label="二次元画像詳細検索"\
                              icon="data:image/bmp;base64,\
Qk02BQAAAAAAADYEAAAoAAAAEAAAABAAAAABAAgAAAAAAAAAAADDDgAAww4AAAABAAAAAQAAAAAA/wUFBf89PT3/QEBA/0VFRf9T\
U1P/cnJy/4CAgP+FhYX/lpaW/6mpqf+wsLD/tbW1/7i4uP+/v7//ycnJ/9nZ2f/m5ub/7Ozs//////8AAAD/AAAA/wAAAP8AAAD/\
AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA\
/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAA\
AP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8A\
AAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/\
AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA\
/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAA\
AP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8A\
AAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/\
AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA\
/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAA\
AP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8A\
AAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/\
AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/xMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMT\
ExMKBwcJDg4ODg4ODhESDxMTCwcHBQMDAwMDAwIBAAQTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMT\
ExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMLBwcHDA4ODhATExMTExMTDQcHBgMDAwMIExMTExMTExMT\
ExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExM="></menuitem>\
                  </menu>';
document.querySelector("#haoimage menuitem").addEventListener("click", searchImage, false);

function initMenu(aEvent) {
  var node = aEvent.target;
  var item = document.querySelector("#haoimage menuitem");
  if (node.localName == "img") {
    body.setAttribute("contextmenu", "haoimage");
    item.setAttribute("imageURL", node.src);
  } else {
    body.removeAttribute("contextmenu");
    item.removeAttribute("imageURL");
  }
}

function searchImage(aEvent) {
  var imageURL = aEvent.target.getAttribute("imageURL");
  if (imageURL.indexOf("data:") == 0) {
    var base64Offset = imageURL.indexOf(",");
  } else {
    GM_openInTab("https://ascii2d.net/search/url/" + (imageURL));
  }
}
if (location.href.indexOf("ascii2d.net/search/") >= 0) {
  $('div[class*="hidden-md-down col-lg-4 col-xl-4"]').remove();

  function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {
      return
    }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
  }
  addGlobalStyle('.col-lg-8 { width: 100%; }');
}