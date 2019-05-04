// ==UserScript==
// @name        Append Tag Searching Tub
// @name:ja     niconico タグ検索タブを追加
// @description Adds "Keyword", "Tags", "My List", "Images" and "Live" search tabs to all of the Niconico search boxes.
// @description:ja 『niconico』各サービスの検索窓について、「キーワード」「タグ」「マイリスト」「静画」「生放送」検索タブが5つとも含まれるように補完します。
// @namespace   http://loda.jp/script/
// @version     5.0.2
// @match       *://www.nicovideo.jp/*
// @match       *://seiga.nicovideo.jp/*
// @match       *://live.nicovideo.jp/*
// @match       *://watch.live.nicovideo.jp/*
// @match       *://com.nicovideo.jp/*
// @match       *://blog.nicovideo.jp/en_info/*
// @match       *://tw.blog.nicovideo.jp/*
// @match       *://info.nicovideo.jp/psvita/en/*
// @require     https://cdn.rawgit.com/greasemonkey/gm4-polyfill/d58c4f6fbe5702dbf849a04d12bca2f5d635862d/gm4-polyfill.js
// @require     https://greasyfork.org/scripts/17895/code/polyfill.js?version=139883
// @require     https://greasyfork.org/scripts/19616/code/utilities.js?version=140939
// @require     https://greasyfork.org/scripts/17896/code/start-script.js?version=112958
// @license     Mozilla Public License Version 2.0 (MPL 2.0); https://www.mozilla.org/MPL/2.0/
// @compatible  Firefox
// @compatible  Opera
// @compatible  Chrome
// @grant       GM.setValue
// @grant       GM_setValue
// @grant       GM.getValue
// @grant       GM_getValue
// @grant       GM.deleteValue
// @grant       GM_deleteValue
// @grant       GM.xmlHttpRequest
// @grant       GM_xmlhttpRequest
// @connect     www.nicovideo.jp
// @run-at      document-start
// @icon        data:image/vnd.microsoft.icon;base64,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
// @author      100の人
// @homepage    https://greasyfork.org/scripts/268
// ==/UserScript==

