// ==UserScript==
// @name        TED Talksを楽しむ
// @description TEDで講演者名でAmazon検索リンク追加、URLからパラメータを除去、ページタイトルの最初の:を除去　Google検索結果とted-jaにTED Talk日本語書き起こし記事を検索するリンクを設置
// @include     *://www.google.tld/search?*
// @include     *://www.ted.com/talks/*
// @match       *://www.ted-ja.com/*
// @version     0.3.3
// @grant       none
// @namespace https://greasyfork.org/users/181558
// ==/UserScript==

(function() {
  let a;
  if (/^https?:\/\/www\.ted\.com\/talks\//.test(location.href)) {
    a = document.title.match(/.*(?=「)|[；:]?.*(?=[：:])/); // 講演者名をタイトルからも取得を試みる
    if (a) {
      var author1 = a;
    }
    var ele = eleget0('//meta[@name="author"]');
    if (ele.content || author1) { //alert(ele.content || author1)
      var node = document.body.appendChild(document.createElement('span'));
      node.innerHTML = "<a href=\"https://www.amazon.co.jp/s/url=search-alias%3Daps&field-keywords=" + (ele.content || author1) + "\" rel=\"noopener noreferrer nofollow\" >Amazonで" + (ele.content || author1) + "を検索</a>";
      node.setAttribute("style", "max-width:95%; right:0; bottom:0; z-index:2147483647; opacity:" + 0.9 + "; text-align:left; line-height:1.1; position:fixed; font-size:15px; margin:8px;  text-decoration:none; padding:8px 8px; border-radius:7px; background-color:#eeffff; color:#0000ff;  box-shadow:5px 5px 8px #0004; border:2px solid #fff; font-family: 'MS UI Gothic','Meiryo UI','Yu Gothic UI','Arial',sans-serif;");
    }

    setInterval(function() {
      document.title = document.title.replace(/^[：:] /, "");
    }, 3000);
  }

  addLink2(/^https?:\/\/www\.google\..*\/search\?/, "//div[@id='hdtbSum']", "", "　", "TED", "", /.site:https:\/\/www\.ted\.com\/talks\/\*\/transcript.language=ja/, "https://www.google.co.jp/search?q=***%20site:https://www.ted.com/talks/*/transcript%3Flanguage=ja&lr=lang_ja");

  // ted-jaにリンク追加
  if (/^https?:\/\/www\.ted-ja\.com\//.test(location.href)) {
    domNI();
    document.body.addEventListener('AutoPagerize_DOMNodeInserted', function(evt) {
      domNI(evt.target);
    }, false); // uAutoPagerizeの継ぎ足し部分だけに付ける
  }

  var txt1 = location.href;
  var txt2 = txt1;
  if (/^https?:\/\/www\.ted\.com\/talks/.test(txt1)) // URLのパラメータ除去
    txt2 = deleteParam(["awesm=", "utm_medium=", "share=", "utm_source=", "utm_campaign=", "utm_content=", "source=", "embed=", "t-", "frm_id=", "device_id=", "fb_action_ids=", "action_type_map=", "action_object_map=", "fb_source=", "fb_action_types", "action_ref_map=", "ref=", "refid=", "_ft_=", "guid="], txt1);
  window.history.pushState(null, null, txt2);

  return;

  function addLink2(site, placexpath, terms, beforetitle, title, append, deleteoption, option) {
    if (site.test(location.href) === false) return;
    var place = eleget0(placexpath);
    if (!place) return;
    var ele = place.appendChild(document.createElement('span'));
    ele.innerHTML = beforetitle + "<a href=\"" + option.replace('***', eleget0('//input[@aria-label="検索"]').value.replace(deleteoption, "")) + "\"" + " rel=\"noopener noreferrer nofollow\" >" + title + "</a>" + append;
    return;
  }

  function domNI(node = document) {
    addLink(node, "ted-ja", '//h3[@class="post-title entry-title"]', "<a href='https://www.google.com/webhp?#btnI=I&q=***%20site:https://www.ted.com/talks/*/transcript%3Flanguage=ja&lr=lang_ja' rel=\"noopener noreferrer nofollow\" >TEDで読む</a>");
  }

  function addLink(node, inurl, xpath, newurl) {
    if (location.href.indexOf(inurl) == -1) return
    for (let ele of elegeta(xpath, node)) {
      var link = document.createElement("span");
      link.innerHTML = newurl.replace("***", encodeURIComponent(ele.innerText));
      var bgcol = "background-color:#c9e9ff;";
      link.setAttribute("style", "font-size:14px; font-weight:bold; margin:2px;  text-decoration:none; text-align:center; padding:1px 7px 1px; border-radius:5px; " + bgcol);
      ele.appendChild(link);
    }
    return;
  }

  function elegeta(xpath, node = document) {
    var ele = document.evaluate("." + xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var array = [];
    for (var i = 0; i < ele.snapshotLength; i++) array[i] = ele.snapshotItem(i);
    return array;
  }


  function eleget0(xpath) {
    var ele = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    return ele.snapshotLength > 0 ? ele.snapshotItem(0) : "";
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


})();
