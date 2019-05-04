// ==UserScript==
// @name        Check new posts in Nico Community
// @name:ja     ニコニコミュニティ掲示板 新着チェック
// @description Adds a Nico Community board to your watch list and gets last posting dates and times.
// @description:ja ニコニコミュニティ掲示板をウォッチリストに登録し、最終レス日時を取得します。
// @namespace   https://greasyfork.org/ja/users/137
// @version     2.0.1
// @include     https://dic.nicovideo.jp/p/my/watchlist/rev_or_res_created/desc
// @include     https://dic.nicovideo.jp/p/my/watchlist/rev_or_res_created/desc/*
// @include     https://dic.nicovideo.jp/p/my/watchlist/rev_or_res_created/desc?*
// @include     https://dic.nicovideo.jp/p/my/watchlist/rev_or_res_created/desc#*
// @include     https://dic.nicovideo.jp/p/my/watchlist/res_created/desc
// @include     https://dic.nicovideo.jp/p/my/watchlist/res_created/desc/*
// @include     https://dic.nicovideo.jp/p/my/watchlist/res_created/desc?*
// @include     https://dic.nicovideo.jp/p/my/watchlist/res_created/desc#*
// @match       *://com.nicovideo.jp/community/*
// @require     https://cdn.rawgit.com/greasemonkey/gm4-polyfill/d58c4f6fbe5702dbf849a04d12bca2f5d635862d/gm4-polyfill.js
// @require     https://greasyfork.org/scripts/17895/code/polyfill.js?version=189394
// @require     https://greasyfork.org/scripts/19616/code/utilities.js?version=230651
// @require     https://greasyfork.org/scripts/17896/code/start-script.js?version=112958
// @license     Mozilla Public License Version 2.0 (MPL 2.0); https://www.mozilla.org/MPL/2.0/
// @compatible  Firefox 次のサイトのサードパーティCookieを許可する必要があります / You need to allow third-party cookies from the following sites: https://dic.nicovideo.jp https://com.nicovideo.jp
// @compatible  Opera
// @compatible  Chrome
// @grant       GM.registerMenuCommand
// @grant       GM_registerMenuCommand
// @grant       GM.openInTab
// @grant       GM_openInTab
// @grant       GM.setValue
// @grant       GM_setValue
// @grant       GM.getValue
// @grant       GM_getValue
// @grant       GM.notification
// @grant       GM_notification
// @grant       GM.xmlHttpRequest
// @grant       GM_xmlhttpRequest
// @connect     dic.nicovideo.jp
// @connect     com.nicovideo.jp
// @run-at      document-start
// @icon        data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAB3RJTUUH4AgEAgccPUZzUgAAABd0RVh0U29mdHdhcmUAR0xEUE5HIHZlciAzLjRxhaThAAAACHRwTkdHTEQzAAAAAEqAKR8AAAAEZ0FNQQAAsY8L/GEFAAAABlBMVEUAAAD///+l2Z/dAAAAHElEQVR42mNgGCSAEQcYqQoIBtQIUTDS08MAAwCiTQHB6ihX6AAAAABJRU5ErkJggg==
// @author      100の人
// @homepage    https://greasyfork.org/scripts/22286
// ==/UserScript==

