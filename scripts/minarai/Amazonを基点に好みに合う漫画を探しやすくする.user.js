// ==UserScript==
// @name         Amazonを基点に好みに合う漫画を探しやすくする
// @description  Amazonの本の詳細画面に書名や著者名で類似漫画検索、Web漫画アンテナ、試し読み、Calilを検索するリンクを追加します　Amazonで[Shift+L]でcalil都道府県変更、[.]で上限価格指定、[%]で割引率指定
// @version      0.3.14
// @match  *://ruijianime.com/comic/ruiji/ruiji.php\?title=*
// @match  *://ruijianime.com/comic/keyword/*
// @match  *://ruijianime.com/comic/title/*
// @match  *://ruijianime.com/*
// @match  *://www.amazon.co.jp/*
// @match  *://webcomics.jp/*
// @match  *://www.suruga-ya.jp/search\?*
// @match  *://calil.jp/local/search\?*
// @match  *://www.amazon.co.jp/s/*
// @match  *://seiga.nicovideo.jp/comic/*
// @match  *://seiga.nicovideo.jp/watch/mg*
// @match  *://web-ace.jp/*
// @match  *://comic-walker.com/*
// @match  *://sokuyomi.jp/product/*
// @grant none
// @namespace https://greasyfork.org/users/181558
// ==/UserScript==

