// ==UserScript==
// @name 価格.comの詳細スペック検索で満足度が指定値未満のものを非表示にする
// @description  Shift+Mで満足度足切り数値入力　Shift+0で満足度未投票の商品を含めないオンオフ　Shift+Sでキーワードで絞り込み　Shift+Nでnotキーワードで絞り込み　Shift+Rでリセット
// @match *://kakaku.com/specsearch/*
// @version 0.1
// @grant none
// @namespace https://greasyfork.org/users/181558
// ==/UserScript==

(function() {
  var manzokuashikiri = 0;
  var manzokudo0hyouji = "表示しない";
  var searchRE = "";
  var notkwRE = "";

  //キー入力
  document.addEventListener("keydown", function(e) {
      if (/input|textarea/i.test(e.target.tagName) || location.href.indexOf("kakaku") == -1) return;
      if (e.shiftKey && String.fromCharCode(e.which).toLowerCase() == "m") {
        manzokuashikiri = str2numMinMax(window.prompt("満足度足切り値を入力してください(0-5)\n（満足度0（未投票）の品物は 「" + manzokudo0hyouji + "」です）", manzokuashikiri), 0, 5) || 0;
        shori();
      }
      if (e.shiftKey && String.fromCharCode(e.which).toLowerCase() == "s") {
        searchRE = window.prompt("絞り込むキーワードを正規表現で入力してください", searchRE) || "";
        shori();
      }
      if (e.shiftKey && String.fromCharCode(e.which).toLowerCase() == "n") {
        notkwRE = window.prompt("notキーワードを正規表現で入力してください", notkwRE) || "";
        shori();
      }
      if (e.shiftKey && String.fromCharCode(e.which).toLowerCase() == "0") {
        manzokudo0hyouji = manzokudo0hyouji === "表示する" ? "表示しない" : "表示する";
        alert("満足度0（未投票）の品物は「" + manzokudo0hyouji + "」にしました");
        shori();
      }
      if (e.shiftKey && String.fromCharCode(e.which).toLowerCase() == "r") {
        resetsaved();
        shori();
      }
    },
    false);

  shori();
  return

  function shori() {
    var ele = eleget("//tr/td[7]"); //満足度
    for (var i = ele.snapshotLength; i--;) {
      var elei = ele.snapshotItem(i);
      elei.parentNode.style.display = "";
      var manzokudo = elei.innerText;
      var splitPos = manzokudo.search(/\(/);
      if (splitPos != -1) manzokudo = manzokudo.substr(0, splitPos);
      if (manzokudo < manzokuashikiri) {
        if (manzokudo0hyouji == "表示する" && manzokudo == 0) {} else {
          elei.parentNode.style.display = "none"; /*table.deleteRow(i);*/
        }
      }
    }

    var ele = eleget('//input[@name="ChkProductID"]'); //tbody/tr/td"); //自由検索
    for (var i = ele.snapshotLength; i--;) {
      var elei = ele.snapshotItem(i);
      var text = elei.parentNode.parentNode.innerText;
      if (new RegExp(searchRE, "gi").test(text) == false) {
        elei.parentNode.parentNode.style.display = "none"; /*table.deleteRow(i);*/
      }
      if (notkwRE && new RegExp(notkwRE, "gi").test(text) == true) {
        elei.parentNode.parentNode.style.display = "none"; /*table.deleteRow(i);*/
      }
    }

    return;
  }

  function resetsaved() {
    manzokuashikiri = 0;
    manzokudo0hyouji = "表示しない";
    searchRE = "";
    notkwRE = "";
    shori();
    return;
  }

  function eleget0(xpath) {
    var ele = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    return ele.snapshotLength > 0 ? ele.snapshotItem(0) : ""
  }

  function eleget(xpath) {
    return document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)
  }

  function str2numMinMax(str, min, max) {
    var ans = Number(str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
      return String.fromCharCode(s.charCodeAt(0) - 65248);
    }).replace(/[^-^0-9^\.]/g, ""));
    if (ans > max) ans = max;
    if (ans < min) ans = min;
    return ans;
  }

})();