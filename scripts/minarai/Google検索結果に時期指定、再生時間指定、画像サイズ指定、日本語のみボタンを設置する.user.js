// ==UserScript==
// @name        Google検索結果に時期指定、再生時間指定、画像サイズ指定、日本語のみボタンを設置する
// @description 画面解像度が高い人向き　ニコ動検索結果にも並べ替えボタンを設置（実験的　Google検索結果にGoogle NewsやTwitter検索へのRSSリンクとRSS Autodiscoveryを埋め込む
// @include     *://www.google.tld/search?*
// @include     *://www.nicovideo.jp/search/*
// @include     *://www.nicovideo.jp/tag/*
// @include     *://www.nicovideo.jp/mylist_search/*
// @match *://www.ebay.com/sch/*
// @version     0.6.4
// @grant       none
// @namespace https://greasyfork.org/users/181558
// ==/UserScript==

(function() {
  addLink("google", "//div[@id='hdtbSum']", "none", "", "全て", "｜", /&tbs=qdr:[hdwmy]/, "");
  addLink("google", "//div[@id='hdtbSum']", "", "", "1時間以内", "｜", /&tbs=qdr:[hdwmy]/, "&tbs=qdr:h");
  addLink("google", "//div[@id='hdtbSum']", "", "", "24時間以内", "｜", /&tbs=qdr:[hdwmy]/, "&tbs=qdr:d");
  addLink("google", "//div[@id='hdtbSum']", "", "", "1週間以内", "｜", /&tbs=qdr:[hdwmy]/, "&tbs=qdr:w");
  addLink("google", "//div[@id='hdtbSum']", "", "", "1ヶ月以内", "｜", /&tbs=qdr:[hdwmy]/, "&tbs=qdr:m");
  addLink("google", "//div[@id='hdtbSum']", "", "", "1年以内", "<DIV></DIV>", /&tbs=qdr:[hdwmy]/, "&tbs=qdr:y");
  addLink("google", "//div[@id='hdtbSum']", "&tbm=vid", "", "動画", "｜", /&tbs=qdr:[hdwmy]/, "");
  addLink("google", "//div[@id='hdtbSum']", "&tbm=vid", "", "4分未満", "｜", /&tbs=dur:[sml]/, "&tbs=dur:s");
  addLink("google", "//div[@id='hdtbSum']", "&tbm=vid", "", "4～20分", "｜", /&tbs=dur:[sml]/, "&tbs=dur:m");
  addLink("google", "//div[@id='hdtbSum']", "&tbm=vid", "", "20分以上", "<DIV></DIV>", /&tbs=dur:[sml]/, "&tbs=dur:l");
  addLink("google", "//div[@id='hdtbSum']", "&tbm=isch", "", "画像", "｜", /&tbs=isz:[iml]/, "");
  addLink("google", "//div[@id='hdtbSum']", "&tbm=isch", "", "アイコンサイズ", "｜", /&tbs=isz:[iml]/, "&tbs=isz:i");
  addLink("google", "//div[@id='hdtbSum']", "&tbm=isch", "", "中", "｜", /&tbs=isz:[iml]/, "&tbs=isz:m");
  addLink("google", "//div[@id='hdtbSum']", "&tbm=isch", "", "大", "　", /&tbs=isz:[iml]/, "&tbs=isz:l");
  addLink("google", "//div[@id='hdtbSum']", "", "", "日本語のみ", "", /&lr=lang_ja/, "&lr=lang_ja");

  var nicoPlace = '//div[@class="message"]|//div[@class="contentBody"]';
  var nicodeleteOpt = /[\?&]f_range=.|[\?&]l_range=.|[\?&]opt_md=.*|[\?&]start=.*|[\?&]end=.*|[\?&]ref=[^&]*|[\?&]sort=.|[\?&]order=.|[\?&]page=\d*|[\?&]track=[^&]*/g;
  addLink("nico", nicoPlace, "", "", "人気高", "｜", nicodeleteOpt, "?sort=h&order=d");
  addLink("nico", nicoPlace, "", "", "おすすめ", "　", nicodeleteOpt, "?sort=p&order=d");
  addLink("nico", nicoPlace, "", "", "投稿新", "｜", nicodeleteOpt, "?sort=f&order=d");
  addLink("nico", nicoPlace, "", "", "投稿古", "　", nicodeleteOpt, "?sort=f&order=a");
  addLink("nico", nicoPlace, "", "", "コメ新", "｜", nicodeleteOpt, "?sort=n&order=d");
  addLink("nico", nicoPlace, "", "", "コメ古", "　", nicodeleteOpt, "?sort=n&order=a");
  addLink("nico", nicoPlace, "", "", "コメ多", "｜", nicodeleteOpt, "?sort=r&order=d");
  addLink("nico", nicoPlace, "", "", "コメ少", "　", nicodeleteOpt, "?sort=r&order=a");
  addLink("nico", nicoPlace, "", "", "再生多", "｜", nicodeleteOpt, "?sort=v&order=d");
  addLink("nico", nicoPlace, "", "", "再生少", "　", nicodeleteOpt, "?sort=v&order=a");
  addLink("nico", nicoPlace, "", "", "マイリス多", "｜", nicodeleteOpt, "?sort=m&order=d");
  addLink("nico", nicoPlace, "", "", "マイリス少", "　", nicodeleteOpt, "?sort=m&order=a");
  addLink("nico", nicoPlace, "", "", "時間長", "｜", nicodeleteOpt, "?sort=l&order=d");
  addLink("nico", nicoPlace, "", "", "時間短", "　", nicodeleteOpt, "?sort=l&order=a");

  addLink("nicovideo.jp/mylist_search/", '//p[@class="font12"]', "", "　<BR>", "人気", "　", nicodeleteOpt, "?sort=p&order=d");
  addLink("nicovideo.jp/mylist_search/", '//p[@class="font12"]', "", "", "動画多", "｜", nicodeleteOpt, "?sort=n&order=d");
  addLink("nicovideo.jp/mylist_search/", '//p[@class="font12"]', "", "", "動画少", "　", nicodeleteOpt, "?sort=n&order=a");
  addLink("nicovideo.jp/mylist_search/", '//p[@class="font12"]', "", "", "更新新", "　", nicodeleteOpt, "?sort=u&order=d");
  addLink("nicovideo.jp/mylist_search/", '//p[@class="font12"]', "", "", "適合率", "　", nicodeleteOpt, "?sort=r&order=d");
  addLink("nicovideo.jp/mylist_search/", '//p[@class="font12"]', "", "", "作成新", "｜", nicodeleteOpt, "?sort=c&order=d");
  addLink("nicovideo.jp/mylist_search/", '//p[@class="font12"]', "", "", "作成古", "　", nicodeleteOpt, "?sort=c&order=a");
  addLink("nicovideo.jp/mylist_search/", '//p[@class="font12"]', "", "", "フォロー多", "　", nicodeleteOpt, "?sort=f&order=d");
  //addLink("","" , "", "", "", "　", , "?");

  setTimeout(() => addAutoDiscovery(), 100);
  //  addAutoDiscovery();

  return;

  function addAutoDiscovery() { // Google検索結果に同じ検索ワードでGoogle NewsかTwitter検索へのRSSリンクとRSS Autodiscoveryを埋め込む
    embedAutoDiscovery('google', "//div[@id='hdtbSum']", '//input[@aria-label="検索"]|//input[@aria-label="Search"]', /^([^@#])/, "$1", "*** | Google ニュース", "https://news.google.com/news/rss/search/section/q/***?ned=jp&hl=ja&gl=JP")
    embedAutoDiscovery('google', "//div[@id='hdtbSum']", '//input[@aria-label="検索"]|//input[@aria-label="Search"]', /^([^@#])/, "$1", "*** | Google News (En)", "https://news.google.com/news/rss/search/section/q/***?ned=us&hl=en&gl=US")
    embedAutoDiscovery('google', "//div[@id='hdtbSum']", '//input[@aria-label="検索"]|//input[@aria-label="Search"]', /^([^@#])/, "$1", "*** | Reddit (En)", "https://www.reddit.com/search.rss?q=***&sort=new")
    //    embedAutoDiscovery('google',"//div[@id='hdtbSum']",'//input[@aria-label="検索"]|//input[@aria-label="Search"]', /(^@)/, "", "*** | TwitRSS Twitterユーザー", "https://twitrss.me/twitter_user_to_rss/?user=***")
    embedAutoDiscovery('google', "//div[@id='hdtbSum']", '//input[@aria-label="検索"]|//input[@aria-label="Search"]', /^([^@])/, "$1", "*** | Queryfeed Twitterキーワード", "https://queryfeed.net/tw?q=***")
    embedAutoDiscovery('google', "//div[@id='hdtbSum']", '//input[@aria-label="検索"]|//input[@aria-label="Search"]', /^([^@])/, "$1", "*** (filter:images OR filter:videos) | Queryfeed Twitterキーワード 画像か動画", "https://queryfeed.net/tw?q=***%20 (filter:images OR filter:videos)")
    //    embedAutoDiscovery('google',"//div[@id='hdtbSum']",'//input[@aria-label="検索"]|//input[@aria-label="Search"]', /^([^@])/, "$1", "*** (filter:videos) | Queryfeed Twitterキーワード 動画", "https://queryfeed.net/tw?q=***%20 (filter:videos)")
    embedAutoDiscovery('google', "//div[@id='hdtbSum']", '//input[@aria-label="検索"]|//input[@aria-label="Search"]', /(^@)/, "from:@", "from:*** | Queryfeed Twitterユーザー名", "https://queryfeed.net/tw?q=***")
    embedAutoDiscovery('google', "//div[@id='hdtbSum']", '//input[@aria-label="検索"]|//input[@aria-label="Search"]', /(^@)/, "from:@", "from:*** (filter:images OR filter:videos) | Queryfeed Twitterユーザー 画像か動画", "https://queryfeed.net/tw?q=***%20 (filter:images OR filter:videos)")
    embedAutoDiscovery('google', "//div[@id='hdtbSum']", '//input[@aria-label="検索"]|//input[@aria-label="Search"]', /^([^@])/, "$1", "*** | Queryfeed Instagram ユーザーネーム", "https://queryfeed.net/instagram?q=***");
    embedAutoDiscovery('google', "//div[@id='hdtbSum']", '//input[@aria-label="検索"]|//input[@aria-label="Search"]', /^([^@])/, "\#$1", "#*** | Queryfeed Instagram ハッシュタグ", "https://queryfeed.net/instagram?q=***");
    embedAutoDiscovery('google', "//div[@id='hdtbSum']", '//input[@aria-label="検索"]|//input[@aria-label="Search"]', /^([^@])/, "$1", "*** | DeviantArt (En) キーワード", "https://backend.deviantart.com/rss.xml?q=***");
    embedAutoDiscovery('google', "//div[@id='hdtbSum']", '//input[@aria-label="検索"]|//input[@aria-label="Search"]', /^([^@])/, "$1", "*** | CiNii 論文検索 キーワード", "https://ci.nii.ac.jp/opensearch/search?q=***&range=2&sortorder=1&start=1&count=20&format=rss");


    embedAutoDiscovery('ebay', '//div[@id="gh-ac-box2"]/input/..', '//div[@id="gh-ac-box2"]/input', /^([^@])/, "$1", "*** | eBay キーワード", "https://www.ebay.com/sch/i.html?_nkw=***&_rss=1");
    return;
  }

  function embedAutoDiscovery(site, place, wordXP, wordtermRE, replaceStr, itemName, url) {
    if (location.href.indexOf(site) == -1) return
    else console.log(site)
    var ele = eleget0(wordXP);
    if (!ele || !(ele.value.match(wordtermRE))) return;
    var word = ele.value;
    if (itemName.match(/\(En\)|ユーザー名|ユーザーネーム|DeviantArt/) && !(word.match(/^[\x20-\x7e]*$/))) return; // google news en や、ユーザー検索なら半角英数以外を含んだらやらない
    console.log(ele, word)
    var link = document.body.parentNode.insertBefore(document.createElement("link"), document.body);
    link.title = itemName.replace("***", word);
    link.rel = "alternate"
    link.type = "application/rss+xml"
    link.href = url.replace("***", encodeURIComponent(word.replace(wordtermRE, replaceStr)));

    var place = eleget0(place);
    //    var place = eleget0("//div[text()='ニュース']|//a[text()='ニュース']");
    if (!place) return;
    var url = link.href;
    var ele = place.appendChild(document.createElement('span'));
    ele.setAttribute("style", "font-weight:normal;");
    let rssICON = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABdUlEQVQ4ja3TL2iWURTH8c+VJwwxjjeMBQUxGRdkGESHBothw3CDwfTaFiwDm1MQViyiQRG8iviCYBAGKg60GEwm/2AZQ8bixIXxXsNzH717dSLiKYdzOHzv+Z17TsjJcdzEOBrs0VrnOxtWfhsb6IecfMBB/2Yfm/IyPMXbAjuKyb8A9JrSNqyE6BrkBKZxEWf+AGhCTr5iL+7hDt6FaL2ryMkM7mLiN4CtkJNvGKuSQ7zBEgYhkpNJPMehUUA96VuYw3XsxyMs52Q8RKs4gbXRFmrApxANQjSPA7iMGaxUkHOjgFrCSzzEkxDbl3Iyiwd4gVNFzmM/B7tDwjHcwOecLOREiAa4gpOYLXVLu0kYYoBnWMRCyV/FF8yX+BVWa0C3ordDNBei09qlupSTiRBt4T6O5KQX4g/IL4DNqpvNMpdO6+tSe7jE77uuG+1hwIWygWOV3rM52af9FTifkylMlXj7vxxTXzv9np3nvJt157yO/nf0A3GlIF+BggAAAABJRU5ErkJggg==">';
    ele.innerHTML = " <a href=" + link.href + " rel=\"noopener noreferrer nofollow\" title='" + link.title + "'>" + rssICON + "</a>";
    return;
  }

  function addLink(site, placexpath, terms, beforetitle, title, append, deleteoption, option) {
    if (location.href.indexOf(site) == -1) return;
    var place = eleget0(placexpath);
    if (!place) return;
    var url = window.location.href;
    if (terms !== "") url = url.replace(/&tbm=.*/, "");
    if (terms !== "none") url = url + terms;
    url = url.replace(deleteoption, '') + option;
    var ele = document.createElement('span');
    ele.setAttribute("style", "font-weight:normal;");
    ele.innerHTML = beforetitle + "<a href=" + url + " rel=\"noopener noreferrer nofollow\">" + title + "</a>" + append;
    place.appendChild(ele);
    return;
  }

  function eleget0(xpath) {
    var ele = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    return ele.snapshotLength > 0 ? ele.snapshotItem(0) : "";
  }

})();
