// ==UserScript==
// @name         YouTubeとニコニコ動画にRSSリンクを追加
// @description  YouTube：ユーザー、マイリスト、チャンネル　ニコニコ動画：ユーザー、マイリスト、タグ　reddit：キーワード検索結果、サブレディット、スレッド
// @version      0.3
// @run-at       document-idle
// @match  *://www.youtube.com/playlist?list=*
// @match  *://www.youtube.com/channel/*
// @match  *://www.youtube.com/user/*
// @match  *://www.nicovideo.jp/user/*
// @match  *://www.nicovideo.jp/mylist/*
// @match  *://www.nicovideo.jp/tag/*
// @match  *://www.nicovideo.jp/related_tag/*
// @match  *://www.nicovideo.jp/search/*
// @match  *://www.nicovideo.jp/watch/*
// @match  *://www.nicovideo.jp/mylist_search/*
// @match  *://www.reddit.com/*
// @grant none
// @namespace https://greasyfork.org/users/181558
// ==/UserScript==

(function() {
  var rssICON = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABdUlEQVQ4ja3TL2iWURTH8c+VJwwxjjeMBQUxGRdkGESHBothw3CDwfTaFiwDm1MQViyiQRG8iviCYBAGKg60GEwm/2AZQ8bixIXxXsNzH717dSLiKYdzOHzv+Z17TsjJcdzEOBrs0VrnOxtWfhsb6IecfMBB/2Yfm/IyPMXbAjuKyb8A9JrSNqyE6BrkBKZxEWf+AGhCTr5iL+7hDt6FaL2ryMkM7mLiN4CtkJNvGKuSQ7zBEgYhkpNJPMehUUA96VuYw3XsxyMs52Q8RKs4gbXRFmrApxANQjSPA7iMGaxUkHOjgFrCSzzEkxDbl3Iyiwd4gVNFzmM/B7tDwjHcwOecLOREiAa4gpOYLXVLu0kYYoBnWMRCyV/FF8yX+BVWa0C3ordDNBei09qlupSTiRBt4T6O5KQX4g/IL4DNqpvNMpdO6+tSe7jE77uuG+1hwIWygWOV3rM52af9FTifkylMlXj7vxxTXzv9np3nvJt157yO/nf0A3GlIF+BggAAAABJRU5ErkJggg==">';
  setTimeout(addLinks, 20);

  //ページ継ぎ足しアドオンに対応
  if (location.href.match(/related_tag|mylist_search/)) document.addEventListener("AutoPagerize_DOMNodeInserted", addLinks);

  //AutoPagerize系アドオンでuserやタグページを継ぎ足した時に２ページ目以降のリンクがおかしくなるのを修正
  //userページ
  if (location.href.match(/www.nicovideo.jp\/user/)) document.addEventListener("AutoPagerize_DOMNodeInserted", function() {
    for (let ele of elegeta("//div[@class='section']/h5/a[contains(@href,'https://www.nicovideo.jp/user/')]"))
      ele.href = "https://www.nicovideo.jp/watch/" + ele.href.replace(/https?:\/\/www.nicovideo.jp\/user\/\d*\/watch\//, "");
  });
  //related_tagページ
  if (location.href.match(/www.nicovideo.jp\/related_tag/)) document.addEventListener("AutoPagerize_DOMNodeInserted", function() {
    for (let ele of elegeta("//a[contains(@href,'https://www.nicovideo.jp/related_tag/tag/')]"))
      ele.href = "https://www.nicovideo.jp/tag/" + ele.href.replace(/https?:\/\/www.nicovideo.jp\/related_tag\/tag\//, "");
  });

  redini();

  function redini() {
    for (let ele of elegeta('//*[@class="rrss"]')) ele.remove();
    if (location.href.match(/https?:\/\/www\.reddit\.com\/.+/gmi)) { // reddit thread
      var url = location.href + (location.href.match(/\/$/) ? ".rss" : "/.rss");
      embedAD(eleget0('//div[@data-test-id="post-content"]/div/span/h2|//div[@data-test-id="post-content"]/div[3]/span/h2'), url);
    }
    if (location.href.match(/https?:\/\/www\.reddit\.com\/[^\/]+\/[^\/]+\/?$/gmi)) { // reddit subreddit
      var url = location.href + (location.href.match(/\/$/) ? ".rss" : "/.rss");
      embedAD(eleget0('//button[@role="navigation"]'), url);
    }
    if (location.href.match(/https?:\/\/www\.reddit\.com\/search\?/gmi) && eleget0('//input[@id="header-search-bar"]')) { // reddit search
      var url = "https://www.reddit.com/search.rss?q=***&sort=new".replace("***", eleget0('//input[@id="header-search-bar"]').value); //)location.href + (location.href.match(/\/$/) ? ".rss" : "/.rss");
      embedAD(eleget0('//input[@id="header-search-bar"]').parentNode.parentNode.parentNode, url, eleget0('//input[@id="header-search-bar"]').value);
    }
    if (location.href.match(/https?:\/\/www\.reddit\.com\//)) {
      document.addEventListener('keydown', function(e) {
        if (e.key == "Enter") setTimeout(redini, 333);
      }, false);
      document.addEventListener('click', function(e) {
        setTimeout(redini, 1333);
      }, false);
    }
  }

  return;

  function embedAD(place, url, title = "") {
    if (!place) return;
    var link = document.body.parentNode.insertBefore(document.createElement("link"), document.body);
    link.title = title || place.innerText; //itemName.replace("***", word);
    link.rel = "alternate";
    link.type = "application/rss+xml";
    link.className = "rrss";
    link.href = url; //.replace("***", encodeURIComponent(word.replace(wordtermRE, replaceStr)));

    if (!link.title) return;
    var url = link.href;
    var ele = place.appendChild(document.createElement('span'));
    //    var ele = place.parentNode.insertBefore(document.createElement('span'),place.nextsibling);
    ele.setAttribute("style", "font-weight:normal;");
    ele.className = "rrss";
    let rssICON = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABdUlEQVQ4ja3TL2iWURTH8c+VJwwxjjeMBQUxGRdkGESHBothw3CDwfTaFiwDm1MQViyiQRG8iviCYBAGKg60GEwm/2AZQ8bixIXxXsNzH717dSLiKYdzOHzv+Z17TsjJcdzEOBrs0VrnOxtWfhsb6IecfMBB/2Yfm/IyPMXbAjuKyb8A9JrSNqyE6BrkBKZxEWf+AGhCTr5iL+7hDt6FaL2ryMkM7mLiN4CtkJNvGKuSQ7zBEgYhkpNJPMehUUA96VuYw3XsxyMs52Q8RKs4gbXRFmrApxANQjSPA7iMGaxUkHOjgFrCSzzEkxDbl3Iyiwd4gVNFzmM/B7tDwjHcwOecLOREiAa4gpOYLXVLu0kYYoBnWMRCyV/FF8yX+BVWa0C3ordDNBei09qlupSTiRBt4T6O5KQX4g/IL4DNqpvNMpdO6+tSe7jE77uuG+1hwIWygWOV3rM52af9FTifkylMlXj7vxxTXzv9np3nvJt157yO/nf0A3GlIF+BggAAAABJRU5ErkJggg==">';
    //    ele.innerHTML = " <a style='float:right;' href=" + link.href + " rel=\"noopener noreferrer nofollow\" title='" + link.title + "'>" + rssICON + "</a>";
    ele.innerHTML = " <a href=" + link.href + " rel=\"noopener noreferrer nofollow\" title='" + link.title + "'>" + rssICON + "</a>";

  }

  //実際にリンクを付ける
  function addLinks() {

    //「新しいタブで開く」指定を外す
    for (let ele of elegeta('//a[@target="_blank"]')) ele.removeAttribute("target");

    //前回つけたリンクがあれば除去
    for (let ele of elegeta("//span[@class='multirss']|//a[@class='multirss']")) ele.parentNode.removeChild(ele);

    addRSSlink("://www.youtube.com/playlist?list=", '//a[@class="yt-simple-endpoint style-scope yt-formatted-string"]|//a[@class="yt-simple-endpoint style-scope yt-formatted-string cleaned"]', '<a href="https://www.youtube.com/feeds/videos.xml?playlist_id=***">*RSS Feed*</a>', "list=");
    addRSSlink("://www.youtube.com/channel/", '//span[@id="channel-title"]', '<a href="https://www.youtube.com/feeds/videos.xml?channel_id=***">*RSS Feed*</a>', "channel/");
    addRSSlink("://www.youtube.com/user/", '//span[@id="channel-title"]', '<a href="https://www.youtube.com/feeds/videos.xml?user=***">*RSS Feed*</a>', "user/");
    addRAD("://www.youtube.com/channel/", '//span[@id="channel-title"]', 'https://www.youtube.com/feeds/videos.xml?channel_id=***', "channel/");
    addRAD("://www.youtube.com/user/", '//span[@id="channel-title"]', 'https://www.youtube.com/feeds/videos.xml?user=***', "user/");
    addRAD("://www.youtube.com/playlist", '//a[@class="yt-simple-endpoint style-scope yt-formatted-string"]|//a[@class="yt-simple-endpoint style-scope yt-formatted-string cleaned"]', 'https://www.youtube.com/feeds/videos.xml?playlist_id=***', "list=");

    var nicodeleteOpt = /[\?&]f_range=.|[\?&]l_range=.|[\?&]opt_md=.*|[\?&]start=.*|[\?&]end=.*|[\?&]ref=[^&]*|[\?&]sort=.|[\?&]order=.|[\?&]page=\d*|[\?&]track=[^&]*|#+.*/g;
    addRSSlink("www.nicovideo.jp/user/", '//div[@class="profile"]', '<a href="https://www.nicovideo.jp/user/***/video?rss=2.0">*RSS Feed*</a>', "/user/", "", nicodeleteOpt);
    addRSSlink("www.nicovideo.jp/mylist/", '//div[@id="SYS_box_mylist_header"]/div/h1', '<a href="https://www.nicovideo.jp/mylist/***">*RSS Feed*</a>', "", "?rss=2.0", nicodeleteOpt);
    addRSSlink("www.nicovideo.jp/tag/", '//header[@class="contentHeader"]/h1/span', '<a href="https://www.nicovideo.jp/tag/***">*RSS Feed*</a>', "", "?sort=f&rss=2.0", nicodeleteOpt);

    addRAD("www.nicovideo.jp/user/", '//div[@class="profile"]', 'https://www.nicovideo.jp/user/***/video?rss=2.0', "/user/", "", nicodeleteOpt);

    addRSSlink2("www.nicovideo.jp/related_tag/", '//table[@class="font12"]/tbody/tr/td/a', '<a href="https://www.nicovideo.jp/tag/***?sort=f&rss=2.0">*RSS Feed*</a>', "", "", nicodeleteOpt);
    addRSSlink2("www.nicovideo.jp/search", "//ul[@class='tags']//a", '<a href="https://www.nicovideo.jp/tag/***?sort=f&rss=2.0">*RSS Feed*</a>', "", "", nicodeleteOpt);
    addRSSlink2("www.nicovideo.jp/tag", "//ul[@class='tags']//a", '<a href="https://www.nicovideo.jp/tag/***?sort=f&rss=2.0">*RSS Feed*</a>', "", "", nicodeleteOpt);
    addRSSlink2("www.nicovideo.jp/watch/", '//a[@class="Link TagItem-name"]', '<a href="https://www.nicovideo.jp/tag/***?sort=f&rss=2.0">*RSS Feed*</a>', "", "", nicodeleteOpt);

    if (/www.nicovideo.jp\/mylist_search\//.exec(location.href))
      for (let ele of elegeta('//div/div/div/div/div/div/p/a')) addRSS(ele, ele.href + "?rss=2.0", ele.innerText);

    return;
  }

  function eleget0(xpath) {
    var ele = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    return ele.snapshotLength > 0 ? ele.snapshotItem(0) : "";
  }

  function elegeta(xpath) {
    var ele = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var array = [];
    for (var i = 0; i < ele.snapshotLength; i++) array[i] = ele.snapshotItem(i);
    return array;
  }

  function addRAD(inurl, xpath, newurl, part, after, urlGarbage = /$^/) { // RSS auto-discoveryを付ける
    if (location.href.indexOf(inurl) == -1) return
    var place = eleget0(xpath);
    var link = place.parentNode.insertBefore(document.createElement("link"), place);
    var url2 = after ? ('<a href="' + url + after + '">*RSS Feed*</a>') : newurl.replace("***", location.href.split(part)[1].match(/[^\?&\/]*/g)[0]);;
    //    link.innerHTML = 'rel="alternate" type="application/rss+xml" title="RSS" href="' + url2 + '"';
    link.rel = "alternate"
    link.type = "application/rss+xml"
    link.title = document.title;
    link.href = url2;
  }

  function addRSS(place, url, title) {
    var link = place.parentNode.insertBefore(document.createElement("a"), place);
    link.href = url;
    link.setAttribute("title", title + "のRSSを購読");
    link.setAttribute("class", "multirss");
    link.innerHTML = rssICON;

    var rac = document.createElement("link");
    rac.rel = "alternate"
    rac.type = "application/rss+xml"
    rac.title = title;
    rac.href = url
    link.appendChild(rac);
  }

  function addRSSlink(inurl, xpath, newurl, part, after, urlGarbage = /$^/) {
    if (location.href.indexOf(inurl) == -1) return
    var ele = eleget0(xpath);
    var text = newurl + location.href.split(part)[1];
    var url = location.href.replace(urlGarbage, "");
    var link = document.createElement("span");
    var url2 = after ? ('<a href="' + url + after + '">*RSS Feed*</a>') : newurl.replace("***", location.href.split(part)[1].match(/[^\?&\/]*/g)[0]);
    var bgcol = "background-color:#c9e9ff;";
    link.setAttribute("title", ele.innerText + "のRSSを購読");
    link.setAttribute("class", "multirss");
    link.innerHTML = url2.replace("*RSS Feed*", rssICON)
    ele.parentNode.appendChild(link);

    addRAD1(ele, url2)

    return;
  }

  function addRSSlink2(inurl, xpath, newurl, part, after, urlGarbage = /$^/) {
    if (location.href.indexOf(inurl) == -1) return
    for (let ele of elegeta(xpath)) {
      var url = location.href.replace(urlGarbage, "");
      var link = document.createElement("span");
      var url2 = newurl.replace("***", encodeURIComponent(ele.innerText));
      var bgcol = "background-color:#c9e9ff;";
      link.setAttribute("title", ele.innerText + "のRSSを購読");
      link.setAttribute("class", "multirss");
      link.innerHTML = url2.replace("*RSS Feed*", rssICON)
      ele.parentNode.insertBefore(link, ele);

      addRAD1(ele, url2)
    }
    return;
  }

  function addRAD1(ele, url2) {
    var rac = document.createElement("link");
    rac.rel = "alternate"
    rac.type = "application/rss+xml"
    rac.title = ele.innerText;
    rac.href = url2.match(/\"(.*)\"/)[1];
    console.log(rac.href)
    ele.appendChild(rac);
  }
})();
