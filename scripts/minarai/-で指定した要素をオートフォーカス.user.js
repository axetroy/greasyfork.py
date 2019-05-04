// ==UserScript==
// @name -で指定した要素をオートフォーカス
// @description -:指している要素をオートフォーカス場所＆Escで戻る場所に登録　Shift+-:Escで戻る場所だけ登録　Esc:そこに戻る
// @match *://*/*
// @run-at document-end
// @version     0.2
// @grant GM_addStyle
// @namespace https://greasyfork.org/users/181558
// ==/UserScript==

(function() {

  var mousex = 0;
  var mousey = 0;

  document.addEventListener('keydown', function(e) {
    if (/input|textarea/i.test(e.target.tagName) == false) {
      if (!e.getModifierState("Alt") && !e.getModifierState("Control") && !e.getModifierState("Shift") && (e.key == "Escape")) { // esc
        loadfocus2("esc");
      }
      if (!e.getModifierState("Alt") && !e.getModifierState("Control") && !e.getModifierState("Shift") && (e.key == "-")) { // -
        var ele = document.elementFromPoint(mousex, mousey);
        if (/input|textarea/i.test(ele.tagName) == false) ele.focus()
        var xp = mark("ar", ele);
        e.preventDefault();
      }
      if (!e.getModifierState("Alt") && !e.getModifierState("Control") && e.getModifierState("Shift") && (e.key == "=")) { // shift+-
        var ele = document.elementFromPoint(mousex, mousey);
        if (/input|textarea/i.test(ele.tagName) == false) ele.focus()
        var xp = mark("r", ele);
        e.preventDefault();
      }
    }
  }, false);

  document.addEventListener("mousemove", function(e) {
    mousex = e.clientX;
    mousey = e.clientY;
  }, false);

  setTimeout(() => { loadfocus() }, 200)

  return;

  function loadfocus(times = 0) {
    let xp = localStorage.getItem("mAutoFocusXPath") || "";
    if (!xp || times > 5000) return false;
    if (eleget0(xp)) { setTimeout(() => { loadfocus2(); }, 200); return; } else setTimeout(() => { loadfocus(times + 200); }, 200)
  }

  function loadfocus2(mode="init") {
    var xp = mode=="init"? localStorage.getItem("mAutoFocusXPath") : localStorage.getItem("mAutoFocusXPathr") || localStorage.getItem("mAutoFocusXPath") || "";
    if (!xp) return;
    var ele = eleget0(xp);
    if (ele) {
      GM_addStyle(":focus {outline: rgba(0, 250,0,0.7) solid 4px !important;}")
      ele.focus();
      if (!location.href.match(/cavelis|live.?\.nicovideo/)) ele.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    }
    return ele;
  }

  function mark(mode, ele = document.elementFromPoint(mousex, mousey)) {
    if (mode == "ar") var ls = localStorage.getItem("mAutoFocusXPath") || "";
    if (mode == "r") var ls = localStorage.getItem("mAutoFocusXPathr") || "";
    var xp0 = getElementXPath0(ele);

    var xp = prompt((mode == "ar" ? "オートフォーカスする場所とEscで戻る場所" : "Escで戻る場所") + "を設定します\n\n指した要素：\n" + xp0 + "\n\n現在の設定値：\n" + ls + "\n\n空欄にすると削除します　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　", ls || xp0).trim();
    if (!xp) {
      if (mode == "ar") localStorage.removeItem("mAutoFocusXPath", xp);
      if (mode == "r") localStorage.removeItem("mAutoFocusXPathr", xp);
      return;
    }
    var ele = eleget0(xp);
    if (ele) {
      if (mode == "ar") localStorage.setItem("mAutoFocusXPath", xp);
      if (mode == "r") localStorage.setItem("mAutoFocusXPathr", xp);
      loadfocus2();
    } else {
      alert(xp + "\n" + "要素が見つかりませんでした\n設定を削除しますのでやり直してください\n");
      if (mode == "ar") localStorage.removeItem("mAutoFocusXPath", xp);
      if (mode == "r") localStorage.removeItem("mAutoFocusXPathr", xp);
      return;
    }
  }

  function str2numMinMax(str, min, max) {
    var ans = Number(str.replace(/[Ａ-Ｚａ-ｚ０-９．]/g, function(s) {
      return String.fromCharCode(s.charCodeAt(0) - 65248);
    }).replace(/[^-^0-9^\.]/g, ""));
    if (ans > max) ans = max;
    if (ans < min) ans = min;
    return ans;
  }

  function getElementXPath0(ele) {
    var path = "";
    for (; ele && ele.nodeType == 1; ele = ele.parentNode) {
      for (var idx = 1, sib = ele.previousSibling; sib; sib = sib.previousSibling) {
        if (sib.nodeType == 1 && sib.tagName == ele.tagName) idx++
      }
      path = "/" + ele.tagName + (!ele.tagName.match(/html|body/gi) ? "[" + idx + "]" : "") + path;
    }
    return path;
  }

  function eleget0(xpath) {
    var ele = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    return ele.snapshotLength > 0 ? ele.snapshotItem(0) : "";
  }

  function elegeta(xpath, node = document) {
    var ele = document.evaluate("." + xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var array = [];
    for (var i = 0; i < ele.snapshotLength; i++) array[i] = ele.snapshotItem(i);
    return array;
  }

})();
