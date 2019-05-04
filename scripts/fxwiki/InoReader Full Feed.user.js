// ==UserScript==
// @name    InoReader Full Feed
// @description    Read full story in InoReader. / InoReaderで記事の全文を表示します。
// @description:en    Read full story in InoReader.
// @description:ja    InoReaderで記事の全文を表示します。
// @id    InoReaderFullFeed
// @namespace    https://userscripts.org/scripts/show/172238
// @homepage    https://greasyfork.org/scripts/897-inoreader-full-feed
// @include    http://inoreader.com/*
// @include    https://inoreader.com/*
// @include    http://www.inoreader.com/*
// @include    https://www.inoreader.com/*
// @include    http://jp.inoreader.com/*
// @include    https://jp.inoreader.com/*
// @include    http://us.inoreader.com/*
// @include    https://us.inoreader.com/*
// @exclude    *inoreader.com/stream*
// @exclude    *inoreader.com/m/*
// @connect    *
// @grant    GM_addStyle
// @grant    GM_openInTab
// @grant    GM_registerMenuCommand
// @grant    GM_setClipboard
// @grant    GM_xmlhttpRequest
// @noframes
// @version    1.06
// ==/UserScript==

(function() {
  'use strict';

  var version = 1.06;

  // == [CSS] =====================================
  var CSS =
    '#subscriptions_articles .article_content a { color: #0069D6; }' +
    '#subscriptions_articles .article_content a:hover { color: #0064CD; text-decoration: underline; }' +
    '#subscriptions_articles .article_content a:visited { color: #0069D6; }' +
    '#subscriptions_articles .article_title img { border: none; vertical-align: text-top; }' +
    '#subscriptions_articles .article_title span a { margin: 0 3px; }' +
    '#subscriptions_articles .article_content .clear { font-size: inherit !important; height: auto !Important; width: auto !important; }' +
    '.irff_loading { border-color: limegreen !important; }' +
    '.irff_loaded * { position: static !important; }' +
    '.irff_opened { border-color: gold !important; }' +
    '.irff_ap_on { color: #009900; }' +
    '.irff_ap_off { color: #990000; }' +
    '.irff_pager { margin: 3em 0; }' +
    '.irff_pager hr { margin-bottom: 5px; }' +
    '.irff_pager_differenthost { margin-left: 2em; font-weight: bold; }' +
    '.irff_entry_url a { padding-left: 12px; }' +
    '.irff_hidden { display: none; }' +
    '#irff_message { position: fixed; top: 4px; right: 250px; z-index: 90900; color: black; background-color: #FFEEAA; box-shadow: 1px 1px 2px #CCCCCC; padding: 4px 8px; }' +
    '.irff_warning { background-color: #FF9999 !important; }' +
    '.irff_checked { margin-right: 4px; }' +
    '.irff_checked_icon { color: white; font-size: 0.8em; margin-left: 0.5em; padding: 0 4px; text-decoration:none; cursor: pointer; position: relative; top: 0.3em; vertical-align: top; border-radius: 3px; box-shadow: 1px 1px 2px #CCCCCC; }' +
    '.irff_checked_icon:active { box-shadow: none; }' +
    '.irff_checked_icon_info { background: #FFCC00; background: linear-gradient(top, #FFCC00, #FF9900); border: 1px solid #EE8800; }' +
    '.irff_checked_icon_info:hover { background: #FFEE00; background: linear-gradient(top, #FFEE00, #FFBB00); border: 1px solid #EEAA00; }' +
    '.irff_checked_icon_noinfo { background: #CCCCCC; background: linear-gradient(top, #CCCCCC, #999999); border: 1px solid #888888; }' +
    '.irff_checked_icon_noinfo:hover { background: #EEEEEE; background: linear-gradient(top, #EEEEEE, #BBBBBB); border: 1px solid #AAAAAA; }' +
    '.irff_checked_icon_next { background: #77CC77; background: linear-gradient(top, #77CC77, #55AA55); border: 1px solid #449944; }' +
    '.irff_checked_icon_next:hover { background: #99EE99; background: linear-gradient(top, #99EE99, #77CC77); border: 1px solid #66BB66; }' +
    '.irff_checked_icon_nonext { background: #BBEEBB; background: linear-gradient(top, #BBEEBB, #99CC99); border: 1px solid #88BB88; }' +
    '.irff_checked_icon_nonext:hover { background: #DDFFDD; background: linear-gradient(top, #DDFFDD, #BBEEBB); border: 1px solid #AADDAA; }' +
    '.irff_checked_icon_as_next { background: #7777CC; background: linear-gradient(top, #7777CC, #5555AA); border: 1px solid #444499; }' +
    '.irff_checked_icon_as_next:hover { background: #9999EE; background: linear-gradient(top, #9999EE, #7777CC); border: 1px solid #6666BB; }' +
    '.irff_checked_icon_as_nonext { background: #BBBBEE; background: linear-gradient(top, #BBBBEE, #9999CC); border: 1px solid #8888BB; }' +
    '.irff_checked_icon_as_nonext:hover { background: #DDDDFF; background: linear-gradient(top, #DDDDFF, #BBBBEE); border: 1px solid #AAAADD; }' +
    '.irff_socialicon { font-size: 12px; vertical-align: middle; }' +
    '#irff_s { color: black; background: rgba(255, 255, 255, 0.98); z-index: 90000; position: absolute; top: 8px; left: 8px; padding: 0; min-width: 20em; border: 1px solid #999999; border-radius: 4px; box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); -moz-user-select: none; -webkit-user-select: none; user-select: none; }' +
    '#irff_s input[type="text"], input[type="number"], #irff_s textarea { color: black; padding: 0 2px; }' +
    '#irff_s input[type="button"] { font-size: 90%; cursor: pointer; }' +
    '#irff_s select { font-size: 100%; padding: 1px 2px; }' +
    '#irff_s fieldset { border: 1px solid #999999; #FFCC66; margin: 4px 2px; background: none !important; }' +
    '#irff_s fieldset > fieldset { margin: 0; }' +
    '#irff_s fieldset, #irff_s input[type="text"], #irff_s input[type="number"], #irff_s textarea, #irff_s select { color: black; background-color: transparent; }' +
    '#irff_s-titlebar { padding: 0 4px 8px 4px; background-color: #666666; }' +
    '#irff_s-titlebar_title { position: relative; top: 3px; }' +
    '#irff_s-titlebar_title a { color: white; text-decoration: none; font-weight: bold; }' +
    '#irff_s-titlebar_button { position: absolute; top: 0; right: 4px; }' +
    '#irff_s-titlebar input { margin: 0 4px; width: 8em; }' +
    '#irff_s-tab { padding: 0 0.5em; margin-top: 1em; }' +
    '#irff_s-tab span { background-color: #E9E9E9; background-image: -webkit-linear-gradient(#F9F9F9, #E9E9E9); background-image: linear-gradient(#F9F9F9, #E9E9E9); border: 1px solid #999999; padding: 3px 16px; border-radius: 4px 4px 0 0; cursor: pointer; }' +
    '#irff_s-tab span:hover { background-color: #F3F3F3; }' +
    '#irff_s-tab .select, #irff_s-tab .select:hover { background-color: #FFFFFF; background-image: none; border-bottom-color: #FFFFFF; }' +
    '.irff_s-title { float: left; padding: 4px 8px; margin: 0; color: #224488; cursor: pointer; text-decoration: underline; font-size: 100%; }' +
    '#irff_s-list { padding: 8px 4px 4px 4px; border-top: 1px solid #999999; margin: 3px 0 0 0; min-width: 590px; }' +
    '#irff_s-list input[type="checkbox"], #irff_s-list input[type="radio"] { vertical-align: middle; margin: 5px 4px; }' +
    '#irff_s-footer { text-align: right; padding: 4px; }' +
    '.irff_s-footer input { margin: 0 4px; }' +
    '#irff_s-ok { padding: 0 2em; }' +
    '.irff_s-addbutton { margin-left: 8px; width: 6em; }' +
    '.irff_s-hide { display: none; }' +
    '.irff_s-r + .irff_s-r { margin-left: 1.5em; }' +
    '.irff_s-f_column2 { float: left; width: 271px; }' +
    '.irff_s-clearfix:after { clear: both; content: ""; display: block; }' +
    '.irff_s-table { display: table; width: 100%; }' +
    '.irff_s-table > *:not(datalist) { display: table-cell; }' +
    '#irff_s-general_key, #irff_s-general_apheight, #irff_s-etc_timeout { width: 5em; text-align: center; margin-right: 1ex; ime-mode: disabled; }' +
    '#irff_s-general_keyhelpicon { margin-left: 1em; }' +
    '#irff_s-general_keyhelpbody { margin-top: 0.5em; display: none; }' +
    '#irff_s-general_cantdisplay { margin-bottom: 0.5em; }' +
    '#irff_s-general_notread { width: 536px; margin-bottom: 0.8em;}' +
    '#irff_s-siteinfo_navi, #irff_s-autoload_navi { margin: 0.5em 0 1em 1em; }' +
    '.irff_s-navi span { padding: 0.25em 0.75em; border-width: 2px 1px; border-style: solid; border-color: #CFCFCF #C9C9C9 #C3C3C3; background-color: #F6F6F6; background-image: -webkit-linear-gradient(#FFFFFF, #F0F0F0); background-image: linear-gradient(#FFFFFF, #F0F0F0); }' +
    '.irff_s-navi span:hover { border-bottom-color: #FFE0A2; }' +
    '.irff_s-navi span:first-of-type, #irff_s-siteinfo_navi > .irff_hidden + span:not(.irff_hidden) { border-radius: 4px 0 0 4px; border-width: 2px 1px 2px 2px; }' +
    '.irff_s-navi span:last-of-type, #irff_s-siteinfo_navi > .irff_hidden + span:not(.irff_hidden) + span { border-radius: 0 4px 4px 0; border-width: 2px 2px 2px 1px; }' +
    '.irff_s-navi .select { border-color: #C3C3C3 #C9C9C9 #FFCC66; background-color: white; background-image: -webkit-linear-gradient(#F6F6F6, #FFFFFF); background-image: linear-gradient(#F6F6F6, #FFFFFF); }' +
    '.irff_s-siteinfo_navi, .irff_s-autoload_navi { color: #224488; padding: 0 0.5em; cursor: pointer; }' +
    '#irff_s-siteinfo fieldset, #irff_s-autoload fieldset { display: none; }' +
    '#irff_s-siteinfo fieldset.select, #irff_s-autoload fieldset.select { display: block; }' +
    '#irff_s-siteinfo textarea { width: 560px; min-width: 560px; height: 8em; min-height: 4em; }' +
    '.irff_s-siteinfo_form > div { margin-bottom: 4px; }' +
    '#irff_s-siteinfo_uap_pageelement_label {  }' +
    '.irff_s-siteinfo_text { width: 100%; box-sizing: border-box; }' +
    '#irff_s-siteinfo_uff_type_label { width: 18em; }' +
    '.irff_s-addbutton_span { width: 6em; }' +
    '.irff_s-siteinfo_user_label > span { margin-top: 4px; }' +
    '.irff_s-siteinfo_user_label:not(.irff_s-table) > span { display: inline-block; }' +
    '#irff_s-siteinfo_f_uff .irff_s-siteinfo_user_label > span, #irff_s-siteinfo_uff_enc_span { width: 3.5em; }' +
    '#irff_s-siteinfo_f_uap .irff_s-siteinfo_user_label > span, #irff_s-siteinfo_uap_pageelement_span { width: 7em; }' +
    '#irff_s-siteinfo_user_label_enc { margin-left: 24px; }' +
    '#irff_s-siteinfo_user_label_enc > span { margin-right: 8px; }' +
    '#irff_s-autoload fieldset, #irff_s-autoload input[type="radio"] { margin-bottom: 0.5em; }' +
    '.irff_s-autoload_form { display: none; }' +
    '.irff_s-autoload_form.select { display: block; }' +
    '.irff_s-autoload_title { width: 100%; }' +
    '.irff_s-autoload_list { width: 560px; min-width: 560px; height: 8em; min-height: 4em; margin-top: 8px; }' +
    '#irff_s-siteinfo_disableitemlist { width: 560px; overflow: hidden; white-space: nowrap; }' +
    '#irff_s-etc input[type="button"] { margin: 0 4px; letter-spacing: 1px; }' +
    '.irff_siteinfourl_list fieldset { background-color: #FFF7D7; }' +
    '#irff_s-security input[type="text"], #irff_s-etc input[type="text"] { width: 560px; }' +
    '#irff_temp { background-color: gray; border: 2px solid gray; border-radius: 4px; left: 100px; position: fixed; top: 190px; visibility: hidden; width: 400px; z-index: 91000; }' +
    '#irff_temp-bar_title { color: white; font-weight: bold; padding: 0 4px; position: relative; top: 3px; }' +
    '#irff_temp-bar_button { position: absolute; right: 0; top: 0; }' +
    '#irff_temp-body { margin-top: 9px; }' +
    '#irff_temp-close { text-align: center; width: 100px; }' +
    '#irff_temp-textarea { height: 200px; width: 395px; }' +
    '.irff_twitter, .irff_delicious, .irff_facebook, .irff_hatena { position: relative; top: -2px; padding: 2px 4px; }' +
    '.irff_twitter img, .irff_delicious img, .irff_facebook img, .irff_hatena img { width: 16px; height: 16px; }' +
    '.irff_twitter span, .irff_delicious span, .irff_facebook span, .irff_hatena span { padding: 0px 3px; }' +
    '.irff_twitter1 span { color: #33CCFF !important; }' +
    '.irff_twitter2 span { color: #22AAFF !important; }' +
    '.irff_twitter3 span { color: #1188FF !important; }' +
    '.irff_twitter4 span { color: #0066FF !important; }' +
    '.irff_delicious span { color: white !important; }' +
    '.irff_delicious1 span { background-color: #73ADFF !important; }' +
    '.irff_delicious2 span { background-color: #5592E9 !important; }' +
    '.irff_delicious3 span { background-color: #3274D0 !important; }' +
    '.irff_delicious4 span { background-color: #2261A0 !important; }' +
    '.irff_hatena1 span { color: #FF6563 !important; background-color: #FFF0F0 !important; }' +
    '.irff_hatena2 span { color: #FF4444 !important; background-color: #FFEEEE !important; }' +
    '.irff_hatena3 span { color: #FF2222 !important; background-color: #FFDDDD !important; }' +
    '.irff_hatena4 span { color: #FF0000 !important; background-color: #FFCCCC !important; }';

  // == [Locale] ==================================
  var LOCALE_JA = {
    t0: '全文を読み込み中..',
    t1: '全文を読み込み中  Auto Search..',
    t2: '全文を読み込み中..... 完了',
    t3: 'SITEINFOが古いか間違っているので代わりにReadabilityで読み込みます',
    t4: '次のページを読み込み中..',
    t5: '次のページを読み込み中..... 完了',
    t6: '最後のページを読み込み中..... 完了',
    t7: '次のページは見つかりません',
    t8: '読み込みをブロックしました',
    t9: 'すでに全文を読み込みました',
    t10: 'SITEINFOが見つからないので新しいタブで開きました',
    t11: 'キャッシュをリセットしています..',
    t12: 'キャッシュをリセットしています..... 完了',
    t13: 'ポップアップできません',
    t14: 'エラー：サーバーからキャッシュを読み込めませんでした',
    t15: 'キャッシュをリセットしますか？',
    t16: 'キャッシュを消去しますか？',
    t17: 'エラー：JSONPはサポートしていません',
    t18: '全文読み込み',
    t19: '正規表現',
    t20: '追加',
    t21: '設定',
    t22: 'キャンセル',
    t23: 'ショートカットキー',
    t24: 'キー',
    t25: 'キーコード',
    t26: 'Auto Load 切替',
    t27: 'AutoPagerize 切替',
    t28: '設定欄を表示',
    t29: 'キャッシュリセット',
    t30: 'Full Feed URL',
    t31: 'AutoPagerize URL',
    t32: 'Full Feed ユーザー SITEINFO',
    t33: 'AutoPagerize ユーザー SITEINFO',
    t34: '次のページを読み込み中  Auto Search..... 完了',
    t35: '最後のページを読み込み中  Auto Search..... 完了',
    t36: 'すべて',
    t37: 'フィードタイトル',
    t38: '記事タイトル',
    t39: 'ホワイトリスト/ブラックリストに追加',
    t40: 'クリック',
    t41: '次のページを読み込む',
    t42: 'noscriptタグ内のコンテンツを表示',
    t43: '自動的に全文を読み込むアイテム',
    t44: 'ホワイトリスト',
    t45: 'ホワイトリストのみ',
    t46: 'なし',
    t47: '全文を読み込まないアイテム',
    t48: '読み込まない代わりに新しいタブで開く',
    t49: '新しいタブで開きました',
    t50: 'デバッグログをコンソールに出力',
    t51: '全文を読み込み中  Auto Search..... 完了',
    t52: 'インラインフレームを取り除く',
    t53: 'エラー：dom.storage.enabledをtrueに設定してください',
    t54: 'お待ちください',
    t55: 'ソーシャルアイコンを表示',
    t56: 'Yahoo!ブックマーク',
    t57: 'Buzzurl [バザール]',
    t58: 'はてなブックマーク',
    t59: '警告：次ページを継ぎ足してもよろしいですか？\n\n今のページ：',
    t60: '\n次のページ：',
    t61: '次ページを継ぎ足しません',
    t62: '次ページの継ぎ足しを許可するURL',
    t63: '次ページの継ぎ足しを禁止するURL',
    t64: 'SITEINFOがなくても全文の読み込みを試みる',
    t65: '表示を許可するインラインフレームのソースURL',
    t66: '設定をエクスポートしてクリップボードへコピーしますか？',
    t67: 'クリップボードへコピーしました',
    t68: '設定をエクスポートしました。\n以下の文字列をコピーしてください\n\n',
    t69: 'エクスポートした文字列を入力してください',
    t70: '設定をインポートしました',
    t71: 'インポートできません',
    t72: '設定をリセットしますか？',
    t73: '設定をリセットしました',
    t74: 'SITEINFOが見つからないので代わりにReadabilityで読み込みます',
    t75: '全文を表示できないとき',
    t76: 'ブラックリスト',
    t77: 'ブラックリスト以外',
    t78: '設定モード',
    t79: 'シンプル',
    t80: 'アドバンス',
    t81: '秒',
    t82: 'リクエストを中断しました',
    t83: 'Readabilityで読み込む',
    t84: '新しいタブで開く',
    t85: '何もしない',
    t86: 'SITEINFOが見つからないため全文を表示できませんでした',
    t87: 'インラインフレームで表示する',
    t88: 'SITEINFOが見つからないのでインラインフレームで表示します',
    t89: '埋め込みツイートを変換する'
  };
  var LOCALE_EN = {
    t0: 'Loading Full Feed..',
    t1: 'Loading Full Feed  Auto Search.....',
    t2: 'Loading Full Feed..... Done',
    t3: 'SITEINFO is unmatched to this entry, Load article from Readability',
    t4: 'Loading next page..',
    t5: 'Loading next page..... Done',
    t6: 'Loading last page..... Done',
    t7: 'Next page is not found',
    t8: 'Blocked loading full story',
    t9: 'This entry has been already loaded',
    t10: 'SITEINFO is not found, Opened in new tab',
    t11: 'Resetting cache. Please wait..',
    t12: 'Resetting cache. Please wait..... Done',
    t13: 'Cannot popup',
    t14: 'Cache Request Error',
    t15: 'Reset cache?',
    t16: 'Delete cache?',
    t17: 'Error: not support JSONP',
    t18: 'read full story',
    t19: 'regular expression',
    t20: 'Add',
    t21: 'Settings',
    t22: 'Cancel',
    t23: 'shortcut key',
    t24: 'key',
    t25: 'key code',
    t26: 'change Auto Load',
    t27: 'change AutoPagerize',
    t28: 'view settings',
    t29: 'reset cache',
    t30: 'Full Feed URL',
    t31: 'AutoPagerize URL',
    t32: 'Full Feed user SITEINFO',
    t33: 'AutoPagerize user SITEINFO',
    t34: 'Loading next page  Auto Search..... Done',
    t35: 'Loading last page  Auto Search..... Done',
    t36: 'All',
    t37: 'Feed title',
    t38: 'Article title',
    t39: 'Add whitelist/blacklist',
    t40: 'Click',
    t41: 'Loading next page',
    t42: 'Display content in noscript tags',
    t43: 'Read full story automatically',
    t44: 'Whitelist',
    t45: 'Whitelist only',
    t46: 'None',
    t47: 'Item which does not read full story',
    t48: 'Instead of not reading, open article in new tab',
    t49: 'Opened article in new tab',
    t50: 'Debug log to the browser console',
    t51: 'Loading Full Feed  Auto Search..... Done',
    t52: 'Remove iframe',
    t53: 'Error: Please set "dom.storage.enabled" in "true".',
    t54: 'Wait',
    t55: 'Display social icon',
    t56: 'Yahoo! JAPAN Bookmarks',
    t57: 'Buzzurl',
    t58: 'Hatena Bookmark',
    t59: 'Warning: Add the next page?\n\nreading page: ',
    t60: '\nnext page: ',
    t61: 'Do not add the next page',
    t62: 'URL to allow the addition of the next page',
    t63: 'URL to deny the addition of the next page',
    t64: 'Try loading full story without SITEINFO',
    t65: 'The source URL of the inline frame to display',
    t66: 'Export settings and copy it to clipboard?',
    t67: 'Copied it to clipboard',
    t68: 'Exported settings.\nPlease copy the following character string\n\n',
    t69: 'Please input the character string that exported',
    t70: 'Imported settings',
    t71: 'Cannot import',
    t72: 'Reset settings?',
    t73: 'Reset settings',
    t74: 'SITEINFO is not found, Load article from Readability',
    t75: 'If cannot display full story',
    t76: 'blacklist',
    t77: 'Except blacklist',
    t78: 'Settings mode',
    t79: 'Simple',
    t80: 'Advanced',
    t81: 'seconds',
    t82: 'Aborted request',
    t83: 'load article from Readability',
    t84: 'open article in new tab',
    t85: 'do nothing',
    t86: 'Site info to display full story is not found',
    t87: 'display article in iframe',
    t88: 'SITEINFO is not found, Display article in iframe',
    t89: 'Convert Embedded Tweets'
  };
  var LOC = (window.navigator.language === 'ja') ? LOCALE_JA : LOCALE_EN;

  // == [Application] =============================
  try {
    if (typeof localStorage !== 'object') return window.alert(LOC.t53);
  } catch (e) {
    return window.alert(LOC.t53);
  }
  var $id = function(id) {
    return document.getElementById(id);
  };
  var $ids = function(id) {
    return $id(`irff_s-${id}`);
  };

  var FullFeed = function(info, c, flag) {
    state = 'ready';
    this.itemInfo = c;
    this.info = info;
    this.requestURL = this.itemInfo.itemURL;
    var u = this.requestURL;
    if (/^http:\/\/rd\.yahoo\.co\.jp\/rss\/l\/.+/.test(u)) {
      if (/\/\*-http/.test(u)) this.requestURL = decodeURIComponent(u.slice(u.indexOf('*-http') + 2));
      else if (/\/\*http/.test(u)) this.requestURL = decodeURIComponent(u.slice(u.indexOf('*http') + 1));
    }
    this.itemInfo.itemBody = document.querySelector(`${currentEntry()} .article_content`);
    var encode = this.info.enc || document.characterSet;
    if (flag === 'next' && this.itemInfo.innerContents) {
      this.itemInfo.innerContents.className.split(/\s+/).some(i => {
        if (!/^entry|^gm_|^http/.test(i)) {
          encode = i;
          return true;
        }
      });
    }
    this.mime = `text/html; charset=${encode}`;
    if (flag === 'search') this.request('HEAD', c);
    else this.request('GET', c);
    if (debugLog) {
      try {
        console.log(new Date());
        console.log('Item Title: ', c.item.title);
        console.log('Item URL: ', c.item.url);
        console.log('Feed URL: ', c.feed.url);
        console.log('FullFeed URL: ', info.url);
        console.log('FullFeed XPath: ', info.xpath);
        console.log('FullFeed Encode: ', info.enc);
        console.log(this.info);
      } catch (e) { console.error(e); }
    }
  };

  FullFeed.prototype.request = function(m, c) {
    if (!this.requestURL) return;
    state = 'request';
    var self = this,
      retry = 0,
      mes = '',
      xhrID;
    var message2 = function(s, d, t) {
      mes = s;
      message(s, d, t);
    };
    var gmRequest = function() {
      xhr.push(GM_xmlhttpRequest(opt));
      xhrID = window.setTimeout(() => {
        window.clearTimeout(xhrID);
        for (var x1 = 0, x2 = xhr.length; x1 < x2; x1++) {
          if (xhr[x1]) xhr[x1].abort();
        }
        xhr.length = 0;
        state = null;
        message(LOC.t82, 3000, 'warning');
      }, st.timeout * 1000);
    };
    var opt = {
      method: m,
      url: this.requestURL,
      overrideMimeType: this.mime,
      timeout: st.timeout * 1000,
      onreadystatechange: function(res) {
        var dot = '';
        if (res.readyState >= 1 && res.readyState <= 3) {
          for (var i = 0; i < res.readyState; i++) dot += '.';
          message(mes + dot, -1);
        }
      },
      onerror: function() {
        window.clearTimeout(xhrID);
        state = null;
        self.requestError.apply(self, ['Request Error']);
      },
      onload: function(res) {
        window.clearTimeout(xhrID);
        if ((res.status >= 301 && res.status <= 303) || res.status === 307) {
          try {
            opt.url = /\sLocation:\s+(\S+)/.exec(res.responseHeaders)[1];
            gmRequest();
            return;
          } catch (er) {
            state = null;
            self.requestError.apply(self, [`Request Error : ${res.status}`]);
            return;
          }
        } else if (res.status === 200) {
          if (res.finalUrl) opt.url = this.requestURL = res.finalUrl;
          readingPageUrl = c.innerContents.className.split(/\s+/).filter(i => /^http/.test(i)).slice(-1);
          readingPageUrl = (readingPageUrl.length) ? readingPageUrl.toString() : opt.url;
          var cset = /content-type:\s?\S+\s?charset=\S+/i.exec(res.responseHeaders),
            enc = self.info.enc || '';
          if (cset) cset = cset[0].slice(cset[0].lastIndexOf('=') + 1);
          if (opt.method === 'GET') {
            if (cset && !new RegExp(cset, 'i').test(enc) && retry < 2) {
              self.info.enc = cset;
              opt.overrideMimeType = `text/html; charset=${cset}`;
              gmRequest();
              retry += 1;
            } else {
              var h1 = readingPageUrl.split('/')[2],
                h2 = opt.url.split('/')[2],
                re = new RegExp(st.allownexturl, 'i');
              if (h1 === h2 || (st.allownexturl && re.test(readingPageUrl))) self.requestLoad.call(self, res, c);
              else if (window.confirm(LOC.t59 + readingPageUrl + LOC.t60 + opt.url)) self.requestLoad.call(self, res, c);
              else self.requestEnd(c, false, true);
            }
          } else if (opt.method === 'HEAD') {
            if (cset && st.autosearch) {
              self.info.enc = cset;
              opt.method = 'GET';
              opt.overrideMimeType = `text/html; charset=${cset}`;
              message2(LOC.t1, -1);
              loadingStyle('add', c.articleContainer);
              gmRequest();
            } else {
              state = null;
              if (st.cantdisplay === 0) {
                var eb = $id(`embed_button_${c.item.id}`);
                if (eb && eb.classList.contains('article_title_buttons_active')) message();
                else message2(LOC.t88);
                contentScriptInjection(`embed_article("${c.item.id}","${opt.url}");`);
              } else if (st.cantdisplay === 1) {
                var mb = $id(`mobilize_button_${c.item.id}`);
                if (mb && mb.classList.contains('article_title_buttons_active')) message();
                else message2(LOC.t74);
                contentScriptInjection(`mobilize("${c.item.id}");`);
              } else if (st.cantdisplay === 2) {
                message2(LOC.t10);
                loadingStyle('open', c.articleContainer);
                GM_openInTab(opt.url, true);
                window.setTimeout(() => loadingStyle('remove', c.articleContainer), 1000);
              } else {
                message2(LOC.t86);
              }
            }
          }
        } else {
          state = null;
          var stat = (res.status) ? ` : ${res.status}` : '';
          self.requestError.apply(self, [`Request Error${stat}`]);
        }
      }
    };
    if (opt.method === 'HEAD') message2(LOC.t54, -1);
    else if (opt.method === 'GET') {
      message2(LOC.t0, -1);
      loadingStyle('add', c.articleContainer);
    }
    if (opt.url.indexOf('http:') !== 0 && this.info.base) opt.url = pathToURL(this.info.base, opt.url);
    gmRequest();
  };

  FullFeed.prototype.requestLoad = function(res, c) {
    state = 'loading';
    var text = res.responseText,
      html = createHTMLDocumentByString(text),
      tmpElm = (this.info.xpath) ? getElementsByXPath(this.info.xpath, html) : null;
    if (tmpElm) {
      var tmpNode = document.createDocumentFragment().appendChild(document.createElement('div')),
        doc;
      try {
        doc = document.cloneNode(false);
        doc.appendChild(doc.importNode(document.documentElement, false));
      } catch (e) {
        doc = document.implementation.createDocument('http://www.w3.org/1999/xhtml', 'html', null);
      }
      try {
        tmpNode = doc.adoptNode(tmpNode);
      } catch (e) {
        tmpNode = doc.importNode(tmpNode, true);
      }
      tmpElm.forEach(elm => tmpNode.appendChild(elm));
      if (tmpNode.innerHTML) text = tmpNode.innerHTML;
    }
    ['head', 'isindex', 'link', 'script', 'style', 'title'].forEach(t => {
      var r = new RegExp(`<(?:!--\\s*)?${t}(?:\\s[^>]+?)?>[\\S\\s]*?<\\/${t}\\s*>`, 'gi');
      text = text.replace(r, '');
    });
    var re = /(<[^>]+?[\s"'])(?:on(?:(?:un)?load|(?:dbl)?click|mouse(?:down|up|over|move|out)|key(?:press|down|up)|focus|blur|submit|reset|select|change|error)|submit|target|usemap|formaction)\s*=\s*(?:"(?:\\"|[^"])*"?|'(\\'|[^'])*'?|[^\s>]+(?=[\s>]|<\w))(?=[^>]*?>|<\w|\s*$)/gi;
    while (re.test(text)) {
      text = text.replace(re, '$1');
    }
    if (st.noscripttag) text = text.replace(/<noscript(?:\s[^>]+?)?>([\S\s]*?)<\/noscript\s*>/gi, '<div>$1</div>');
    else text = text.replace(/<noscript(?:\s[^>]+?)?>([\S\s]*?)<\/noscript\s*>/gi, '');
    var htmldoc = createHTMLDocumentByString(text);
    if (st.iframetag) {
      var iframe = htmldoc.getElementsByTagName('iframe');
      for (var i = 0, j = iframe.length; i < j; i++) {
        if (iframe[i] && (!st.allowiframeurl || (iframe[i].src && !new RegExp(st.allowiframeurl).test(iframe[i].src)))) iframe[i].parentNode.removeChild(iframe[i]);
      }
    }
    removeXSSRisks(htmldoc);
    if (res.finalUrl) this.requestURL = res.finalUrl;
    if (st.lazyloadurl && new RegExp(st.lazyloadurl, 'i').test(c.item.url)) replaceSrcOriginal(htmldoc);
    relativeToAbsolutePath(htmldoc, this.requestURL);
    var self = this,
      entry;
    FullFeed.documentFilters.forEach(filter => filter(htmldoc, self.requestURL, self.info));
    try {
      entry = getElementsByXPath('//html/child::node()', htmldoc);
    } catch (er1) {
      message(er1, 5000, 'warning');
      return;
    }
    if (!tmpElm) {
      if (st.autosearch) {
        if (debugLog) console.log('Auto Search');
        message(LOC.t1, -1);
        entry = searchEntry(htmldoc);
      } else {
        state = null;
        GM_openInTab(self.requestURL, true);
        window.setTimeout(() => loadingStyle('remove', c.articleContainer), 1000);
        return message(LOC.t10, 2000);
      }
    }
    if (entry) {
      if (c.innerContents && !c.innerContents.classList.contains('irff_loaded')) this.removeEntry();
      entry = this.addEntry(entry, c);
      if (!tmpElm && st.autosearch) this.requestEnd(c, true);
      else this.requestEnd(c);
    } else {
      state = null;
      message(LOC.t3);
      contentScriptInjection(`mobilize(${c.item.id});`);
    }
  };

  FullFeed.prototype.requestEnd = function(c, as, halt) {
    state = 'loaded';
    xhr.length = 0;
    window.setTimeout(() => state = 'wait', 1000);
    loadingStyle('remove', c.articleContainer);
    c.innerContents.classList.add(this.info.enc || document.characterSet);
    c.innerContents.classList.remove('entry-body-empty');
    c.innerContents.classList.add('irff_loaded');
    c.innerContents.classList.toggle(this.requestURL);
    var el = document.querySelector(`${currentEntry()} .irff_checked_icon`);
    FullFeed.checkNextPage(c.innerContents);
    if (c.innerContents.className.split(/\s+/).filter(i => /^http/.test(i)).length > 1) {
      if (nextPageLink) {
        if (as) message(LOC.t34, 3000);
        else message(LOC.t5);
      } else {
        if (as) message(LOC.t35, 3000);
        else message(LOC.t6);
        if (el) {
          el.classList.remove('irff_checked_icon_next');
          el.classList.remove('irff_checked_icon_as_next');
          if (as) el.classList.add('irff_checked_icon_as_nonext');
          else el.classList.add('irff_checked_icon_nonext');
          el.title = `Ctrl+${LOC.t40} : ${LOC.t39}`;
        }
      }
    } else {
      if (as) message(LOC.t51, 3000);
      else message(LOC.t2);
      if (el) {
        el.classList.remove('irff_checked_icon_info');
        el.classList.remove('irff_checked_icon_noinfo');
        if (nextPageLink) {
          if (as) el.classList.add('irff_checked_icon_as_next');
          else el.classList.add('irff_checked_icon_next');
          el.title = `${LOC.t40} : ${LOC.t41} / Ctrl+${LOC.t40} : ${LOC.t39}`;
          if (st.autopagerize) {
            window.setTimeout(() => FullFeed.checkScroll(), 2000);
          }
        } else {
          if (as) el.classList.add('irff_checked_icon_as_nonext');
          else el.classList.add('irff_checked_icon_nonext');
          el.title = `Ctrl+${LOC.t40} : ${LOC.t39}`;
        }
      }
    }
    if (halt) message(LOC.t61, 3000);
    if (st.embeddedtweets && twttr) twttr.widgets.load(c.innerContents);
    for (var p in this) {
      if (Object.prototype.hasOwnProperty.call(this, p)) this[p] = void 0;
    }
  };

  FullFeed.checkScroll = function() {
    if (!nextPageLink || (state && !/^loaded$|^wait$/.test(state))) return;
    window.clearTimeout(scrollInterval);
    scrollInterval = window.setTimeout(() => {
      var s = 'reader_pane_view_style_',
        e1 = $id('reader_pane'),
        e2 = document.querySelector(currentEntry()),
        btn = $id('view_style_img'),
        remain;
      if (!e1 || !e2 || ((e1.classList.contains(`${s}0`) || (btn && btn.hasAttribute('src') && /menu2\.png$/.test(btn.getAttribute('src')))) && !e2.classList.contains('article_expanded'))) return;
      if (e1.classList.contains(`${s}2`)) {
        e1 = $id('three_way_contents');
        remain = nextPageLink.offsetTop - nextPageLink.offsetHeight - e1.offsetHeight - e1.scrollTop;
      } else if (e1.classList.contains(`${s}3`) || e1.classList.contains(`${s}4`)) {
        remain = nextPageLink.offsetTop - nextPageLink.offsetHeight - $id('article_dialog_wrapper').offsetHeight - $id('article_dialog').scrollTop;
      } else {
        remain = e2.offsetTop + nextPageLink.offsetTop - nextPageLink.offsetHeight - e1.offsetHeight - e1.scrollTop;
      }
      if (remain < st.apheight) {
        nextPageLink = null;
        initFullFeed();
      }
    }, 100);
  };

  FullFeed.checkNextPage = function(con) {
    var con2 = con.cloneNode(true),
      aClass = con.className.split(/\s+/),
      finalUrl = aClass[aClass.length - 1],
      c = new GetCurrentItem(),
      bMatch;
    var check = function(data, flag) {
      var nextEl, nextEl2;
      if (data.some(info => {
        if (info.url && info.url.length <= 12 && !/^\^?https?/i.test(info.url)) {
          if (new RegExp('^://', 'i').test(info.url)) info.url = `^https?${info.url}`;
          else if (new RegExp('^//', 'i').test(info.url)) info.url = `^https?:${info.url}`;
          else info.url = `^https?://${info.url}`;
        }
        if (!bMatch && new RegExp(info.url).test(finalUrl) && info.url.length > 12) {
          var nextLink = info.nextLink,
            elms, elms2, bCache, bList;
          if (nextLink) nextLink = nextLink.replace(/id\(([^)]+)\)/g, '//*[@id=$1]');
          if (nextLink) {
            elms2 = getElementsByXPath(nextLink, con2);
            elms = getElementsByXPath(nextLink, con);
          }
          if (!elms2) elms2 = getElementsByXPath('//a[@rel="next"]', con2);
          if (!elms) elms = getElementsByXPath('//a[@rel="next"]', con);
          if (elms2 && elms2.length > 0) nextEl2 = elms2[elms2.length - 1];
          if (elms && elms.length > 0 && nextEl2 && nextEl2.href) {
            var arr = [];
            for (var i = 0, j = elms.length; i < j; i++) {
              if (nextEl2.href === elms[i].href) arr.push(elms[i]);
            }
            nextEl = (arr.length) ? arr[arr.length - 1] : elms[elms.length - 1];
          }
          if (nextEl2 && finalUrl !== nextEl2.href) {
            if (flag === 'cache') {
              if (userCacheListAP.some(u => {
                if (u === c.feed.url) return true;
              })) {
                userCacheAP.some(u => {
                  if (u === info) {
                    bMatch = true;
                    return true;
                  }
                });
              }
            } else bMatch = true;
            if (flag === 'full') {
              if (userCacheListAP.some(u => {
                if (u === c.feed.url) {
                  bList = true;
                  return true;
                }
              })) {
                userCacheAP.some(u => {
                  if (u === info) {
                    bCache = true;
                    return true;
                  }
                });
              }
              if (!bCache) {
                delete info.exampleUrl;
                delete info.insertBefore;
                userCacheAP.push(info);
                try {
                  localStorage.setItem('InoReaderFullFeed_userCacheAP', JSON.stringify(userCacheAP));
                  if (!bList) {
                    userCacheListAP.push(c.feed.url);
                    localStorage.setItem('InoReaderFullFeed_userCacheListAP', JSON.stringify(userCacheListAP));
                  }
                } catch (er) { console.error(er); }
              }
            }
            return true;
          }
          return false;
        }
        return false;
      })) nextPageLink = (nextEl) ? nextEl : null;
    };
    check(userSiteInfoAP, 'set');
    if (!bMatch) check(userCacheAP, 'cache');
    if (!bMatch) {
      siteInfoAP.some(ctx => {
        if (cacheAPInfo[ctx.url]) {
          check(cacheAPInfo[ctx.url].info, 'full');
          if (bMatch) return true;
        }
      });
    }
    if (bMatch && nextPageLink && st.denynexturl) {
      var re = new RegExp(st.denynexturl, 'i');
      if (re.test(nextPageLink.href)) nextPageLink = null;
    }
  };

  FullFeed.prototype.requestError = function(e) {
    state = null;
    message(`Error: ${e}`, 5000, 'warning');
    loadingStyle('remove', this.itemInfo.articleContainer);
    this.itemInfo.innerContents.classList.add('irff_error');
  };

  FullFeed.prototype.removeEntry = function() {
    if (this.itemInfo && this.itemInfo.itemBody) {
      while (this.itemInfo.itemBody.firstChild) {
        this.itemInfo.itemBody.removeChild(this.itemInfo.itemBody.firstChild);
      }
    }
  };

  FullFeed.prototype.addEntry = function(entry, c) {
    var url = this.requestURL || c.itemURL,
      ic = (c.innerContents.id) ? $id(c.innerContents.id) : c.innerContents,
      div = document.createElement('div');
    if (ic && ic.hasChildNodes()) {
      div.className = 'irff_pager';
      var http = c.innerContents.className.split(/\s+/).filter(i => /^http/.test(i));
      var host = (readingPageUrl.split('/')[2] !== url.split('/')[2]) ? `<span class="irff_pager_differenthost">( ${readingPageUrl.split('/')[2]} &rarr; ${url.split('/')[2]} )</span>` : '';
      div.innerHTML = `<hr />page: <a href="${url}" target="_blank">${  http.length + 1  }</a>${host}`;
      ic.appendChild(div);
    } else {
      div.className = 'irff_entry_url';
      div.innerHTML = `<a href="${url}" class="bluelink" target="_blank">${url}</a>`;
      try {
        if (ic) ic.parentNode.insertBefore(div, ic);
      } catch (er) {
        message(`Error: ${er}`, 5000, 'warning');
      }
    }
    return entry.map(i => {
      var pe = document.importNode(i, true);
      if (ic) ic.appendChild(pe);
      return pe;
    });
  };

  FullFeed.resetCache = function() {
    message(LOC.t11, -1);
    var getSiteinfo = function(data, flag) {
      var nCache = 0,
        nCaches = (flag) ? siteInfo.length : siteInfoAP.length;
      data.forEach(ctx => {
        var opt = {
          method: 'get',
          url: ctx.url,
          ignoreCache: true,
          onload: function(res) {
            nCache += 1;
            if (res.status === 200) {
              if (flag) {
                FullFeed.setCache(res, ctx, 'cache');
                if (nCache === nCaches) getSiteinfo(siteInfoAP);
              } else {
                if (nCache === nCaches) FullFeed.setCache(res, ctx, 'cacheAP', true);
                else FullFeed.setCache(res, ctx, 'cacheAP');
              }
            } else if (flag && nCache === nCaches) getSiteinfo(siteInfoAP);
          },
          onerror: function() {
            nCache += 1;
            if (flag && nCache === nCaches) getSiteinfo(siteInfoAP);
          }
        };
        GM_xmlhttpRequest(opt);
      });
    };
    getSiteinfo(siteInfo, true);
  };

  FullFeed.removeCache = function() {
    if (window.confirm(LOC.t16)) {
      localStorage.removeItem('InoReaderFullFeed_cache');
      localStorage.removeItem('InoReaderFullFeed_cacheAP');
      localStorage.removeItem('InoReaderFullFeed_userCache');
      localStorage.removeItem('InoReaderFullFeed_userCacheAP');
      localStorage.removeItem('InoReaderFullFeed_userCacheList');
      localStorage.removeItem('InoReaderFullFeed_userCacheListAP');
      cacheInfo = {};
      cacheAPInfo = {};
      userCache.length = 0;
      userCacheAP.length = 0;
      userCacheList.length = 0;
      userCacheListAP.length = 0;
    }
  };

  FullFeed.setCache = function(res, ctx, item, flag) {
    var info = [];
    var setJson = function(t) {
      try {
        info = JSON.parse(t)
          .sort((a, b) => {
            a = new Date(a.updated_at).getTime();
            b = new Date(b.updated_at).getTime();
            if (!isNaN(a) && !isNaN(b)) return new Date(b).getTime() - new Date(a).getTime();
            return b;
          })
          .map(i => i.data);
      } catch (er1) { console.error(er1); }
    };
    switch (ctx.format.toUpperCase()) {
    case 'JSON':
      setJson(res.responseText);
      break;
    case 'JSONP':
      if (ctx.callback) {
        try {
          var txt = res.responseText;
          txt = txt.replace(new RegExp(`${ctx.callback}\\s*\\(\\s*\\[\\s*\\{`, 'gm'), `${ctx.callback}([{`).replace(/\}\s*\]\s*\)/gm, '}])');
          txt = txt.slice(txt.indexOf(`${ctx.callback}([{`) + ctx.callback.length + 1);
          txt = txt.slice(0, txt.lastIndexOf('}])') + 2);
          setJson(txt);
        } catch (er2) { console.error(er2); }
      } else message(LOC.t17, 5000, 'warning');
      break;
    }
    if (info.length > 0) {
      if (item === 'cache') {
        cacheInfo[ctx.url] = {
          url: ctx.url,
          info: info
        };
        try {
          localStorage.setItem('InoReaderFullFeed_cache', JSON.stringify(cacheInfo));
        } catch (er3) {
          if (er3 && er3.name && er3.message) window.alert(`${er3.name}\n${er3.message}`);
        }
        localStorage.removeItem('InoReaderFullFeed_userCache');
        localStorage.removeItem('InoReaderFullFeed_userCacheList');
        userCache.length = 0;
        userCacheList.length = 0;
      } else if (item === 'cacheAP') {
        cacheAPInfo[ctx.url] = {
          url: ctx.url,
          info: info
        };
        try {
          localStorage.setItem('InoReaderFullFeed_cacheAP', JSON.stringify(cacheAPInfo));
        } catch (er4) {
          if (er4 && er4.name && er4.message) window.alert(`${er4.name}\n${er4.message}`);
        }
        localStorage.removeItem('InoReaderFullFeed_userCacheAP');
        localStorage.removeItem('InoReaderFullFeed_userCacheListAP');
        userCacheAP.length = 0;
        userCacheListAP.length = 0;
      }
      if (flag) {
        var hasFF = (localStorage.getItem('InoReaderFullFeed_cache')) ? true : false,
          hasAP = (localStorage.getItem('InoReaderFullFeed_cacheAP')) ? true : false;
        if (hasFF && hasAP) message(LOC.t12, 5000);
        else message(LOC.t14, 5000, 'warning');
      }
    }
  };

  FullFeed.getCache = function(key) {
    var js = '{}';
    if (localStorage.getItem(`InoReaderFullFeed_${key}`)) js = localStorage.getItem(`InoReaderFullFeed_${key}`);
    else if (/^cache.+/.test(key)) FullFeed.resetCache();
    else if (/^user.+/.test(key)) js = '[]';
    try {
      return JSON.parse(js);
    } catch (er) {
      if (/^user.+/.test(key)) return [];
      return {};
    }
  };

  FullFeed.saveSettings = function() {
    delete st.sociallivedoor;
    delete st.socialfc2;
    try {
      localStorage.setItem('InoReaderFullFeed_settings', JSON.stringify(st));
    } catch (er) {
      window.alert('Error: Save Settings');
    }
  };

  FullFeed.loadSettings = function(data) {
    if (data === 'reset') st = {};
    else if (data) st = data;
    else {
      st = {};
      try {
        if (localStorage.getItem('InoReaderFullFeed_settings')) st = JSON.parse(localStorage.getItem('InoReaderFullFeed_settings'));
      } catch (er1) { console.error(er1); }
    }
    var notType = function(t, a) {
      return (Object.prototype.toString.call(a).slice(8, 11) !== t) ? true : false;
    };
    if (notType('Str', st.allowiframeurl)) st.allowiframeurl = '';
    if (notType('Str', st.allownexturl)) st.allownexturl = '';
    if (notType('Num', st.apheight) || st.apheight < 200 || st.apheight > 2000) st.apheight = 500;
    if (notType('Num', st.autoload) || st.autoload < 0 || st.autoload > 3) st.autoload = 2;
    if (notType('Arr', st.autoloadarticle)) st.autoloadarticle = [];
    if (notType('Arr', st.autoloadfeed)) st.autoloadfeed = [];
    if (notType('Boo', st.autopagerize)) st.autopagerize = true;
    if (notType('Boo', st.autosearch)) st.autosearch = true;
    if (isFinite(st.basekey)) st.basekey = +st.basekey;
    else if (!notType('Str', st.basekey) && st.basekey.length === 1) st.basekey = st.basekey.toUpperCase();
    else st.basekey = 'Z';
    if (notType('Num', st.cantdisplay) || st.cantdisplay < 0 || st.cantdisplay > 3) st.cantdisplay = 0;
    if (!st.version) st.cantdisplay += 1;
    if (notType('Str', st.denynexturl)) st.denynexturl = '';
    if (notType('Arr', st.disableitem)) st.disableitem = [];
    if (notType('Boo', st.embeddedtweets)) st.embeddedtweets = true;
    if (notType('Boo', st.iframetag)) st.iframetag = true;
    if (notType('Str', st.lazyloadurl)) st.lazyloadurl = '';
    if (notType('Str', st.lazyloadattr)) st.lazyloadattr = '"ajax","data-lazy-src","data-original","data-src"';
    if (notType('Str', st.mode)) st.mode = 'simple';
    if (notType('Boo', st.noscripttag)) st.noscripttag = true;
    if (notType('Arr', st.notloadarticle)) st.notloadarticle = [];
    if (notType('Arr', st.notloadfeed)) st.notloadfeed = [];
    if (notType('Str', st.notread)) st.notread = '';
    if (notType('Boo', st.openitem)) st.openitem = false;
    if (notType('Str', st.replacefullfeedurl)) st.replacefullfeedurl = '';
    if (notType('Boo', st.socialbuzzurl)) st.socialbuzzurl = false;
    if (notType('Boo', st.socialicon)) st.socialicon = true;
    if (notType('Boo', st.socialdelicious)) st.socialdelicious = false;
    if (notType('Boo', st.socialfacebook)) st.socialfacebook = false;
    if (notType('Boo', st.socialgoogleplus)) st.socialgoogleplus = false;
    if (notType('Boo', st.socialhatena)) st.socialhatena = false;
    if (notType('Boo', st.socialtwitter)) st.socialtwitter = true;
    if (notType('Boo', st.socialyahoo)) st.socialyahoo = false;
    if (notType('Num', st.timeout) || st.timeout < 10 || st.timeout > 99) st.timeout = 15;
    try {
      siteInfo = JSON.parse(st.siteinfo);
    } catch (er2) {
      siteInfo = [{
        'format': 'JSON',
        'url': 'http://wedata.net/databases/LDRFullFeed/items.json'
      }];
      st.siteinfo = JSON.stringify(siteInfo);
    }
    try {
      siteInfoAP = JSON.parse(st.siteinfoap);
    } catch (er3) {
      siteInfoAP = [{
        'format': 'JSON',
        'url': 'http://wedata.net/databases/AutoPagerize/items.json'
      }];
      st.siteinfoap = JSON.stringify(siteInfoAP);
    }
    try {
      userSiteInfo = JSON.parse(st.usersiteinfo);
    } catch (er4) {
      userSiteInfo = [{
        'url': '',
        'xpath': '',
        'type': '',
        'enc': ''
      }];
      st.usersiteinfo = JSON.stringify(userSiteInfo);
    }
    try {
      userSiteInfoAP = JSON.parse(st.usersiteinfoap);
    } catch (er5) {
      userSiteInfoAP = [{
        'url': '',
        'nextLink': '',
        'pageElement': ''
      }];
      st.usersiteinfoap = JSON.stringify(userSiteInfoAP);
    }
  };

  FullFeed.createSettings = function() {
    var div = document.createElement('div');
    div.id = 'irff_s';
    div.style.display = 'none';
    div.innerHTML = `<div id="irff_s-titlebar"><div id="irff_s-titlebar_title"><a href="https://greasyfork.org/scripts/897-inoreader-full-feed" target="_blank">InoReader Full Feed ${LOC.t21}</a></div><div id="irff_s-titlebar_button"><input type="button" id="irff_s-ok" value="OK"><input type="button" id="irff_s-cancel" value="${LOC.t22}"></div></div><div id="irff_s-tab"></div><ul id="irff_s-list"></ul>`;
    document.body.appendChild(div);
    var list = [{
      tab: 'General',
      id: 'general',
      body: `<fieldset><legend>${LOC.t23}</legend><label>${LOC.t18} : <input type="text" id="irff_s-general_key"><span id="irff_s-general_keydesc"></span></label><a href="javascript:void(0);" id="irff_s-general_keyhelpicon">[ ? ]</a><div id="irff_s-general_keyhelpbody">${LOC.t26} : Ctrl+ (${LOC.t18}) ${LOC.t24}<br>${LOC.t27} : Shift+ (${LOC.t18}) ${LOC.t24}<br>${LOC.t28} : Ctrl+Shift+ (${LOC.t18}) ${LOC.t24}<br>${LOC.t29} : Alt+Ctrl+Shift+ (${LOC.t18}) ${LOC.t24}</div></fieldset><fieldset><legend>${LOC.t18}</legend><label><input type="checkbox" id="irff_s-general_ap">${LOC.t41}</label><label class="irff_s-advance"> ( <input type="number" min="200" max="2000" id="irff_s-general_apheight">px )</label><br><label><input type="checkbox" id="irff_s-general_autosearch">${LOC.t64}</label><br><label><input type="checkbox" id="irff_s-general_embeddedtweets">${LOC.t89}</label><br><label>${LOC.t75} : <select id="irff_s-general_cantdisplay"><option>${LOC.t87}</option><option>${LOC.t83}</option><option>${LOC.t84}</option><option>${LOC.t85}</option></select></label><fieldset class="irff_s-advance"><legend>${LOC.t47} (${LOC.t19}) : </legend><input type="text" id="irff_s-general_notread"><br><label><input type="checkbox" id="irff_s-general_openitem">${LOC.t48}</label></fieldset></fieldset>`
    }, {
      tab: 'Site Info',
      id: 'siteinfo',
      body: `<div id="irff_s-siteinfo_navi" class="irff_s-navi"><span id="irff_s-siteinfo_navi_ff" class="irff_s-siteinfo_navi irff_s-advance">FF URL</span><span id="irff_s-siteinfo_navi_ap" class="irff_s-siteinfo_navi irff_s-advance">AP URL</span><span id="irff_s-siteinfo_navi_uff" class="irff_s-siteinfo_navi select">FF SITEINFO</span><span id="irff_s-siteinfo_navi_uap" class="irff_s-siteinfo_navi">AP SITEINFO</span><span id="irff_s-siteinfo_navi_disableitem" class="irff_s-siteinfo_navi irff_s-advance">disable Item</span></div><fieldset id="irff_s-siteinfo_f_ff" class="irff_s-advance"><legend>${LOC.t30}</legend><textarea id="irff_s-siteinfo_ff"></textarea></fieldset><fieldset id="irff_s-siteinfo_f_ap" class="irff_s-advance"><legend>${LOC.t31}</legend><textarea id="irff_s-siteinfo_ap"></textarea></fieldset><fieldset id="irff_s-siteinfo_f_uff" class="select"><legend>${LOC.t32}</legend><div class="irff_s-siteinfo_form"><div><label class="irff_s-siteinfo_user_label irff_s-table"><span>url:</span><input type="text" id="irff_s-siteinfo_uff_url" class="irff_s-siteinfo_text"></label></div><div><label class="irff_s-siteinfo_user_label irff_s-table"><span>xpath:</span><input type="text" id="irff_s-siteinfo_uff_xpath" class="irff_s-siteinfo_text"></label></div><div class="irff_s-table"><label id="irff_s-siteinfo_uff_type_label" class="irff_s-siteinfo_user_label"><span>type:</span><select id="irff_s-siteinfo_uff_type"><option value="IND">INDIVIDUAL</option><option value="SUB">SUBGENERAL</option><option value="GEN">GENERAL</option></select></label><label id="irff_s-siteinfo_user_label_enc"><div class="irff_s-table"><span id="irff_s-siteinfo_uff_enc_span">enc:</span><input type="text" id="irff_s-siteinfo_uff_enc" class="irff_s-siteinfo_text" list="irff_s-siteinfo_enc"></div></label><datalist id="irff_s-siteinfo_enc"><option value="UTF-8"><option value="EUC-JP"><option value="Shift_JIS"></datalist><span class="irff_s-addbutton_span"><input type="button" id="irff_s-siteinfo_uff_add" class="irff_s-addbutton" value="${LOC.t20}"></span></div></div><textarea id="irff_s-siteinfo_uff"></textarea></fieldset><fieldset id="irff_s-siteinfo_f_uap"><legend>${LOC.t33}</legend><div class="irff_s-siteinfo_form"><div><label class="irff_s-siteinfo_user_label irff_s-table"><span>url:</span><input type="text" id="irff_s-siteinfo_uap_url" class="irff_s-siteinfo_text"></label></div><div><label class="irff_s-siteinfo_user_label irff_s-table"><span>nextLink:</span><input type="text" id="irff_s-siteinfo_uap_nextlink" class="irff_s-siteinfo_text"></label></div><div class="irff_s-table"><label id="irff_s-siteinfo_uap_pageelement_label" class="irff_s-siteinfo_user_label"><div class="irff_s-table"><span id="irff_s-siteinfo_uap_pageelement_span">pageElement:</span><input type="text" id="irff_s-siteinfo_uap_pageelement" class="irff_s-siteinfo_text"></div></label><span class="irff_s-addbutton_span"><input type="button" id="irff_s-siteinfo_uap_add" class="irff_s-addbutton" value="${LOC.t20}"></span></div></div><textarea id="irff_s-siteinfo_uap"></textarea></fieldset><fieldset id="irff_s-siteinfo_f_disableitem" class="irff_s-advance"><legend>disable SITEINFO Item</legend><div id="irff_s-siteinfo_disableitemlist"></div><textarea id="irff_s-siteinfo_disableitem"></textarea></fieldset>`
    }, {
      tab: 'Auto Load',
      id: 'autoload',
      body: `<div id="irff_s-autoload_navi" class="irff_s-navi"><span id="irff_s-autoload_navi_whitelist" class="irff_s-autoload_navi select">${LOC.t44}</span><span id="irff_s-autoload_navi_blacklist" class="irff_s-autoload_navi">${LOC.t76}</span></div><fieldset id="irff_s-autoload_f_whitelist" class="select"><legend>${LOC.t44} (${LOC.t19})</legend><label class="irff_s-r"><input type="radio" name="irff_s-autoload_whitelist_r" value="wf" id="irff_s-autoload_whitelist_r_feed">${LOC.t37}</label><label class="irff_s-r"><input type="radio" name="irff_s-autoload_whitelist_r" value="wa" id="irff_s-autoload_whitelist_r_article">${LOC.t38}</label><div id="irff_s-autoload_whitelist_feed" class="irff_s-autoload_form select"><div class="irff_s-table"><input type="text" id="irff_s-autoload_whitelist_feed_title" class="irff_s-autoload_title"><span class="irff_s-addbutton_span"><input type="button" id="irff_s-autoload_whitelist_feed_add" class="irff_s-addbutton" value="${LOC.t20}"></span></div><textarea id="irff_s-autoload_whitelist_feed_list" class="irff_s-autoload_list"></textarea></div><div id="irff_s-autoload_whitelist_article" class="irff_s-autoload_form"><div class="irff_s-table"><input type="text" id="irff_s-autoload_whitelist_article_title" class="irff_s-autoload_title"><span class="irff_s-addbutton_span"><input type="button" id="irff_s-autoload_whitelist_article_add" class="irff_s-addbutton" value="${LOC.t20}"></span></div><textarea id="irff_s-autoload_whitelist_article_list" class="irff_s-autoload_list"></textarea></div></fieldset><fieldset id="irff_s-autoload_f_blacklist"><legend>${LOC.t76} (${LOC.t19})</legend><label class="irff_s-r"><input type="radio" name="irff_s-autoload_blacklist_r" value="bf" id="irff_s-autoload_blacklist_r_feed">${LOC.t37}</label><label class="irff_s-r"><input type="radio" name="irff_s-autoload_blacklist_r" value="ba" id="irff_s-autoload_blacklist_r_article">${LOC.t38}</label><div id="irff_s-autoload_blacklist_feed" class="irff_s-autoload_form select"><div class="irff_s-table"><input type="text" id="irff_s-autoload_blacklist_feed_title" class="irff_s-autoload_title"><span class="irff_s-addbutton_span"><input type="button" id="irff_s-autoload_blacklist_feed_add" class="irff_s-addbutton" value="${LOC.t20}"></span></div><textarea id="irff_s-autoload_blacklist_feed_list" class="irff_s-autoload_list"></textarea></div><div id="irff_s-autoload_blacklist_article" class="irff_s-autoload_form"><div class="irff_s-table"><input type="text" id="irff_s-autoload_blacklist_article_title" class="irff_s-autoload_title"><span class="irff_s-addbutton_span"><input type="button" id="irff_s-autoload_blacklist_article_add" class="irff_s-addbutton" value="${LOC.t20}"></span></div><textarea id="irff_s-autoload_blacklist_article_list" class="irff_s-autoload_list"></textarea></div></fieldset><div><label>${LOC.t43} : <select id="irff_s-autoload_mode"><option>${LOC.t36}</option><option>${LOC.t77}</option><option>${LOC.t45}</option><option>${LOC.t46}</option></select></label></div>`
    }, {
      tab: 'Security',
      id: 'security',
      body: `<label><input type="checkbox" id="irff_s-security_noscripttag">${LOC.t42}</label><br><label><input type="checkbox" id="irff_s-security_iframetag">${LOC.t52}</label><fieldset><legend>${LOC.t65} (${LOC.t19}) : </legend><input type="text" id="irff_s-security_allowiframeurl"></fieldset><fieldset><legend>${LOC.t63} (${LOC.t19}) : </legend><input type="text" id="irff_s-security_denynexturl"></fieldset><fieldset><legend>${LOC.t62} (${LOC.t19}) : </legend><input type="text" id="irff_s-security_allownexturl"></fieldset>`
    }, {
      tab: 'Social',
      id: 'social',
      body: `<fieldset><legend><label><input type="checkbox" id="irff_s-social_socialicon">${LOC.t55}</label></legend><label><input type="checkbox" id="irff_s-social_twitter">Twitter</label><br><label><input type="checkbox" id="irff_s-social_delicious">Delicious</label><br><label><input type="checkbox" id="irff_s-social_facebook">Facebook</label><br><label><input type="checkbox" id="irff_s-social_googleplus">Google+</label><br><label><input type="checkbox" id="irff_s-social_buzzurl">${LOC.t57}</label><br><label><input type="checkbox" id="irff_s-social_yahoo">${LOC.t56}</label><br><label><input type="checkbox" id="irff_s-social_hatena">${LOC.t58}</label></fieldset>`
    }, {
      tab: 'Etc',
      id: 'etc',
      body: `<div class="irff_s-clearfix"><fieldset id="irff_s-etc_mode" class="irff_s-f_column2"><legend>${LOC.t78}</legend><label class="irff_s-r"><input id="irff_s-etc_mode-simple" name="irff_s-etc_mode_r" type="radio" value="simple" />${LOC.t79}</label><label class="irff_s-r"><input id="irff_s-etc_mode-advance" name="irff_s-etc_mode_r" type="radio" value="advance" />${LOC.t80}</label></fieldset><fieldset class="irff_s-f_column2"><legend>Cache Data</legend><input type="button" id="irff_s-etc_cachereset" value="Reset Cache"><input type="button" id="irff_s-etc_cachedelete" class="irff_s-advance" value="Delete Cache"></fieldset></div><div class="irff_s-clearfix"><fieldset class="irff_s-advance irff_s-f_column2"><legend>Timeout</legend><input type="number" min="10" max="99" id="irff_s-etc_timeout">${LOC.t81}</fieldset><fieldset class="irff_s-advance irff_s-f_column2"><legend>Settings Data</legend><input type="button" id="irff_s-etc_settingsimport" value="Import"><input type="button" id="irff_s-etc_settingsexport" value="Export"><input type="button" id="irff_s-etc_settingsreset" value="Reset"></fieldset></div><fieldset class="irff_s-advance"><legend>Replace Full Feed URL : </legend><input type="text" id="irff_s-etc_replacefullfeedurl"></fieldset><fieldset class="irff_s-advance"><legend>Lazy Load URL (${LOC.t19}) : </legend><input type="text" id="irff_s-etc_lazyloadurl"></fieldset><fieldset class="irff_s-advance"><legend>Lazy Load Attribute : </legend><input type="text" id="irff_s-etc_lazyloadattr"></fieldset><label class="irff_s-advance"><input type="checkbox" id="irff_s-etc_debuglog">${LOC.t50}</label>`
    }];
    list.forEach(i => {
      var span = document.createElement('span'),
        div2 = document.createElement('div');
      span.id = `irff_s-tab_${i.id}`;
      span.innerHTML = i.tab;
      div2.id = `irff_s-${i.id}`;
      div2.style.display = 'none';
      div2.innerHTML = i.body;
      if (/security|social/.test(i.id)) {
        span.className = 'irff_s-advance';
        div2.className = 'irff_s-advance';
      }
      $ids('tab').appendChild(span);
      $ids('list').appendChild(div2);
    });
    $ids('autoload_whitelist_r_feed').checked = true;
    $ids('autoload_blacklist_r_feed').checked = true;
    if (st.mode === 'simple') toggleSettingsMode();
    var menu = $id('sb_rp_settings_menu'),
      pqm = $id('preferences_quick_main'),
      item = document.createElement('div');
    item.id = 'irff_s-menu';
    item.innerHTML = `Full Feed ${LOC.t21}`;
    if (menu) {
      item.className = 'inno_toolbar_button_menu_item';
      var menuList = menu.children;
      if (!menuList[menuList.length - 1].id) {
        var line = document.createElement('div');
        line.className = 'inno_toolbar_button_menu_line';
        menu.insertBefore(line, menu.lastChild.nextSibling);
      }
      menu.insertBefore(item, menu.lastChild.nextSibling);
    } else if ($id('quick_options') && pqm) {
      item.className = 'quick_options_link';
      pqm.insertBefore(item, pqm.lastChild.nextSibling);
    }
    $id('irff_s').addEventListener('keydown', e => {
      if (/^input|^textarea/i.test(e.target.tagName)) e.stopPropagation();
    }, false);
    $ids('general_key').addEventListener('keypress', e => e.preventDefault(), false);
  };

  FullFeed.viewSettings = function(id, eIcon) {
    if ($id('irff_s').style.display === 'block') {
      $id('irff_s').style.display = 'none';
      return;
    }
    var tab = $ids('tab').childNodes,
      list = $ids('list').childNodes;
    $ids('general_key').value = st.basekey;
    $ids('general_keydesc').textContent = (isNaN(st.basekey)) ? LOC.t24 : `(${LOC.t25})`;
    $ids('general_ap').checked = (st.autopagerize) ? true : false;
    $ids('general_apheight').value = st.apheight;
    $ids('general_autosearch').checked = (st.autosearch) ? true : false;
    $ids('general_cantdisplay').selectedIndex = st.cantdisplay;
    $ids('general_embeddedtweets').checked = (st.embeddedtweets) ? true : false;
    $ids('general_notread').value = st.notread;
    $ids('general_openitem').checked = (st.openitem) ? true : false;
    var siff = $ids('siteinfo_ff'),
      siap = $ids('siteinfo_ap'),
      siuff = $ids('siteinfo_uff'),
      siuap = $ids('siteinfo_uap'),
      chklist = '';
    var beautifier = function(str) {
      try {
        return JSON.stringify(str).replace(/^\[/g, '[\n').replace(/\{"/g, '  {\n    "').replace(/"\}/g, '"\n  }').replace(/\},/g, '},\n').replace(/",/g, '",\n    ').replace(/\{"/g, '{\n    "').replace(/\]$/g, '\n]');
      } catch (er) {
        return '';
      }
    };
    siff.value = beautifier(siteInfo);
    siap.value = beautifier(siteInfoAP);
    siuff.value = beautifier(userSiteInfo);
    siuap.value = beautifier(userSiteInfoAP);
    itemSiteInfo.forEach(a => {
      chklist += `<label title="${a.url}"><input type="checkbox"`;
      if (itemSiteInfo.length === 1) chklist += ' disabled="disabled"';
      else {
        st.disableitem.forEach(b => {
          if (a.url === b) chklist += ' checked';
        });
      }
      chklist += `>${a.url}</label><br>`;
    });
    $ids('siteinfo_disableitemlist').innerHTML = chklist;
    if (st.disableitem) $ids('siteinfo_disableitem').value = st.disableitem.join('\n');
    $ids('autoload_mode').selectedIndex = st.autoload;
    var eCurrent = document.querySelector(currentEntry()),
      feedTitle = '',
      articleTitle = '';
    if (eCurrent && eCurrent.id) {
      var sId, eTitleLink;
      if (eIcon) {
        eTitleLink = eIcon.parentNode.getElementsByClassName('article_title_link')[0];
        if (eTitleLink) sId = eTitleLink.id.slice(eTitleLink.id.lastIndexOf('_') + 1);
        else sId = eCurrent.id.slice(eCurrent.id.lastIndexOf('_') + 1);
      } else sId = eCurrent.id.slice(eCurrent.id.lastIndexOf('_') + 1);
      var eFeed = $id(`article_feed_info_link_${sId}`) ||
        eCurrent.getElementsByClassName('article_feed_title')[0] ||
        eCurrent.querySelector('.article_tile_footer_feed_title > a'),
        eTitle = $id(`at_${sId}`) || eCurrent.getElementsByClassName('article_header_title')[0] ||
        eCurrent.getElementsByClassName('article_title_link')[0];
      if (eFeed) {
        feedTitle = (eFeed.textContent) ? eFeed.textContent : '';
      } else if ($id('tree')) {
        var tlf = $id('tree').getElementsByClassName('selected')[0];
        if (tlf && tlf.textContent) feedTitle = tlf.textContent;
      }
      if (eTitle && eTitle.textContent) articleTitle = eTitle.textContent;
    }
    if (feedTitle) {
      feedTitle = feedTitle.replace(/([*+?.()[\]\\|^$])/g, '\\$1').replace(/^\s*(.*?)/, '$1');
      $ids('autoload_whitelist_feed_title').value = `^${feedTitle}$`;
      $ids('autoload_blacklist_feed_title').value = `^${feedTitle}$`;
    }
    if (articleTitle) {
      $ids('autoload_whitelist_article_title').value = `^${articleTitle}$`;
      $ids('autoload_blacklist_article_title').value = `^${articleTitle}$`;
    }
    if (st.autoloadfeed) $ids('autoload_whitelist_feed_list').value = st.autoloadfeed.join('\n');
    if (st.autoloadarticle) $ids('autoload_whitelist_article_list').value = st.autoloadarticle.join('\n');
    if (st.notloadfeed) $ids('autoload_blacklist_feed_list').value = st.notloadfeed.join('\n');
    if (st.notloadarticle) $ids('autoload_blacklist_article_list').value = st.notloadarticle.join('\n');
    $ids('security_noscripttag').checked = (st.noscripttag) ? true : false;
    $ids('security_iframetag').checked = (st.iframetag) ? true : false;
    $ids('security_allowiframeurl').value = st.allowiframeurl;
    $ids('security_denynexturl').value = st.denynexturl;
    $ids('security_allownexturl').value = st.allownexturl;
    if ($ids('security_iframetag').checked) {
      $ids('security_allowiframeurl').disabled = false;
      $ids('security_allowiframeurl').parentNode.style.color = 'black';
    } else {
      $ids('security_allowiframeurl').disabled = true;
      $ids('security_allowiframeurl').parentNode.style.color = 'gray';
    }
    $ids('social_socialicon').checked = (st.socialicon) ? true : false;
    $ids('social_buzzurl').checked = (st.socialbuzzurl) ? true : false;
    $ids('social_delicious').checked = (st.socialdelicious) ? true : false;
    $ids('social_facebook').checked = (st.socialfacebook) ? true : false;
    $ids('social_googleplus').checked = (st.socialgoogleplus) ? true : false;
    $ids('social_hatena').checked = (st.socialhatena) ? true : false;
    $ids('social_twitter').checked = (st.socialtwitter) ? true : false;
    $ids('social_yahoo').checked = (st.socialyahoo) ? true : false;
    ['buzzurl', 'delicious', 'facebook', 'googleplus', 'hatena', 'twitter', 'yahoo'].forEach(a => {
      if ($ids('social_socialicon').checked) {
        $ids(`social_${a}`).disabled = false;
        $ids(`social_${a}`).parentNode.style.color = 'black';
      } else {
        $ids(`social_${a}`).disabled = true;
        $ids(`social_${a}`).parentNode.style.color = 'gray';
      }
    });
    var bSimple = ($id('irff_s-list').getElementsByClassName('irff_hidden').length) ? true : false;
    if (st.mode === 'simple') {
      $ids('etc_mode-simple').checked = true;
      if (!bSimple) toggleSettingsMode();
    } else if (st.mode === 'advance') {
      $ids('etc_mode-advance').checked = true;
      if (bSimple) toggleSettingsMode();
    }
    $ids('etc_timeout').value = st.timeout;
    $ids('etc_replacefullfeedurl').value = st.replacefullfeedurl;
    $ids('etc_lazyloadurl').value = st.lazyloadurl;
    $ids('etc_lazyloadattr').value = st.lazyloadattr;

    for (var i = 0; i < tab.length; i++) {
      if (tab[i].classList.contains('select')) {
        tab[i].classList.remove('select');
        list[i].style.display = 'none';
      }
    }
    if (id) {
      //※ createSettings()のlistと並び順を合わせること
      var idlist = ['general', 'siteinfo', 'autoload', 'security', 'social', 'etc'];
      idlist.forEach((s, j) => {
        if (id === s) {
          tab[j].classList.add('select');
          list[j].style.display = 'block';
        }
      });
    } else {
      tab[0].classList.add('select');
      list[0].style.display = 'block';
    }
    $id('irff_s').style.display = 'block';
  };

  FullFeed.checkRegister = function() {
    window.setTimeout(() => {
      var currentItem = getActiveItem(true);
      if (currentItem && currentItem.url) {
        FullFeed.registerWidgets(currentItem);
        FullFeed.registerSocialIcons(currentItem);
      }
    }, 10);
  };

  FullFeed.registerWidgets = function() {
    var c = new GetCurrentItem(),
      flag = false,
      el, xhrID;
    if (!c.innerContents) return;
    if (/^https?:\/\/(?:www\.)?inoreader\.com\/?$|^javascript:|\.pdf$/i.test(c.itemURL)) return;
    el = document.querySelectorAll(`${currentEntry()} .article_title > span`);
    for (var i = 0, j = el.length; i < j; i++) {
      if (el[i].classList.contains('irff_checked')) {
        flag = true;
        break;
      }
    }
    if (flag) return;
    var container = document.querySelector(`${currentEntry()} .article_title`),
      description = `${LOC.t40} : ${LOC.t18} / Ctrl+${LOC.t40} : ${LOC.t39}`,
      feed = c.feed,
      title = c.item.title,
      bFound = false;
    if (!container) return;
    itemSiteInfo.length = 0;
    var check = function(b) {
      bFound = true;
      var icon = document.createElement('span');
      icon.title = description;
      icon.innerHTML = 'F';
      icon.classList.add('irff_checked');
      icon.classList.add('irff_checked_icon');
      if (b) icon.classList.add('irff_checked_icon_info');
      else icon.classList.add('irff_checked_icon_noinfo');
      container.appendChild(icon);
      if (st.autoload === 0) initFullFeed();
      else if (st.autoload === 1) {
        if (feed.title && st.notloadfeed.some(k => {
          if (!k) return false;
          if (new RegExp(k, 'i').test(feed.title)) return true;
        })) flag = true;
        else if (title && st.notloadarticle.some(k => {
          if (!k) return false;
          if (new RegExp(k, 'i').test(title)) return true;
        })) flag = true;
        if (!flag) initFullFeed();
      } else if (st.autoload === 2) {
        if (feed.title && st.notloadfeed.some(k => {
          if (!k) return false;
          if (new RegExp(k, 'i').test(feed.title)) return true;
        })) flag = true;
        else if (title && st.notloadarticle.some(k => {
          if (!k) return false;
          if (new RegExp(k, 'i').test(title)) return true;
        })) flag = true;
        if (!flag && feed.title && st.autoloadfeed.some(k => {
          if (!k) return false;
          if (new RegExp(k, 'i').test(feed.title)) return true;
        })) initFullFeed();
        else if (!flag && title && st.autoloadarticle.some(k => {
          if (!k) return false;
          if (new RegExp(k, 'i').test(title)) return true;
        })) initFullFeed();
      }
    };
    userSiteInfo.some(k => {
      try {
        var reg = new RegExp(k.url);
        if (k.url && (reg.test(c.itemURL) || reg.test(feed.url))) {
          check(true);
          return true;
        }
      } catch (er1) {
        console.log('SITEINFO Error: ', k.url);
      }
    });
    if (!bFound) {
      if (userCacheList.some(k => {
        if (k === feed.url) {
          return true;
        }
      })) {
        userCache.some(k => {
          try {
            var reg = new RegExp(k.url);
            if (k.url && (reg.test(c.itemURL) || reg.test(feed.url))) {
              check(true);
              return true;
            }
          } catch (er2) {
            console.log('SITEINFO Error: ', k.url);
          }
        });
      }
    }
    if (!bFound) {
      siteInfo.some(ctx => {
        if (cacheInfo[ctx.url]) {
          cacheInfo[ctx.url].info.some(k => {
            try {
              var reg = new RegExp(k.url);
              if (k.url && (reg.test(c.itemURL) || reg.test(feed.url))) {
                check(true);
                return true;
              }
            } catch (er3) {
              console.log('SITEINFO Error: ', k.url);
            }
          });
        }
      });
    }
    if (!bFound && /^https?:\/\/rss\.rssad\.jp\/rss\/.+/i.test(c.itemURL)) {
      var opt = {
        method: 'HEAD',
        url: c.itemURL,
        timeout: st.timeout * 1000,
        onload: function(res) {
          window.clearTimeout(xhrID);
          if (res.status === 200 && res.finalUrl) {
            c.itemURL = res.finalUrl;
            var atl = document.querySelector(`${currentEntry()} .article_title_link`),
              hbl = document.querySelector(`${currentEntry()} a[id^="aurl_"]`);
            if (atl && atl.href) atl.href = res.finalUrl;
            if (hbl && hbl.href) hbl.href = res.finalUrl;
            if (/^https?:\/\/rss\.rssad\.jp\/rss\/.+/i.test(res.finalUrl)) check();
            else FullFeed.registerWidgets();
          } else check();
        },
        onerror: function() {
          window.clearTimeout(xhrID);
          check();
        }
      };
      xhr.push(GM_xmlhttpRequest(opt));
      xhrID = window.setTimeout(() => {
        window.clearTimeout(xhrID);
        for (var x1 = 0, x2 = xhr.length; x1 < x2; x1++) {
          if (xhr[x1]) xhr[x1].abort();
        }
        xhr.length = 0;
      }, st.timeout * 1000);
    } else if (!bFound) check();
  };

  FullFeed.registerSocialIcons = function() {
    if (!st.socialicon) return;
    var c = new GetCurrentItem();
    if (!c.innerContents) return;
    if (document.querySelector(`${currentEntry()} .article_title > .irff_socialicon`)) return;
    var container = document.querySelector(`${currentEntry()} .article_title`),
      itemScheme = c.itemURL.slice(0, c.itemURL.indexOf('://') + 3),
      itemUrl2 = c.itemURL.slice(c.itemURL.indexOf('://') + 3).replace(/#/g, '%23');
    if (!container) return;
    var twitter = {
      method: 'get',
      url: `http://urls.api.twitter.com/1/urls/count.json?url=${c.itemURL}`,
      onload: function(res) {
        if (res.status === 200) {
          var info;
          try {
            info = JSON.parse(res.responseText);
          } catch (er) {
            return;
          }
          var total = info.count;
          if (isNaN(total) || total <= 0) return;
          var style = (total < 10) ? '1' :
              (total < 100) ? '2' :
                (total < 1000) ? '3' : '4',
            str = (total > 1) ? 's' : '';
          sT.innerHTML = `<a href="http://topsy.com/${itemUrl2}" target="_blank" title="Twitter: ${total} tweet${str}" class="irff_twitter irff_twitter${style}"><img src="https://twitter.com/favicon.ico"><span>${total}</span></a>`;
        }
      }
    };
    var delicious = {
      method: 'get',
      url: `http://badges.del.icio.us/feeds/json/url/data?url=${encodeURIComponent(c.itemURL)}`,
      onload: function(res) {
        if (res.status === 200) {
          var info;
          try {
            info = JSON.parse(res.responseText);
          } catch (er) {
            return;
          }
          if (!info || !info.length) return;
          var total = info[0].total_posts;
          if (isNaN(total) || total <= 0) return;
          var style = (total < 10) ? '1' :
              (total < 100) ? '2' :
                (total < 1000) ? '3' : '4',
            str = (total > 1) ? ' people' : ' person';
          sD.innerHTML = `<a href="http://delicious.com/url?url=${info[0].url}" target="_blank" title="Delicious: ${total}${str}" class="irff_delicious irff_delicious${style}"><img src="https://delicious.com/img/favicon.ico"><span>${total}</span></a>`;
        }
      }
    };
    var facebook = {
      method: 'get',
      url: `https://graph.facebook.com/${encodeURIComponent(c.itemURL)}`,
      onload: function(res) {
        if (res.status === 200) {
          var info;
          try {
            info = JSON.parse(res.responseText);
          } catch (er) {
            return;
          }
          var total = info.shares;
          if (!total || isNaN(total) || total <= 0) return;
          sF.innerHTML = `<span title="Facebook: ${total} share${  total >= 2 ? 's' : ''  }" class="irff_facebook"><img src="https://www.facebook.com/favicon.ico"><span>${total}</span></span>`;
        }
      }
    };
    var hatena = {
      method: 'get',
      url: `http://api.b.st-hatena.com/entry.count?url=${itemScheme}${itemUrl2}`,
      onload: function(res) {
        if (res.status === 200) {
          var total = Number(res.responseText);
          if (isNaN(total) || total <= 0) return;
          var style = (total < 10) ? '1' :
              (total < 100) ? '2' :
                (total < 1000) ? '3' : '4',
            str = (total > 1) ? ' users' : ' user',
            ssl = (itemScheme === 'https://') ? 's/' : '';
          sH.innerHTML = `<a href="http://b.hatena.ne.jp/entry/${ssl}${itemUrl2}" target="_blank" title="${LOC.t58}: ${total}${str}" class="irff_hatena irff_hatena${style}"><img src="http://b.hatena.ne.jp/favicon.ico"><span>${total}</span></a>`;
        }
      }
    };

    var googleplus = {
      method: 'get',
      url: `https://plusone.google.com/_/+1/fastbutton?url=${encodeURIComponent(c.itemURL)}`,
      onload: function(res) {
        if (res.status === 200) {
          var text = res.responseText;
          if (!text) return;
          var total = text.match(/window\.__SSR\s*=\s*\{.*c:\s*(\d+)\.0/);
          if (!total || total.length !== 2) return;
          sG.innerHTML = `<span title="Google+: ${total[1]} share${  Number(total[1]) >= 2 ? 's' : ''  }" class="irff_googleplus"><img src="https://www.google.com/favicon.ico"><span>${total[1]}</span></span>`;
        }
      }
    };

    var yahoo = `<a href="http://bookmarks.yahoo.co.jp/url?url=${encodeURIComponent(c.itemURL)}" target="_blank"><img src="http://num.bookmarks.yahoo.co.jp/image/small/${c.itemURL}" title="${LOC.t56}"/></a>`,
      buzzurl = `<a href="http://buzzurl.jp/entry/${c.itemURL}" target="_blank"><img src="http://api.buzzurl.jp/api/counter/v1/image?url=${encodeURIComponent(c.itemURL)}" title="${LOC.t57}"/></a>`;
    var ce = function() {
      return document.createElement('span');
    };
    var sT = ce(),
      sD = ce(),
      sF = ce(),
      sH = ce(),
      sG = ce(),
      sL = ce(),
      sY = ce(),
      sB = ce(),
      sC = ce();
    [sT, sD, sF, sH, sG, sL, sY, sB, sC].forEach(i => i.className = 'irff_socialicon');
    var ac1 = function(s, f) {
      container.appendChild(s);
      GM_xmlhttpRequest(f);
    };
    var ac2 = function(s, f) {
      s.innerHTML = f;
      container.appendChild(s);
    };
    if (st.socialtwitter) ac1(sT, twitter);
    if (st.socialdelicious) ac1(sD, delicious);
    if (st.socialfacebook) ac1(sF, facebook);
    if (st.socialgoogleplus) ac1(sG, googleplus);
    if (st.socialhatena) ac1(sH, hatena);
    if (st.socialyahoo) ac2(sY, yahoo);
    if (st.socialbuzzurl) ac2(sB, buzzurl);
    var repeat = 0,
      inter;
    var check = function() {
      var e = document.querySelectorAll(`${currentEntry()} .article_title > .irff_socialicon > a > img`),
        f = true;
      repeat += 1;
      for (var i = 0, j = e.length; i < j; i++) {
        if (e[i].clientHeight === 1) i.parentNode.parentNode.removeChild(e[i].parentNode);
        else if (e[i].clientHeight === 0 && repeat < 10) f = false;
      }
      if (f) window.clearInterval(inter);
    };
    inter = window.setInterval(() => check(), 1000);
  };

  FullFeed.documentFilters = [
    function(doc) {
      var a = doc.getElementsByTagName('a');
      for (var i = 0, j = a.length; i < j; i++) {
        if (a[i] && a[i].hasAttribute('href')) {
          a[i].setAttribute('target', '_blank');
          a[i].setAttribute('rel', 'noopener noreferrer');
        }
      }
    }
  ];

  var getActiveItem = function() {
    var item = {},
      exp = document.querySelector(`${currentEntry()} .article_title_link`);
    if (exp) {
      item.url = (exp.href && /^(https?|ftp):\/\/.+$/.test(exp.href)) ? exp.href : '';
      item.title = (exp.textContent) ? exp.textContent : '';
      item.id = (exp.id) ? exp.id.slice(exp.id.lastIndexOf('_') + 1) : '';
    }
    return item;
  };

  var getActiveFeed = function() {
    var eCurrent = document.querySelector(currentEntry()),
      feed = {};
    feed.url = '';
    feed.title = '';
    if (eCurrent && eCurrent.id) {
      var eFeed = $id(`article_feed_info_link_${  eCurrent.id.slice(eCurrent.id.lastIndexOf('_') + 1)}`) ||
        eCurrent.getElementsByClassName('article_feed_title')[0] ||
        document.evaluate('//div[@class="article_tile_footer_feed_title"]/a', eCurrent.cloneNode(true), null, 9, null).singleNodeValue;
      if (eFeed) {
        if (eFeed.textContent) feed.title = eFeed.textContent;
      } else if ($id('tree')) {
        var tlf = $id('tree').getElementsByClassName('selected')[0];
        if (tlf && tlf.textContent) feed.title = tlf.textContent;
      }
    }
    if (feed.title) feed.title = feed.title.replace(/^\s*(.*?)\s*$/, '$1');
    return feed;
  };

  var GetCurrentItem = function() {
    this.item = getActiveItem(true);
    this.feed = getActiveFeed();
    this.itemURL = this.item.url;
    this.articleContainer = document.querySelector(currentEntry());
    this.innerContents = document.querySelector(`${currentEntry()} .article_content`);
    this.found = false;
  };

  var launchFullFeed = function(list, c, flag) {
    if (typeof list.some !== 'function') return;
    state = 'launch';
    itemSiteInfo.length = 0;
    var type = ['^IND', '^SUB', '^GEN'],
      bCache, bList;
    var check = function(lis) {
      lis.forEach(i => {
        try {
          var reg = new RegExp(i.url);
          if (i.url && (i.url.length <= 12 || !/^\^?https?/i.test(i.url))) {
            if (new RegExp('^://', 'i').test(i.url)) i.url = `^https?${i.url}`;
            else if (new RegExp('^//', 'i').test(i.url)) i.url = `^https?:${i.url}`;
            else i.url = `^https?://${i.url}`;
          }
          if (reg.test(c.itemURL) && i.url.length > 12) {
            if (flag === 'cache') {
              if (userCacheList.some(u => {
                if (u === c.feed.url) return true;
              })) {
                c.found = true;
                itemSiteInfo.push(i);
              }
            } else {
              c.found = true;
              itemSiteInfo.push(i);
            }
          }
        } catch (er1) {
          console.log('SITEINFO Error: ', i.url);
        }
      });
    };
    check(list);
    if (/^next|^search/.test(flag)) {
      if (!c.found) {
        siteInfoAP.some(ctx => {
          if (cacheAPInfo[ctx.url]) {
            check(cacheAPInfo[ctx.url].info);
            return c.found;
          }
        });
      }
      if (!c.found) {
        check([{
          'url': nextPageLink.href,
          'xpath': ''
        }]);
      }
    }
    nextPageLink = null;
    itemSiteInfo.sort((a, b) => {
      var reA = new RegExp(a.url),
        reB = new RegExp(b.url),
        a1 = (reA.test(c.itemURL)) ? reA.source.length : 0,
        b1 = (reB.test(c.itemURL)) ? reB.source.length : 0,
        a2 = (reA.test(c.feed.url)) ? reA.source.length : 0,
        b2 = (reB.test(c.feed.url)) ? reB.source.length : 0;
      if (a.url.search(/\\w|\.\+|\.\*|\[\^\.?\/?\]\+/) !== -1) return true;
      else if (b.url.search(/\\w|\.\+|\.\*|\[\^\.?\/?\]\+/) !== -1) return false;
      return ((b1 >= b2) ? b1 : b2) - ((a1 >= a2) ? a1 : a2);
    });
    itemSiteInfo.sort((a, b) => {
      var n1 = 0,
        n2 = 0;
      type.forEach((d, i) => {
        if (new RegExp(d).test(a.type)) n1 = i;
        if (new RegExp(d).test(b.type)) n2 = i;
      });
      return n1 - n2;
    });
    if (flag === 'full') {
      if (!bCache && itemSiteInfo.length > 0) {
        userCache.some(u => {
          if (u === itemSiteInfo[0]) {
            bCache = true;
            return true;
          }
        });
        userCacheList.some(u => {
          if (u === c.feed.url) {
            bList = true;
            return true;
          }
        });
        if (!bCache) {
          delete itemSiteInfo[0].base;
          delete itemSiteInfo[0].microformats;
          delete itemSiteInfo[0].priority;
          userCache.push(itemSiteInfo[0]);
          try {
            localStorage.setItem('InoReaderFullFeed_userCache', JSON.stringify(userCache));
          } catch (er2) { console.error(er2); }
        }
        if (!bList) {
          userCacheList.push(c.feed.url);
          try {
            localStorage.setItem('InoReaderFullFeed_userCacheList', JSON.stringify(userCacheList));
          } catch (er3) { console.error(er3); }
        }
      }
    }
    if (c.found && itemSiteInfo.length > 0) {
      var data, bool;
      if (itemSiteInfo.some(a => {
        data = a;
        bool = true;
        st.disableitem.forEach(b => {
          if (a.url === b) bool = false;
        });
        if (bool) return true;
      })) new FullFeed(data, c, flag);
      else new FullFeed(itemSiteInfo[0], c, flag);
    } else state = null;
  };

  var initFullFeed = function(scroll) {
    var c = new GetCurrentItem();
    if (/^https?:\/\/(?:www\.)?inoreader\.com\/?$|^javascript:|\.pdf$/i.test(c.itemURL)) return;
    if (state && !/^loaded$|^wait$/.test(state)) {
      for (var x1 = 0, x2 = xhr.length; x1 < x2; x1++) {
        if (xhr[x1]) xhr[x1].abort();
      }
      xhr.length = 0;
      state = null;
      message(LOC.t82, 3000, 'warning');
      if (c.itemInfo) {
        loadingStyle('remove', c.itemInfo.articleContainer);
        c.itemInfo.innerContents.classList.add('irff_error');
      }
      return;
    }
    if ((state && !/^loaded$|^wait$/.test(state)) || !c.item.title || !c.item.url || !c.innerContents) return;
    message(LOC.t54, -1);
    if (st.notread) {
      var re = new RegExp(st.notread);
      if (re.test(c.item.title) || re.test(c.item.url) || re.test(c.feed.title)) {
        if (st.openitem) {
          loadingStyle('open', c.articleContainer);
          GM_openInTab(c.itemURL, true);
          window.setTimeout(() => loadingStyle('remove', c.articleContainer), 1000);
          return message(LOC.t49, 2000);
        }
        return message(LOC.t8);
      }
    }
    var launch = function() {
      if (c.innerContents && c.innerContents.classList.contains('irff_loaded')) {
        if (st.autopagerize) {
          FullFeed.checkNextPage(c.innerContents);
          if (nextPageLink) {
            c.itemURL = nextPageLink.href;
            launchFullFeed(userSiteInfo, c, 'set');
            if (!c.found) launchFullFeed(userCache, c, 'cache');
            if (!c.found) {
              siteInfo.some(ctx => {
                if (cacheInfo[ctx.url]) {
                  launchFullFeed(cacheInfo[ctx.url].info, c, 'next');
                  return c.found;
                }
              });
            }
            if (!c.found) launchFullFeed([], c, 'search');
            loadingStyle('add', c.articleContainer);
            return message(LOC.t4, -1);
          } else if (!scroll) {
            if (c.innerContents.className.split(/\s+/).filter(i => /^http/.test(i)).length > 1) return message(LOC.t7);
            return message(LOC.t9);
          }
        } else if (!scroll) return message(LOC.t9);
      } else {
        if (scroll) return;
        launchFullFeed(userSiteInfo, c, 'set');
        if (!c.found) launchFullFeed(userCache, c, 'cache');
        if (!c.found && !siteInfo.some(ctx => {
          if (cacheInfo[ctx.url]) {
            launchFullFeed(cacheInfo[ctx.url].info, c, 'full');
            return c.found;
          }
        })) new FullFeed({}, c, 'search');
      }
    };
    var longurl = function(u) {
      GM_xmlhttpRequest({
        method: 'get',
        url: `http://api.longurl.org/v2/expand?format=json&url=${u}`,
        onload: function(res) {
          if (res.status === 200) {
            try {
              var longUrl = JSON.parse(res.responseText)['long-url'];
              if (longUrl && /^https?:/.test(longUrl) && longUrl.replace('\\/', '/') !== c.itemURL) {
                c.itemURL = c.feed.url = longUrl;
                checkShortUrl();
              } else unshortenit(u);
            } catch (er) {
              unshortenit(u);
            }
          } else unshortenit(u);
        },
        onerror: function() {
          unshortenit(u);
        }
      });
    };
    var unshortenit = function(u) {
      GM_xmlhttpRequest({
        method: 'get',
        url: `http://www.unshorten.it/api1.0.php?responseFormat=text&shortURL=${u}`,
        onload: function(res) {
          if (res.status === 200) {
            try {
              var longUrl = res.responseText;
              if (longUrl && /^https?:/.test(longUrl)) {
                c.itemURL = c.feed.url = longUrl;
              } else checkShortUrl();
            } catch (er) { console.error(er); }
            checkShortUrl();
          }
        },
        onerror: function() {
          checkShortUrl();
        }
      });
    };
    var checkShortUrl = function() {
      if (c.itemURL !== tempUrl) {
        tempUrl = c.itemURL;
        GM_xmlhttpRequest({
          method: 'HEAD',
          url: c.itemURL,
          onload: function(res) {
            if (res.status === 200 && res.finalUrl) {
              if (/^https?:\/\/t.co\/.+/.test(res.finalUrl)) longurl(res.finalUrl);
              else {
                c.itemURL = c.feed.url = res.finalUrl;
                launch();
              }
            } else if (((res.status >= 301 && res.status <= 303) || res.status === 307) && res.finalUrl) {
              if (['t.co', 'bit.ly', 'goo.gl', 'is.gd', 'j.mp', 'ow.ly', 'tinyurl.com'].some(a => {
                if (new RegExp(`^https?://${a}/.+`).test(res.finalUrl)) return true;
              })) longurl(res.finalUrl);
              else unshortenit(res.finalUrl);
            } else launch();
          },
          onerror: function() {
            launch();
          }
        });
      } else launch();
    };
    if (!st.replacefullfeedurl) {
      launch();
      return;
    }
    var tempUrl = c.itemURL,
      rep = st.replacefullfeedurl.replace(/\s+/g, ' ').split(' ');
    if (rep.length >= 2) {
      var excludeUrl = function(e) {
        e.some(a => {
          if (a.href.split('/')[2].indexOf('xn--') === -1 && /^https?:\/\/.+/.test(a.textContent)) {
            c.itemURL = c.feed.url = a.href;
          }
        });
      };
      for (var i = 0, j = rep.length - 1; i < j; i = i + 2) {
        if (rep[i] && new RegExp(rep[i]).test(c.itemURL)) {
          if (rep[i + 1] && /^http/.test(rep[i + 1])) {
            c.itemURL = c.itemURL.replace(new RegExp(rep[i]), rep[i + 1]);
            c.feed.url = c.itemURL;
          } else if (rep[i + 1] === 'Link') {
            try {
              var u = document.querySelectorAll(`${currentEntry()} .article_content a`);
              if (u) excludeUrl(u);
            } catch (er) { console.error(er); }
          }
          break;
        }
      }
    } else launch();
    checkShortUrl();
  };

  var loadingStyle = function(flag, elm) {
    if (!elm) return;
    var s1 = 'irff_loading',
      s2 = 'irff_opened';
    if (flag === 'add') elm.classList.add(s1);
    else if (flag === 'open') elm.classList.add(s2);
    else if (flag === 'remove') {
      elm.classList.remove(s1);
      elm.classList.remove(s2);
    }
  };

  var createMessageBox = function() {
    var div = document.createElement('div');
    div.id = 'irff_message';
    div.className = 'ui-state-highlight irff_hidden';
    div.innerHTML = '';
    document.body.appendChild(div);
  };

  var currentEntry = function() {
    if ($id('article_dialog')) {
      return '#article_dialog > .article_full_contents';
    }
    if ($id('three_way_contents') && $id('three_way_contents').style.display !== 'none' && $id('reader_pane').getElementsByClassName('article_current article_current_3way')[0]) {
      return '#three_way_contents > .article_full_contents:last-child';
    }
    if ($id('subscriptions_articles')) {
      return '#subscriptions_articles > .article_current';
    }
    return '#reader_pane .article_current';
  };

  var toggleSettingsMode = function() {
    var adv = $id('irff_s').getElementsByClassName('irff_s-advance');
    for (var i = 0, j = adv.length; i < j; i++) {
      if (adv[i]) adv[i].classList.toggle('irff_hidden');
    }
    if (st.mode === 'simple' && !$ids('siteinfo_navi_uff').classList.contains('select') &&
      !$ids('siteinfo_navi_uap').classList.contains('select')) {
      var el1 = $ids('siteinfo').getElementsByTagName('fieldset');
      for (var i1 = 0, j1 = el1.length; i1 < j1; i1++) {
        el1[i1].classList.remove('select');
      }
      var el2 = document.getElementsByClassName('irff_s-siteinfo_navi');
      for (var i2 = 0, j2 = el2.length; i2 < j2; i2++) {
        el2[i2].classList.remove('select');
      }
      $ids('siteinfo_navi_uff').classList.add('select');
      $ids('siteinfo_f_uff').classList.add('select');
    }
  };

  var loadTwitterWidgetsScript = function() {
    if (st.embeddedtweets) {
      var sc = document.getElementsByTagName('script'),
        fl = true;
      for (var i = 0, j = sc.length; i < j; i++) {
        if (sc[i].src && /^https:\/\/platform\.twitter\.com\/widgets\.js/.test(sc[i].src)) {
          fl = false;
          break;
        }
      }
      if (fl) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://platform.twitter.com/widgets.js';
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    }
  };

  var exportSettings = function() {
    var settings = localStorage.getItem('InoReaderFullFeed_settings');
    if (typeof GM_setClipboard === 'function') {
      if (window.confirm(LOC.t66)) {
        GM_setClipboard(settings);
        message(LOC.t67, 3000);
      }
    } else {
      var eTemp = document.createElement('div'),
        result;
      eTemp.id = 'irff_temp';
      eTemp.innerHTML = '<div id="irff_temp-bar"><div id="irff_temp-bar_title">Export Data</div><div id="irff_temp-bar_button"><input id="irff_temp-close" type="button" value="Close"></div></div><div id="irff_temp-body"><textarea id="irff_temp-textarea"></div>';
      document.body.appendChild(eTemp);
      $id('irff_temp-close').addEventListener('click', () => {
        document.body.removeChild($id('irff_temp'));
      }, false);
      $id('irff_temp-textarea').textContent = settings;
      document.getSelection().selectAllChildren($id('irff_temp-textarea'));
      result = document.execCommand('copy');
      if (result) {
        document.body.removeChild(eTemp);
        message(LOC.t67, 3000);
      } else {
        eTemp.style.visibility = 'visible';
        message(LOC.t68, 3000);
      }
    }
  };

  var debugLog = false,
    itemSiteInfo = [],
    xhr = [],
    nextPageLink = null,
    readingPageUrl = null,
    state = null,
    messageInterval, scrollInterval, initInterval,
    st, siteInfo, siteInfoAP, userSiteInfo, userSiteInfoAP,
    cacheInfo, cacheAPInfo, userCache, userCacheAP, userCacheList, userCacheListAP;

  var init = function() {
    var nCheck = 0,
      exSpaceKey, exSpaceCode, iIrkc;
    FullFeed.loadSettings();
    cacheInfo = FullFeed.getCache('cache');
    cacheAPInfo = FullFeed.getCache('cacheAP');
    userCache = FullFeed.getCache('userCache');
    userCacheAP = FullFeed.getCache('userCacheAP');
    userCacheList = FullFeed.getCache('userCacheList');
    userCacheListAP = FullFeed.getCache('userCacheListAP');
    if (GM_registerMenuCommand && typeof GM_registerMenuCommand === 'function') {
      GM_registerMenuCommand('InoReader Full Feed - reset cache', () => {
        if (window.confirm(LOC.t15)) FullFeed.resetCache();
      });
      GM_registerMenuCommand('InoReader Full Feed - delete cache', () => FullFeed.removeCache());
    }
    GM_addStyle(CSS);
    FullFeed.createSettings();
    createMessageBox();
    var exKey = function() {
      if ($id('irkc_key-space')) {
        exSpaceKey = $id('irkc_key-space').value;
        if (exSpaceKey) {
          exSpaceCode = (/^[%&]$/.test(exSpaceKey)) ? 32 : exSpaceKey.toUpperCase().charCodeAt(0);
        }
      }
    };
    var checkIrkc = function() {
      if ($id('irkc_ok')) {
        window.clearInterval(iIrkc);
        $id('irkc_ok').addEventListener('click', e => {
          exKey();
          e.stopPropagation();
        }, false);
        exKey();
      } else if (nCheck < 99) nCheck += 1;
      else window.clearInterval(iIrkc);
    };
    iIrkc = window.setInterval(() => checkIrkc(), 250);
    document.addEventListener('keydown', e => {
      if (state && !/^loaded$|^wait$/.test(state) && !/^input|^textarea/i.test(e.target.tagName) && ((e.keyCode === 32 && exSpaceKey !== '&') || (exSpaceKey && e.keyCode === exSpaceCode))) {
        var rp = $id('reader_pane'),
          ad = $id('article_dialog'),
          twc = $id('three_way_contents'),
          ce = document.querySelector(currentEntry());
        if (!ce) return;
        var eTop = (twc && twc.style.display !== 'none' ? twc : ad ? ad : rp),
          eHeight = (twc && twc.style.display !== 'none' ? twc : ad ? ad : ce),
          bottom = (twc && twc.style.display !== 'none' ? twc.clientHeight : ad ? ad.clientHeight + 70 : rp.clientHeight) + eTop.scrollTop - ce.offsetTop - eHeight.scrollHeight;
        if (bottom >= 0) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    }, true);
    document.addEventListener('keyup', e => {
      var key = (isNaN(st.basekey)) ? st.basekey.toUpperCase().charCodeAt(0) : Number(st.basekey),
        el1 = $ids('general_key'),
        el2, el3;
      if (e.target.id === 'irff_s-general_key') {
        el2 = $ids('general_keydesc');
        var code = e.keyCode,
          cha = String.fromCharCode(code);
        if (/[A-Z]/.test(cha)) {
          el1.value = cha;
          el2.textContent = LOC.t24;
        } else if (code < 16 || code > 18) {
          el1.value = code;
          el2.textContent = LOC.t25;
        }
      } else if (e.keyCode === key && !/^input|^textarea/i.test(e.target.tagName)) {
        if (e.altKey && e.ctrlKey && e.shiftKey) {
          if (window.confirm(LOC.t15)) FullFeed.resetCache();
        } else if (e.ctrlKey && e.shiftKey) {
          el3 = document.querySelector(currentEntry());
          if (el3 && (el3.classList.contains('article_full_contents') ||
              (el3.classList.contains('ar') &&
                el3.classList.contains('article_current')))) FullFeed.viewSettings('autoload');
          else FullFeed.viewSettings();
        } else if (e.ctrlKey) {
          if (st.autoload === 0) st.autoload = 1;
          else if (st.autoload === 1) st.autoload = 2;
          else if (st.autoload === 2) st.autoload = 3;
          else st.autoload = 0;
          FullFeed.saveSettings();
          message(`Auto Load : ${  (st.autoload === 0) ? LOC.t36 : (st.autoload === 1) ? LOC.t77 : (st.autoload === 2) ? LOC.t45 : LOC.t46}`);
        } else if (e.shiftKey) {
          st.autopagerize = !st.autopagerize;
          FullFeed.saveSettings();
          message(`AutoPagerize : ${  (st.autopagerize) ? '<span class="irff_ap_on">ON</span>' : '<span class="irff_ap_off">OFF</span>'}`);
        } else initFullFeed();
      }
      FullFeed.checkRegister();
    }, false);
    document.addEventListener('click', e => {
      if (e.button >= 2) return;
      var tId = e.target.id;
      if (e.button === 0 && tId && /^irff_s-/.test(tId)) {
        var settings = $id('irff_s'),
          wlFeedTitle = $ids('autoload_whitelist_feed_title'),
          wlFeedList = $ids('autoload_whitelist_feed_list'),
          wlArticleTitle = $ids('autoload_whitelist_article_title'),
          wlArticleList = $ids('autoload_whitelist_article_list'),
          blFeedTitle = $ids('autoload_blacklist_feed_title'),
          blFeedList = $ids('autoload_blacklist_feed_list'),
          blArticleTitle = $ids('autoload_blacklist_article_title'),
          blArticleList = $ids('autoload_blacklist_article_list');
        if (tId === 'irff_s-menu') {
          FullFeed.viewSettings();
        } else if (tId === 'irff_s-menu2' || tId === 'irff_s-menu2child') {
          $id('settings-button').blur();
          FullFeed.viewSettings();
        } else if (/^irff_s-tab_/.test(tId)) {
          var tab = $ids('tab').childNodes,
            list = $ids('list').childNodes;
          for (var i = 0; i < tab.length; i++) {
            if (tab[i].classList.contains('select')) {
              tab[i].classList.remove('select');
              list[i].style.display = 'none';
            }
            if (tab[i].textContent === e.target.textContent) {
              tab[i].classList.add('select');
              list[i].style.display = 'block';
            }
          }
        } else if (tId === 'irff_s-general_keyhelpicon') {
          if (e.target.nextSibling.style.display !== 'block') e.target.nextSibling.style.display = 'block';
          else e.target.nextSibling.style.display = 'none';
        } else if (e.target.classList && e.target.classList.contains('irff_s-siteinfo_navi')) {
          var el3 = $ids('siteinfo').getElementsByTagName('fieldset');
          for (var i1 = 0, j1 = el3.length; i1 < j1; i1++) {
            el3[i1].classList.remove('select');
          }
          var el4 = document.getElementsByClassName('irff_s-siteinfo_navi');
          for (var i2 = 0, j2 = el4.length; i2 < j2; i2++) {
            el4[i2].classList.remove('select');
          }
          e.target.classList.add('select');
          $ids(`siteinfo_f${tId.slice(tId.lastIndexOf('_'))}`).classList.add('select');
        } else if (tId === 'irff_s-siteinfo_uff_add') {
          var fUrl = $ids('siteinfo_uff_url').value.trim().replace(/"/g, '\''),
            fXpath = $ids('siteinfo_uff_xpath').value.trim().replace(/"/g, '\''),
            fType = $ids('siteinfo_uff_type').value.trim().replace(/"/g, '\''),
            fEnc = $ids('siteinfo_uff_enc').value.trim().replace(/"/g, '\''),
            fTa = $ids('siteinfo_uff').value.trim().replace(/(.+)\}\s*,?\s*\n\s*\]\s*$/, '$1}\n]'),
            fForm = `\n  {\n    "url":"${fUrl}",\n    "xpath":"${fXpath}",\n    "type":"${fType}"`;
          if (fEnc) fForm += `,\n    "enc":"${fEnc}"`;
          fForm += '\n  }';
          if (!fTa) $ids('siteinfo_uff').value = `[${fForm}\n]`;
          else if (fTa.slice(-3) === '}\n]') $ids('siteinfo_uff').value = `${fTa.slice(0, -2)  },${fForm}\n]`;
          $ids('siteinfo_uff').scrollTop = $ids('siteinfo_uff').scrollHeight;
        } else if (tId === 'irff_s-siteinfo_uap_add') {
          var aUrl = $ids('siteinfo_uap_url').value.trim().replace(/"/g, '\''),
            aNext = $ids('siteinfo_uap_nextlink').value.trim().replace(/"/g, '\''),
            aPage = $ids('siteinfo_uap_pageelement').value.trim().replace(/"/g, '\''),
            aTa = $ids('siteinfo_uap').value.trim().replace(/(.+)\}\s*,?\s*\n\s*\]\s*$/, '$1}\n]'),
            aForm = `\n  {\n    "url":"${aUrl}",\n    "nextLink":"${aNext}",\n    "pageElement":"${aPage}"\n  }`;
          if (!aTa) $ids('siteinfo_uap').value = `[${aForm}\n]`;
          else if (aTa.slice(-3) === '}\n]') $ids('siteinfo_uap').value = `${aTa.slice(0, -2)  },${aForm}\n]`;
          $ids('siteinfo_uap').scrollTop = $ids('siteinfo_uap').scrollHeight;
        } else if (e.target.classList && e.target.classList.contains('irff_s-autoload_navi')) {
          var el5 = $ids('autoload').getElementsByTagName('fieldset');
          for (var i3 = 0, j3 = el5.length; i3 < j3; i3++) {
            el5[i3].classList.remove('select');
          }
          var el6 = document.getElementsByClassName('irff_s-autoload_navi');
          for (var i4 = 0, j4 = el6.length; i4 < j4; i4++) {
            el6[i4].classList.remove('select');
          }
          e.target.classList.add('select');
          $ids(`autoload_f${tId.slice(tId.lastIndexOf('_'))}`).classList.add('select');
        } else if (tId === 'irff_s-autoload_whitelist_feed_add') {
          if (wlFeedTitle.value) {
            if (wlFeedList.value) wlFeedList.value += `\n${wlFeedTitle.value}`;
            else wlFeedList.value = wlFeedTitle.value;
            wlFeedTitle.value = null;
          }
        } else if (tId === 'irff_s-autoload_whitelist_article_add') {
          if (wlArticleTitle.value) {
            if (wlArticleList.value) wlArticleList.value += `\n${wlArticleTitle.value}`;
            else wlArticleList.value = wlArticleTitle.value;
            wlArticleTitle.value = null;
          }
        } else if (tId === 'irff_s-autoload_blacklist_feed_add') {
          if (blFeedTitle.value) {
            if (blFeedList.value) blFeedList.value += `\n${blFeedTitle.value}`;
            else blFeedList.value = blFeedTitle.value;
            blFeedTitle.value = null;
          }
        } else if (tId === 'irff_s-autoload_blacklist_article_add') {
          if (blArticleTitle.value) {
            if (blArticleList.value) blArticleList.value += `\n${blArticleTitle.value}`;
            else blArticleList.value = blArticleTitle.value;
            blArticleTitle.value = null;
          }
        } else if (tId === 'irff_s-security_iframetag') {
          if ($ids('security_iframetag').checked) {
            $ids('security_allowiframeurl').disabled = false;
            $ids('security_allowiframeurl').parentNode.style.color = 'black';
          } else {
            $ids('security_allowiframeurl').disabled = true;
            $ids('security_allowiframeurl').parentNode.style.color = 'gray';
          }
        } else if (tId === 'irff_s-social_socialicon') {
          ['buzzurl', 'delicious', 'facebook', 'googleplus', 'hatena', 'twitter', 'yahoo'].forEach(a => {
            if ($ids('social_socialicon').checked) {
              $ids(`social_${a}`).disabled = false;
              $ids(`social_${a}`).parentNode.style.color = 'black';
            } else {
              $ids(`social_${a}`).disabled = true;
              $ids(`social_${a}`).parentNode.style.color = 'gray';
            }
          });
        } else if (tId === 'irff_s-etc_settingsexport') {
          exportSettings();
        } else if (tId === 'irff_s-etc_settingsimport') {
          var imp = window.prompt(LOC.t69);
          try {
            if (imp && imp.length > 100 && JSON.parse(imp)) {
              FullFeed.loadSettings(JSON.parse(imp));
              FullFeed.saveSettings();
              settings.style.display = 'none';
              message(LOC.t70, 3000);
            }
          } catch (er1) {
            message(LOC.t71, 3000, 'warning');
          }
        } else if (tId === 'irff_s-etc_settingsreset') {
          if (window.confirm(LOC.t72)) {
            FullFeed.loadSettings('reset');
            FullFeed.saveSettings();
            settings.style.display = 'none';
            message(LOC.t73, 3000);
          }
        } else if (tId === 'irff_s-etc_cachereset') {
          if (window.confirm(LOC.t15)) FullFeed.resetCache();
        } else if (tId === 'irff_s-etc_cachedelete') {
          FullFeed.removeCache();
        } else if (tId === 'irff_s-ok') {
          var key = $ids('general_key'),
            hei = $ids('general_apheight'),
            v = key.value,
            h = hei.value,
            problem = false;
          if (v && ((isNaN(v) && v.length === 1) || (!isNaN(v) && (v < 16 || v > 18)))) st.basekey = v;
          st.autopagerize = $ids('general_ap').checked;
          if (h && !isNaN(h)) st.apheight = (h < 200) ? 200 : (h > 2000) ? 2000 : h;
          st.autosearch = $ids('general_autosearch').checked;
          st.cantdisplay = $ids('general_cantdisplay').selectedIndex;
          st.embeddedtweets = $ids('general_embeddedtweets').checked;
          st.notread = $ids('general_notread').value;
          st.openitem = $ids('general_openitem').checked;
          var rep = function(str) {
            return str.replace(/^(\s*\{)/, '[$1')
              .replace(/(\}),?(\s*)$/, '$1$2]')
              .replace(/\\\\/g, '\\')
              .replace(/\\/g, '\\\\')
              .replace(/\\\\\/\\\\\//g, '\\/\\/')
              .replace(/"/g, '\'')
              .replace(/(\{\s*|:\s*|'\s*,\s*|\}\s*,\s*)'/g, '$1"')
              .replace(/'(\s*:|\s*,\s*"|\s*,?\s*\})/g, '"$1')
              .replace(/("\s*),(\s*\})/g, '$1$2')
              .replace(/\}(\s*)\{/g, '},$1{')
              .replace(/\}\s*,?\s*\n\s*\]\s*$/, '}\n]')
              .trim();
          };
          var siff = $ids('siteinfo_ff'),
            siap = $ids('siteinfo_ap'),
            siuff = $ids('siteinfo_uff'),
            siuap = $ids('siteinfo_uap');
          if (!siff.value) siff.value = '[{"format": "JSON", "url": "http://wedata.net/databases/LDRFullFeed/items.json"}]';
          if (!siap.value) siap.value = '[{"format": "JSON", "url": "http://wedata.net/databases/AutoPagerize/items.json"}]';
          if (!siuff.value) siuff.value = '[{"url": "", "xpath": "", "type": "", "enc": ""}]';
          if (!siuap.value) siuap.value = '[{"url": "", "nextLink": "", "pageElement": ""}]';
          try {
            siteInfo = JSON.parse(rep(siff.value));
            st.siteinfo = JSON.stringify(siteInfo);
            siff.parentNode.style.backgroundColor = null;
          } catch (er2) {
            problem = true;
            siff.parentNode.style.backgroundColor = '#FCC';
          }
          try {
            siteInfoAP = JSON.parse(rep(siap.value));
            st.siteinfoap = JSON.stringify(siteInfoAP);
            siap.parentNode.style.backgroundColor = null;
          } catch (er3) {
            problem = true;
            siap.parentNode.style.backgroundColor = '#FCC';
          }
          try {
            userSiteInfo = JSON.parse(rep(siuff.value));
            st.usersiteinfo = JSON.stringify(userSiteInfo);
            siuff.parentNode.style.backgroundColor = null;
          } catch (er4) {
            problem = true;
            siuff.parentNode.style.backgroundColor = '#FCC';
          }
          try {
            userSiteInfoAP = JSON.parse(rep(siuap.value));
            st.usersiteinfoap = JSON.stringify(userSiteInfoAP);
            siuap.parentNode.style.backgroundColor = null;
          } catch (er5) {
            problem = true;
            siuap.parentNode.style.backgroundColor = '#FCC';
          }
          var sidu = $ids('siteinfo_disableitem');
          if (sidu) {
            st.disableitem = sidu.value.split('\n').filter(k => {
              if (k) return k;
            });
          }
          st.autoload = $ids('autoload_mode').selectedIndex;
          if (wlFeedList) {
            st.autoloadfeed = wlFeedList.value.split('\n').filter(k => {
              if (k) return k;
            });
          }
          if (wlArticleList) {
            st.autoloadarticle = wlArticleList.value.split('\n').filter(k => {
              if (k) return k;
            });
          }
          if (blFeedList) {
            st.notloadfeed = blFeedList.value.split('\n').filter(k => {
              if (k) return k;
            });
          }
          if (blArticleList) {
            st.notloadarticle = blArticleList.value.split('\n').filter(k => {
              if (k) return k;
            });
          }
          wlFeedTitle.value = null;
          wlArticleTitle.value = null;
          blFeedTitle.value = null;
          blArticleTitle.value = null;
          st.noscripttag = $ids('security_noscripttag').checked;
          st.iframetag = $ids('security_iframetag').checked;
          st.allowiframeurl = $ids('security_allowiframeurl').value;
          st.denynexturl = $ids('security_denynexturl').value;
          st.allownexturl = $ids('security_allownexturl').value;
          st.socialicon = $ids('social_socialicon').checked;
          st.socialbuzzurl = $ids('social_buzzurl').checked;
          st.socialdelicious = $ids('social_delicious').checked;
          st.socialfacebook = $ids('social_facebook').checked;
          st.socialgoogleplus = $ids('social_googleplus').checked;
          st.socialhatena = $ids('social_hatena').checked;
          st.socialtwitter = $ids('social_twitter').checked;
          st.socialyahoo = $ids('social_yahoo').checked;
          var lla = $ids('etc_lazyloadattr');
          if ($ids('etc_mode-simple').checked) st.mode = 'simple';
          else if ($ids('etc_mode-advance').checked) st.mode = 'advance';
          if (lla.value) lla.value = lla.value.trim().replace(/^(.+),+$/, '$1');
          else lla.value = '"ajax","data-lazy-src","data-original","data-src"';
          st.timeout = $ids('etc_timeout').value;
          st.replacefullfeedurl = $ids('etc_replacefullfeedurl').value;
          st.lazyloadurl = $ids('etc_lazyloadurl').value;
          st.lazyloadattr = lla.value;
          debugLog = $ids('etc_debuglog').checked;
          if (!problem) {
            $ids('ok').blur();
            settings.style.display = 'none';
            FullFeed.saveSettings();
            loadTwitterWidgetsScript();
          }
        } else if (tId === 'irff_s-cancel') {
          $ids('cancel').blur();
          settings.style.display = 'none';
        }
      } else if (e.target.classList && e.target.classList.contains('irff_checked_icon')) {
        if ((e.button === 0 && e.ctrlKey) || e.button === 1) FullFeed.viewSettings('autoload', e.target);
        else if (e.button === 0) initFullFeed();
      } else if (e.button === 0 && e.target.parentNode && e.target.parentNode.parentNode && e.target.parentNode.parentNode.id === 'irff_s-siteinfo_disableitemlist' && e.target.nodeName === 'INPUT') {
        var temp = $ids('siteinfo_disableitem').value.split('\n');
        if (e.target.checked) {
          var chkbox = getElementsByXPath('//input', e.target.parentNode.parentNode.cloneNode(true));
          if (chkbox && !chkbox.some(a => {
            if (!a.checked) return true;
          })) {
            e.target.checked = false;
            return;
          }
          temp.push(e.target.nextSibling.textContent);
        } else {
          temp = temp.filter(a => a !== e.target.nextSibling.textContent);
        }
        temp = temp.filter(a => !/^\s*$/.test(a));
        $ids('siteinfo_disableitem').value = temp.join('\n');
      } else if (e.button === 0) FullFeed.checkRegister();
    }, true);
    $ids('titlebar').addEventListener('dblclick', e => {
      if (e.target.nodeName === 'DIV') {
        $ids('tab').classList.toggle('irff_s-hide');
        $ids('list').classList.toggle('irff_s-hide');
        $ids('titlebar_button').classList.toggle('irff_s-hide');
      }
    }, false);
    $id('reader_pane').addEventListener('scroll', e => {
      var btn = $id('view_style_img'),
        rp = $id('reader_pane'),
        s = 'reader_pane_view_style_',
        eAc, eFl;
      if (st.autopagerize && (rp.classList.contains(`${s}0`) || (btn && btn.hasAttribute('src') && /menu2\.png$/.test(btn.getAttribute('src'))))) {
        eAc = rp.getElementsByClassName('article_current')[0];
        if (eAc) eFl = eAc.getElementsByClassName('irff_loaded')[0];
        if (eFl) FullFeed.checkScroll();
      } else if (rp.classList.contains(`${s}1`) || (btn && btn.hasAttribute('src') && /page-break\.png$/.test(btn.getAttribute('src')))) {
        if (st.autopagerize) FullFeed.checkScroll();
        FullFeed.checkRegister();
      }
      e.stopPropagation();
    }, { passive: true });
    $id('three_way_contents').addEventListener('scroll', e => {
      if (st.autopagerize) {
        FullFeed.checkScroll();
      }
      e.stopPropagation();
    }, { passive: true });
    document.addEventListener('scroll', e => {
      var ad = $id('article_dialog'),
        rp = $id('reader_pane');
      if (st.autopagerize && ad && rp && (rp.classList.contains('reader_pane_view_style_3') || rp.classList.contains('reader_pane_view_style_4'))) {
        if (ad.getElementsByClassName('article_full_contents')[0]) {
          FullFeed.checkScroll();
          e.stopPropagation();
        }
      }
    }, { capture: true, passive: true });
    $id('irff_s').addEventListener('change', e => {
      var id = e.target.id;
      if (!id) return;
      if (/whitelist_r/.test(id)) {
        $ids('autoload_whitelist_feed').classList.toggle('select');
        $ids('autoload_whitelist_article').classList.toggle('select');
      } else if (/blacklist_r/.test(id)) {
        $ids('autoload_blacklist_feed').classList.toggle('select');
        $ids('autoload_blacklist_article').classList.toggle('select');
      } else if (/etc_mode-/.test(id)) toggleSettingsMode();
    }, false);
    st.version = version;
    FullFeed.saveSettings();
    loadTwitterWidgetsScript();
  };

  var loadFailure = function(e) {
    if (!/^input|^textarea/i.test(e.target.tagName) && e.keyCode === 69 && e.altKey && e.ctrlKey && e.shiftKey) {
      exportSettings();
    }
  };
  document.addEventListener('keydown', loadFailure, true);
  
  initInterval = window.setInterval(() => {
    var tree = $id('tree');
    if (/ino\s?reader/i.test(document.title) && tree && tree.innerHTML) {
      window.clearInterval(initInterval);
      window.setTimeout(() => init(), 1000);
      document.removeEventListener('keydown', loadFailure, true);
    }
  }, 500);

  // == [Utility] =================================

  function removeXSSRisks(htmldoc) {
    var attr = 'allowScriptAccess',
      embed = htmldoc.getElementsByTagName('embed'),
      param = htmldoc.getElementsByTagName('param');
    for (var i1 = 0, j1 = embed.length; i1 < j1; i1++) {
      if (embed[i1] && embed[i1].hasAttribute(attr)) embed[i1].setAttribute(attr, 'never');
    }
    for (var i2 = 0, j2 = param.length; i2 < j2; i2++) {
      if (param[i2] && param[i2].hasAttribute('name') && param[i2].getAttribute('name') === attr) param[i2].setAttribute('value', 'never');
    }
  }

  function searchEntry(htmldoc) {
    var arM = ['hentry', 'xfolkentry', 'autopagerize_page_element'],
      ar1 = ['articlebody', 'articlebox', 'articlemain', 'articlesection', 'articletable', 'articlesbody', 'articlesbox', 'articlessection', 'articlestable', 'blockstory', 'blogbody', 'center', 'entlybody', 'entlytext', 'entrybody', 'entrycontent', 'entrytable', 'entrytext', 'mainarticle', 'maintext', 'maintxt', 'singlecontent', 'storycontent', 'yjmt'],
      ar2 = ['blockleaf', 'boxcontent', 'contentbody', 'contentbox', 'contentinner', 'contenttext', 'contentsbody', 'contentsbox', 'contentsinner', 'contentstext', 'maincontent', 'mainframe', 'middlecontent', 'middlecontainer', 'newsbody', 'postbody', 'postcontent', 'textbody', 'kiji', 'newart'],
      ar3 = ['article', 'blog', 'body', 'column', 'content', 'entry', 'main', 'middle', 'page', 'post', 'section', 'story', 'text', 'entries'],
      s1 = '//*[contains(translate(concat(',
      s2 = '@id, " ", @class',
      s3 = '), "ABCDEFGHIJKLMNOPQRSTUVWXYZ-_ ", "abcdefghijklmnopqrstuvwxyz"), "',
      s4 = '")]',
      nM = arM.length,
      n1 = ar1.length,
      n2 = ar2.length,
      n3 = ar3.length;
    var makeXpath = function(ar, len, sp) {
      var x = [];
      ar.forEach((a, i) => {
        if (sp) x.push(`${s1}" ", ${s2}, " "${s3} ${a} ${s4}`);
        else x.push(s1 + s2 + s3 + a + s4);
        if (len > i + 1) x.push('|');
      });
      return x.join('');
    };
    var xpath = function() {
      var ar = ['date', 'foot', 'head', 'media', 'menu', 'navbar', 'navi', 'side', 'tool', 'widget'],
        s5 = '[not((.|.//*|ancestor-or-self::*)[contains(translate(concat(@id, " ", @class), "ABCDEFGHIJKLMNOPQRSTUVWXYZ-_", "abcdefghijklmnopqrstuvwxyz"), "',
        s6 = '")])]',
        x = ['//*[not(.//head|ancestor-or-self::head)][not(.//link|ancestor-or-self::link)][not(.//style|ancestor-or-self::style)]'];
      ar.forEach(a => x.push(s5 + a + s6));
      return x.join('');
    };
    try {
      var elms = getElementsByXPath(makeXpath(arM, nM, true), htmldoc),
        max = 0,
        data;
      if (!elms) elms = getElementsByXPath(makeXpath(ar1, n1, true), htmldoc);
      if (!elms) elms = getElementsByXPath(makeXpath(ar1, n1, false), htmldoc);
      if (!elms) elms = getElementsByXPath(makeXpath(ar2, n2, true), htmldoc);
      if (!elms) elms = getElementsByXPath(makeXpath(ar2, n2, false), htmldoc);
      if (!elms) elms = getElementsByXPath(makeXpath(ar3, n3, true), htmldoc);
      if (!elms) elms = getElementsByXPath(makeXpath(ar3, n3, false), htmldoc);
      if (!elms) elms = getElementsByXPath(xpath(), htmldoc);
      if (!elms) return null;
      elms.forEach(e => {
        if (typeof e.textContent !== 'string') return;
        var n = e.textContent.replace(/^\s+|\s+$|(?:\r?\n|\r){2,}/g, '').length;
        if (max < n) {
          max = n;
          data = e;
        }
      });
      return (data) ? [data] : null;
    } catch (e) {
      return null;
    }
  }

  function relativeToAbsolutePath(htmldoc, base) {
    var hre = htmldoc.querySelectorAll('*[href]'),
      src = htmldoc.querySelectorAll('*[src]'),
      sty = htmldoc.querySelectorAll('*[style*="url"]'),
      top = /^https?:\/\/[^/]+/.exec(base)[0],
      current = base.replace(/\/[^/]+$/, '/'),
      url, abs;
    for (var i1 = 0, j1 = hre.length; i1 < j1; i1++) {
      url = hre[i1].getAttribute('href').trim();
      abs = '';
      if (url && !/^(?:https?|ftp|file|mailto):/.test(url)) abs = _rel2abs(url, top, current, base);
      if (abs) {
        try {
          hre[i1].href = abs;
        } catch (er1) { console.error(er1); }
      }
    }
    for (var i2 = 0, j2 = src.length; i2 < j2; i2++) {
      url = src[i2].getAttribute('src').trim();
      abs = '';
      if (url && !/^(?:https?|ftp|file|mailto):/.test(url)) abs = _rel2abs(url, top, current, base);
      if (abs) {
        try {
          src[i2].src = abs;
        } catch (er2) { console.error(er2); }
      }
    }
    for (var i3 = 0, j3 = sty.length, m, s; i3 < j3; i3++) {
      s = sty[i3].getAttribute('style').trim();
      m = s.match(/url\s*\([^)]+?\)/g);
      url = /url\s*\([^)]+?\)/.exec(s);
      if (!url) continue;
      url = url.toString();
      url = url.slice(url.indexOf('(') + 1, url.lastIndexOf(')'));
      for (var i4 = 0, j4 = m.length; i4 < j4; i4++) {
        abs = '';
        if (url && !/^(?:https?|ftp|file|mailto):/.test(url)) abs = s.replace(m[i4], `url("${  _rel2abs(url, top, current, base)  }")`);
        if (abs) {
          try {
            sty[i3].setAttribute('style', abs);
          } catch (er3) { console.error(er3); }
        }
      }
    }
  }

  function _rel2abs(url, top, current, base) {
    if (/^\/\//.test(url)) return top.slice(0, top.indexOf('//')) + url;
    if (/\/$/.test(current)) current = current.slice(0, -1);
    var uPath = url.split('/'),
      cPath = current.split('/');
    for (var i = 0, j = uPath.length; i < j; i++) {
      if (!uPath[i]) continue;
      if (uPath[i] === '.') {
        uPath.splice(i, 1);
        i -= 1;
      } else if (uPath[i] === '..') {
        uPath.splice(i, 1);
        if (/^\//.test(url)) uPath.splice(i - 1, 1);
        cPath.pop();
        i -= 1;
      }
    }
    current = `${cPath.join('/')}/`;
    url = uPath.join('/');
    if (/^\?/.test(url)) return base.slice(0, base.indexOf('?')) + url;
    if (/^#/.test(url)) return base + url;
    if (/^\//.test(url)) return top + url;
    return current + url;
  }

  function replaceSrcOriginal(htmldoc) {
    var img = htmldoc.getElementsByTagName('img'),
      attr = JSON.parse(`[${st.lazyloadattr}]`);
    for (var i = 0, j = img.length; i < j; i++) {
      for (var k = 0, l = attr.length, s; k < l; k++) {
        s = (img[i].hasAttribute(attr[k])) ? img[i].getAttribute(attr[k]) : null;
        if (s && /^https?:\/\/|^\.?\//.test(s)) img[i].setAttribute('src', s);
      }
    }
  }

  function message(mes, dur, typ) {
    var box = $id('irff_message');
    if (!box) return;
    var dura = (dur < 0) ? 300000 : (!dur) ? 1500 : dur,
      type = typ;
    if (mes) {
      box.innerHTML = mes;
      box.classList.remove('irff_warning');
      if (type) box.classList.add(`irff_${type}`);
      box.classList.remove('irff_hidden');
      window.clearTimeout(messageInterval);
      messageInterval = window.setTimeout(() => {
        box.classList.add('irff_hidden');
        if (type) box.classList.remove(`irff_${type}`);
        box.innerHTML = '';
      }, dura);
    } else {
      box.classList.add('irff_hidden');
      box.innerHTML = '';
    }
  }

  // AutoPagerize (c) id:swdyh

  function createHTMLDocumentByString(str) {
    if (document.documentElement.nodeName !== 'HTML') return new DOMParser().parseFromString(str, 'application/xhtml+xml');
    var html = stripHtmlTag(str),
      htmlDoc;
    try {
      htmlDoc = document.cloneNode(false);
      htmlDoc.appendChild(htmlDoc.importNode(document.documentElement, false));
    } catch (e) {
      htmlDoc = document.implementation.createDocument('http://www.w3.org/1999/xhtml', 'html', null);
    }
    var fragment = createDocumentFragmentByString(html);
    try {
      fragment = htmlDoc.adoptNode(fragment);
    } catch (e) {
      fragment = htmlDoc.importNode(fragment, true);
    }
    htmlDoc.documentElement.appendChild(fragment);
    return htmlDoc;
  }

  // AutoPagerize (c) id:swdyh

  function getElementsByXPath(xpath, node) {
    var ss = getXPathResult(xpath, node, 7),
      data = [];
    for (var i = 0; i < ss.snapshotLength; i++) data.push(ss.snapshotItem(i));
    return (data.length > 0) ? data : null;
  }

  // AutoPagerize (c) id:swdyh

  function getXPathResult(xpath, nod, resultType) {
    var node = nod || document,
      doc = node.ownerDocument || node,
      resolver = doc.createNSResolver(node.documentElement || node),
      defaultNS = null;
    try {
      if (node.nodeType === node.DOCUMENT_NODE) defaultNS = node.documentElement.lookupNamespaceURI(null);
      else defaultNS = node.lookupNamespaceURI(null);
    } catch (e) { console.error(e); }
    if (defaultNS) {
      var defaultPrefix = '__default__',
        defaultResolver = resolver;
      xpath = addDefaultPrefix(xpath, defaultPrefix);
      resolver = function(prefix) {
        return (prefix === defaultPrefix) ? defaultNS : defaultResolver.lookupNamespaceURI(prefix);
      };
    }
    return doc.evaluate(xpath, node, resolver, resultType, null);
  }

  // AutoPagerize (c) id:swdyh

  function addDefaultPrefix(xpath, prefix) {
    var tokenPattern = /([A-Za-z_\u00c0-\ufffd][\w\-.\u00b7-\ufffd]*|\*)\s*(::?|\()?|(".*?"|'.*?'|\d+(?:\.\d*)?|\.(?:\.|\d+)?|[)\]])|(\/\/?|!=|[<>]=?|[([|,=+-])|([@$])/g,
      TERM = 1,
      OPERATOR = 2,
      MODIFIER = 3,
      tokenType = OPERATOR;
    prefix += ':';

    function replacer(token, identifier, suffix, term, operator) {
      if (suffix) tokenType = (suffix === ':' || (suffix === '::' && (identifier === 'attribute' || identifier === 'namespace'))) ? MODIFIER : OPERATOR;
      else if (identifier) {
        if (tokenType === OPERATOR && identifier !== '*') token = prefix + token;
        tokenType = (tokenType === TERM) ? OPERATOR : TERM;
      } else tokenType = (term) ? TERM : (operator) ? OPERATOR : MODIFIER;
      return token;
    }
    return xpath.replace(tokenPattern, replacer);
  }

  // AutoPagerize (c) id:swdyh

  function createDocumentFragmentByString(str) {
    var doc = document.implementation.createHTMLDocument(''),
      range = doc.createRange();
    range.selectNodeContents(doc.body);
    return range.createContextualFragment(str);
  }

  // AutoPagerize (c) id:swdyh

  function stripHtmlTag(str) {
    var chunks = str.split(/(<html(?:[ \t\r\n][^>]*)?>)/);
    if (chunks.length >= 3) chunks.splice(0, 2);
    str = chunks.join('');
    chunks = str.split(/(<\/html[ \t\r\n]*>)/);
    if (chunks.length >= 3) chunks.splice(chunks.length - 2);
    return chunks.join('');
  }

  function pathToURL(url, path) {
    var re = (path.indexOf('/') === 0) ? /^([a-zA-Z]+:\/\/[^/]+)\/.*$/ : /^(.*\/).*$/;
    return url.replace(re, `$1${path}`);
  }

  function contentScriptInjection(source) {
    var script = document.createElement('script');
    if (debugLog) console.log('contentScriptInjection', source);
    if (typeof source === 'function') source = `(${source})();`;
    script.setAttribute('type', 'application/javascript');
    script.textContent = source;
    document.body.appendChild(script);
    document.body.removeChild(script);
  }

})();