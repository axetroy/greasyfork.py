// ==UserScript==
// @name         web漫画にショートカットキーを追加
// @description  ←→で前／次のページ　Sでスクロール速度変更　Aで頭出しオンオフ　f [で全画面化　Shift+←→か ] Enter で前の話/次の話に移動　Shift+↑で作品情報ページに戻る　（ニコニコ静画のみ）Cでコメントオンオフ　Hでヘッダ固定追従変更　（作品情報ページで）→で第1話に移動、Enterで最新話に移動、Shift＋↑でパンくずリスト1つ上に移動　Shift+@でインスタントsibling登録
// @version      0.1.2
// @run-at document-idle
// @match *://*.5ch.net/*
// @match *://bokete.jp/*
// @match *://cakes.mu/*
// @match *://cho-animedia.jp/comic_category/*
// @match *://cho-animedia.jp/comic/*
// @match *://ci.nii.ac.jp/*
// @match *://comic-days.com/episode/*
// @match *://tonarinoyj.jp/episode/*
// @match *://shonenjumpplus.com/episode/*
// @match *://kuragebunch.com/episode/*
// @match *://pocket.shonenmagazine.com/episode/*
// @match *://viewer.heros-web.com/episode/*
// @match *://comic.mag-garden.co.jp/*
// @match *://comic.webnewtype.com/contents/*
// @match *://comicpash.jp/*
// @match *://cycomi.com/fw/cycomibrowser/chapter/*
// @match *://daysneo.com/works/*
// @match *://ganma.jp/*
// @match *://hanatsubaki.shiseidogroup.jp/comic*
// @match *://kawaii2ch.com/*
// @match *://leedcafe.com/*
// @match *://manga-park.com/title/*
// @match *://mangacross.jp/comics/*
// @match *://mangahack.com/comics/*
// @match *://matogrosso.jp/*
// @match *://news.mynavi.jp/series/*
// @match *://news.mynavi.jp/article/*
// @match *://rookie.shonenjump.com/series/*
// @match *://rookie.shonenjump.com/users/*
// @match *://ruijianime.com/*
// @match *://sai-zen-sen.jp/comics/twi4/*
// @match *://seiga.nicovideo.jp/watch/*
// @match *://seiga.nicovideo.jp/comic/*
// @match *://souffle.life/author/*
// @match *://souffle.life/manga/*
// @match *://storia.takeshobo.co.jp/manga/*
// @match *://sukupara.jp/*
// @match *://twitter.com/*
// @match *://urasunday.com/*
// @match *://watamote.com/*
// @match *://web-ace.jp/youngaceup/*
// @match *://webcomics.jp/*
// @match *://www.alphapolis.co.jp/manga/*
// @match *://www.comic-essay.com/episode/*
// @match *://www.comicbunch.com/manga/*
// @match *://www.comico.jp/challenge/*
// @match *://www.ebigcomic4.jp/title/*
// @match *://www.ebookjapan.jp/ebj/*
// @match *://www.ganganonline.com/*
// @match *://www.jstage.jst.go.jp/*
// @match *://www.mangabox.me/reader/*
// @match *://www.moae.jp/comic/*
// @match *://*.moae.jp/lineup/*
// @match *://www.nicovideo.jp/*
// @match *://www.sunday-webry.com/series/*
// @match *://www.tatan.jp/*
// @match *://www.zenyon.jp/lib/*
// @match *://yawaspi.com/*
// @grant GM_addStyle
// @require https://code.jquery.com/jquery-3.3.1.min.js
// @namespace https://greasyfork.org/users/181558
// ==/UserScript==
// @match *://*/*

