// ==UserScript==
// @name        何も選択していない状態でCtrl+Cでページのタイトル＋改行＋URL＋改行をクリップボードにコピー
// @description Amazonや静画（漫画）やGoogle検索ならURLのゴミを除去　ニコ動・静画・Web漫画アンテナのマイリスト画面ならリストの列挙をコピー Shift+Cで除去文字列設定　Calil・yahooテレビ・駿河屋・ニコ動検索ならタイトルに検索ワードを挿入 Shift+Tでページタイトル部分後回し文字列設定
// @match       *://*/*
// @version     0.5.10
// @run-at document-idle
// @grant       GM_setClipboard
// @namespace https://greasyfork.org/users/181558
// ==/UserScript==

(function() {

  const cleanUrlFirst = 0; // 1ならページ読み込み時にURLのゴミ除去を行う

  var sakujoRE = localStorage.getItem("ctrlcsakujoRE") || "";
  var cckaisuu = 0;
  var sakujoTitleRE = localStorage.getItem("ctrlcsakujoTitleRE") || "";

  if (cleanUrlFirst) window.history.pushState(null, null, modUrl());


  // Shift+T ページタイトル部分後回し
  if (sakujoTitleRE) {
    var hit = document.title.match(RegExp(sakujoTitleRE, "g"));
    if (hit) document.title = document.title.replace(RegExp(sakujoTitleRE, "g"), "") + " " + hit;
  }
  // 検索ワードをページタイトルの最初に付ける
  addtitle(/^https?:\/\/calil.jp\/local\/search/, "", '//form[@class="search"]/div/input|//input[@id="query"]'); //,'//div[@class="message"]',/$^/," | "); // calil検索
  addtitle(/^https?:\/\/tv\.yahoo\.co\.jp\/search\/\?q=/, "", '//input[@class="generic_inputText floatl"]'); //　yahooテレビ検索
  addtitle(/^https?:\/\/www\.nicovideo\.jp\/mylist_search\//, "", '//input[@id="search_united"]', "", "", " - マイリスト検索 "); //　ニコ動マイリスト検索
  addtitle(/^https?:\/\/www\.jstage\.jst\.go\.jp\/result/, "", '//input[@type="search" and @class="search-input "]'); // J-STAGE詳細検索結果
  if (document.title.indexOf("|") === -1) addtitle(/^https?:\/\/www\.suruga-ya\.jp\/search\?/, "", '//input[@id="searchText"]', '//div[@id="topicPath"]', /駿河屋TOP.≫.|駿河屋TOP/gi); //　駿河屋検索

  document.addEventListener("keydown", function(e) { //キー入力
      if (/input|textarea/i.test(e.target.tagName)) return;
      if (e.shiftKey && !e.altKey && !e.ctrlKey && e.which == 84) { // shift+T ページタイトル部分後回し文字列設定
        var sample = "ありません";
        if (location.href.indexOf("://www.nicovideo.jp") !== -1) sample = "キーワードで動画検索 |キーワードで|」動画|人気の「";
        if (location.href.indexOf("://www.amazon.co.jp") !== -1) sample = "Amazon.co.jp： |Amazon.co.jp: |Amazon \| ";
        var str = prompt("shift+T:\r\n\"" + document.domain + "\" でページタイトルの中で後ろに移動したい文字列を正規表現で入力してください\r\n\r\nこのサイトでの例：\r\n" + sample + "\r\n\r\n現在値：" + sakujoTitleRE + "\r\n", sakujoTitleRE);
        sakujoTitleRE = str === null ? sakujoTitleRE : str;
        if (sakujoTitleRE != "") {
          localStorage.setItem("ctrlcsakujoTitleRE", sakujoTitleRE);
          var hit = document.title.match(RegExp(sakujoTitleRE, "g"));
          if (hit) document.title = document.title.replace(RegExp(sakujoTitleRE, "g"), "") + " " + hit;
        } else {
          localStorage.removeItem("ctrlcsakujoTitleRE");
        }
        return;
      }
      if (e.shiftKey && !e.altKey && !e.ctrlKey && e.which == 67) { // shift+C 除去文字列設定
        var str = prompt("shift+C:\r\n\"" + document.domain + "\" で Ctrl+C 押下時タイトルやURLや選択文字列から除去したい文字列を正規表現で入力してください\r\n\r\n現在値：" + sakujoRE + "\r\n", sakujoRE);
        sakujoRE = str === null ? sakujoRE : str;
        if (sakujoRE != "") {
          localStorage.setItem("ctrlcsakujoRE", sakujoRE);
        } else {
          localStorage.removeItem("ctrlcsakujoRE");
        }
        return;
      }
      if (!e.shiftKey && !e.altKey && e.ctrlKey && e.which == 67) { // ctrl+c
        if (window.getSelection() != "") {
          // 選択文字列がある
          var selection = window.getSelection().toString();
          if (sakujoRE) { // Shift+C 除去文字列があれば除去してコピーも自前でする（なければ改行コード処理の安全のためコピーはブラウザにさせる）
            selection = selection.replace(RegExp(sakujoRE, "gm"), "");
            if (window.getSelection().toString() !== selection) {
              copy2cb(selection);
              e.preventDefault();
            }
          }
          popup("<B>" + selection.length + "文字:</B><BR><pre><code>" + selection + "</code></pre>");
        } else {

          // 選択文字列がない

          var doc = location.href;
          var txt1 = doc;
          var txt2 = txt1;

          var txt2 = modUrl();

          if (/www\.youtube\.com\/embed\//.test(txt1)) txt2 = txt1.replace(/\?.*/, "").replace(/embed\//, "watch?v="); // youtube埋め込みを正規のページに //document.referrer;//

          var ret = (navigator.platform.indexOf("Win") != -1) ? "\r\n" : "\n";
          var title = document.title.replace(/ https?:.*/, "");

          title = title.replace(RegExp(sakujoRE, "g"), ""); // Shift+C 除去文字列を除去

          if (cckaisuu % 2 == 0) {
            if (/www.ytplaylist.com/.test(txt1)) { var pl0 = eleget0('//ul[@id="current-playlist"]/li/span[1]/a'); if (pl0) title += " - " + pl0.innerText; } // ytplaylistなら動画タイトルを入れる
          } else if (cckaisuu % 2 == 1) {
            if (/www.ytplaylist.com/.test(txt1)) {
              var c = elegeta('//ul[@id="current-playlist"]/li/span[1]/a').length;
              title += " - ";
              for (let name of elegeta('//ul[@id="current-playlist"]/li/span[1]/a')) {
                if ((title + name.innerText).length < 120) {
                  title += name.innerText + " - ";
                  c--;
                } else { title += c ? "他" + c : ""; break; }
              }
            }
          }

          if (cckaisuu % 1 == 0) {
            var txt = title + ret + txt2 + ret;
            var bal = "<B>" + title + "</B><BR>" + txt2;
          }
          var sort = "";

          // 列挙するタイプのサイトなら
          if (/seiga\.nicovideo\.jp\/my\/manga\/favorite|webcomics\.jp\/mylist|webcomics\.jp\/bookmark|www\.nicovideo\.jp\/my\/mylist|seiga\.nicovideo\.jp\/my\/clip|www\.nicovideo\.jp\/my\/fav\/|www\.nicovideo\.jp\/my\/channel|www\.nicovideo\.jp\/my\/community|www\.nicovideo\.jp\/my\/top\/all/.test(txt1)) {
            var rekkyo = ['//div[@class="title"]/a', '//div[@class="entry-title"]/a', '//div[@class="mylistVideo"]/h5/a', '//div[@class="illust_box_li cfix"]/div/div[@class="text_ttl"]/a', '//div[@class="outer"]/div/h5/a', '//div[@class="outer"]/h5/a', '//div[@class="log-target-info"]/a', '//div[@class="mylistVideo MylistItem-videoDetail"]/h5/a'];
            txt = ""; //title+ret;
            txt2 = "";
            var num = 0;
            for (let target of rekkyo) {
              var ele = elegeta(target);
              if (cckaisuu % 4 == 1) {
                sort = " 名前";
                ele.sort(function(a, b) { return (a.innerText > b.innerText) ? 1 : -1; });
              }
              if (cckaisuu % 4 == 2) {
                sort = " URL";
                ele.sort(function(a, b) { return (a.href.split(/\/\//g)[1]) > (b.href.split(/\/\//g)[1]) ? 1 : -1; });
              }
              if (cckaisuu % 4 == 3) {
                sort = " URL↑";
                ele.sort(function(a, b) { return (a.href.split(/\/\//g)[1]) < (b.href.split(/\/\//g)[1]) ? 1 : -1; });
              }
              for (let a of ele) {
                //              if (a.style.display=="none"){ // 非表示じゃないやつだけ
                var cleanurl = a.href.replace(/\?track=.*|\?_topic=.*/g, "")
                txt += a.innerText + ret + cleanurl + ret;
                txt2 += a.innerText + "<BR>" + cleanurl + "<BR>";
                num++;
                //              }
              }
            }
            title += " " + num + "件" + sort;
            txt = title + ret + txt;
            var bal = "<B>" + title + "</B><BR>" + txt2;
          }

          // クリップボードにコピー
          copy2cb(txt);

          // バルーン表示
          popup(bal.replace(RegExp(ret, "gmi"), "<br>"));
          e.preventDefault();
        }
        cckaisuu++;
        return;
      }
    },
    false);
  return;

  function elegeta(xpath) {
    var ele = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var array = [];
    for (var i = 0; i < ele.snapshotLength; i++) array[i] = ele.snapshotItem(i);
    return array;
  }

  function eleget0(xpath) {
    var ele = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    return ele.snapshotLength > 0 ? ele.snapshotItem(0) : "";
  }
  // バルーン表示
  function popup(txt) {
    var ele = eleget0("//span[@id='ctrlc']");
    var opa = ele ? 0.9 : 0.8;
    var panel = document.createElement("span");
    panel.setAttribute("style", "max-width:95%; right:0; top:0; z-index:2147483647; opacity:" + opa + "; text-align:left; line-height:1.1; position:fixed; font-size:15px; margin:15px;  text-decoration:none; padding:15px 15px; border-radius:7px; background-color:#000000; color:#ffffff;  box-shadow:5px 5px 8px #0004; border:2px solid #fff; font-family: 'MS UI Gothic','Meiryo UI','Yu Gothic UI','Arial',sans-serif;");
    panel.innerHTML = txt;
    panel.id = "ctrlc";

    document.body.appendChild(panel);
    setTimeout(function() {
      panel.parentElement.removeChild(panel);
    }, 4000);
    return;
  }

  // タイトルに足す
  function addtitle(url, txt1, xpath, optionxpath = "", optionReplaceRE = /$^/, separator = " - ") {
    if (url.test(location.href)) {
      var ele = eleget0(xpath).value;
      if (!ele) {
        ele = eleget0(xpath).innerText;
      }
      var ret = ele.trim() > "" ? ele.trim() + separator : "";
      if (optionxpath && eleget0(optionxpath)) {
        ret += "" + (eleget0(optionxpath).innerText.trim().replace(optionReplaceRE, "")) + " ";
      }
      document.title = ret + document.title;
    }
    return;
  }

  // クリップボードにコピー
  function copy2cb(txt) {
    GM_setClipboard(txt);
    return;
    /*        var a = document.createElement("textarea");
            a.value = txt;
            document.body.appendChild(a);
            a.select();
            document.execCommand("copy");
            a.parentElement.removeChild(a);
      */
  }

  function deleteParam(cutREs, txt1) { //余計なパラメータを除去
    var para = txt1.split(/[&?#]/);
    var txt2 = para[0] + "?";
    var j = 0;
    for (var i = 1; i < para.length; i++) {
      for (let reptxt of cutREs) {
        para[i] = para[i].replace(new RegExp("^" + reptxt + ".*"), "");
      }
      if (para[i] !== "") {
        txt2 += (j++ > 0 ? "&" : "") + para[i];
      }
    }
    return txt2.replace(/\?$/, ""); //行末が?なら削除
  }

  function modUrl() {
    var txt1 = location.href;
    var txt2 = txt1;

    if (/^https?:\/\/www\.amazon\.co\.jp\/|^https?:\/\/www\.amazon\.com\//.test(txt1) && (txt1.indexOf("/dp/") != -1)) // Amazonのパラメータ除去
      txt2 = "https://" + document.domain + "/dp/" + txt1.substr(txt1.indexOf("/dp/") + 4, 10);
    if (/^https?:\/\/www\.amazon\.co\.jp\/|^https?:\/\/www\.amazon\.com\//.test(txt1) && (txt1.indexOf("/ASIN/") != -1)) // Amazonのパラメータ除去
      txt2 = "https://www.amazon.co.jp/dp/" + txt1.substr(txt1.indexOf("/ASIN/") + 6, 10);
    if (/^https?:\/\/www\.amazon\.co\.jp\/|^https?:\/\/www\.amazon\.com\//.test(txt1) && (txt1.indexOf("/gp/product/") != -1)) // Amazonのパラメータ除去
      txt2 = "https://www.amazon.co.jp/dp/" + txt1.substr(txt1.indexOf("/gp/product/") + 12, 10);
    if (/^https?:\/\/www\.amazon\.co\.jp\/gp\/customer-reviews\//.test(txt1)) // Amazonのカスタマーレビューのパラメータ除去
      txt2 = deleteParam(["ref=", "ie=", "ASIN="], txt1).replace(/\/ref=.*/, "");
    txt1 = txt1.replace(/(^https?:\/\/www\.amazon\.co\.jp\/)(.*)(product-reviews\/)/, "$1$3");
    if (txt1.match(/^https?:\/\/www\.amazon\.co\.jp\/.*product-reviews\//)) // Amazonのカスタマーレビューのパラメータ除去
      txt2 = deleteParam(["ref=", "ie=", "ASIN="], txt1).replace(/\/ref=.*/, "");

    if (/^https?:\/\/www\.google\.co\.jp\/search\?|^https?:\/\/www\.google\.com\/search\?/.test(txt1)) // google検索結果のパラメータ除去
      txt2 = deleteParam(["ei=", "oq=", "gs_l=", "hl=", "source=", "sa=", "ved=", "biw=", "bih=", "dpr=", "ie=", "oe=", "client=", "aqs=", "sourceid=", "btgG=", "lr="], txt1);

    if (/^https?:\/\/books\.google\.co\.jp\/books\?/.test(txt1)) // Googleブックス検索のパラメータ除去
      txt2 = deleteParam(["souce=", "ots=", "sig=", "hl=", "sa=", "ved=", "f=", "lpg=", "dq=", "source=", "f=", "v=", cckaisuu % 2 == 0 ? "$^" : "q="], txt1); // q=を残すと検索ワードは残る

    if (/^https?:\/\/www\.ted\.com\/talks/.test(txt1)) // TEDのパラメータ除去
      txt2 = deleteParam(["awesm=", "utm_medium=", "share=", "utm_source=", "utm_campaign=", "utm_content=", "source=", "embed=", "t-", "frm_id=", "device_id=", "fb_action_ids=", "action_type_map=", "action_object_map=", "fb_source=", "fb_action_types", "action_ref_map=", "ref=", "refid=", "_ft_=", "guid="], txt1);

    if (/^https?:\/\/translate\.google\.com\/translate|^https?:\/\/translate\.googleusercontent\.com\/translate_c/.test(txt2)) { // google翻訳のパラメータ除去
      txt2 = (txt2.match(/^https?:\/\/translate\.google\.com\/translate|^https?:\/\/translate\.googleusercontent\.com\/translate_c/)[0] + txt2.match(/[\?&]u=[^&]*/)).replace(/&/, "?");
    }

    if (/^https?:\/\/seiga\.nicovideo\.jp\/comic/.test(txt1)) txt2 = txt1.replace(/\?track=.*|\?_topic.*/, ""); // 静画（マンガ）のパラメータ除去
    if (/^https?:\/\/seiga\.nicovideo\.jp\/watch\/mg/.test(txt1)) txt2 = txt1.replace(/\?track=.*|\?_topic.*/, ""); // 静画（マンガ）のパラメータ除去

    if (/^https?:\/\/www\.nicovideo\.jp\/user/.test(txt1)) txt2 = txt1.replace(/\?_topic.*/, ""); // ニコ動のパラメータ除去
    if (/^https?:\/\/www\.nicovideo\.jp\/tag\//.test(txt1)) txt2 = txt1.replace(/[\?&]ref=[^&]*/, ""); // ニコ動のパラメータ除去
    if (/^https?:\/\/www\.nicovideo\.jp\/search\//.test(txt1)) txt2 = txt1.replace(/\?f_range=0\&l_range=0\&opt_md=\&start=\&end=|[\?&]track=[^&]*/, ""); // ニコ動のパラメータ除去
    txt2 = txt2.replace(RegExp(sakujoRE, "g"), "");
    return txt2;
  }
})();