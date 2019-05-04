// ==UserScript==
// @name i,o,pでXPath生成ツール
// @description i:生成　o:除外条件付き生成　p:除外条件＋１つの要素のみを生成　Shift+i:除外条件変更　Shift+o:要求条件入力　Shift+p:要求Hits数変更
// @match *://*/*
// @version     0.3.4
// @grant GM_addStyle
// @require https://code.jquery.com/jquery-3.3.1.min.js
// @namespace https://greasyfork.org/users/181558
// ==/UserScript==

(function() {

  const maxLines = 60; // 一度に提案する最大数調整　大きいほど少ない（maxLines/縦解像度）
  const TryMulti = 1; // 一度に生成する試行回数調整　増やすと沢山試す＝遅い代わりに結果が増える
  var excludeRE = "@href=|text\\(\\)|@title=|@alt=|@src="; // o,pキーではこれを含むXPath式は除外する 例：/href|text\(\)/ or /\0/
  var requireRE = "";
  var requireHits = 1;

  const autoNextLinkDecision = /page.*last\(\)|nav|next|right|>|＞|»|次/gmi;
  const autoNextLinkDecisionNot = /href/gmi;
  const autoPageElementDecision = /main|list|content/gmi;

  var mousex = 0;
  var mousey = 0;
  var shiftYenText = "";
  var bubparent = 0;
  var EscToHidePanel;
  var BrightStyle = "0px 0px 6px 6px rgba(0, 250, 0, 0.5), inset 0 0 12px rgba(0, 250, 0, 0.2)";
  var panel;
  const CancelStyle = /box-shadow: none;|\@style=\"\"|(\sand\s)\sand\s|\[\]|\sand\s(\])/gmi;
  const cancelrep = "$1$2";

  var testxpold = [];
  var testxpoldstyle = [];
  var frameOldEle, frameOldStyle, frameOldTimer;
  var ap1, ap2;

  //リアルタイムキー入力
  var input_key_buffer = new Array();
  document.addEventListener('keyup', function(e) {
    input_key_buffer[e.keyCode] = false;
  }, false);

  document.addEventListener('blur', function(e) {
    input_key_buffer.length = 0;
  }, false);

  document.addEventListener('keydown', function(e) {
    if (/input|textarea/i.test(e.target.tagName) == false) {
      input_key_buffer[e.keyCode] = true;
      if (!e.getModifierState("Alt") && !e.getModifierState("Control") && !e.getModifierState("Shift") && e.keyCode == 73) mark(9); //i 7
      if (!e.getModifierState("Alt") && !e.getModifierState("Control") && !e.getModifierState("Shift") && e.keyCode == 79) mark(7); //o
      if (!e.getModifierState("Alt") && !e.getModifierState("Control") && !e.getModifierState("Shift") && e.keyCode == 80) mark(0); //p
      if (!e.getModifierState("Alt") && !e.getModifierState("Control") && e.getModifierState("Shift") && e.keyCode == 73) excludeRE = window.prompt("Enter exclude word(s) RegExp", excludeRE) || null; //
      if (!e.getModifierState("Alt") && !e.getModifierState("Control") && e.getModifierState("Shift") && e.keyCode == 79) requireRE = window.prompt("Enter require word(s) RegExp", requireRE || "@id=|@class") || null; //
      if (!e.getModifierState("Alt") && !e.getModifierState("Control") && e.getModifierState("Shift") && e.keyCode == 80) requireHits = proInput("Enter required hits", requireHits, 0); //
    }
  }, false);
  document.addEventListener("mousemove", function(e) {
    mousex = e.clientX;
    mousey = e.clientY;
  }, false);

  return;

  function storetest(xpath) {
    writebacktest();
    testxpold = [];
    console.log(xpath)
    if (xpath) {
      for (let ele of elegeta(xpath)) {
        testxpold.push(ele);
        testxpoldstyle.push(ele.style.boxShadow);
        if (ele) ele.style.boxShadow = BrightStyle;
      }
    }
    return;
  }

  function writebacktest() {
    if (testxpold) {
      for (let ele of testxpold) {
        if (ele) ele.style.boxShadow = testxpoldstyle.shift();
      }
      testxpold = [];
    }
    return;
  }

  function mark(mode = 0, ele = null) {
    if (panel) {
      writebacktest();
      $(panel).remove();
      panel = null;
      testxpold = null;
    }

    if (frameOldEle) {
      frameOldEle.style.outline = frameOldStyle;
      frameOldEle = null;
      clearTimeout(frameOldTimer);
    }

    if (!ele) ele = document.elementFromPoint(mousex, mousey)
    popup(makecontent(mode, ele), /$^/, ele, mode);

    frameOldStyle = ele.style.outline;
    frameOldEle = ele;
    ele.style.outline = "red dotted 3px";
    frameOldTimer = setTimeout(function() {
      if (frameOldEle) {
        frameOldEle.style.outline = frameOldStyle;
        frameOldEle = null;
      }
    }, 4000);

  }

  function putResult(xpath) {
    writebacktest();
    let eleal = elegeta(xpath).length;

    let target = document.getElementById("testXPath");
    let lineHeight = 1;
    target.setAttribute("rows", lineHeight);
    for (let t = 0; t < 9; t++) { if ((target.scrollHeight) >= target.offsetHeight) { target.setAttribute("rows", lineHeight++); } }

    eleget0('//th[@id="testXPathResult"]').innerText = "Err";
    document.getElementById('testXPathPossibly').innerHTML = " ";
    var ele = eleget1(xpath);
    if (ele == "Err") { eleget1('//th[@id="testXPathResult"]').innerText = ele; } else {
      eleget0('//th[@id="testXPathResult"]').innerText = eleal;
      if (eleal > 0) {
        let lc = (xpath.match(/last\(\)/g));
        if (lc) lc = lc.length;
        let col = xpath.match(/@href=/) ? "color:red;" : lc > 1 ? "color:blue; font-weight:bold;" : lc == 1 ? "color:blue;" : (xpath.match(/\[1\]/) && !xpath.match(/text/) && eleal === 1) ? "color:green;" : xpath.match(/@id=|@class/) ? "color:magenta;" : "";
        var esti = xpath.match(/@href=/) ? "href" : lc > 1 ? "last one" : lc == 1 ? "last one" : (xpath.match(/\[1\]/) && !xpath.match(/text/) && eleal === 1) ? "first one" : xpath.match(/@id=|@class/) ? "id/class" : " ";
        document.getElementById('testXPathPossibly').innerHTML = "<span style=\"" + col + "\">" + esti + "</span>";
      }
    }
    storetest(xpath);
    return;
  }

  // バルーン表示
  function popup(txt, unRCtxt = null, posele, mode) {
    console.log(mousey + "\n" + document.documentElement.clientHeight + "\n" + window.innerHeight)
    let eler = posele.getBoundingClientRect();
    let boxPos = ((mousey < Math.min(window.innerHeight, document.documentElement.clientHeight) / 2) ? "bottom:0px;" : "top:0px;") + ((mousex < document.documentElement.clientWidth / 2) ? "right:0px; " : "left:0px;");
    let ele = eleget0("//table[@id='0key']");
    if (ele) ele.parentElement.removeChild(ele);

    // 表ヘッダ
    let lists = document.createElement('table');
    var line = document.createElement('tr');
    line.innerHTML += "<th style='text-align:center; padding:0 8px; white-space: nowrap;'>Hits</th><th style='text-align:center; padding:0 8px; white-space: nowrap;'>Possibly</th><th style='text-align:center; padding:0 8px;'>XPath " + (mode != 9 && excludeRE ? "<span style='color:red;float:right;padding:0 4px;'>-" + excludeRE : "") + "</span>" + (requireRE ? "<span style='color:blue;float:right;padding:0 4px;'>+" + requireRE + "</span>" : "") + "</span>" + (mode == 0 ? "<span style='color:darkgreen;float:right;padding:0 4px;'>=" + requireHits + "</span>" : "") + "</th>";
    lists.appendChild(line);

    // エディットエリア
    var editableline = document.createElement('tr');
    lists.appendChild(editableline);
    editableline.innerHTML += "<th style='text-align:center; vertical-align:middle; padding:0 8px; white-space: nowrap;' id='testXPathResult'>test</th><th style='text-align:center; vertical-align:middle; padding:0 8px; white-space: nowrap;' id='testXPathPossibly'> </th><th><textarea rows='1' style='width:95%; min-width:600px;lineHeight:1.0; ' id='testXPath'>" + /* txt[txt.length - 1] */ "" + "</textarea></th>";
    editableline.onclick = function() { arguments[0].stopPropagation(); return false; }
    editableline.onmouseover = function() {
      if (eleget1(eleget0('//textarea[@id="testXPath"]').value) != "Err") {
        storetest(eleget0('//textarea[@id="testXPath"]').value);
        this.style.backgroundColor = '#ffffff';
      }
    }
    editableline.onmouseout = function() {
      if (eleget1(eleget0('//textarea[@id="testXPath"]').value) != "Err") {
        writebacktest();
        this.style.backgroundColor = '';
      }
    }
    editableline.addEventListener('input', function(e) { // エディットエリアが書き換えられた
      putResult(e.target.value.replace(/\\\"/gmi, "\""));
      if (eleget1(e.target.value.replace(/\\\"/gmi, "\"")) != "Err")
        storetest(e.target.value.replace(/\\\"/gmi, "\""));
    }, false);

    function appendAPb(place, text, matchLv) {
      var ele3 = place.appendChild(document.createElement('td'));
      $(ele3).hover(function() { $(this).css('cursor', 'pointer'); }, function() { $(this).css('cursor', 'default'); });
      ele3.innerHTML = text;
      ele3.title = text == "->" ? "set this as nextLink/uAutoPagerize" : "set this as pageElement/uAutoPagerize";
      ele3.style.whiteSpace = "nowrap";
      ele3.style.opacity = 0.5;
      ele3.style.backgroundColor = matchLv ? "#ffaaaa" : "";
      ele3.style.verticalAlign = "middle";
      return ele3;
    }

    var ele3 = appendAPb(editableline, "->");
    ele3.onclick = function(e) {
      let xpath = eleget0('//textarea[@id="testXPath"]').value;
      if (eleget1(xpath) != "Err") {
        for (var sa = 0; sa < 10; sa++) {
          if (eleget1(xpath) != "Err" && eleget0(xpath).tagName == "A") {
            apc();
            ap1 = xpath;
            writeClipboard(xpath);
            if (ap2) { apmake(ap1, ap2); }
            break;
          } else {
            writebacktest();
            xpath += "/..";
            storetest();
          }
        }
        if (sa == 10) {
          alert("Went back to the parent element for 10 generations, but A tag was not found.");
          apc();
          e.stopPropagation();
        }
      }
    }
    var ele3 = appendAPb(editableline, "[]");
    ele3.onclick = function(e) {
      let xpath = eleget0('//textarea[@id="testXPath"]').value;
      if (eleget1(xpath) !== "Err" && eleget0(xpath).nodeType === 1) {
        apc();
        ap2 = xpath;
        writeClipboard(xpath);
        if (ap1) { apmake(ap1, ap2); }
      }
    }

    // 表
    for (let xpath of txt) {
      if (xpath) {
        let ele2 = eleget0(xpath);
        let elea = elegeta(xpath);
        var line = document.createElement('tr');

        // maybe タイプ判定
        let lc = (xpath.match(/last\(\)/g));
        if (lc) lc = lc.length;
        let col = xpath.match(/@href=/) ? "color:red;" : lc > 1 ? "color:blue; font-weight:bold;" : lc == 1 ? "color:blue;" : (xpath.match(/\[1\]/) && !xpath.match(/text/) && elea.length === 1) ? "color:green;" : xpath.match(/@id=|@class/) ? "color:magenta;" : "";
        let esti = xpath.match(/@href=/) ? "href" : lc > 1 ? "last one" : lc == 1 ? "last one" : (xpath.match(/\[1\]/) && !xpath.match(/text/) && elea.length === 1) ? "first one" : xpath.match(/@id=|@class/) ? "id/class" : "";
        var xpathDisp = xpath.replace(/(@id=|@class)/gmi, '<font style="color:magenta;"><b>$1</b></font>'); //.replace(requireRE?RegExp("("+requireRE+")","gmi"):/\0/, '<font style="background-color:#f0f0ff;">$1</font>');
        line.innerHTML = "<td nowrap style=\"text-align:center;" + col + "padding:0 8px;\">" + elegeta(xpath).length + "</td><td style='" + col + "text-align:center; padding:0 8px; white-space: nowrap;'>" + esti + "</td><td style=\"" + col + " text-align:left;\">" + xpathDisp + "</td>";
        line.onmouseover = function() {
          storetest(xpath);
          this.style.backgroundColor = '#ffffff';
        }
        line.onmouseout = function() {
          writebacktest();
          this.style.backgroundColor = '';
        }
        line.onclick = function() {
          var txt = input_key_buffer[17] ? xpath.replace(/\"/gm, "\\\"") : xpath;
          eleget0('//textarea[@id="testXPath"]').value = txt;
          putResult(txt.replace(/\\\"/gmi, "\""));
        }
        line.ondblclick = function() {
          var txt = input_key_buffer[17] ? xpath.replace(/\"/gm, "\\\"") : xpath;
          writeClipboard(txt);
          eleget0('//textarea[@id="testXPath"]').value = txt; //a.value;
          eleget0('//th[@id="testXPathResult"]').innerText = elegeta(txt).length;
          writebacktest();
          $("#testXPath").remove();
          $(panel).hide(400, function() { setTimeout(function() { $(panel).remove() }, 100) });
          panel = null;
        }
        // uAutoPagerize用ボタン
        var ele3 = appendAPb(line, "->", (elegeta(xpath).length < 3) && !!(xpath.match(autoNextLinkDecision)) && !(xpath.match(autoNextLinkDecisionNot)));
        ele3.onclick = function(e) {
          if (eleget1(xpath) != "Err") {
            for (var sa = 0; sa < 10; sa++) {
              if (eleget1(xpath) != "Err" && eleget0(xpath).tagName == "A") {
                apc();
                ap1 = xpath;
                writeClipboard(xpath);
                if (ap2) { apmake(ap1, ap2); }
                break;
              } else {
                writebacktest();
                xpath += "/..";
                storetest();
              }
            }
            if (sa == 10) {
              alert("Went back to the parent element for 10 generations, but A tag was not found.");
              apc();
              e.stopPropagation()
            }
          }
        }
        var ele3 = appendAPb(line, "[]", (elegeta(xpath).length == 1) && !!xpath.match(autoPageElementDecision));
        ele3.onclick = function(e) {
          if (eleget1(xpath) != "Err") {
            apc();
            ap2 = xpath;
            writeClipboard(xpath);
            if (ap1) { apmake(ap1, ap2); }
          }
        }

        function apmake(ap1, ap2) {
          let msi = "\n{\n  url         : '^https?://" + location.href.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)[1].replace(/\./g, "\\\\.") + "',\n  nextLink    : '" + ap1 + "',\n  pageElement : '" + ap2 + "',\n},\n";
          writeClipboard(msi);
          alert("The following has been copied to the clipboard.\n" + msi);
          return;
        }

        function apc() {
          writebacktest();
          $(eleget0('//*[@id="0key"]')).fadeOut(400, function() { setTimeout(function() { $(panel).remove() }, 100) });
        }

        lists.appendChild(line);
      }
    }
    let opa = 0.9;
    panel = document.createElement("div");
    panel.setAttribute("style", "max-width:95%;" + boxPos + " z-index:2147483647; opacity:" + opa + "; text-align:left; line-height:1.1em; position:fixed; font-size:12px; margin:15px;  text-decoration:none; padding:0.5em; outline-radius:7px; background-color:#d0e8ff; color:#000000;  box-shadow:5px 5px 8px #0003; outline:2px solid #fff;");
    panel.appendChild(lists)
    panel.id = "0key";
    EscToHidePanel = document.addEventListener('keydown', function closePanel(e) { // Escでパネルを消す
      if (!e.getModifierState("Alt") && !e.getModifierState("Control") && !e.getModifierState("Shift") && (e.key == "Escape")) {
        //        e.preventDefault();
        if (eleget1(eleget0('//textarea[@id="testXPath"]').value) != "Err") { writebacktest(); }
        $("#testXPath").remove();
        $(panel).hide(400, function() { setTimeout(function() { $(panel).remove() }, 100) });
        this.removeEventListener('keydown', closePanel, false);
        panel = null;
      }
    }, false);

    document.body.appendChild(panel);
    return;
  }

  function writeClipboard(txt) {
    var a = document.createElement("textarea");
    a.value = txt;
    document.body.appendChild(a);
    a.select();
    document.execCommand("copy");
    a.parentElement.removeChild(a);
    return;
  }

  function makecontent(mode, ele) {
    var retStr = [];
    var maxline = window.innerHeight / maxLines;
    var maxtrial = maxline * TryMulti * (mode != 9 ? 32 : 3) * (requireRE > "\0" ? 3 : 1) * ((mode == 0 && requireHits == 1) ? 3 : 1);
    var retStrl = 0;
    hajime();
    for (var i = 0; i < maxtrial && retStrl < maxline; i++) {
      var xp = getElementXPath(mode, ele);
      if (xp && !(mode !== 9 && RegExp(excludeRE, "i").test(xp))) {
        retStr.push(xp);
        var retStr = retStr.sort().reduce(function(previous, current) { if (previous[previous.length - 1] !== current) { previous.push(current); } return previous; }, []).sort(function(a, b) { return a.length - b.length < 0 ? -1 : 1; }); // 重複を削除＆ソート
        retStrl = retStr.length;
      }
    }
    owari();
    console.log("trymax:" + maxtrial + "\nmakemax:" + maxline + "\ntried:" + i + "\nmake:" + retStr.length);
    // 1つは全属性を記述しただけのもの
    if (getAttrOfEle(mode, ele, true)) {
      var path = "//" + ele.tagName + "[" + getAttrOfEle(mode, ele, true) + "";
      retStr.push(path.replace(CancelStyle, cancelrep).replace(CancelStyle, cancelrep));
    }
    // 1つはフルパスを辿っただけのもの
    retStr.push(getElementXPathFullPath(ele).replace(CancelStyle, cancelrep).replace(CancelStyle, cancelrep));
    // 1つはフルパス全属性を辿っただけのもの
    retStr.push(getElementXPathFullpathAndFullproperty(mode, ele).replace(CancelStyle, cancelrep).replace(CancelStyle, cancelrep));

    return retStr;
  }

  function getElementXPath(mode, ele) {
    var path = "";
    var origele = ele;
    for (let i = 0; i == 0 || (ele && ele.nodeType == 1 && Math.random() > 0.5); ele = ele.parentNode, i++) {

      //兄弟番号を調べる
      var ps = getPrevSib(ele);
      var ns = getNextSib(ele);

      var idx = 0;
      var arg = "";
      if (!ns && ps && Math.random() > 0.2) {
        var arg = "[last()]";
      } else
      if (!ps && ns && Math.random() > 0.2) {
        var arg = "[1]";
      } else {
        for (var idx = 1, sib = getPrevSib(ele); sib; sib = getPrevSib(sib)) { idx++; }
      }
      //属性を調べる
      var att = getAttrOfEle(mode, ele);
      if (att) att = "[" + att;
      //背番号かfirst/lastか属性か何も付けないかを32,32,32,4％ずつ
      var rnd = Math.random();
      if ((rnd > 0.68) && arg) var opt = arg;
      else if ((rnd > 0.36) && idx > 1) var opt = "[" + idx + "]";
      else if ((rnd > 0.04) && att) var opt = att;
      else var opt = "";
      path = "/" + ele.tagName.toLowerCase() + (opt) + path;
    }
    if (!path) return "";

    path = "/" + path;
    path = path.replace(CancelStyle, cancelrep).replace(CancelStyle, cancelrep);
    if (requireRE > "" && !(RegExp(requireRE, "i").test(path))) return "";

    let hits = elegeta(path).length; // 検算
    if (hits == 0 || (mode == 8 && hits < 2) || (mode == 0 && requireHits != hits)) return false;
    return path;
  }

  function getAttrOfEle(mode, ele, allFlag = false) {
    if (ele.tagName.match(/html|body/gmi)) return "";
    let attrs = ele.attributes;
    let xp = "";
    let att2 = [];
    for (let att of attrs) {
      if (att.value.length < 100) {
        if (att.name == "class" && Math.random() > 0.9 && !allFlag) {
          att2.push({ name: "contains(@class,", value: "\"" + att.value + "\")" })
        } else {
          att2.push({ name: "@" + att.name + "=", value: "\"" + att.value + "\"" })
        }
      }
    }

    //text
    if (!allFlag) {
      if (Math.random() > (0.7)) {
        if (ele.innerText && !ele.innerText.match(/[\r\n]/)) { att2.push({ name: "text()=", value: "\"" + ele.innerText + "\"" }) }
      } else {
        if (ele.innerText && !ele.innerText.match(/[\r\n]/)) { att2.push({ name: "contains(text(),", value: "\"" + ele.innerText + "\")" }) }
      }
    }

    for (let j = 0; j < att2.length; j++) {
      if ((Math.random() > (allFlag ? 0 : att2[j].name.match(/href/) ? 0.7 : 0.5))) {
        xp += att2[j].name + att2[j].value + " and ";
      }
    }
    xp = xp.replace(/ and $/, "]").replace(/^(.*)\[$/, "$1");
    return xp;
  }

  function getElementXPathFullPath(ele) {
    var path = "";
    for (; ele && ele.nodeType == 1; ele = ele.parentNode) {
      for (var idx = 1, sib = ele.previousSibling; sib; sib = sib.previousSibling) {
        if (sib.nodeType == 1 && sib.tagName == ele.tagName) idx++
      }
      path = "/" + ele.tagName + (!ele.tagName.match(/html|body/gi) ? "[" + idx + "]" : "") + path;
    }
    return path;
  }

  function getElementXPathFullpathAndFullproperty(mode, ele) {
    var path = "";
    for (; ele && ele.nodeType == 1; ele = ele.parentNode) {
      if (getAttrOfEle(mode, ele, true)) { path = "/" + ele.tagName + "[" + getAttrOfEle(mode, ele, true) + path; } else { path = "/" + ele.tagName + path; }
    }
    path = "/" + path;
    return path;
  }

  function str2numMinMax(str, min, max) {
    var ans = Number(str.replace(/[Ａ-Ｚａ-ｚ０-９．]/g, function(s) {
      return String.fromCharCode(s.charCodeAt(0) - 65248);
    }).replace(/[^-^0-9^\.]/g, ""));
    if (ans > max) ans = max;
    if (ans < min) ans = min;
    return ans;
  }

  function eleget0(xpath) {
    try { var ele = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null) } catch (err) { return ""; }
    var ele = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    return ele.snapshotLength > 0 ? ele.snapshotItem(0) : "";
  }

  function eleget1(xpath) {
    if (!xpath) return "Err";
    try { var ele = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null) } catch (err) { return "Err"; }
    return ele.snapshotLength > 0 ? ele.snapshotItem(0) : ele;
  }

  function elegeta(xpath, node = document) {
    try { var ele = document.evaluate("." + xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null) } catch (err) {
      var ele = "err";
    }
    var array = [];
    for (var i = 0; i < ele.snapshotLength; i++) array[i] = ele.snapshotItem(i);
    return array;
  }

  function getNextSib(ele) { // 同じタグの弟ノードを走査
    if (!ele.nextElementSibling) return null;
    let orgtag = ele.tagName;
    do {
      ele = ele.nextElementSibling;
      if (!ele) return null;
      if (ele.tagName == orgtag) return ele;
    } while (1)
    return null;
  }

  function getPrevSib(ele) { // 同じタグの兄ノードを走査
    if (!ele.previousElementSibling) return null;
    let orgtag = ele.tagName;
    do {
      ele = ele.previousElementSibling;
      if (!ele) return null;
      if (ele.tagName == orgtag) return ele;
    } while (1)
    return null;
  }

  function proInput(prom, defaultval, min, max = Number.MAX_SAFE_INTEGER) {
    return Math.min(Math.max(
      Number(window.prompt(prom, defaultval).replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 65248);
      }).replace(/[^-^0-9^\.]/g, "")), min), max);
  }

  var start_ms;

  function hajime() { start_ms = new Date().getTime(); }

  function owari() {
    var elapsed_ms = new Date().getTime() - start_ms;
    console.log('処理時間:' + elapsed_ms / 1000 + "秒");
  }
})();