(function() {
  const PopupHelpMS = 4000; // ポップアップの表示時間
  const LogMatch = 0;

  var ButtonBG = 1 ? "background-color:#3050f0;" : ' background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAB1klEQVQoUyWQXU8aQRiFn8GK7K4Vll0+zDYxKR83BXphBZIae9km7Q/obf9Bf2GvGky8aJHgB0KCFFaKCIIrERmUZqdz804y5z1zziNC74/kK8chalkcVSqU9/ep1+skk0n+dDq83NoiGAwym80o5POIzNe+dN0rCoU814MBj4sFbq/HXrGoFlerFUII3u3ucj+bIdb2fkozGsUwDAJCqMetcJiHhwcmkwmGrhNPJAiur3NcqyFin86k/+Xw+prXqRSe56n7m1wO7+6O0XiMFY3SajYplsv/IzUbDbYdB13TmD8+8mJtjU6no5wnt7douk7UNInF4wj746lcLpcqayKRIBAI8Pz8zEWjoQprmkY6nUYAlUoFsf2lKUMbG9x5HqPBgPVQiEw2i67r9Ho9/rou+wcHHB4eYtk2grc/pI+y1Wqp/LlcTtEpFYt0u11CmsbT0xNLKbFjMUTy84W8GQ4plkq02212dnaYTqeKkGmajMdj/Mh+1NHNDWLzwy/pi8xIRPXw7mf0+1dK5DgO8/lcGfhTSokofJvK2nGVcCSi8Lmui24YSpDJZDk/OyVimsrM9jscfF/J39UqtmXhn8vLS1KpFIuFxLItNg2D+skJ956nMP8Dh5ze0yleY8AAAAAASUVORK5CYII=\");';

  const SITEINFO = [{ // ツイ４
    url: '//sai-zen-sen.jp/comics/twi4/',
    sibling: '//article',
    //    header: '//body/header/div[1]',
    atamadashi: '//article[last()]',
    author: '//h3[1]/span[@class="work-author"]'
  }, { // 花椿
    url: '//hanatsubaki.shiseidogroup.jp/comic',
    sibling: '//div/figure/img/../../../../../../../..', //'|//section/div',
    header: '//div[@class="controller"]/div[1]',
    author: '//div[@class="row text-center"]/div[@class="col col-8 col-sm-12 person"]/div[@class="grid"]/div[@class="row text-left"]/div[last()]/h4[1]'
  }, { // web漫画アンテナ
    url: '//webcomics.jp/',
    sibling: '//div[@class="entry"]',
    header: '//div[@id="header"]',
    disableSnapWhenPageIsClicked: 1,
    author: ''
  }, { // bokete
    url: '//bokete.jp/',
    sibling: '//div/div/div[@class="boke"]',
    header: '//div/div[@id="top-bar"]',
    disableSnapWhenPageIsClicked: 1,
    author: ''
  }, { //
    url: '//ruijianime.com/',
    sibling: '//div[@class="sm_one_tag_search recent_tag"]|//div[@class="sm_one"]',
    header: '',
    disableSnapWhenPageIsClicked: 1,
    author: ''
  }, { // コミックぜにょん
    url: '//www.zenyon.jp/lib/',
    sibling: '//div[@id="viewer_content"]/img',
    header: '',
    nextEpisode: '//a/img[@class="btn_next"]/..',
    author: '//p[@class="author"]',
    firstEpisode: '//div/ul[@id="sakuhin_backnumber_ul"]/li[last()]/a[text()="1"]',
    lastEpisode: '//p[@class="sakuhin_btn_new"]/a/img/..',
    pankuzuUp: '//a/img[@alt="作品ページへ" and @class="btn_sakuhin"]/..',
  }, { //
    url: '//souffle.life/manga/',
    sibling: '//div[@class="sf-content_img"]/img',
    header: '//div[@id="sf-scroll_header"]',
    nextEpisode: '//span[@class="sf-next_btn"]/a',
    prevEpisode: '//span[@class="sf-before_btn"]/a',
    firstEpisode: '//section[1]/div[@class="sf-content sf-authors"]/section[@class="sf-content_books_related"]/div/article[3]/div/div[@class="sf-contents_book_read"]/a', ////article[last()]/div/div[@class="sf-contents_book_read"]/a',
    lastEpisode: '//div[@class="alm-reveal"]/article[1]/div[@class="sf-content_book_description"]/div/a',
    pankuzuUp: '//p[@class="sf-content_book_name"]/a',
    author: '//span[@class="sf-author_name"]',
  }, { //
    url: '//souffle.life/author/',
    firstEpisode: '//section[1]/div[@class="sf-content sf-authors"]/section[@class="sf-content_books_related"]/div/article[3]/div/div[@class="sf-contents_book_read"]/a', ////article[last()]/div/div[@class="sf-contents_book_read"]/a',
    lastEpisode: '//div[@class="alm-reveal"]/article[1]/div[@class="sf-content_book_description"]/div/a',
    author: '//span[@class="sf-author_name"]',
  }, { //
    url: '//www.moae.jp/comic/|.moae.jp/lineup/',
    sibling: '//div[@class="img"]/a/img/../..',
    header: '',
    lastEpisode: '//ul[@class="detail-trial"]/li[1]/a',
    author: '//section/section[@class="mod-profile-block"]/dl/dt',
    pankuzuUp: '//li[@class="lineup"]/a/img'
  }, { // コミックエッセイ劇場
    url: '//www.comic-essay.com/episode/',
    sibling: '//div[@class="manga-imgs"]/img',
    header: '',
    prevEpisode: '//ul/li[@class="prev"]/a',
    nextEpisode: '//li[@class="next"]/a',
    firstEpisode: '//div[@class="cell a_t"]/p[@class="ro_t abg_text"]',
    lastEpisode: '//a[@class="ro"]/p[last()]',
    author: '//p[@class="author"]|//a/span[@class="name"]',
    pankuzuUp: '//ul[@class="breadcrumb wrap c-fix"]/li[last()-1]/a'
  }, { // 裏サンデー
    //    url: '//urasunday.com/.*/comic/|//urasunday.com/.*/index/',
    url: '//urasunday.com/',
    sibling: '//img[@class="dumimg"]/..',
    header: '',
    //      nextEpisode: '//div[@id="prBanner"]/a[contains(text(),"次の話を今すぐ読む!! →")]',
    firstEpisode: '//div[@class="comicInner"]/ul[2]/li[1]/a',
    lastEpisode: '//div[@class="comicButtonDateBox"]/a',
    author: '//li[@class="detailComicTitle"]/h2|//div[@id="comicDetail"]/h2',
    pankuzuUp: '//li/a[@href="../index.html"]'
  }, { // やわらかスピリッツ
    url: '//yawaspi.com/',
    sibling: '//section[@class="comicContainer"]/a/img[1]/..',
    header: '',
    nextEpisode: '',
    firstEpisode: '//ul[@id="comicBody"]/li[1]/a/img',
    lastEpisode: '//ul[@id="comicBody"]/li[last()]/a/img',
    disableSnapWhenPageIsClicked: 0,
    author: '//li[@class="comicDetails"]/hgroup[1]/h2',
    pankuzuUp: '//li[@class="browserCtrlLeft"]/a'
  }, { // コミックバンチ
    url: '//www.comicbunch.com/manga/',
    sibling: '//div[@class="view"]/a/img/..',
    header: '',
    nextEpisode: '//ul[@class="btn cf"]/li/a[text()="次の話"]',
    prevEpisode: '//ul[@class="btn cf"]/li/a[text()="前の話"]',
    firstEpisode: '//div[@class="backnumber cf"]/ul/li[last()]/a',
    lastEpisode: '//div[@class="backnumber cf"]/ul[@class="cf"]/li[1]/a',
    disableSnapWhenPageIsClicked: 0,
    author: '//div[@id="comics"]/h4',
    pankuzuUp: '//a[text()="作品紹介"]'
  }, { // コミックDAYS他
    url: '//comic-days.com/episode/|//tonarinoyj.jp/episode/|//shonenjumpplus.com/episode/|//kuragebunch.com/episode/|//pocket.shonenmagazine.com/episode/|//viewer.heros-web.com/episode/',
    sibling: '',
    header: '',
    nextEpisode: '',
    disableSnapWhenPageIsClicked: 0,
    author: '//div/h2[@class="series-header-author"]'
  }, { //
    url: '//ganma.jp/',
    sibling: '',
    header: '',
    nextEpisode: '',
    disableSnapWhenPageIsClicked: 0,
    author: '//h4[@class="ng-binding"]',
    firstEpisode: '//a[@class="detail-action-some"]',
    lastEpisode: '//ol[@class="story"]/li/a/div/time[not(contains(text(),"配信予定"))]/../..',
    pankuzuUp: '',
  }, { //
    url: '//www.sunday-webry.com/series/',
    sibling: '',
    header: '',
    nextEpisode: '',
    disableSnapWhenPageIsClicked: 0,
    author: '//p[@class="author"]/a',
  }, { //
    url: '//rookie.shonenjump.com/series/|//rookie.shonenjump.com/users/',
    sibling: '//p[@class="page-area js-page-area"]/img/..',
    header: '//header[@id="header"]/div/h2',
    nextEpisode: '//a[contains(text(),"続きを読む")]',
    disableSnapWhenPageIsClicked: 0,
    author: '//span[@class="user-name"]/a/strong|//h2[@class="user-name"]|//p[2]/a/span[@class="user-name"]',
    firstEpisode: '//li[1]/a/p[1]/span/../..',
    lastEpisode: '//li[last()]/a/p[1]/span/../..',
    pankuzuUp: '//a[contains(text(),"作品ページへ")]|//a/span[@class="series-title"]',
  }, { //
    url: '//www.comico.jp/challenge/',
    sibling: '',
    header: '',
    nextEpisode: '',
    disableSnapWhenPageIsClicked: 0,
    author: '//div/p[@class="article-hero03__author"]/a'
  }, { //
    url: '//daysneo.com/works/',
    sibling: '',
    header: '',
    nextEpisode: '',
    disableSnapWhenPageIsClicked: 0,
    author: '//div/p[@class="author"]/a[1]'
  }, { //
    url: '//www.ebookjapan.jp/ebj/',
    sibling: '',
    header: '',
    nextEpisode: '',
    disableSnapWhenPageIsClicked: 0,
    author: '//p[@class="bookAuthor"]/a'
  }, { //
    url: '//mangacross.jp/comics/',
    sibling: '',
    header: '',
    nextEpisode: '',
    disableSnapWhenPageIsClicked: 0,
    author: '//div[@class="comic-area__author"]',
    lastEpisode: '//ul/li[1]/a[@class="backnumber-list__link"]/div[2]/span[2]'
  }, { //
    url: '//comic.mag-garden.co.jp/',
    sibling: '',
    header: '',
    nextEpisode: '',
    disableSnapWhenPageIsClicked: 0,
    author: '//div/div[@class="inner"]/h3'
  }, { //
    url: '//www.mangabox.me/reader/',
    sibling: '',
    header: '',
    nextEpisode: '',
    disableSnapWhenPageIsClicked: 0,
    author: '//div/p[@class="episodes_author"]',
    lastEpisode: '//SPAN[@class="episodes_strong_text is_new"]/../..'
  }, { //
    url: '//cycomi.com/fw/cycomibrowser/chapter/',
    sibling: '',
    header: '',
    nextEpisode: '',
    disableSnapWhenPageIsClicked: 0,
    author: '//p[@class="title-author"]'
  }, { //
    url: '//mangahack.com/comics/',
    sibling: '//div[@class="comic_img"]/img/..',
    header: '//header[1]',
    nextEpisode: '//li[@class="right"]/a',
    disableSnapWhenPageIsClicked: 0,
    author: '',
    firstEpisode: '//a[text()="はじめから読む"]',
    lastEpisode: '//li[last()]/a[text()="最新話を読む"]',
    prevEpisode: '//li[@class="left"]/a',
    pankuzuUp: '//div[1]/ul[@class="cf"]/li/span[1]/a',
  }, { //
    url: '//manga-park.com/title/',
    sibling: '',
    header: '',
    nextEpisode: '',
    prevEpisode: '',
    disableSnapWhenPageIsClicked: 0,
    author: '//p[@class="author txtColorSubject"]',
    firstEpisode: '',
    lastEpisode: '',
    pankuzuUp: '',
  }, { //
    url: '//www.alphapolis.co.jp/manga/',
    sibling: '',
    header: '',
    nextEpisode: '',
    prevEpisode: '',
    disableSnapWhenPageIsClicked: 0,
    author: '//div/div[@class="author"]/span/a[1]|//div[@class="mangaka"]/a|//div[@class="author-label"]/div[2]/a',
    firstEpisode: '//div[@class="first-time-free"]/a[contains(text(),"第１回を無料で読む")]',
    lastEpisode: '//div[@class="episode-list"]/a[1]/div/div[1]/../..',
    pankuzuUp: '',
  }, { //
    url: '//web-ace.jp/youngaceup/',
    sibling: '//div[@class="box inner viewerImageBox"]/a/img[1]/../../..',
    header: '',
    nextEpisode: '//section/div/div/a[text()="次の話へ"]',
    prevEpisode: '//a[text()="前の話へ"]',
    disableSnapWhenPageIsClicked: 0,
    author: '',
    firstEpisode: '',
    lastEpisode: '',
    pankuzuUp: '//a[text()="作品TOPへ"]',
  }, { //
    url: '//comic.webnewtype.com/contents/',
    sibling: '//div[@id="viewerContainer"]/div/div[@class="box inner viewerImageBox"]/a/img[1]/../../..',
    header: '',
    nextEpisode: '//a/img[@alt="次の話"]/..',
    prevEpisode: '//header[@class="ViewerHeader"]/nav/a/img[@alt="前の話へ"]/..',
    disableSnapWhenPageIsClicked: 0,
    author: '//span[@class="WorkSummary-headerinfo"]',
    firstEpisode: '//a[contains(text(),"最初から読む")]',
    lastEpisode: '//section/ul/li[1]/a/div/h3[@class="ListCard-title"]/../..',
    pankuzuUp: '//h1[@class="ViewerHeader-title"]/a',
    atamadashiDelay: 600
  }, { //
    url: '//twitter.com/',
    sibling: '//div[@id="timeline" and @class="content-main AdaptiveSearchTimeline"]/div/div/ol/li/div/..|//div/div/ol/li[@data-item-type="tweet"]',
    header: '//div[@class="ProfileCanopy-inner"]/div[last()]|//DIV[@class="AdaptiveFiltersBar"]/..',
    nextEpisode: '',
    prevEpisode: '',
    disableSnapWhenPageIsClicked: 1,
    author: '',
    firstEpisode: '',
    lastEpisode: '',
    pankuzuUp: '',
  }, { //
    url: '//www.ebigcomic4.jp/title/',
    sibling: '',
    header: '',
    nextEpisode: '',
    prevEpisode: '',
    disableSnapWhenPageIsClicked: 0,
    author: '',
    firstEpisode: '',
    lastEpisode: '//span[@class="episodeName"]',
    pankuzuUp: '',
  }, { //
    url: '.5ch.net/',
    sibling: '//dl[@class="thread"]/dt|//span[@class="number"]/../..',
    header: '//nav[@class="navbar-fixed-top search-header"]/div',
    nextEpisode: '',
    prevEpisode: '',
    disableSnapWhenPageIsClicked: 1,
    author: '',
    firstEpisode: '',
    lastEpisode: '',
    pankuzuUp: '',
  }, { //
    url: '//www.ganganonline.com/',
    sibling: '',
    header: '',
    nextEpisode: '',
    prevEpisode: '',
    disableSnapWhenPageIsClicked: 0,
    author: '',
    firstEpisode: '//ul[@class="past_2c"]/li[1]/a/span/strong',
    lastEpisode: '//li[5]/a[@class="gn_link_btn"]/img[@alt="読む"]/..',
    pankuzuUp: '',
  }, { //
    url: '//watamote.com/',
    sibling: '//span[@class="res"]/..',
    header: '',
    nextEpisode: '',
    prevEpisode: '',
    disableSnapWhenPageIsClicked: 1,
    author: '',
    firstEpisode: '',
    lastEpisode: '',
    pankuzuUp: '',
  }, { //
    url: '//news.mynavi.jp/series/|//news.mynavi.jp/article/',
    sibling: '//img[@class="photo_table__img lazyload"]|//td/img[@class="lazyload" and @src="images/001.jpg"]',
    header: '',
    nextEpisode: '',
    prevEpisode: '',
    disableSnapWhenPageIsClicked: 0,
    author: '//a[@class="article-author__name"]',
    firstEpisode: '//div/section[last()]/div[@class="tile3__link js-link"]/div[@class="tile3__thumb"]/div/img[@class="tile3__img"]',
    lastEpisode: '//section[1]/div/div/div[@class="tile3__img-wrap"]/img',
    pankuzuUp: '',
  }, { //
    url: '//matogrosso.jp/',
    sibling: '//div[@class="asset-body"]/div/img|//div[@class="asset-body"]/img|//div[@class="asset-body"]/div/div/img',
    header: '',
    nextEpisode: '',
    prevEpisode: '',
    disableSnapWhenPageIsClicked: 0,
    author: '//h3[@class="widget-header"]/a',
    firstEpisode: '//div[@class="asset-content"]/div[@class="asset-body"]/dl/dd[last()]/a',
    lastEpisode: '//div[@class="asset-body"]/dl/dd[1]/a',
    pankuzuUp: '',
  }, { //
    url: '//sukupara.jp/',
    sibling: '//div[@class="magarea"]/img/..',
    header: '',
    //    nextEpisode: '//li[@id="next-page-btn"]/a/img', //uAutoPagerizeを使うべき
    //    prevEpisode: '//li[@id="prev-page-btn"]/a/img', //uAutoPagerizeを使うべき
    disableSnapWhenPageIsClicked: 0,
    author: '//div[@id="artist"]/dl/dt',
    firstEpisode: '//a/img[@alt="第1回はコチラから"]',
    lastEpisode: '//p[@class="newest-story-tit"]/a',
    pankuzuUp: '//ul[@class="menulist clearfix"]/li[last()-1]/a',
  }, { //
    url: '//cho-animedia.jp/comic_category/|//cho-animedia.jp/comic/',
    sibling: '//div[@class="contents"]/p/img', //'//section[@class="contents_area"]/div[@class="contents"]', //
    header: '//html/body/header[@class="fixed"]',
    nextEpisode: '//dl[last()]/dt/a/img[@class="attachment-full size-full wp-post-image"]/..',
    prevEpisode: '//dl[1]/dt/a/img[@class="attachment-full size-full wp-post-image"]/..',
    disableSnapWhenPageIsClicked: 0,
    author: '',
    firstEpisode: '//li[last()]/a/div[@class="photo"]/img/../..',
    lastEpisode: '//li[1]/a/div[@class="photo"]/img/../..',
    pankuzuUp: '//div[@class="breadcrumbs"]/ul/li[last()-1]/a',
  }, { //
    url: '//leedcafe.com/',
    sibling: '',
    header: '',
    nextEpisode: '',
    prevEpisode: '',
    disableSnapWhenPageIsClicked: 0,
    author: '//div[@class="creator-header clearfix"]/h2/a',
    firstEpisode: '',
    lastEpisode: '',
    pankuzuUp: '',
  }, { //
    url: '//storia.takeshobo.co.jp/manga/',
    sibling: '',
    header: '',
    nextEpisode: '',
    prevEpisode: '',
    disableSnapWhenPageIsClicked: 0,
    author: '//div[@class="name_intro_author"]',
    firstEpisode: '//div[last()]/div[@class="box_episode_text"]/a[@class="btn"]',
    lastEpisode: '//div[last()]/div[1]/div[@class="box_episode_text"]/a[1]',
    pankuzuUp: '//a[text()="作品ページへ"]',
  }, { //
    url: '//www.tatan.jp/',
    sibling: '//div[@id="viewer_content"]/img',
    header: '',
    nextEpisode: '//a/img[@class="btn_next"]',
    prevEpisode: '//a/img[@class="btn_prev"]',
    disableSnapWhenPageIsClicked: 0,
    author: '//p[@class="author"]',
    firstEpisode: '//ul[@id="sakuhin_backnumber_ul"]/li/a[text()="1"]',
    lastEpisode: '//a/img[@alt="最新話を読む"]/..',
    pankuzuUp: '//a/img[@class="btn_sakuhin"]/..',
  }, { //
    url: '//cakes.mu/',
    sibling: '//div[@class="article-content"]/h1',
    header: '//header[@class="postHeader"]',
    nextEpisode: '//li[@class="navi-items next"]/a[@data-ga="post:header:next"]',
    prevEpisode: '//li[@class="navi-items prev"]/a[@data-ga="post:header:previous"]',
    disableSnapWhenPageIsClicked: 0,
    author: '//div/p[@class="post-author"]/span|//div[@data-cakes-amazon=""]/div[@id="container_right"]/div/h3/a',
    firstEpisode: '//li[last()]/h3[@class="post-title-full"]/a',
    lastEpisode: '//li[1]/h3[@class="post-title-full"]/a',
    pankuzuUp: '//h2[@class="post-title"]/a',
  }, { //
    url: '//kawaii2ch.com/',
    sibling: '//div[contains(@class,"t_h")]/div/..|//a[@class="related-entry-title-link"]/../../../..',
    header: '',
    nextEpisode: '',
    prevEpisode: '',
    disableSnapWhenPageIsClicked: 0,
    author: '',
    firstEpisode: '',
    lastEpisode: '',
    pankuzuUp: '',
  }, { //
    url: '//comicpash.jp/',
    sibling: '//main[@class="manga row"]/img',
    header: '',
    nextEpisode: '',
    prevEpisode: '',
    disableSnapWhenPageIsClicked: 0,
    author: '//p[@class="mangaMainTitle__name"]',
    firstEpisode: '//a[contains(text(),"第1話を読む")]',
    lastEpisode: '//a/em[contains(text(),"最新話")]/..',
    pankuzuUp: '//section[@typeof="BreadcrumbList"]/div[@class="row"]/span[2]/a/span/..',
  }, { //
    url: '//www.nicovideo.jp/',
    sibling: '//li[@class="item nrn-thumb-info-done"]',
    header: '',
    nextEpisode: '',
    prevEpisode: '',
    disableSnapWhenPageIsClicked: 1,
    author: '',
    firstEpisode: '',
    lastEpisode: '',
    pankuzuUp: '',
  }, { //
    url: '//www.jstage.jst.go.jp/',
    sibling: '//ul[@class="search-resultslisting"]/li',
    header: '//body/span[@class="noprint"]/header/nav',
    nextEpisode: '',
    prevEpisode: '',
    disableSnapWhenPageIsClicked: 1,
    author: '',
    firstEpisode: '',
    lastEpisode: '',
    pankuzuUp: '',
  }, { //
    url: '//ci.nii.ac.jp/',
    sibling: '//div[@class="listitem xfolkentry"]/..',
    header: '//div[@id="nav-content"]',
    nextEpisode: '',
    prevEpisode: '',
    disableSnapWhenPageIsClicked: 1,
    author: '',
    firstEpisode: '',
    lastEpisode: '',
    pankuzuUp: '',

  }, { //
    url: '',
    sibling: '',
    header: '',
    nextEpisode: '',
    prevEpisode: '',
    disableSnapWhenPageIsClicked: 0,
    author: '',
    firstEpisode: '',
    lastEpisode: '',
    pankuzuUp: '',
  }, { //
    url: '',
    sibling: '',
    header: '',
    nextEpisode: '',
    prevEpisode: '',
    disableSnapWhenPageIsClicked: 0,
    author: '',
    firstEpisode: '',
    lastEpisode: '',
    pankuzuUp: '',
  }, { //
    url: '',
    sibling: '',
    header: '',
    nextEpisode: '',
    prevEpisode: '',
    disableSnapWhenPageIsClicked: 0,
    author: '',
    firstEpisode: '',
    lastEpisode: '',
    pankuzuUp: '',
  }, { // ニコニコ静画（漫画）
    url: '//seiga.nicovideo.jp/watch/|//seiga.nicovideo.jp/comic/',
    sibling: '//div[@class="note"]/..|//div[@class="note balloon_disabled"]/..|//div[@class="pages"]/ul/li',
    header: '//div[@id="siteHeaderInner"]',
    atamadashi: '//div[@class="note"]|//div[@class="note balloon_disabled"]|//img[@class="lazyload"]|//div[@class="pages"]/ul/li',
    author: '',
    firstEpisode: '//a[@class="first"]',
    lastEpisode: '//a[@class="last"]',
    prevEpisode: '//p[@class="prev"]/a',
    nextEpisode: '//span[@class="next_text"]|//a[@class="next"]',
    pankuzuUp: '//ul[@class="sg_pankuzu"]/li[last()-1]/a'
  }]

  var marginu = 3;
  var isChrome = window.navigator.userAgent.toLowerCase().indexOf("chrome") != -1;
  var scrollSpeed = localStorage.getItem("scrollSpeed") || (isChrome ? 1.5 : 1.5);
  var atamadashi = localStorage.getItem("atamadashi") || "false";
  var sscrollY = 0;
  var sscrollDY = 0;
  var scrint = 0;

  // match文を生成
  if (LogMatch) {
    let matchlist = ""
    for (let s of SITEINFO.slice().sort(function(a, b) { return a.url > b.url ? 1 : -1 })) {
      if (s.url != "")
        for (let s2 of s.url.split("|")) {
          matchlist += "// @match *:" + s2.replace(/\.\*/gm, "*").replace(/^\./, "//*.") + "*\n";
        }
    }
    alert(matchlist);
  }

  var customsib = localStorage.getItem("wcs_siblingXPath") || "";
  if (customsib) {
    SITEINFO.length = 0;
    SITEINFO.push({ "url": "//" + location.href.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)[1] + "/", "sibling": customsib, "disableSnapWhenPageIsClicked": 1 })
    //    console.log("Found in localStorage\n---\n  }, { // \n    url: '//"+location.href.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)[1]+"',\n    sibling: '"+customsib+"',\n    header: '',\n    nextEpisode: '',\n    prevEpisode: '',\n    disableSnapWhenPageIsClicked: 0,\n    author: '',\n    firstEpisode: '',\n    lastEpisode: '',\n    pankuzuUp: '',\n");
  }

  document.addEventListener('keydown', function f(e) {
    if (/input|textarea/i.test(e.target.tagName) == false) {
      if (!e.getModifierState("Alt") && !e.getModifierState("Control") && e.getModifierState("Shift") && (e.key == "\`")) {
        //        e.preventDefault();
        var copipe = customsib ? "現在の設定：\n\n  }, { // \n    url: '//" + location.href.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)[1] + "/',\n    sibling: '" + customsib + "',\n    header: '',\n    nextEpisode: '',\n    prevEpisode: '',\n    disableSnapWhenPageIsClicked: 1,\n    author: '',\n    firstEpisode: '',\n    lastEpisode: '',\n    pankuzuUp: '',\n  }, { // \n\n" : "";
        console.log("livedoor:" + (document.body.innerHTML.match(/\livedoor\./gmi) || [1]).length + " @class=t_H:" + elegeta('//div[contains(@class,"t_h")]').length);
        let defsib = ((document.body.innerHTML.match(/\livedoor\./gmi) || [1]).length >= 5 && elegeta('//div[contains(@class,"t_h")]').length > 4) ? '//div[contains(@class,"t_h")]' : '';
        var sib = prompt(copipe + "Enter Sibling XPath\n空欄にすると設定を削除します", customsib || defsib);
        localStorage.removeItem("wcs_siblingXPath");
        if (!sib || !eleget0test(sib)) {
          alert("空欄、またはXPathとして1つ以上ヒットしないので、設定を削除します");
        } else {
          localStorage.setItem("wcs_siblingXPath", sib);
        }
        location.reload();
        return;
      }
    }
  }, false);

  var thissite = 0;
  //  for(let si of SITEINFO){for (let pro in si){if(si[pro])console.log(pro+" : "+si[pro])}}
  for (var i = 0; i < SITEINFO.length; i++) {
    if (SITEINFO[i].url == "") continue;
    if (location.href.match(SITEINFO[i].url)) {
      thissite = i;

      console.log("---\nweb漫画サイトにショートカットキーを追加: ");
      var j = 0;
      for (let pro in SITEINFO[i]) {
        if (SITEINFO[i][pro]) {
          console.log(pro + " : " + SITEINFO[i][pro])
          var str1 = ["url:", "sibling:", "sibling:", "header:", "nextEpisode:", "prevEpisode:", "disableSnapWhenPageIsClicked:", "author:", "firstEpisode:", "lastEpisode:", "pankuzuUp:"];
          var str2 = ["", "←→：前次ページ", "A：頭出し", "", "Enter：次の話", "]：前の話", "", "", "→：第1話", "Enter：最新話", "Shift+↑：上階層"];
          for (var k = 0; k < str1.length; k++) {
            if (pro + ":" == str1[k] && str2[k] && eleget0(SITEINFO[i][pro])) {
              if (PopupHelpMS) {
                let node = document.body.appendChild(document.createElement('span'));
                node.innerHTML = str2[k]; //+" : "+SITEINFO[i][pro];
                node.setAttribute("style", "max-width:95%; right:0; bottom:" + (j * 21) + "px; z-index:2147483647; opacity:" + 1 + "; text-align:left; line-height:1.1; position:fixed; font-size:11px; font-weight:bold; margin:2px;  text-decoration:none; padding:2px 5px; border-radius:15px; color:#ffffff; " + (ButtonBG)); //" box-shadow:3px 3px 3px #0004;");
                $(node).hide(0);
                setTimeout(() => { $(node).slideDown('fast'); }, 67 * j); //fadeIn('fast')
                setTimeout(() => { $(node).hide(400).queue(function() { this.remove(); }) }, PopupHelpMS + 67 * j); //fadeOut('fast')
              }
              j++;
            }
          }
        }
      }
      addHelp(SITEINFO[i].firstEpisode, "→");
      addHelp(SITEINFO[i].lastEpisode, "Enter");
      addHelp(SITEINFO[i].prevEpisode, " ] ");
      addHelp(SITEINFO[i].nextEpisode, "Enter");
      addHelp(SITEINFO[i].pankuzuUp, "Shift+↑");

      // ヘッダのy下端を計算
      if (SITEINFO[thissite].header) {
        var seigaheader = eleget0(SITEINFO[thissite].header);
        if (seigaheader)
          var arrowedGap = marginu + seigaheader.getBoundingClientRect().bottom; //.height;
      } else {
        var arrowedGap = marginu;
      }
      document.addEventListener("keydown", function(e) {
          if (/input|textarea/i.test(e.target.tagName)) return;
          var pressed = (e.ctrlKey ? 'c' : '') + (e.altKey ? 'a' : '') + (e.shiftKey ? 's' : '') + String(e.which); {

            if (SITEINFO[thissite].pankuzuUp && pressed == "s38")
              if (moveClick(SITEINFO[thissite].pankuzuUp)) { e.preventDefault(); return; } // Shift上

            if (SITEINFO[thissite].sibling && (pressed == "39" || pressed == "37")) { //左右
              e.preventDefault();

              // もっとも接近しているページ＝今見ているページをfoundeleに入れる
              var ele = eleget(SITEINFO[thissite].sibling);
              var minGap = 9999;
              var foundele = null;
              var nh = getNowHeaderHeight();
              for (var i = 0; i < ele.snapshotLength; i++) {
                var ele0 = ele.snapshotItem(i);
                var eley = ele0.getBoundingClientRect().top - nh - marginu;
                if (Math.abs(eley) < minGap) {
                  minGap = Math.abs(eley);
                  foundele = ele0;
                  if (minGap <= (arrowedGap - nh + marginu + 2)) {
                    //console.log("minGap:" + minGap + "  aGap:" + (arrowedGap - nh + marginu) + "  break at " + i);
                    break;
                  }
                }
              }
              snap(foundele, pressed == 37 ? "prev" : "next", arrowedGap, SITEINFO[thissite].sibling);
            }
            if (SITEINFO[thissite].nextEpisode && (pressed == "s39" || pressed == "13")) // Shift右 enter
              if (moveClick(SITEINFO[thissite].nextEpisode)) { e.preventDefault(); return; }

            if (SITEINFO[thissite].prevEpisode && (pressed == "s37" || pressed == "221"))
              if (moveClick(SITEINFO[thissite].prevEpisode)) { e.preventDefault(); return; } //Shift左 ]

            if (SITEINFO[thissite].firstEpisode && pressed == "39")
              if (moveClick(SITEINFO[thissite].firstEpisode)) { e.preventDefault(); return; } // 右
            if (SITEINFO[thissite].lastEpisode && (pressed == "s39" || pressed == "13"))
              if (moveClick(SITEINFO[thissite].lastEpisode)) { e.preventDefault(); return; } // Shift右 enter

            if (pressed == "83") { // s スクロール速度
              e.preventDefault();
              scrollSpeed = proInput("スクロール速度を入力してください（0：API使用、1：瞬間移動、1.01～：速度指定）", scrollSpeed, 0, 30);
              localStorage.setItem("scrollSpeed", scrollSpeed);
            }
            if (pressed == "65") { // a 頭出しオンオフ
              e.preventDefault();
              atamadashi = atamadashi === "true" ? "false" : "true";
              alert("[a] 頭出し機能を" + atamadashi + "にしました");
              localStorage.setItem("atamadashi", atamadashi);
            }

            if (location.href.match("/seiga.nicovideo.jp/watch/|//seiga.nicovideo.jp/comic/")) {
              if (pressed == "67") { // c コメントオンオフ
                e.preventDefault();
                eleget0('//li[@id="show_comment"]/span').click();
                return;
              }
              if (pressed == "72") { // h ヘッダー固定追従
                e.preventDefault();
                eleget0('//li[@id="siteHeaderRightMenuUnfix" and @style="display: block;"]/a/span|//li[@id="siteHeaderRightMenuFix" and @style="display: block;"]/a/span').click();
                return;
              }
            }

            if (pressed == "70" || pressed == "219") { // f [ 全画面化
              e.preventDefault();
              var y = window.pageYOffset;
              var doc = window.document;
              var docEl = doc.documentElement;
              var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
              var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
              if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) { requestFullScreen.call(docEl); } else { cancelFullScreen.call(doc); }
              setTimeout(window.scroll, 100, 0, y);
            }
          }
        },
        false);

      // ページクリックでスナップ
      if (!SITEINFO[thissite].disableSnapWhenPageIsClicked && SITEINFO[thissite].sibling) {
        setTimeout(() => {
          var ele = eleget(SITEINFO[thissite].sibling);
          for (var i = ele.snapshotLength; i--;)
            ele.snapshotItem(i).addEventListener("click", function(e) { snap(this, "next", arrowedGap, SITEINFO[thissite].sibling); }, false);
        }, 500);
      }

      // 作者名でWeb漫画アンテナ
      if (SITEINFO[thissite].author) {
        setTimeout(() => {
          for (let ele of elegeta(SITEINFO[thissite].author)) {
            var elenew = ele.appendChild(document.createElement('a'));
            elenew.innerHTML = '<a href="https://webcomics.jp/search?q=***" rel=\"noopener noreferrer nofollow\"><font color="#ffffff" style="text-decoration:none !important;">Web漫画アンテナ</font></a>'.replace("***", ele.innerText.replace(/\/|／|\,/gmi, " OR ").replace(/先生|原作|原案|脚本|著|著者|漫画|作画|イラスト|キャラクター|画[:：\/／]|作[:：\/／]|絵[:：\/／]|構成|協力|[:：]|[\(（][^）\)]*[）\)]|＝/gmi, "").replace(/　/g, " ").replace(/^ OR | OR $/gmi, "").trim());
            elenew.setAttribute("style", "-moz-user-select: none; -webkit-user-select: none; -ms-user-select: none; font-size:11px; font-weight:bold; margin:0px 5px; text-decoration:none !important; text-align:center; padding:1px 7px 1px; border-radius:15px; " + (ButtonBG) + " white-space: nowrap"); //e50012;");
          }
        }, 500);
      }

      // 頭出し
      if (atamadashi == "true" && SITEINFO[thissite].atamadashi) {
        setTimeout(() => { loadfocus(0, SITEINFO[thissite].atamadashi) }, 16)
        setTimeout(() => { loadfocus(0, SITEINFO[thissite].atamadashi) }, 333)
      } else
      if (atamadashi == "true" && SITEINFO[thissite].sibling) {
        setTimeout(() => { loadfocus(0, SITEINFO[thissite].sibling) }, 16)
        setTimeout(() => { loadfocus(0, SITEINFO[thissite].sibling) }, SITEINFO[thissite].atamadashiDelay || 333)
      }

    }
  }
  return;

  function loadfocus(times = 0, atamadashi) {
    let xp = atamadashi;
    if (!xp || times > 10000) return false;
    if (eleget0(xp)) { setTimeout(() => { loadfocus2(atamadashi); }, 200); return; } else setTimeout(() => { loadfocus(times + 200, atamadashi); }, 200)
  }

  function loadfocus2(atamadashi) {
    var xp = atamadashi;
    var ele = eleget0(xp);
    if (ele) {
      sscroll(ele.getBoundingClientRect().top + window.pageYOffset - marginu - getNowHeaderHeight());
    }
    return ele;
  }

  function getNextSib(ele, xpath) { // xpathに適合する弟ノードを走査
    do {
      if (!ele.nextElementSibling) return null;
      ele = ele.nextElementSibling;
      for (let ele2 of elegeta(xpath)) {
        if (ele == ele2) return ele;
      }
    } while (ele.nextElementSibling);
    return null;
  }

  function getPrevSib(ele, xpath) { // xpathに適合する兄ノードを走査
    do {
      if (!ele.previousElementSibling) return null;
      ele = ele.previousElementSibling;
      for (let ele2 of elegeta(xpath)) {
        if (ele == ele2) return ele;
      }
    } while (ele.previousElementSibling);
    return null;
  }

  function snap(targetele, pn, arrowedGap, xpath) {
    if (!targetele) return;
    var headery = getNowHeaderHeight();
    var nowpagey = targetele.getBoundingClientRect().top + window.pageYOffset - marginu;
    var nextpage = (pn == "next" ? getNextSib(targetele, xpath) : getPrevSib(targetele, xpath));
    if (nextpage == null) {
      if (SITEINFO[thissite].nextEpisode)
        if (eleget0(SITEINFO[thissite].nextEpisode)) { var nextpagey = eleMiddleY(SITEINFO[thissite].nextEpisode); } else return;
      else return;
    } else {
      var nextpagey = nextpage.getBoundingClientRect().top + window.pageYOffset - marginu;
    }
    if (nextpage === null && pn == "prev") {
      nextpagey = 0;
      nowpagey = 0;
      if (window.pageYOffset < 2) {
        if (SITEINFO[thissite].prevEpisode) moveClick(SITEINFO[thissite].prevEpisode);
      }
    }
    var nowy = window.pageYOffset + headery;
    //    console.log(Math.abs(nowy - nowpagey), "present gap");
    //    console.log(arrowedGap, "allowed gap");
    if (Math.abs(nowy - nowpagey) <= arrowedGap) {
      sscroll(nextpagey - headery);
      if (nextpage === null) {
        if (pn == "next") {
          if (SITEINFO[thissite].nextEpisode) moveClick(SITEINFO[thissite].nextEpisode);
        }
      }
    } else {
      targetele.focus();
      sscroll(nowpagey - headery);
    }
    return;
  }

  function getNowHeaderHeight() {
    if (SITEINFO[thissite].header == "") { return marginu; }
    var header1y = 0;
    var seigaheader = eleget0(SITEINFO[thissite].header)
    if (seigaheader === null) header1y = 0;
    else {
      var seigaheaderpos = seigaheader.getBoundingClientRect();
      header1y = seigaheaderpos.bottom;
    }
    var headery = Math.max(header1y, 0);
    return headery + marginu;
  }

  function eleMiddleY(xpath) {
    var el2 = eleget0(xpath);
    if (el2) {
      return (el2.getBoundingClientRect().top + window.pageYOffset +
        eleget0(xpath).getBoundingClientRect().height -
        window.innerHeight / 2);
    } else return 0;
  }

  function moveClick(xpath) {
    if (!eleget0(xpath)) return false;
    GM_addStyle(":focus { box-shadow: 0px 0px 10px 10px rgba(0, 250, 0, 0.5), inset 0 0 100px rgba(0, 250, 0, 0.1) !important; outline: rgba(0, 250,0,0.7) solid 4px !important; outline-offset: 1px !important; }")
    eleget0(xpath).focus();
    eleget0(xpath).click();
    sscroll(eleMiddleY(xpath));
    return true;
  }

  function eleget0(xpath) {
    var ele = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    return ele.snapshotLength > 0 ? ele.snapshotItem(0) : null;
  }

  function eleget(xpath) {
    return document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  }

  function elegeta(xpath, node = document) {
    var ele = document.evaluate("." + xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var array = [];
    for (var i = 0; i < ele.snapshotLength; i++) array[i] = ele.snapshotItem(i);
    return array;
  }

  function sscroll(dy) {
    if (scrollSpeed < 1) { //APIでスクロール
      //      console.log("api使用");
      window.scroll({ left: 0, top: dy, behavior: "smooth" });
      return;
    }
    if (scrollSpeed == 1) { window.scroll({ left: 0, top: dy, behavior: "instant" }); return; }
    sscrollY = window.pageYOffset; //chrome
    sscrollDY = dy;
    scrint = 0;
    setTimeout(sscrollInt, 16);
    return;
  }

  function sscrollInt() {
    scrint++;
    sscrollY = sscrollY + (sscrollDY - sscrollY) / scrollSpeed;
    window.scroll(0, sscrollY);
    //    if (Math.abs(sscrollY - sscrollDY) > 2) setTimeout(sscrollInt, 16);
    if (Math.abs(sscrollY - sscrollDY) >= 1) { setTimeout(sscrollInt, 16); } else window.scroll(0, sscrollDY);
    //    else console.log("スクロールに掛かった回数（最短1/60秒）…" + scrint + "回");
    return;
  }

  function proInput(prom, defaultval, min, max = Number.MAX_SAFE_INTEGER) {
    return Math.min(Math.max(
      Number(window.prompt(prom, defaultval).replace(/[Ａ-Ｚａ-ｚ０-９．]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 65248);
      }).replace(/[^-^0-9^\.]/g, "")), min), max);
  }

  function addHelp(xpath, help) {
    if (!xpath) return;
    let ele = eleget0(xpath);
    if (ele) {
      ele.appendChild(document.createElement("span")).innerHTML = "<small> (" + help + ")</small>";
      console.log("Found:" + xpath);
    }
    return;
  }

  function eleget0test(xpath) {
    try { var ele = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null) } catch (err) { return ""; }
    var ele = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    return ele.snapshotLength > 0 ? ele.snapshotItem(0) : "";
  }

})();
