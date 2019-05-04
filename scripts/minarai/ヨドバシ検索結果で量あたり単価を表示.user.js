// ==UserScript==
// @name ヨドバシ検索結果で量あたり単価を表示
// @description Shift+a:量当たり単価上限で絞り込み .:価格上限入力フォームにフォーカス
// @match *://*.yodobashi.com/*
// @version 0.1
// @grant none
// @namespace https://greasyfork.org/users/181558
// ==/UserScript==

(function() {

  var debug = 0;
  var debug2 = 0;
  const enableBeta = 1;

  if (debug) {
    var ele = document.body.appendChild(document.createElement("span"));
    ele.outerHTML = '<span style="all:initial; position: fixed; right:3em; bottom: 1em; z-index:2147483647; opacity:1; font-size:90%; font-weight:bold; margin:0px 1px; text-decoration:none !important; text-align:center; padding:1px 6px 1px 6px; border-radius:12px; background-color:#6080ff; color:white; white-space: nowrap; ">debug1' + '</span>';
  }
  if (debug2) {
    var ele = document.body.appendChild(document.createElement("span"));
    ele.outerHTML = '<span style="all:initial; position: fixed; right:3em; bottom: 4em; z-index:2147483647; opacity:1; font-size:90%; font-weight:bold; margin:0px 1px; text-decoration:none !important; text-align:center; padding:1px 6px 1px 6px; border-radius:12px; background-color:#6080ff; color:white; white-space: nowrap; ">debug2' + '</span>';
  }

  var isorder = location.href.match(/https?:\/\/order\./);
  var issearch = location.href.match(/[\?\&]word\=/);
  var iscate = location.href.match(/category\//);
  var isproduct = location.href.match(/\/product\//);
  var parentLimit = isorder ? 5 : 4;

  const titleXPath = '//div[@class="pName"]/p[2]|.//h1[@id="products_maintitle"]/span|.//span[@class="js_c_commodityName"]|.//a[@id="LinkProduct01"]|.//div[@class="product js_productName"]|.//a[@class="js_productListPostTag js-clicklog js-taglog-schRlt"]/p[2]';
  const priceXPath = '//span[@class="productPrice"]|.//span[@id="js_scl_unitPrice"]|.//div[@class="price red"]/strong|.//li[@class="Special"]/em|.//span[@class="red js_ppSalesPrice"]';
  const pointrateXPath = '//span[@class="spNone"]|.//span[@id="js_scl_pointrate"]|.//div[@class="point orange"]|.//li[@class="Point"]|.//span[@class="orange js_ppPoint"]|.//div[@class="pInfo liMt05"]/ul/li/span[@class="orange ml10"]';

  if (issearch || iscate) {
    var cppLimit = sessionStorage.getItem("cppLimit") || 0;
    document.addEventListener("keydown", function(e) {
        if (/input|textarea/i.test(e.target.tagName)) return;
        var pressed = (e.ctrlKey ? 'c-' : '') + (e.altKey ? 'a-' : '') + (e.shiftKey ? 's-' : '') + String(e.key);
        if (pressed == "s-A") { // shift+a 量あたり価格上限
          e.preventDefault();
          cppLimit = proInput("量あたり価格上限を入力してください", cppLimit);
          sessionStorage.setItem("cppLimit", cppLimit || "") || 0;
          location.reload();
        }
        if (pressed == ".") { // . 価格上限にフォーカス
          let ele = eleget0('//input[@id="js_upperPrice" and @name="upper"]');
          e.preventDefault();
          if (ele) {
            ele.focus();
            ele.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
          }
          console.log(pressed)
        }
      },
      false);
  }

  const niwait = 0 //50;
  setTimeout(() => { run(document); }, niwait);
  document.body.addEventListener('DOMNodeInserted', function(evt) { setTimeout(() => { run(evt.target); }, niwait); }, false);

  function run(node) {
    for (let titleEle of elegeta(titleXPath, node)) {

      var rndcolor = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);

      var title = titleEle.innerText
      if (titleEle.dataset.yCpP) continue;
      else titleEle.dataset.yCpP = "1";

      debugEle(titleEle, rndcolor);

      var parentEle = titleEle;

      for (var i = 0; i < parentLimit; i++) {
        parentEle = parentEle.parentNode;
        let f = elegeta(priceXPath, parentEle).length;
        if (f == 1) break;
        if (f > 1) i = parentLimit + 1;
      }
      if (i > parentLimit) continue;

      debugEle(parentEle, rndcolor);

      if (i == parentLimit) continue;

      if ((issearch || isproduct || iscate) && ((parentEle.parentNode.innerText)).match(/内蔵SSD|外付けSSD/)) {
        var ele = parentEle.parentNode.insertBefore(document.createElement("a"), parentEle.nextSibling);
        var iflsite = (Math.random() > 0.0) ? "https://duckduckgo.com/?q=!ducky+" : "https://www.google.com/webhp?#btnI=I&q=";
        ele.innerHTML += ' <a rel=\"noopener noreferrer nofollow\" href="' + iflsite + titleEle.innerText.split(" ")[0].replace(/\/JP|JP/gm, "") + '%20site:ssd.userbenchmark.com" style="font-weight:bold; font-size:80%;display:inline-block;margin:1px 3px;  padding:0.03em 0.5em 0.03em 0.5em; border-radius:99px; background-color:#609070; color:white; white-space: nowrap; ">UserBenchmark</a>';
      }

      var priceEle = eleget0(priceXPath, parentEle);
      if (!priceEle) continue;
      debugEle(priceEle, rndcolor);
      var price = Number(priceEle.innerText.match(/\D([0-9\,]+)/)[1].replace(/\,/g, ""));

      var pointEle = eleget0(pointrateXPath, parentEle);
      if (pointEle) {
        var pointtext = pointEle.innerText.replace(/\,/g, "");
        if (pointtext.match(/([0-9]+)(?:％)/)) {
          debugEle(pointEle, rndcolor);
          var pointPer = Number(pointtext.match(/([0-9,]+)(?:％)/)[1] / 100);
        } else
        if (pointtext.match(/([0-9]+)(?:ポイント)/)) {
          debugEle(pointEle, rndcolor);
          var pointPer = Number(pointtext.match(/([0-9]+)(?:ポイント)/)[1] / price);
          /* if (debug) */
          pointEle.innerHTML += "<span style='background-color:#fff8e8;'>(" + Math.round(pointPer * 100) + "%？)</span>";
        }
        if (pointPer) {
          var point = Math.ceil(price - (price * (price / (price + price * pointPer))));
          var pricef = Math.round(price - point).toLocaleString();

          if (enableBeta) priceEle.innerHTML += " <span style='background-color:#fff0f0;'>" + (isorder ? "<br>還元後:" : "（還元後：") + "￥" + pricef + (isorder ? "" : "）") + "</span>";
        }
      } else { var point = -1; }

      if (title.match(/USBメモリ|(外付け|外付|ポータブル|内蔵|バルク|接続)(SSD|HDD|ハードディスク)|バルクドライブ|2\.5.?(inc|インチ)|7mm|9.5mm/) || ((isproduct || issearch) && ((parentEle.innerText)).match(/(内蔵|外付け|ポータブル)(SSD|HDD|ハードディスク)/)))
        var ryou = title.replace(/\,/g, "").match(/\D([0-9\.]+)(mg|㎎|g|ml|mL|枚|粒|錠|包|杯|本|個|袋|ml|GB)|(?:[^A-Z0-9\.\-])([0-9\.]+)(L|kg|㎏|Kg|TB)/);
      else
        var ryou = title.replace(/\,/g, "").match(/\D([0-9\.]+)(mg|㎎|g|ml|mL|枚|粒|錠|包|杯|本|個|袋|ml)|(?:[^A-Z0-9\.\-])([0-9\.]+)(L|kg|㎏|Kg)/);

      if (cppLimit > 0 && (!ryou)) { debugRemove(parentEle.parentNode); continue; }
      if (ryou && (ryou[1] > 0 || ryou[3] > 0)) {
        if (ryou[4]) ryou[4] = ryou[4].replace(/kg|㎏|Kg/, "g").replace(/L/, "ml").replace(/TB/, "GB");
        var ryout = Number(ryou[1]) || Number(ryou[3]) * 1000;
        if (title.match(/×[0-9\.\,]+/m) && !(title.match(/[\(（\[].*×.*[\)）\]]/m)) && !(title.match(/×[\d\s]*(cm|mm)/))) { ryout *= Number(title.match(/×([0-9\.\,]+)/)[1]); }

        if (point > -1) {
          var ppr = Math.round(100 * (price - point) / Number(ryout)) / 100;

          titleEle.innerHTML += ' <span style="all:initial; display:inline-block; font-weight:bold; font-size:90%;margin:0.5px 3px 0.5px 3px; text-decoration:none !important;  padding:0.03em 0.5em 0.03em 0.2em; border-radius:99px; background-color:#6080b0; color:white; white-space: nowrap; ">￥' + ppr + '/' + (ryou[2] || ryou[4]) + '</span>';

          if ((iscate || issearch) && cppLimit && ppr > cppLimit) debugRemove(parentEle.parentNode);
        }
      }
    }
  }

  function elegeta(xpath, node = document) {
    var ele = document.evaluate("." + xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var array = [];
    for (var i = 0; i < ele.snapshotLength; i++) array[i] = ele.snapshotItem(i);
    return array;
  }

  function eleget0(xpath, node = document) {
    var ele = document.evaluate("." + xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    return ele.snapshotLength > 0 ? ele.snapshotItem(0) : "";
  }

  function proInput(prom, defaultval, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
    var inp = window.prompt(prom, defaultval);
    if (!inp) return undefined;
    return Math.min(Math.max(Number(inp.replace(/[Ａ-Ｚａ-ｚ０-９．]/g, function(s) { return String.fromCharCode(s.charCodeAt(0) - 65248); }).replace(/[^-^0-9^\.]/g, "")), min), max);
  }

  function debugEle(ele, col) {
    if (debug) {
      ele.style.outline = "3px dotted " + col;
      ele.style.boxShadow = " 0px 0px 4px 4px " + col + "30, inset 0 0 100px " + col + "20"
    }
  }

  function debugRemove(ele) {
    if (debug2) { ele.style.opacity = "0.5"; } else ele.remove();
  }
})()