(function() {

  var calilpref = localStorage.getItem("calilpref") || "tokyo";
  var webmangaantena = '<a href="https://webcomics.jp/search?q=***" rel=\"noopener noreferrer nofollow\" >Web漫画アンテナ</a>';
  var webmangaantenasakusha = '<a href="https://webcomics.jp/search?q=***" rel=\"noopener noreferrer nofollow\" >Web漫画アンテナ</a>';
  var tameshiyomi = '<a href="https://duckduckgo.com/?q=!ducky+***%20%E8%A9%A6%E3%81%97%E8%AA%AD%E3%81%BF%20-dokidokivisual.com" rel=\"noopener noreferrer nofollow\" >試し読み</a>';

  var ruijimanga = '<a href="http://ruijianime.com/comic/ruiji/ruiji.php?title=***" rel=\"noopener noreferrer nofollow\" >類似漫画検索</a>';
  var ruijianime = '<a href="http://ruijianime.com/main/ruiji.php?title=***" rel=\"noopener noreferrer nofollow\" >類似アニメ検索</a>';
  var caariru = '<a href="https://calil.jp/local/search?csid=' + calilpref + '&q=***" rel=\"noopener noreferrer nofollow\" >Calil</a>';
  var amazon = '<a href="https://duckduckgo.com/?q=!ducky+***+amazon" rel=\"noopener noreferrer nofollow\" >Amazon</a>';

  //AmazonでShift+LでCalil都道府県変更
  document.addEventListener("keydown", function(e) {
      if (/input|textarea/i.test(e.target.tagName) || location.href.indexOf("amazon") == -1) return;
      if (e.shiftKey && String.fromCharCode(e.which).toLowerCase() == "l") {
        calilpref = window.prompt("calil検索する図書館の都道府県名を入力してください（例：tokyo）\r\n（参照）https://calil.jp/local/", calilpref) || "tokyo";
        localStorage.setItem("calilpref", calilpref);
        location.reload();
      }
    },
    false);

  document.addEventListener("keydown", function(e) {
      if (/input|textarea/i.test(e.target.tagName) || location.href.indexOf("amazon.co.jp/s?") == -1) return;
      //Amazon検索で[.]で価格上限で絞り込み
      if (e.which === 190) {
        var input = proInput("価格上限(\\)", "0", 0);
        location.href = location.href.replace(/&high-price=.*(?=&)|&high-price=.*(?=$)/, "") + (input > 0 ? "&high-price=" + input : "");
      }
      //Amazon検索で[%]で割引率で絞り込み
      if (e.shiftKey && String.fromCharCode(e.which).toLowerCase() == "5") {
        var input = proInput("割引率(0-99\%)", "0", 0, 100);
        location.href = location.href.replace(/&pct-off=.*(?=&)|&pct-off=.*(?=$)/, "") + (input > 0 ? "&pct-off=" + input + "-" : "");
      }
    },
    false);

  addLinks();
  if (location.href.match(/webcomics|ruijianime|suruga-ya/)) document.addEventListener("AutoPagerize_DOMNodeInserted", addLinks); //ページ継ぎ足しアドオンに対応
  if (location.href.indexOf("calil") != -1) setInterval(calilWiden, 2500);
  return;

  //実際にリンクを付ける
  function addLinks() {

    //前回つけたリンクがあれば除去する
    var ele = eleget("//span[@class='ruijiSc']");
    for (var i = ele.snapshotLength; i--;) {
      ele.snapshotItem(i).parentNode.removeChild(ele.snapshotItem(i));
    }

    if (location.href.indexOf("web-ace") != -1) {
      ele2links("//div[@id='viewerPc' and @class='container container2 container3']/h2|//div[@class='credit']/h1", "", "", [ruijimanga, webmangaantena, tameshiyomi], "float: right;color:#0000ff;", "", /【.*】(?=$)/);
      ele2links("//p[@class='author']/span", "", "", [webmangaantena], " ", "", /漫画：|原作：|キャラクター原案：/);
    }
    if (location.href.indexOf("seiga.nicovideo.jp/comic/") != -1) {
      ele2links('//div[@class="main_title"]/h1', "", "", [ruijimanga]);
      ele2links('//div[@class="author"]/h3/span', "", "", [webmangaantena], "");
    }
    if (location.href.indexOf("seiga.nicovideo.jp/watch/mg") != -1) {
      ele2links('//span[@class="manga_title"]/a', "", "", [ruijimanga, webmangaantena]);
      ele2links('//span[@class="author_name"]', "", "", [webmangaantena], "");
    }
    if (location.href.indexOf("sokuyomi") != -1) {
      ele2links('//div[@class="author"]/a', "", "", [webmangaantena]);
    }
    if (location.href.indexOf("webcomics") != -1) {
      ele2links('//div[@class="entry-title"]/a', "", "", [ruijimanga, tameshiyomi]);
      ele2links('//div[@class="comic-title"]/h2/a', "", "", [ruijimanga, tameshiyomi]);
      ele2links("//div[@class='comic-author']", "", "", [webmangaantenasakusha], "", "作者: ", /作者:\s?|著者:\s?/)
    }
    if (location.href.indexOf("comic-walker.com") != -1) {
      ele2links('//li[@class="bookAuther"]/a', "", "", [webmangaantenasakusha], "", "", "\(著者\)")
    }

    if (location.href.indexOf("ruijianime.com/comic/") != -1) {
      ele2links("//div[@class='origin_one']/h2/a", "", "", [webmangaantena, tameshiyomi]);
      ele2links("//div[@class='sm_one']/h2/a", "", "", [ruijimanga, webmangaantena, tameshiyomi]); // ,"float: right;background-color:#ffffff;"
      ele2links('//p[@class="date ruiji_date"]/span[@class="no_matched"]', "", "", [webmangaantenasakusha], "");
      ele2links('//p[@class="date ruiji_date"]/span[@class="matched"]', "", "", [webmangaantenasakusha], "");
      ele2links('//p[@class="date ruiji_date"]/a', "", "", [webmangaantenasakusha], "");
      ele2links("//div[@id='wrap']/article/div[@class='sm_one_tag_search easy_tag']/h2/a", "", "", [ruijimanga, webmangaantena, tameshiyomi]);
      ele2links("//div[@class='sm_one_tag_search recent_tag']/h2/a|//div[@class='now_one']/h2/a", "", "", [ruijimanga, webmangaantena, tameshiyomi]);
      ele2links('//div[@class="sm_one_tag_search"]/h2/a/strong', "", "", [ruijimanga, webmangaantena, tameshiyomi]);
    }

    if (location.href.indexOf("ruijianime.com/main/") != -1) { // 類似アニメ検索
      ele2links("//div[@class='sm_one']/h2/a", "", "", [ruijianime]); // ,"float: right;background-color:#ffffff;"
      ele2links("//div[@id='wrap']/article/div[@class='sm_one_tag_search easy_tag']/h2/a", "", "", [ruijianime]);
      ele2links("//div[@class='sm_one_tag_search recent_tag']/h2/a|//div[@class='now_one']/h2/a", "", "", [ruijianime]);
      ele2links('//div[@class="sm_one_tag_search"]/h2/a/strong', "", "", [ruijianime]);
    }

    if (location.href.indexOf("suruga-ya") != -1) {
      ele2links("//p[@class='title']/a", "", "", [amazon]);
    }

    if (location.href.indexOf("amazon") != -1) {
      var cate = "";
      var cateEle = eleget0('//span[@class="nav-a-content"]');
      if (cateEle) cate += cateEle.innerText.trim();
      if (!cate) { var cateEle = eleget0('//h1[@id="title"]/span[2]'); if (cateEle) cate += cateEle.innerText.trim(); }

      console.log(cate);
      if (cate.match(/本|Kindleストア|Kindle本|単行本|Kindle版|文庫|コミック/)) { //カテゴリが本かkindleなら
        var amagen = (
          eleget0("//div[@id='wayfinding-breadcrumbs_feature_div']/ul").innerText +
          eleget0("//span[@id='productTitle']").innerText +
          eleget0("//span[@id='ebooksProductTitle']").innerText +
          eleget0('//span[@class="a-button-inner"]/a/span[contains(text(),"コミック")]').innerText +
          eleget0('//span[@class="a-size-medium a-color-secondary a-text-normal"]').innerText).replace(/[\r\n]/g, "");
        if (amagen) {
          var iszasshi = (amagen.match(/雑誌/) != null)
          var comandz = iszasshi ? "comORz" : "";
          if (amagen.match(/コミック(?!・ラノベ)|Kindle本›マンガ|COMICS|漫画文庫/gi) != null && !iszasshi) {
            ele2links("//span[@id='productTitle']", " ", "comORz", [ruijimanga, webmangaantena, tameshiyomi]);
            ele2links("//span[@id='ebooksProductTitle']", " ", "comORz", [ruijimanga, webmangaantena, tameshiyomi]);
            ele2links('//span[@class="author notFaded"]/span/a[@class="a-link-normal contributorNameID"]', "", "comORz", [webmangaantena], "");
            ele2links('//span[@class="author notFaded"]/span/a[@class="a-link-normal contributorNameID cleaned"]', "", "comORz", [webmangaantena], ""); // General URL Cleanerに対応
            ele2links('//span[@class="author notFaded"]/a[@class="a-link-normal"]', "", "comORz", [webmangaantenasakusha], "")
            ele2links('//span[@class="author notFaded"]/a[@class="a-link-normal cleaned"]', "", "comORz", [webmangaantenasakusha], "") // General URL Cleanerに対応
            ele2links("//span[@id='ebooksProductTitle']", " ", "comORz", [caariru]);
            ele2links("//span[@id='productTitle']", " ", "comORz", [caariru]);
          } else {
            ele2links("//span[@id='ebooksProductTitle']", " ", comandz, [caariru]);
            ele2links("//span[@id='productTitle']", " ", comandz, [caariru]);
          }
          ele2links('//span[@class="author notFaded"]/span/a[@class="a-link-normal contributorNameID"]', "", "calilAuthor", [caariru], "");
          ele2links('//span[@class="author notFaded"]/span/a[@class="a-link-normal contributorNameID cleaned"]', "", "calilAuthor", [caariru], ""); // General URL Cleanerに対応
          ele2links('//span[@class="author notFaded"]/a[@class="a-link-normal"]', "", "calilAuthor", [caariru], "");
          ele2links('//span[@class="author notFaded"]/a[@class="a-link-normal cleaned"]', "", "calilAuthor", [caariru], ""); // General URL Cleanerに対応

          // 著者名の下にも出版社名を書き写す
          var ele = eleget0("//li[(b/text()='出版社:')]");
          if (ele) {
            var choshanoshita = eleget0('//div[@id="bylineInfo"]');
            var pub = document.createElement("div");
            if (pub && ele) {
              var pubname = ele.innerText.replace(/出版社: | \(.*/g, "");
              pub.innerHTML = "<span title='クリックすると\"" + pubname + "\"をクリップボードにコピー" + "' onclick='var a = document.createElement(\"textarea\"); a.value = \"" + pubname + "\"; document.body.appendChild(a); a.select(); document.execCommand(\"copy\"); a.parentElement.removeChild(a);'>" + pubname + "</span>";
              choshanoshita.appendChild(pub);
            }
          }
        }
      }
    }

    // 「新しいタブで開く」指定を外す
    var ele = eleget('//a[@target="_blank"]');
    for (var i = ele.snapshotLength; i--;) ele.snapshotItem(i).removeAttribute("target");

    return;
  }

  function eleget0(xpath) {
    var ele = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    return ele.snapshotLength > 0 ? ele.snapshotItem(0) : "";
  }

  function eleget(xpath) {
    return document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  }

  function ele2links(xpath, cutchar1, cutchar2, urlA, styleadd, cutchar3, deleteRE) {

    for (var j = 0; j < urlA.length; j++) {
      var url = urlA[j];
      styleadd = styleadd === undefined ? "float: right;" : styleadd;
      var ele = eleget(xpath);
      if (ele.snapshotLength == 0) return;

      for (var i = ele.snapshotLength; i--;) {
        var text = ele.snapshotItem(i).innerText;
        if (cutchar3 != "")
          if (text.indexOf(cutchar3) != -1) text = text.substr(text.indexOf(cutchar3) + cutchar3.length);
        if (cutchar1 != "") {
          var splitPos = text.search(cutchar2 == "comORz" ? /-|－|―|～|:|：|\(|（| \d|　\d|(\s|　)([0-9]|[０-９])/ : /―|～|\(|（/);
          if (splitPos != -1) text = text.substr(0, splitPos);
        }

        if (url == webmangaantenasakusha) text = text.replace(/\/|／|\,/gmi, " OR ").replace(/先生|原作|原案|脚本|著|著者|漫画|作画|イラスト|キャラクター|画[:：\/／]|作[:：\/／]|絵[:：\/／]|構成|協力|[:：]|[\(（][^）\)]*[）\)]|＝/gmi, "").replace(/　/g, " ").replace(/^ OR | OR $/gmi, "").trim();
        if (url == ruijimanga) text = text.replace("！", "!").replace("？", "?");
        if (url == caariru) text = text.replace(/[\s　:]/g, "");
        if (url == amazon) text = text.replace(/<<.*>>|ランクB）|\[ランクB\]|ランクB\/★未完\)|★ランクB未完\)|ランクB\)/gi, "");
        text = text.replace(/\[雑誌\]/, ""); //amazon
        text = text.replace(deleteRE, ""); //web-ace

        text = text.trim();
        var link = document.createElement("span");
        var url2 = url.replace("***", text);
        var bgcol = "background-color:#c9e9ff;";
        link.setAttribute("style", "-moz-user-select: none; -webkit-user-select: none; -ms-user-select: none; font-size:14px; font-weight:bold; margin:0px 2px;  text-decoration:none; text-align:center; padding:1px 7px 1px; border-radius:5px; " + bgcol + styleadd);
        link.setAttribute("title", text);
        link.setAttribute("class", "ruijiSc");
        link.innerHTML = url2;
        ele.snapshotItem(i).parentNode.appendChild(link);
      }
    }
    return;
  }

  // カーリルの表の幅を広くする
  function calilWiden() {
    var ele = eleget("//div[@class='wrap']");
    for (var i = ele.snapshotLength; i--;) ele.snapshotItem(i).style.maxWidth = "1400px";
    var ele = eleget("//div[@class='target']/h4");
    for (var i = ele.snapshotLength; i--;) {
      ele.snapshotItem(i).style.maxWidth = "1400px";
      ele.snapshotItem(i).style.fontSize = "100%";
    }
    var ele = eleget("//div");
    for (var i = ele.snapshotLength; i--;) ele.snapshotItem(i).style.fontSize = "100%";
    var ele = eleget("//div[@class='target']");
    for (var i = ele.snapshotLength; i--;) ele.snapshotItem(i).style.padding = "20px 0px 0px";
    return;
  }

  function proInput(prom, defaultval, min, max = Number.MAX_SAFE_INTEGER) {
    return Math.min(Math.max(
      Number(window.prompt(prom, defaultval).replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 65248);
      }).replace(/[^-^0-9^\.]/g, "")), min), max);
  }
})();