(function () {
'use strict';

// L10N
Gettext.setLocalizedTexts({
	/*eslint-disable quote-props, max-len */
	'en': {
		'ニコニコミュニティ掲示板 新着チェック': 'Check new posts in Nico Community',
		'ウォッチリストに追加'     : 'Add this to your watch list',
		'登録しました!'            : 'Has been added!',
		'すでに登録済みだよ。'     : 'This is already added!',
		'ウォッチリストを開く (%s)': 'Open your watch list (%s)',
		'更新かレスが新しい順'     : 'descending order of date and time of last updating article or last posting',
		'最終レスが新しい順'       : 'descending order of date and time of last posting',
		'ニコニコ大百科のセッションが切れています。ウォッチリストなどを開き、ログインしてください。':
			'Your Nicopedia session has expired. Please open your watch list and log in.',
		'niconicoのセッションが切れているか、%sのコミュニティに入っていません。': 'Your Niconico session have expired or you do not follow the community %s.',
		'Firefoxでは、「https://dic.nicovideo.jp」と「https://com.nicovideo.jp」のサードパーティCookieを許可する必要があります。'
			: 'If you use Firefox, you need to allow third-party cookies from “https://dic.nicovideo.jp” and “https://com.nicovideo.jp”.',
	},
	/*eslint-enable quote-props, max-len */
});

/**
 * ウォッチリストにコミュニティ記事を登録します。
 */
class WatchListRegister
{
	/**
	 * 登録成功時の応答文字列。
	 * @constant {number}
	 */
	static get SUCCESS() {return 'OK';}

	/**
	 * 登録済みの場合の応答文字列。
	 * @constant {number}
	 */
	static get ALREADY() {return 'NGすでに登録済みだよ。';}

	constructor()
	{
		if (document.getElementById('bbs_summary')) {
			Gettext.setLocale(window.navigator.language);
			GM.registerMenuCommand(_('ウォッチリストに追加'), () => this.addCurrentCommunityArticleToWatchList(), 'w');
			GM.registerMenuCommand(
				_('ウォッチリストを開く (%s)').replace('%s', _('更新かレスが新しい順')),
				() => GM.openInTab('https://dic.nicovideo.jp/p/my/watchlist/rev_or_res_created/desc'),
				'u'
			);
			GM.registerMenuCommand(
				_('ウォッチリストを開く (%s)').replace('%s', _('最終レスが新しい順')),
				() => GM.openInTab('https://dic.nicovideo.jp/p/my/watchlist/res_created/desc'),
				'p'
			);
		}
	}

	/**
	 * 現在のコミュニティに対応する記事をウォッチリストに登録します。
	 * @access protected
	 */
	addCurrentCommunityArticleToWatchList()
	{
		this.getArticleId(this.getCommunityId())
			.then(articleId => this.addArticleToWatchList(articleId))
			.then(success => window.alert(success ? _('登録しました!') : _('すでに登録済みだよ。')))
			.catch((exception) => {
				console.error(exception);
				window.alert(exception);
			});
	}

	/**
	 * 指定した記事をウォッチリストに追加します。
	 * @access protected
	 * @param {string} articleId - ページ番号。
	 * @returns {Promise.<boolean>} 登録に成功したら真、すでに登録済みなら偽。
	 */
	addArticleToWatchList(articleId)
	{
		return new Promise((resolve, reject) => {
			GM.xmlHttpRequest({
				method: 'POST',
				url: 'https://dic.nicovideo.jp/p/my/add_watchlist',
				headers: {'content-type': 'application/x-www-form-urlencoded'},
				data: `pg_id=${articleId}`,
				onerror: responseObject => reject(new DOMException('', 'NetworkError')),
				onload: responseObject => {
					switch (responseObject.responseText) {
						case WatchListRegister.SUCCESS:
							resolve(true);
							break;
						case WatchListRegister.ALREADY:
							resolve(false);
							break;
						default: {
							let exceptionMessage;
							if (this.getTypeWithoutParameter(responseObject.responseHeaders) === 'text/html') {
								const responseDocument
									= new DOMParser().parseFromString(responseObject.responseText, 'text/html');
								exceptionMessage = responseDocument.querySelector('#login_form, [action="/p/tos"]')
									? _('ニコニコ大百科のセッションが切れています。ウォッチリストなどを開き、ログインしてください。')
										+ _('Firefoxでは、「https://dic.nicovideo.jp」と「https://com.nicovideo.jp」のサードパーティCookieを許可する必要があります。')
									: responseDocument.title;
							} else {
								exceptionMessage = responseObject.responseText;
							}
							reject(new Error(exceptionMessage));
						}
					}
				},
			});
		});
	}

	/**
	 * HTTPヘッダから、パラメータなしのMIMEタイプを取得します。
	 * @access protected
	 * @param {string} headers - 改行 (CRLF) 区切り
	 * @returns {?string} 小文字。
	 */
	getTypeWithoutParameter(headers)
	{
		const contentType = headers.toLowerCase().split('\r\n').find(header => header.startsWith('content-type'));
		return contentType ? /^[^:]+:\s([^;\s]+)/.exec(contentType)[1] : null;
	}

	/**
	 * ページからコミュニティIDを取得します。
	 * @access protected
	 * @returns {string}
	 */
	getCommunityId()
	{
		return /^\/community\/([^/]+)/.exec(window.location.pathname)[1];
	}

	/**
	 * コミュニティIDからページ番号を取得します。
	 * @access protected
	 * @param {string} communityId
	 * @returns {Promise.<string>}
	 */
	getArticleId(communityId)
	{
		return new Promise((resolve, reject) => {
			GM.xmlHttpRequest({
				method: 'GET',
				url: `https://dic.nicovideo.jp/c/${communityId}`,
				onerror: responseObject => reject(new DOMException('', 'NetworkError')),
				onload:  responseObject => resolve(
					this.getIdFromArticle((new DOMParser()).parseFromString(responseObject.responseText, 'text/html'))
				),
			});
		});
	}

	/**
	 * 大百科記事からページ番号を取得します。
	 * @access protected
	 * @param {Document} article
	 * @returns {?string}
	 */
	getIdFromArticle(article)
	{
		return article.querySelector('[href^="/id/"]').text;
	}
}

/**
 * ウォッチリストのコミュニティ記事の行を修正します。
 */
class WatchListFixer
{
	/**
	 * APIに接続する間隔 (ミリ秒数)。
	 * @constant {number}
	 */
	static get INTERVAL() {return 1000;}

	constructor()
	{
		/**
		 * 「更新かレスが新しい順」なら真。「最終レスが新しい順」なら偽。
		 * @access protected
		 * @member {boolean}
		 */
		this.revOrResCreated = window.location.pathname.startsWith('/p/my/watchlist/rev_or_res_created/desc');

		/**
		 * ウォッチリストの記事一覧。
		 * @access protected
		 * @member {WatchListItem[]}
		 */
		this.items = Array.from(document.querySelectorAll('#sort-options ~ table tbody tr')).map(function (item) {
			return new WatchListItem(item);
		});

		this.getAllLastResponseDates();
	}

	/**
	 * 指定した各コミュニティ記事に対応するコミュニティ掲示板の最終レス日時を取得します。
	 * @access protected
	 */
	async getAllLastResponseDates()
	{
		this.getLastResponseDatesFromAPI(await this.getLastResponseDatesFromCache());
	}

	/**
	 * 指定した各コミュニティ記事に対応するコミュニティ掲示板の最終レス日時をAPIから取得します。
	 * @access protected
	 * @param {WatchListItem[]} items
	 * @returns {Promise.<void>}
	 */
	async getLastResponseDatesFromAPI(items)
	{
		for (const item of items) {
			try {
				await item.loadLastResponseCreated();
			} catch (exception) {
				console.error(exception);
			}
			this.sort();
			await new Promise(resolve => setTimeout(resolve, WatchListFixer.INTERVAL));
		}
	}

	/**
	 * 各コミュニティ記事に対応するコミュニティ掲示板の最終レス日時をキャッシュから取得します。
	 * @access protected
	 * @returns {Promise.<WatchListItem[]>} キャッシュから日時を取得できなかったコミュニティ記事の一覧。
	 */
	async getLastResponseDatesFromCache()
	{
		const noCacheAvailableItems = [];
		for (const item of this.items) {
			if (!await item.loadLastResponseCreatedFromCache()) {
				noCacheAvailableItems.push(item);
			}
		}
		this.sort();
		return noCacheAvailableItems;
	}

	/**
	 * 記事を並べ替えます。
	 * @access protected
	 */
	sort()
	{
		this.items[0].getElement().parentElement.append(
			...this.items.sort((a, b) => this.getSortingReferenceTime(b) - this.getSortingReferenceTime(a))
				.map(item => item.getElement())
		);
	}

	/**
	 * 記事から並べ替えの基準となるエポックミリ秒を取得します。
	 * @access protected
	 * @param {WatchListItem} item
	 * @returns {number} 基準となる値が存在しない場合は -Infinity を返します。
	 */
	getSortingReferenceTime(item)
	{
		const times = [item.getLastResponseCreated() ? item.getLastResponseCreated().getTime() : -Infinity];
		if (this.revOrResCreated) {
			times.push(item.getLastRevisionCreated() ? item.getLastRevisionCreated().getTime() : -Infinity);
		}
		return Math.max(...times);
	}
}

/**
 * ウォッチリストの一つの記事を表します。
 */
class WatchListItem
{
	/**
	 * 日数をミリ秒に変換するときの乗数。
	 * @constant {number}
	 */
	static get DAY_TO_MILLISECOND() {return 24 * 60 * 60 * 1000;}

	/**
	 * 日時を赤くしておく期間。
	 * @constant {number}
	 */
	static get EMPHASIS_PERIOD() {return 1 * WatchListItem.DAY_TO_MILLISECOND;}

	/**
	 * インスタンスを生成し、コミュニティ記事の場合はレスのリンクを修正します。
	 * @param {HTMLTableRowElement} element - tr要素。
	 */
	constructor(element)
	{
		/**
		 * 対応するtr要素。
		 * @access protected
		 * @member {HTMLTableRowElement}
		 */
		this.element = element;

		const labels = this.getElement().querySelectorAll('td:nth-of-type(2) strong');

		/**
		 * 最終更新日時。
		 * @access protected
		 * @member {?NiconicoPediaDate}
		 */
		this.lastRevisionCreated = this.getDateCorrespondingToLabel(labels[0]);

		/**
		 * 最終レス日時。
		 * @access protected
		 * @member {?NiconicoPediaDate}
		 */
		this.lastResponseCreated = this.getDateCorrespondingToLabel(labels[1]);

		/**
		 * @access protected
		 * @member {?Community}
		 */
		this.community = this.isCommunity() ? new Community(this.getCommunityId()) : null;
		if (this.isCommunity()) {
			this.fixResponseLink();
		}
	}

	/**
	 * 最終更新日時を返します。
	 * @returns {?number}
	 */
	getLastRevisionCreated()
	{
		return this.lastRevisionCreated;
	}

	/**
	 * 最終レス日時を返します。
	 * @returns {?number}
	 */
	getLastResponseCreated()
	{
		return this.lastResponseCreated;
	}

	/**
	 * 対応する要素を返します。
	 * @returns {HTMLTableRowElement}
	 */
	getElement()
	{
		return this.element;
	}

	/**
	 * キャッシュからコミュニティ掲示板の最終レス日時を読み込み表示します。
	 * @returns {Promise.<boolean>} キャッシュが存在しないか古くなっていた場合に偽を返します。
	 */
	async loadLastResponseCreatedFromCache()
	{
		if (this.isCommunity() && this.countResponses() > 0) {
			if (await this.community.getNumberOfResponsesFromCache() < this.countResponses()) {
				return false;
			}
			this.lastResponseCreated = await this.community.getLastResponseCreatedFromCache();
			this.showLastResponseCreated();
		}
		return true;
	}

	/**
	 * APIからコミュニティ掲示板の最終レス日時を読み込み表示します。
	 * @throws {DOMException} コミュニティ記事で無かった場合に「InvalidStateError」を投げ出します。
	 * @returns {Promise}
	 */
	loadLastResponseCreated()
	{
		if (!this.isCommunity()) {
			throw new DOMException('', 'InvalidStateError');
		}

		return this.community.loadNumberOfResponsesAndLastResponseCreated().then(async () => {
			this.lastResponseCreated = await this.community.getLastResponseCreatedFromCache();
			this.showLastResponseCreated();
		});
	}

	/**
	 * コミュニティ記事なら真を返します。
	 * @returns {boolean}
	 */
	isCommunity()
	{
		return Boolean(this.community) || this.getElement().getElementsByTagName('a')[0].pathname.startsWith('/c/');
	}

	/**
	 * コミュニティ記事からIDを返します。
	 * @access protected
	 * @returns {string}
	 */
	getCommunityId()
	{
		return this.getElement().getElementsByTagName('a')[0].pathname.replace('/c/', '');
	}

	/**
	 * 「最終更新日 / 最終レス日」列の「レス」リンクのURLを、対応するコミュニティ掲示板のURLに変更します。
	 * @access protected
	 */
	fixResponseLink()
	{
		this.getElement().querySelector('[href^="/b/c/"]').href
			= `http://com.nicovideo.jp/bbs/${this.getCommunityId()}`;
	}

	/**
	 * 指定したstrong要素に対応する日時を取得します。
	 * @access protected
	 * @param {HTMLElement} label
	 * @returns {?NiconicoPediaDate}
	 */
	getDateCorrespondingToLabel(label)
	{
		const dateString = (
			label.nextElementSibling && label.nextElementSibling.localName === 'span'
				? label.nextElementSibling.firstChild
				: label.nextSibling
		).data.trim();
		return dateString ? NiconicoPediaDate.parseDateString(dateString) : null;
	}


	/**
	 * 最終レス日時を表示します。
	 * @access protected
	 */
	showLastResponseCreated()
	{
		this.getElement().cells[1].insertAdjacentHTML(
			'beforeend',
			this.getLastResponseCreated().getTime() > Date.now() - WatchListItem.EMPHASIS_PERIOD
				? h` <span style="color:red;">${this.getLastResponseCreated()}</span>`
				: h` ${this.getLastResponseCreated()}`
		);
	}

	/**
	 * レス数を取得します。
	 * @access protected
	 * @returns {boolean}
	 */
	countResponses()
	{
		return Number.parseInt(/[0-9]+/.exec(this.getElement().getElementsByTagName('a')[0].nextSibling.data)[0]);
	}
}

/**
 * ニコニコミュニティの一つのコミュニティを表します。
 */
class Community
{
	/**
	 * @param {string} id - コミュニティID。
	 */
	constructor(id)
	{
		/**
		 * コミュニティID。
		 * @access protected
		 * @member {string}
		 */
		this.id = id;
	}

	/**
	 * キャッシュからコミュニティ掲示板のレス数を返します。
	 * @returns {Promise.<number>} キャッシュが存在しない場合は -1 を返します。
	 */
	getNumberOfResponsesFromCache()
	{
		return GM.getValue(`${this.id}.number-of-responses`, -1);
	}

	/**
	 * キャッシュからコミュニティ掲示板の最終レス日時を取得します。
	 * @returns {Promise.<?NiconicoPediaDate>} キャッシュが存在しない場合はnullを返します。
	 */
	async getLastResponseCreatedFromCache()
	{
		const dateString = await GM.getValue(`${this.id}.last-response-created`);
		return dateString ? new NiconicoPediaDate(dateString) : null;
	}

	/**
	 * キャッシュにコミュニティ掲示板のレス数を保存します。
	 * @param {number} numberOfResponses
	 * @returns {Promise.<void>}
	 */
	setNumberOfResponsesToCache(numberOfResponses)
	{
		return GM.setValue(`${this.id}.number-of-responses`, numberOfResponses);
	}

	/**
	 * キャッシュにコミュニティ掲示板の最終レス日時を保存します。
	 * @param {Date} lastResponseCreated
	 * @returns {Promise.<void>}
	 */
	setLastResponseCreatedToCache(lastResponseCreated)
	{
		return GM.setValue(`${this.id}.last-response-created`, lastResponseCreated.toISOString());
	}

	/**
	 * コミュニティページからハッシュキーを取得します。
	 * @returns {Promise.<?string>}
	 */
	getHashKeyFromCommunityPage()
	{
		return new Promise((resolve, reject) => {
			GM.xmlHttpRequest({
				method: 'GET',
				url: 'https://com.nicovideo.jp/community/' + this.id,
				onerror: responseObject => reject(new DOMException('', 'NetworkError')),
				onload: responseObject => {
					const script = new DOMParser().parseFromString(responseObject.responseText, 'text/html')
						.querySelector('#bbs_template ~ script');
					resolve(script ? /"([%A-F0-9a-f]+)"/.exec(script.text)[1] : null);
				},
			});
		});
	}

	/**
	 * APIからからコミュニティ掲示板のレス数、および最終レス日時を取得し、キャッシュとして保存します。
	 * @returns {Promise.<void>}
	 */
	async loadNumberOfResponsesAndLastResponseCreated()
	{
		let hashKey;
		while (true) {
			const response
				= await fetch(`https://dic.nicovideo.jp/b/c/${this.id}/api/res/l1/json?no-cache=${Math.random()}`
					+ (hashKey ? `&hash_key=${hashKey}` : ''), {credentials: 'include', redirect: 'manual'});

			if (response.type === 'opaqueredirect') {
				// ハッシュキーがCookieに保存されていなければ
				if (hashKey) {
					return Promise.reject();
				} else {
					hashKey = await this.getHashKeyFromCommunityPage();
					if (hashKey) {
						continue;
					} else {
						const errorMessage
							= _('niconicoのセッションが切れているか、%sのコミュニティに入っていません。').replace('%s', this.id)
								+ (typeof mozInnerScreenX !== 'undefined' ? '\n\n' + _('Firefoxでは、「https://dic.nicovideo.jp」と「https://com.nicovideo.jp」のサードパーティCookieを許可する必要があります。') : '');
						if (GM.notification) {
							GM.notification({
								text: errorMessage,
								title: _('ニコニコミュニティ掲示板 新着チェック'),
								image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAB3RJTUUH4AgEAgccPUZzUgAAABd0RVh0U29mdHdhcmUAR0xEUE5HIHZlciAzLjRxhaThAAAACHRwTkdHTEQzAAAAAEqAKR8AAAAEZ0FNQQAAsY8L/GEFAAAABlBMVEUAAAD///+l2Z/dAAAAHElEQVR42mNgGCSAEQcYqQoIBtQIUTDS08MAAwCiTQHB6ihX6AAAAABJRU5ErkJggg==',
							});
						} else {
							alert(errorMessage);
						}
						return Promise.reject(new Error(errorMessage));
					}
				}
			} else {
				const lastResponse = (await response.json())[0];
				await this.setNumberOfResponsesToCache(lastResponse.n);
				await this.setLastResponseCreatedToCache(NiconicoPediaDate.parseAPIDateString(lastResponse.d));
				return;
			}
		}
	}
}

/**
 * ニコニコ大百科における日時文字列を扱います。
 */
class NiconicoPediaDate extends Date
{
	/**
	 * ニコニコ大百科の日時文字列からインスタンスを生成します。
	 * @param {string} dateString - 「16/01/01 00:00」(2000〜2099の2桁の年/月/日 時:分) のような日時文字列を日本標準時で指定します。
	 * @returns {NiconicoPediaDate}
	 */
	static parseDateString(dateString)
	{
		return new this(`20${dateString.replace(/\//g, '-')}+09:00`);
	}

	/**
	 * ニコニコ大百科APIの日時文字列からインスタンスを生成します。
	 * @param {string} apiDateString - 「20160101000000」(年月日時分秒) のような日時文字列を日本標準時で指定します。
	 * @returns {NiconicoPediaDate}
	 */
	static parseAPIDateString(apiDateString)
	{
		return new this(apiDateString.replace(/(.{4})(.{2})(.{2})(.{2})(.{2})(.{2})/, '$1-$2-$3T$4:$5:$6+09:00'));
	}

	/**
	 * 「16/01/01 00:00」のような日時文字列を日本標準時で返します。
	 * @returns {string}
	 */
	toString()
	{
		return this.toLocaleString('ja', {
			timeZone: 'Asia/Tokyo',
			year: '2-digit',
			month: '2-digit',
			day: '2-digit',
			hour:'2-digit',
			minute: '2-digit',
		}).replace(/ ([0-9]):/, ' 0$1:');
	}
}

if (window.location.host === 'com.nicovideo.jp') {
	startScript(
		() => new WatchListRegister(),
		parent => parent.classList.contains('md-sideContentBox'),
		target => target.classList.contains('memberList'),
		() => document.getElementsByClassName('memberList')[0]
	);
} else {
	startScript(
		() => new WatchListFixer(),
		parent => parent.id === 'contents',
		target => target.id === 'right-column',
		() => document.getElementById('right-column')
	);
}

})();
