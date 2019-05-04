// ==UserScript==
// @name ￥+クリックした要素を削除
// @description ￥+クリックした要素を削除　^+クリックした要素の親要素を削除　Shift+￥:文字列を指定して一括削除　Shift+[:一括削除を保存して自動実行
// @match *://*/*
// @version     0.3
// @grant       GM_setClipboard
// @namespace https://greasyfork.org/users/181558
// ==/UserScript==

(function() {
  var mousex = 0;
  var mousey = 0;
  var shiftYenText = "";
  var bubparent = 0;
  var shiftYenText = localStorage.getItem('shiftYenText') || "";
  var shiftYenbubparent = localStorage.getItem('shiftYenbubparent') || 0;

  var BrightStyle = "0px 0px 6px 6px rgba(0, 250, 0, 0.5), inset 0 0 12px rgba(0, 250, 0, 0.2)";
  var panel;
  var frameOldEle, frameOldStyle, frameOldTimer;
  var ap1, ap2;

  const bekijou = (((window.navigator.userAgent.toLowerCase()).indexOf('chrome') != -1) ? 222 : 160);
  if (shiftYenText) deleteByTextAndBp(shiftYenText, shiftYenbubparent);
  document.body.addEventListener('AutoPagerize_DOMNodeInserted', function(evt) {
    if (shiftYenText) deleteByTextAndBp(shiftYenText, shiftYenbubparent);
  }, false); // uAutoPagerizeの継ぎ足し部分だけに付ける


  //リアルタイムキー入力
  var input_key_buffer = new Array();
  document.addEventListener('keyup', function(e) {
    if (/input|textarea/i.test(e.target.tagName)) return;
    input_key_buffer[e.keyCode] = false;
    if (e.keyCode === 220) { //￥
      restoreMark();
    }
    if (e.keyCode === bekijou) { //^
      restoreMark();
    }
  }, false);
  document.addEventListener('blur', function(e) { input_key_buffer.length = 0; }, false);
  document.addEventListener('keydown', function(e) {
    if (/input|textarea/i.test(e.target.tagName) == false) {
      input_key_buffer[e.keyCode] = true;
      if (input_key_buffer[220] && !e.shiftKey) { removePanel();
        mark(); }
      if (input_key_buffer[bekijou] && !e.shiftKey) {
        removePanel();
        mark((document.elementFromPoint(mousex, mousey)).parentNode);
      }
    }
  }, false);

  document.addEventListener("click", function(e) {
    if (input_key_buffer[220] && e.button == 0) { //￥+左クリック
      e.preventDefault();
      var ele = document.elementFromPoint(e.clientX, e.clientY);
      ele.parentNode.removeChild(ele);
    }
    if (input_key_buffer[bekijou] && e.button == 0) { //＾+左クリック
      e.preventDefault();
      var ele = document.elementFromPoint(e.clientX, e.clientY);
      ele.parentNode.parentNode.removeChild(ele.parentNode);
    }
  }, false);

  document.addEventListener("mousemove", function(e) {
    mousex = e.clientX;
    mousey = e.clientY;
    if (input_key_buffer[220]) mark(); //￥
    if (input_key_buffer[bekijou]) mark((document.elementFromPoint(mousex, mousey)).parentNode);
  }, false);

  document.addEventListener('keydown', function(e) { 
    if (/input|textarea/i.test(e.target.tagName) == false) {
      if (e.keyCode === 219 && e.shiftKey) { // shift+[
        input_key_buffer.length = 0;
        if (prompt("Shift+[:　　　　　　　　　　　　　　　　　　　　　　　　　　　\r\n" + document.domain + "でShift+￥の自動実行を下記情報で保存しますか？(y/n)\r\nnだと登録を削除します\r\n\r\n検索キーワード：" + shiftYenText + "\r\n遡る親ノード数：" + shiftYenbubparent + "\r\n", "n") === "y") {
          localStorage.setItem('shiftYenText', shiftYenText);
          localStorage.setItem('shiftYenbubparent', shiftYenbubparent);
        } else {
          localStorage.removeItem('shiftYenText');
          localStorage.removeItem('shiftYenbubparent');
        }
      }

      if (e.keyCode === 220 && e.shiftKey) { // shift+￥
        input_key_buffer.length = 0;
        shiftYenText = prompt("Shift+￥: 1/2　削除したいテキストを入力してください。|で区切ると複数指定できます", shiftYenText);
        if (!shiftYenText) return;
        shiftYenbubparent = str2numMinMax(prompt("Shift+￥: 2/2　遡る親ノード数を入力してください", shiftYenbubparent), 0, 99);
        deleteByTextAndBp(shiftYenText, shiftYenbubparent);
      }
    }
  }, false);

  return;

  function mark(ele = document.elementFromPoint(mousex, mousey)) {
    restoreMark();
    if (ele.outerHTML.length < 2000) popup(ele.outerHTML.replace(/</gm, "&lt;").replace(/>/gm, "&gt;").replace(/[\r\n]/gm, "<br>") + " (" + ele.outerHTML.length + "文字)", ele.outerHTML);
    setMark(ele);
    ele.addEventListener("mouseout", function(e) { restoreMark(); }, false);
  }

  function elegeta(xpath) {
    var ele = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var array = [];
    for (var i = 0; i < ele.snapshotLength; i++) array[i] = ele.snapshotItem(i);
    return array;
  }

  function str2numMinMax(str, min, max) {
    var ans = Number(str.replace(/[Ａ-Ｚａ-ｚ０-９．]/g, function(s) {
      return String.fromCharCode(s.charCodeAt(0) - 65248);
    }).replace(/[^-^0-9^\.]/g, ""));
    if (ans > max) ans = max;
    if (ans < min) ans = min;
    return ans;
  }

  function deleteByTextAndBp(shiftYenText, bubparent) {
    var texta = "";
    var did = [];
    var count = 0;
    for (let text of shiftYenText.split("|")) {
      var eles = elegeta('//*[contains(text(),"' + text + '")]');
      if (eles) {
        for (let ele of eles) {
          if (ele == null) console.log(ele.outerHTML);
          var didkouho = text + ":";
          var toptext = "";
          for (var i = 0; i < bubparent; i++) {
            ele.style.border = "dotted 2px red";
            if (ele.parentNode === document.body || ele.parentNode == null) {
              alert(i + 1 + "回目でbody要素まで遡ってしまうので溯上を中止します。検索テキストをもっとユニークにするか、遡るノード数を減らしてみてください。とりあえず遡るノード数を1減らして" + (--shiftYenbubparent) + "にしておきます。必要ならセーブしてください。");
              bubparent--;
              break;
            }
            toptext += ele.innerText.slice(0, 100);
            ele = ele.parentNode;
          }
          if (ele != document.body) {
            //            ele.parentNode.removeChild(ele);
            setTimeout(function() { ele.parentNode.removeChild(ele); }, 16 + count * 32);
            setTimeout(function() { ele.style.opacity = "0.5"; /*ele.scrollIntoView(true);*/ }, count * 32);
            did.push(didkouho + toptext);
            count++;
          }
        }
      }
    }
    popup("￥+クリックした要素を削除:<BR><BR>削除キーワード：<BR>" + shiftYenText + "<BR>遡る親ノード数：<BR>" + shiftYenbubparent + "<BR><BR>" + did.join("<BR>") + "<BR><BR>" + count + "項目削除しました<BR><BR>（設定を削除：Shift+[）");
    return;
  }

  // バルーン表示
  function popup(txt, unRCtxt) {
    clearTimeout(frameOldTimer);
    if (panel) { panel.remove();
      panel = null; }
    txt = txt.replace(/outline: 3px dotted red;|\s?style=\"\s*\"\s?/gmi, "");
    if (unRCtxt) unRCtxt = unRCtxt.replace(/outline: 3px dotted red;|\s?style=\"\s*\"\s?/gmi, "");
    var ele = eleget0("//span[@id='ctrlc']");
    if (ele) ele.parentElement.removeChild(ele);
    var opa = 0.8;
    panel = document.createElement("span");
    panel.setAttribute("style", "max-width:95%; right:0; bottom:0; z-index:2147483647; opacity:" + opa + "; text-align:left; line-height:1.1em; position:fixed; font-size:12px; margin:15px;  text-decoration:none; padding:15px 15px; border-radius:7px; background-color:#d0e8ff; color:#000000;  box-shadow:5px 5px 8px #0003; border:2px solid #fff; font-family: 'MS UI Gothic','Meiryo UI','Yu Gothic UI','Arial',sans-serif;");
    panel.innerHTML = txt;
    panel.id = "ctrlc";
    panel.onclick = function() { GM_setClipboard(unRCtxt || txt); };
    document.body.appendChild(panel);
    frameOldTimer = setTimeout(function() { panel.remove();
      panel = null; }, 4000);
    return;
  }

  function eleget0(xpath) {
    var ele = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    return ele.snapshotLength > 0 ? ele.snapshotItem(0) : "";
  }

  function removePanel() {
    if (frameOldTimer) clearTimeout(frameOldTimer);
    if (panel) {
      panel.remove();
      panel = null;
    }
  }

  function restoreMark() {
    if (frameOldEle) {
      frameOldEle.style.outline = frameOldStyle;
      frameOldEle = null;
      //      clearTimeout(frameOldTimer); if (panel) { panel.remove(); panel = null; }
    }
  }

  function setMark(ele) {
    frameOldStyle = ele.style.outline;
    frameOldEle = ele;
    ele.style.outline = "red dotted 3px";
    //    setTimeout(function() { if (frameOldEle) { frameOldEle.style.outline = frameOldStyle; frameOldEle = null; } }, 5500);
  }

})();