(function () {
'use strict';

// L10N
Gettext.setLocalizedTexts({
	'en': {
		'キーワード': 'Keyword',
		'動画をキーワードで検索': 'Search Video by Keyword',
		'タグ': 'Tags',
		'動画をタグで検索': 'Search Video by Tag',
		'マイリスト': 'My List',
		'マイリストを検索': 'Search My List',
		'静画': 'Images',
		'静画を検索': 'Search Images',
		'生放送': 'Live',
		'番組を探す': 'Search Live Program',
		'関連コミュニティ': 'Related Communities',
		'このコミュニティを登録した人はこんなコミュニティも登録しています': 'People Who Joined This Community Also Joined',
		'マンガ': 'Comics',
	},
	'zh': {
		'キーワード': '關鍵字',
		'動画をキーワードで検索': '',
		'タグ': '標籤',
		'動画をタグで検索': '',
		'マイリスト': '我的清單',
		'マイリストを検索': '搜尋我的清單',
		'静画': '靜畫',
		'静画を検索': '搜尋靜畫',
		'生放送': '生放送',
		'番組を探す': '搜尋節目',
		'関連コミュニティ': '相關社群',
		'このコミュニティを登録した人はこんなコミュニティも登録しています': '加入此社群的人也有加入這些社群',
		'マンガ': '漫畫',
	},
});



/**
 * 追加したタブバーから新しいタブで検索結果を開いたとき、選択中のタブを元に戻す遅延時間 (ミリ秒)。
 * @constant {number}
 */
const CURRENT_TAB_RESTORATION_DELAY = 1000;

/**
 * 表示しているページのパスにスラッシュを前置し連結したもの。
 * @type {Object}
 */
let pathname = window.location.pathname;

/**
 * 表示しているページの種類。
 * @type {string}
 */
let pageType;

// ページの種類を取得
switch (window.location.host) {
	case 'www.nicovideo.jp':
		if (pathname === '/') {
			// 総合トップページ
			pageType = 'top';
		} else if (pathname.startsWith('/search/')) {
			// 動画キーワード検索ページ
			pageType = 'videoSearch';
		} else if (pathname.startsWith('/mylist_search')) {
			// マイリスト検索ページ
			pageType = 'mylist';
		} else if (/^\/(?:(?:tag|related_tag|watch|mylist)\/|(?:recent|newarrival|hotlist|video_top|openlist|playlist|recommendations|video_catalog)(?:\/|$))/.test(pathname)) {
			// 動画タグ検索ページと原宿プレイヤーのページ
			pageType = 'tag';
		} else if (pathname.startsWith('/user/')) {
			// ユーザーページ
			pageType = 'user';
		}
		break;
	case 'seiga.nicovideo.jp':
		pageType = pathname.startsWith('/search/')
			// 静画検索ページ
			? 'imageSearch'
			// 静画ページ
			: 'image';
		break;
	case 'live.nicovideo.jp':
	case 'watch.live.nicovideo.jp':
		pageType = pathname.startsWith('/search')
			// 生放送検索ページ
			? 'liveSearch'
			// 生放送ページ
			: 'live';
		break;
	case 'com.nicovideo.jp':
		if (/^\/[^/]+\/co[0-9]+(?:\/|$)/.test(pathname)) {
			// コミュニティ詳細ページ
			pageType = 'community';
		}
		break;
	case 'info.nicovideo.jp':
		if (pathname.startsWith('/psvita/en/')) {
			// 英語版PS Vita紹介ページ
			startScript(
				prepare,
				parent => parent.localName === 'body',
				target => target.id === 'header',
				() => document.getElementById('header'),
				{
					isTargetParent(parent) { return parent.localName === 'html'; },
					isTarget(target) { return target.localName === 'body'; },
				}
			);
		}
		return;
	case 'blog.nicovideo.jp':
		// 英語版ニコニコインフォ
		pageType = 'info_en';
		break;
	case 'tw.blog.nicovideo.jp':
		// 台湾版ニコニコインフォ
		pageType = 'info_tw';
		break;
}

// 上部メニューが追加されるまで待機
let targetParentIdFirefox, isTargetFirefox;
switch (pageType) {
	case 'imageSearch':
	case 'image':
		isTargetFirefox = target => target.id === 'wrapper';
		break;
	case 'liveSearch':
		targetParentIdFirefox = 'body_header';
		break;
	case 'info_en':
		targetParentIdFirefox = 'container-inner';
		break;
	case 'info_tw':
		targetParentIdFirefox = 'header';
		break;
}
startScript(
	prepare,
	parent => parent.classList.contains('siteHeaderGlovalNavigation'),
	target => target.id === 'siteHeaderLeftMenu',
	() => document.getElementById('siteHeaderLeftMenu'),
	{
		isTargetParent: targetParentIdFirefox
			? parent => parent.id === targetParentIdFirefox
			: parent => parent.localName === 'body',
		isTarget: isTargetFirefox || (target => target.id === 'siteHeader'),
	}
);

/**
 * ページの種類別に、実行する関数を切り替える。
 */
function prepare() {
	Gettext.setLocale(pageType === 'community'
		? document.getElementById('siteHeaderNotification').dataset.nicoLocale.replace('_', '-')
		: document.documentElement.lang);

	if (!document.querySelector(pageType === 'imageSearch'
		? '#siteHeader [href="/?header"], #siteHeader [href="/"]'
		: '#siteHeader [href^="http://seiga.nicovideo.jp/"], #globalNav [href^="http://seiga.nicovideo.jp/"]')) {
		// ヘッダに静画へのリンクが無ければ
		// 生放送へのリンクを取得
		let itemLive = document.querySelector(
			'#siteHeader [href^="http://live.nicovideo.jp/"], #globalNav [href^="http://live.nicovideo.jp/"]'
		).parentNode;
		// 生放送リンクの複製
		let item = itemLive.cloneNode(true);
		// リンク文字を変更
		(item.getElementsByTagName('span')[0] || item.getElementsByTagName('a')[0]).textContent = _('静画');
		// アドレスを変更
		item.getElementsByTagName('a')[0].host = 'seiga.nicovideo.jp';
		// ヘッダに静画へのリンクを追加
		itemLive.parentNode.insertBefore(item, itemLive);
	}

	switch (pageType) {
		case 'videoSearch':
			// 動画キーワード
			startScript(
				addTagSearchTabAboveSearchBox,
				parent => parent.classList.contains('formSearch'),
				target => target.id === 'search_united_form',
				() => document.getElementById('search_united_form'),
				{
					isTargetParent: parent => parent.localName === 'body',
					isTarget: target => target.localName === 'section',
				}
			);
			break;

		case 'mylist':
			// マイリスト
			startScript(
				addTagSearchTabAboveSearchBox,
				parent => parent.id === 'form_search',
				target => target.id === 'search_united_form',
				() => document.getElementById('search_united_form'),
				{
					isTargetParent: parent => parent.id === 'PAGEMAIN',
					isTarget: target => target.id === 'PAGEBODY',
				}
			);
			break;

		case 'top':
			// トップページ
			startScript(addTagSearchButtonToTopPage,
				parent => parent.id === 'searchFormInner',
				target => target.id === 'searchForm',
				() => document.getElementById('searchForm'),
				{
					isTargetParent: parent => parent.id === 'main_container' || parent.localName === 'body',
					isTarget: target => target.id === 'searchFormWrap',
				}
			);
			break;

		case 'imageSearch':
			// 静画キーワード
			startScript(
				addTagSearchTabAboveSearchBox,
				parent => parent.id === 'usearch_form',
				target => target.id === 'usearch_form_input',
				() => document.getElementById('usearch_form_input'),
				{
					isTargetParent: parent => parent.id === 'wrapper',
					isTarget: target => target.id === 'main',
				}
			);
			break;

		case 'image':
			// 静画
			startScript(
				careteTabsBarToSearchBox,
				parent => parent.id === 'head_search_form',
				target => target.id === 'search_button',
				() => document.getElementById('search_button'),
				{
					isTargetParent: parent => parent.id === 'header_block',
					isTarget: () => true,
				}
			);
			break;

		case 'liveSearch':
			// 生放送キーワード
			startScript(
				addTagSearchTabAboveSearchBox,
				parent => parent.classList.contains('search-input-area'),
				target => target.classList.contains('search-form'),
				() => document.getElementsByClassName('search-form')[0]
			);
			break;

		case 'live':
			// 生放送
			startScript(
				careteTabsBarToSearchBox,
				parent => parent.classList.contains('search_program'),
				target => target.classList.contains('search_word'),
				() => document.getElementsByClassName('search_word')[0],
				{
					isTargetParent: parent => parent.localName === 'body',
					isTarget: target => target.id === 'page_header',
				});
			break;

		case 'tag':
			if (document.doctype.publicId) {
				// 原宿プレイヤーの動画ページ、オススメ動画ページ等
				startScript(
					addOtherServiceTabsAboveSearchBox,
					parent => parent.id === 'search_tab',
					target => target.id === 'target_m',
					() => document.getElementById('target_m'),
					{
						isTargetParent: parent => parent.id === 'PAGEMAIN',
						isTarget: target => target.id === 'PAGEBODY',
					}
				);
			} else {
				// 動画タグ
				startScript(
					addOtherServiceTabsAboveSearchBox,
					parent => parent.classList.contains('videoSearchOption'),
					target => target.classList.contains('optMylist'),
					() => document.getElementsByClassName('optMylist')[0],
					{
						isTargetParent: parent => parent.localName === 'body',
						isTarget: target => target.localName === 'header',
					}
				);
				return;
			}
			break;

		case 'user':
			// ユーザー
			startScript(
				addImageLinkToUserPageMenu,
				parent => parent.localName === 'body',
				target => target.classList.contains('optionOuter'),
				() => document.getElementsByClassName('optionOuter')[0]
			);
			break;

		case 'community':
			// コミュニティ
			startScript(
				addRelatedCommunitiesLink,
				parent => parent.localName === 'body',
				target => target.id === 'site-body',
				() => document.getElementById('site-body')
			);
			break;
	}
}



/**
 * 各サービスのキーワード検索ページの検索窓に、動画の「タグ」検索タブを追加する。
 */
function addTagSearchTabAboveSearchBox() {
	// マイリスト検索タブの取得
	let mylistTab = document.querySelector('.tab_table td:nth-of-type(2), #search_frm_a a:nth-of-type(2), .search_tab_list li:nth-of-type(2), .seachFormA a:nth-of-type(2), li:nth-of-type(2).search-tab-item');

	// マイリスト検索タブの複製
	let tagTab = mylistTab.cloneNode(true);

	// タブ名を変更
	let anchor = tagTab.tagName.toLowerCase() === 'a' ? tagTab : tagTab.getElementsByTagName('a')[0];
	let tabNameNode = anchor.getElementsByTagName('div');
	tabNameNode = (tabNameNode.length > 0 ? tabNameNode[0].firstChild : anchor.firstChild);
	tabNameNode.data = _('タグ') + (pageType === 'liveSearch' ? '' : ' ( ');

	// クラス名を変更・動画件数をリセット
	let searchCount = tagTab.querySelector('strong, span');
	switch (pageType) {
		case 'videoSearch':
			searchCount.classList.remove('more');
			break;
		case 'mylist':
			searchCount.style.removeProperty('color');
			break;
		case 'imageSearch':
			searchCount.classList.remove('search_value_em');
			searchCount.classList.add('search_value');
			break;
	}
	searchCount.textContent = '-';

	if (searchCount.id) {
		// 生放送
		searchCount.id = 'search_count_tag';
	}

	// 検索語句を取得
	let searchWordsPattern = /(?:\/(?:search|tag|mylist_search)\/|[?&]keyword=)([^?&#]+)/g;
	let result = window.location.href.match(searchWordsPattern);
	let searchWords
		= result ? searchWordsPattern.exec(result[pageType === 'liveSearch' ? result.length - 1 : 0])[1] : '';

	// タグが付いた動画件数を取得・表示
	if (searchWords && location.host !== 'www.live.nicovideo.jp') {
		GM.xmlHttpRequest({
			method: 'GET',
			url: 'http://www.nicovideo.jp/tag/' + searchWords,
			onload: function (response) {
				let responseDocument = new DOMParser().parseFromString(response.responseText, 'text/html');
				let total = responseDocument.querySelector('.tagCaption .dataValue .num').textContent;

				let trimmedThousandsSep = total.replace(/,/g, '');
				if (trimmedThousandsSep >= 100) {
					// 動画件数が100件を超えていれば
					switch (pageType) {
						case 'videoSearch':
							searchCount.classList.add('more');
							break;
						case 'mylist':
							searchCount.style.color = '#CC0000';
							break;
						case 'imageSearch':
							searchCount.classList.remove('search_value');
							searchCount.classList.add('search_value_em');
							break;
						case 'liveSearch':
							searchCount.classList.add('strong');
							break;
					}
				}

				switch (pageType) {
					case 'mylist':
						searchCount.textContent = ' ' + total + ' ';
						break;
					case 'videoSearch':
					case 'imageSearch':
						searchCount.textContent = total;
						break;
					case 'liveSearch':
						searchCount.textContent = trimmedThousandsSep;
						break;
				}
			},
		});
	}

	// 非アクティブタブを取得
	let inactiveTab = document.querySelector('.tab_0, .tab1, .search_tab_list a:not(.active), .search-tab-anchor');

	// クラス名を変更
	anchor.className = inactiveTab.className;

	// アドレスを変更
	anchor.href = 'http://www.nicovideo.jp/tag/' + searchWords + inactiveTab.search;

	// タグ検索タブを追加
	mylistTab.parentNode.insertBefore(tagTab, mylistTab);
	if (pageType === 'liveSearch') {
		mylistTab.parentNode.insertBefore(new Text(' '), mylistTab);
	} else if (inactiveTab.classList.contains('tab1')) {
		// GINZAバージョン
		mylistTab.parentNode.insertBefore(tagTab.previousSibling.cloneNode(true), mylistTab);
	}
}



/**
 * ニコニコ動画の上部に表示されている検索窓に、「静画」「生放送」を検索するタブを追加する。
 */
function addOtherServiceTabsAboveSearchBox() {
	// スタイルの設定
	document.head.insertAdjacentHTML('beforeend', `<style>
		:root {
			--max-search-box-width: 268px;
		}
		#PAGEHEADER > div {
			display: flex;
		}
		#head_search {
			max-width: var(--max-search-box-width);
			flex-grow: 1;
		}
		#search_input {
			width: 100%;
			display: flex;
		}
		#search_input .typeText {
			flex-grow: 1;
		}
		#head_ads {
			margin-right: -26px;
		}
		#search_input #bar_search {
			box-sizing: border-box;
			width: 100% !important;
		}
		/*====================================
			GINZAバージョン
		*/
		.siteHeader > .inner {
			display: flex;
		}
		.videoSearch {
			max-width: var(--max-search-box-width);
			flex-grow: 1;
			padding-left: 4px;
			padding-right: 4px;
		}
		.videoSearchOption {
			display: flex;
			white-space: nowrap;
		}
		.videoSearch form {
			display: flex;
		}
		.videoSearch form .inputText {
			flex-grow: 1;
		}
		/*------------------------------------
			×ボタン
		*/
		.clear-button-inner-tag {
			left: initial;
			right: 3px;
		}
	</style>`);

	// タブリストの取得
	let mylistTab = document.querySelector('#target_m, .optMylist');

	// タブの複製・追加
	mylistTab.parentElement.append(...[
		{
			type: 'image',
			title: _('静画を検索'),
			uri: 'http://seiga.nicovideo.jp/search',
			text: _('静画'),
		},
		{
			type: 'live',
			title: _('番組を探す'),
			uri: 'http://live.nicovideo.jp/search',
			text: _('生放送'),
		},
	].map(function (option) {
		let tab = mylistTab.cloneNode(true);
		if (mylistTab.classList.contains('optMylist')) {
			// GINZAバージョン
			tab.classList.remove('optMylist');
			tab.classList.add('opt' + option.type[0].toUpperCase() + option.type.slice(1));
			tab.dataset.type = option.type;
			tab.getElementsByTagName('a')[0].textContent = option.text;
		} else {
			// 原宿バージョン
			tab.id = 'target_' + option.type[0];
			tab.title = option.title;
			tab.setAttribute('onclick', tab.getAttribute('onclick').replace(/'.+?'/, '\'' + option.uri + '\''));
			tab.textContent = option.text;
		}
		return tab;
	}));

	if (mylistTab.classList.contains('optMylist')) {
		// GINZAバージョン
		GreasemonkeyUtils.executeOnUnsafeContext(/* global Nico */ function () {
			eval('Nico.Navigation.HeaderSearch.Controller.search = '
				+ Nico.Navigation.HeaderSearch.Controller.search.toString().replace(/(switch.+?{[^}]+)/, `$1;
						break;
					case "image":
						d = "http://seiga.nicovideo.jp/search/" + e;
						break;
					case "live":
						d = "http://live.nicovideo.jp/search/" + e;
						break;
				`));
		});
	}
}



/**
 * 静画・生放送の上部に表示されている検索窓に、「動画キーワード」「動画タグ」「マイリスト」「静画」「生放送」を検索するタブバーを設置する。
 */
function careteTabsBarToSearchBox() {
	// スタイルの設定
	document.head.insertAdjacentHTML('beforeend', `<style>
		#sg_search_box {
			/* 静画 */
			margin-top: 0.2em;
		}
		#live_header div.score_search {	/* 生放送マイページ向けに詳細度を大きくしている */
			/* 生放送 */
			top: initial;
		}
		/*------------------------------------
			タブバー
		*/
		[action$="search"] > ul {
			display: flex;
			/* 生放送 */
			font-size: 12px;
		}
		/* 静画 */
		#head_search_form > ul {
			margin-left: 1.3em;
			/* マンガ・電子書籍 */
			line-height: 1.4em;
		}
		#head_search_form > ul:hover ~ .search_form_text {
			border-color: #999;
		}
		/*------------------------------------
			タブ
		*/
		[action$="search"] > ul > li {
			margin-left: 0.2em;
			white-space: nowrap;
		}
		[action$="search"] > ul > li > a {
			background: lightgrey;
			padding: 0.2em 0.3em 0.1em;
			color: inherit;
			/* 生放送 */
			text-decoration: none;
		}
		#head_search_form > ul > li > a:hover {
			/* 静画 */
			text-decoration: none;
		}
		/*------------------------------------
			選択中のタブ
		*/
		[action$="search"] > ul > li.current > a {
			color: white;
			background: dimgray;
		}
	</style>`);

	/**
	 * 静画検索のtargetパラメータの値。
	 * @type {string}
	 */
	let imageSearchParamValue = 'illust';

	let form = document.querySelector('[action$="search"]');
	let textField = form[pageType === 'image' ? 'q' : 'keyword'];

	if (pageType === 'image') {
		// 静画の場合
		let pathnameParts = document.querySelector('#logo > h1 > a').pathname.split('/');
		switch (pathnameParts[1]) {
			case 'manga':
				imageSearchParamValue = 'manga';
				break;
			case 'book':
				imageSearchParamValue = pathnameParts[2] === 'r18' ? 'book_r18' : 'book';
				break;
		}
	}

	form.insertAdjacentHTML('afterbegin', `<ul>
		<li>
			<a href="http://www.nicovideo.jp/search/" title="${h(_('動画をキーワードで検索'))}">${h(_('キーワード'))}</a>
		</li>
		<li>
			<a href="http://www.nicovideo.jp/tag/" title="${h(_('動画をタグで検索'))}">${h(_('タグ'))}</a>
		</li>
		<li>
			<a href="http://www.nicovideo.jp/mylist_search/" title="${h(_('マイリストを検索'))}">${h(_('マイリスト'))}</a>
		</li>
		<li${pageType === 'image' ? ' class="current"' : ''}>
			<a href="http://seiga.nicovideo.jp/search/?target=${imageSearchParamValue}" title="${h(textField.defaultValue)}">${h(_('静画'))}</a>
		</li>
		<li${pageType === 'live' ? ' class="current"' : ''}>
			<a href="http://live.nicovideo.jp/search/" title="' + h(_('番組を探す')) + '">${h(_('生放送'))}</a>
		</li>
	</ul>`);

	let defaultCurrentTabAnchor = form.querySelector('.current a');

	document.addEventListener('click', function (event) {
		let button = event.button, target = event.target;
		if (button !== 2 && target.matches('[action$="search"] > ul > li > a')) {
			// タブが副ボタン以外でクリックされたとき
			let searchWord = textField.value.trim();
			if (pageType === 'image' && textField.value === textField.defaultValue) {
				// 静画の場合、検索窓の値が既定値と一致していれば空欄とみなす
				searchWord = '';
			}
			if (searchWord) {
				// 検索語句が入力されていれば
				switchTab(target);
				target.pathname = target.pathname.replace(/[^/]*$/, encodeURIComponent(searchWord));
				window.setTimeout(function () {
					// リンク先を新しいタブで開いたとき
					switchTab(defaultCurrentTabAnchor);
				}, CURRENT_TAB_RESTORATION_DELAY);
			} else {
				// 検索語句が未入力なら
				event.preventDefault();
				if (button === 0) {
					// 主ボタンでクリックされていれば
					switchTab(target);
				}
			}
		}
	});

	// TabSubmitをインストールしているとマウスボタンを取得できず、中クリック時にも同じタブで検索してしまうため分割
	form.addEventListener('click', function (event) {
		if (event.target.type === (pageType === 'image' ? 'image' : 'submit')) {
			// 送信ボタンをクリックしたとき
			let searchWord = textField.value !== textField.defaultValue && textField.value.trim();
			if (searchWord) {
				event.stopPropagation();
				event.preventDefault();
				let anchor = form.querySelector('.current a');
				anchor.pathname = anchor.pathname.replace(/[^/]*$/, encodeURIComponent(searchWord));
				window.location.assign(anchor.href);
			}
		}
	}, true);

	window.addEventListener('pageshow', function (event) {
		if (event.persisted) {
			// 履歴にキャッシュされたページを再表示したとき
			switchTab(defaultCurrentTabAnchor);
		}
	});

	/**
	 * 選択しているタブを切り替える。
	 * @param {HTMLAnchorElement} target - 切り替え先のタブのリンク。
	 */
	function switchTab(target) {
		form.getElementsByClassName('current')[0].classList.remove('current');
		target.parentElement.classList.add('current');
		if (pageType === 'image') {
			// 静画
			if (textField.defaultValue === textField.value) {
				// 検索語句が未入力なら
				textField.defaultValue = textField.value = target.title;
			} else {
				// 検索語句が入力されていれば
				textField.defaultValue = target.title;
			}
		} else {
			// 生放送
			textField.placeholder = target.title;
		}
	}
}



/**
 * 総合トップページの検索窓に、動画「タブ」検索ボタンを追加する。
 */
function addTagSearchButtonToTopPage() {
	// スタイルの設定
	document.head.insertAdjacentHTML('beforeend', `<style>
		#searchFormInner {
			width: auto;
			margin-left: 136px;
		}
	</style>`);

	// マイリスト検索ボタンの取得
	let refItem = document.getElementsByClassName('sMylist')[0].parentNode;

	// マイリスト検索ボタンの複製
	let item = refItem.cloneNode(true);

	// ボタン名を変更
	let anchor = item.getElementsByTagName('a')[0];
	anchor.textContent = _('タグ');

	// クラス名を変更
	anchor.className = 'sVideo';

	// アドレスを変更
	anchor.href = 'http://www.nicovideo.jp/tag/';

	// タグ検索ボタンを追加
	refItem.parentNode.insertBefore(item, refItem);

	if (!document.getElementsByClassName('sSeiga')[0]) {
		// 静画検索ボタンが存在しなければ
		// 生放送検索の取得
		refItem = document.getElementsByClassName('sLive')[0].parentNode;
		// 生放送検索の複製
		item = refItem.cloneNode(true);
		// ボタン名を変更
		anchor = item.getElementsByTagName('a')[0];
		anchor.textContent = _('静画');
		// クラス名を変更
		anchor.className = 'sSeiga';
		// アドレスを変更
		anchor.href = 'http://seiga.nicovideo.jp/search/';
		// 静画検索を追加
		refItem.parentNode.insertBefore(item, refItem);

		startScript(
			function () {
				let list, item, anchor;
				// メニューの生放送リンクの取得
				list = document.querySelector('.service_main .live').parentNode.parentNode;
				// 生放送リンクの複製
				item = list.cloneNode(true);
				// リンク文字を変更
				anchor = item.getElementsByTagName('a')[0];
				anchor.title = anchor.textContent = _('静画');
				// クラス名を変更
				anchor.classList.remove('live');
				anchor.classList.add('seiga');
				// アドレスを変更
				item.getElementsByTagName('a')[0].href = 'http://seiga.nicovideo.jp/';
				// メニューに静画へのリンクを追加
				list.parentNode.insertBefore(item, list);

				// サブメニューの複製
				item = document.getElementsByClassName('service_sub')[0].cloneNode(true);
				// 2つ目以降の要素を削除
				for (let removedItem of item.querySelectorAll('li:first-child ~ li')) {
					removedItem.remove();
				}
				// リンク文字を変更
				anchor = item.getElementsByTagName('a')[0];
				anchor.title = anchor.textContent = _('マンガ');
				// アドレスを変更
				item.getElementsByTagName('a')[0].href = 'http://seiga.nicovideo.jp/manga/';
				// メニューに静画のサブメニューへのリンクを追加
				list.parentNode.insertBefore(item, list);
			},
			parent => parent.id === 'sideNav',
			target => target.id === 'trendyTags',
			() => document.querySelector('#menuService [href="http://live.nicovideo.jp/timetable/"]'),
			{
				isTarget: target => target.id === 'NewServiceList',
			}
		);
	}
}



/**
 * ユーザーページ左側のメニューに、静画へのリンクを追加する。
 */
function addImageLinkToUserPageMenu() {
	// スタイルの設定
	document.head.insertAdjacentHTML('beforeend', `<style>
		.sidebar ul li.imageTab a span {
			width: 22px;
			height: 20px;
			background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAUCAQAAAAjdQW7AAAA/ElEQVQoz9WRzU3EMBCFv3EibRN2CyDtLiJJIRSSQlIIhSQgscDWYDeBhGc4ZJf87YErzwdr5M9vnmbEmCvz2FudMQSG12a3eBWbgcdOKgt4wwBJxM/mJnzorNKAX3Y6y7wqL+iz1uZ1ATocS5UjmmtbeQqSXGT1nX2Xa/WKzQ5IcsNbs3LOWDW5yu/t4umJdYxjr0EnJElUNIjXxEal1mPbMVPBqYG7aOC/2K1gl9FZUuXQ3/dKRsNDt3G2xf7M6zW/F8+t0V1l5KlIbFKXJRldZ0OSG97bDVwMBPF5WgWSJPJybrfTEGPffft8mYhQQPpoC25JjL/L8f/gH1eMbYCeUydgAAAAAElFTkSuQmCC");
		}
	</style>`);

	let nextItem = document.getElementsByClassName('stampTab')[0];

	let item = nextItem.cloneNode(true);
	let classList = item.classList;
	classList.remove('stampTab', 'active');
	classList.add('imageTab');
	let anchor = item.getElementsByTagName('a')[0];
	anchor.href = 'http://seiga.nicovideo.jp/user/illust/' + /[0-9]+/.exec(anchor.pathname)[0];
	anchor.lastChild.data = _('静画');

	nextItem.prepend(item);
}



/**
 * コミュニティ詳細ページのメニューに、関連コミュニティページ (「コミュニティを登録しました」ページ) へのリンクを追加する。
 */
async function addRelatedCommunitiesLink() {
	let result = /^\/motion\/(co[0-9]+)\/done(?:\/|$)/.exec(window.location.pathname);

	/**
	 * 関連コミュニティページを開いていれば真。
	 * @type {boolean}
	 */
	let relatedCommunitiesPage = result;

	if (relatedCommunitiesPage) {
		//  関連コミュニティページなら
		let joinedCommunityPage = false;
		let lastestJoinedCommunity = await GM.getValue('lastestJoinedCommunity');
		if (lastestJoinedCommunity) {
			// コミュニティ登録ボタンを押した後なら
			GM.deleteValue('lastestJoinedCommunity');
			if (result[1] === lastestJoinedCommunity) {
				// 「コミュニティを登録しました」を表示すべきなら
				joinedCommunityPage = true;
			}
		}
		if (!joinedCommunityPage) {
			// 「コミュニティを登録しました」の表示を消す
			document.head.insertAdjacentHTML('beforeend', `<style>
				#main0727 > :not(.gyokuon_block) {
					display: none;
				}
				.gyokuon_block {
					margin-top: initial;
				}
				.gyokuon_block .gyokuon_hdg {
					border: initial;
				}
			</style>`);
		}
	}

	// スタイルの設定
	document.head.insertAdjacentHTML('beforeend', `<style>
		#commenu ul {
			display: flex;
		}
		#commenu a {
			white-space: nowrap;
		}
		#commenu li#btn_rlt a {
			background-position: -300px 0px;
		}
		#commenu li#btn_rlt a:hover,
		#commenu li#btn_rlt a.on {
			background-position: -300px -34px;
		}
	</style>`);

	// メニューにリンクを追加
	let topLinkItem = document.getElementById('btn_top');
	let item = topLinkItem.cloneNode(true);
	item.id = 'btn_rlt';
	item.title = _('このコミュニティを登録した人はこんなコミュニティも登録しています');
	let anchor = item.firstElementChild;
	anchor.pathname = anchor.pathname.replace('community', 'motion') + '/done';
	anchor.classList[relatedCommunitiesPage ? 'add' : 'remove']('on');
	anchor.firstElementChild.textContent = _('関連コミュニティ');
	topLinkItem.parentElement.append(item);

	// コミュニティ登録時にコミュニティIDを記録する
	let form = document.querySelector('form[action^="/motion/co"]');
	if (form) {
		// コミュニティ登録確認ページなら
		form.addEventListener('submit', function (event) {
			GM.setValue('lastestJoinedCommunity', form.action.replace('http://com.nicovideo.jp/motion/', ''));
		});
	}
}

})();
