// ==UserScript==
// @name        Firefox Bookmarks Assigner
// @name:ja     Firefox ブックマーク振り分け
// @description [userChromeJS] Automatically places a newly bookmarked page in the matching folder based on its URL.
// @description:ja 【userChromeJS】新しくブックマークしたとき、URLによって設定したフォルダに振り分けます。
// @namespace   http://userscripts.org/users/347021
// @version     5.0.4
// @include     main
// @license     Mozilla Public License Version 2.0 (MPL 2.0); https://www.mozilla.org/MPL/2.0/
// @compatible  Firefox userChromeJS用スクリプト です (※Greasemonkeyスクリプトではありません)
// @incompatible Opera
// @incompatible Chrome
// @charset     UTF-8
// @author      100の人
// @contributor HADAA
// @homepage    https://greasyfork.org/scripts/276
// ==/UserScript==

(function () {
'use strict';

/**
 * L10N
 * @type {LocalizedTexts}
 */
let localizedTexts = {
	'en': {
		'Firefox ブックマーク振り分け': 'Firefox Bookmarks Assigner',
		'振り分け先のフォルダ <%s> は存在しません。': 'The folder <%s> doesn\'t exist.', // %s はフォルダ名をスラッシュ区切りでつなげたルートフォルダからのパス

		// 振り分けルール一覧
		'有効': 'Enabled',
		'URLパターン（大文字小文字同一視）': 'URL Pattern (case-insensitive)',
		'振り分け先のフォルダ': 'Destination folder',
		'未選択': 'not set',
		'フォルダを開閉する': 'Open/close folder',
		'行を削除': 'Delete row',
		'行を追加': 'Add row',
		'キャンセル': 'Cancel',
		'OK': 'OK',

		// URLパターンについて
		'正規表現': 'Regular Expression',
		'ホスト': 'Host',
		'ワイルドカード': 'Wildcard',
		'“/”（スラッシュ）で始まり“/”で終わる場合': 'If it starts with "/" (forward slash) and ends with "/"',
		'正規表現として扱われます。': 'It is interpreted as a regular expression.',
		'ホスト（先頭・末尾がピリオドでない）、またはホストとポート': 'Host (be sure not to begin or end with a period), or host and port',
		'ホスト、またはホストとポートとして扱われます。ホストがIPアドレスでない場合、そのサブドメインにも一致します。': 'Will be treated as host, or host and port. If the host is not in the form of IP address, also include its subdomains.',
		'それ以外': 'Otherwise',
		'ワイルドカード（“*”のみ）を含む文字列として扱われます。': 'It is interpreted as a string containing wildcards ("*" only).',

		// インポートやエクスポート
		'インポートとエクスポート': 'Import and export',
		'エクスポート': 'Export',
		'現在の設定をファイルへエクスポートします。保存していない設定は反映されません。': 'Export current settings to file. Not yet saved settings are not reflected.',
		'インポート': 'Import',
		'現在の設定をすべて削除し、ファイルから設定をインポートします。': 'Delete all settings, then import settings from file.',
		'追加インポート': 'Additional import',
		'ファイルから振り分けルールを追加します。': 'Add assign rules from file.',
		'その他': 'Others',
		'すべての設定を削除': 'Delete all settings',
		'すべての設定を削除し、スクリプトを停止します。': 'Delete all settings, and stop this script.',

		'<%s> へ設定をエクスポートしました。': 'Export to <%s> completed.', // %s はファイルパス
		'「%s」からのインポートに失敗しました。': 'Import from "%s" failed.', // %s はファイル名
		'「%s」からのインポートが完了しました。': 'Import from "%s" completed.', // %s はファイル名
		'インポートした設定を保存するには、「OK」ボタンをクリックしてください。': 'Click "OK" button to save import data.',
		'本当に、『%s』のすべての設定を削除してもよろしいですか？': 'Are you sure you want to delete all settings of "%s" ?', // %s は当スクリプト名
		'設定の削除が完了しました。当スクリプト自体を削除しなければ、次回のブラウザ起動時にまたスクリプトが起動します。': 'Completed deleting all settings. If you don\'t delete this script, it will run again when you start your browser next time.',
		'JSON ファイル': 'JSON Files',
		'JSONパースエラーです。': 'JSON parse error occured.',
		'振り分けルールが一つも見つかりませんでした。': 'Not a single assign rule was found.',
	},
};



Cu.import('resource://gre/modules/Services.jsm');
Cu.import('resource://gre/modules/FileUtils.jsm');
Cu.import('resource://gre/modules/Preferences.jsm');
let NavBookmarksService = Cc['@mozilla.org/browser/nav-bookmarks-service;1'].getService(Ci.nsINavBookmarksService);
let FileInputStream = Components.Constructor('@mozilla.org/network/file-input-stream;1', 'nsIFileInputStream', 'init');
let FilePicker = Components.Constructor('@mozilla.org/filepicker;1', 'nsIFilePicker', 'init');
let ConverterOutputStream = Components.Constructor('@mozilla.org/intl/converter-output-stream;1', 'nsIConverterOutputStream', 'init');



// i18n
let _, gettext, setlang, setLocalizedTexts;
{
	/**
	 * 翻訳対象文字列 (msgid) の言語。
	 * @constant {string}
	 */
	let ORIGINAL_LOCALE = 'ja';

	/**
	 * クライアントの言語の翻訳リソースが存在しないとき、どの言語に翻訳するか。
	 * @constant {string}
	 */
	let DEFAULT_LOCALE = 'en';

	/**
	 * 以下のような形式の翻訳リソース。
	 * {
	 *     'IETF言語タグ': {
	 *         '翻訳前 (msgid)': '翻訳後 (msgstr)',
	 *         ……
	 *     },
	 *     ……
	 * }
	 * @typedef {Object} LocalizedTexts
	 */

	/**
	 * クライアントの言語。{@link setlang}から変更される。
	 * @type {string}
	 * @access private
	 */
	let langtag = 'ja';

	/**
	 * クライアントの言語のlanguage部分。{@link setlang}から変更される。
	 * @type {string}
	 * @access private
	 */
	let language = 'ja';

	/**
	 * 翻訳リソース。{@link setLocalizedTexts}から変更される。
	 * @type {LocalizedTexts}
	 * @access private
	 */
	let multilingualLocalizedTexts = {};
	multilingualLocalizedTexts[ORIGINAL_LOCALE] = {};

	/**
	 * テキストをクライアントの言語に変換する。
	 * @param {string} message - 翻訳前。
	 * @returns {string} 翻訳後。
	 */
	_ = gettext = function (message) {
		// クライアントの言語の翻訳リソースが存在すれば、それを返す
		return langtag in multilingualLocalizedTexts && multilingualLocalizedTexts[langtag][message]
				// 地域下位タグを取り除いた言語タグの翻訳リソースが存在すれば、それを返す
				|| language in multilingualLocalizedTexts && multilingualLocalizedTexts[language][message]
				// デフォルト言語の翻訳リソースが存在すれば、それを返す
				|| DEFAULT_LOCALE in multilingualLocalizedTexts && multilingualLocalizedTexts[DEFAULT_LOCALE][message]
				// そのまま返す
				|| message;
	};

	/**
	 * {@link gettext}から参照されるクライアントの言語を設定する。
	 * @param {string} lang - IETF言語タグ。（「language」と「language-REGION」にのみ対応）
	 */
	setlang = function (lang) {
		lang = lang.split('-', 2);
		language = lang[0].toLowerCase();
		langtag = language + (lang[1] ? '-' + lang[1].toUpperCase() : '');
	};

	/**
	 * {@link gettext}から参照される翻訳リソースを追加する。
	 * @param {LocalizedTexts} localizedTexts
	 */
	setLocalizedTexts = function (localizedTexts) {
		var localizedText, lang, language, langtag, msgid;
		for (lang in localizedTexts) {
			localizedText = localizedTexts[lang];
			lang = lang.split('-');
			language = lang[0].toLowerCase();
			langtag = language + (lang[1] ? '-' + lang[1].toUpperCase() : '');

			if (langtag in multilingualLocalizedTexts) {
				// すでに該当言語の翻訳リソースが存在すれば、統合する（同じmsgidがあれば上書き）
				for (msgid in localizedText) {
					multilingualLocalizedTexts[langtag][msgid] = localizedText[msgid];
				}
			} else {
				multilingualLocalizedTexts[langtag] = localizedText;
			}

			if (language !== langtag) {
				// 言語タグに地域下位タグが含まれていれば
				// 地域下位タグを取り除いた言語タグも翻訳リソースとして追加する
				if (language in multilingualLocalizedTexts) {
					// すでに該当言語の翻訳リソースが存在すれば、統合する（同じmsgidがあれば無視）
					for (msgid in localizedText) {
						if (!(msgid in multilingualLocalizedTexts[language])) {
							multilingualLocalizedTexts[language][msgid] = localizedText[msgid];
						}
					}
				} else {
					multilingualLocalizedTexts[language] = localizedText;
				}
			}

			// msgidの言語の翻訳リソースを生成
			for (msgid in localizedText) {
				multilingualLocalizedTexts[ORIGINAL_LOCALE][msgid] = msgid;
			}
		}
	};
}

setLocalizedTexts(localizedTexts);

setlang(window.navigator.language);



/**
 * スクリプトの中核。
 */
let BookmarksAssigner = {
	/**
	 * id属性値などに利用する識別子。
	 * @constant {string}
	 */
	ID: 'bookmarks-assigner-347021',

	/**
	 * スクリプト名。
	 * @constant {string}
	 */
	NAME: _('Firefox ブックマーク振り分け'),

	/**
	 * ウィンドウが開いたときに実行する処理。
	 */
	main: function () {
		let earliestWindow = Services.wm.getEnumerator('navigator:browser').getNext();
		if (earliestWindow !== window && !earliestWindow.document.getElementById(this.ID + '-menuitem')) {
			// 新しいウィンドウを開いたとき、最初に開かれたウィンドウでスクリプトが実行されていなければ
			// 終了
			return;
		}

		ObserverUtils.init(this.ID);
		UninstallObserver.init();
		SettingsObserver.init();

		SettingsScreen.addToMenu();

		if (Preferences.has(Version3Settings.PREF_NAME)) {
			// 古い形式の設定が存在すれば
			Version3Settings.addConvertedRules();
		}

		this.generateRegExpMatchesAny();
		this.hookPlacesCreateBookmarkTransaction();
	},

	/**
	 * 振り替え規則のURLパターンのいずれかにマッチする正規表現。
	 * @type {RegExp}
	 */
	matchesAny: null,

	/**
	 * {@link BookmarksAssigner.matchesAny}のキャプチャ番号とフォルダ名のリストを対応させた配列。
	 * キャプチャ番号は1から始まるため、この配列の0番目は使われない。
	 * @type {Array[]}
	 */
	folderNamesList: [],

	/**
	 * {@link BookmarksAssigner.matchesAny}と{@link BookmarksAssigner.folderNamesList}を更新する。
	 */
	generateRegExpMatchesAny: function () {
		this.folderNamesList = [null];
		let sources = [];
		for (let rule of SettingsUtils.getRules().filter(rule => rule.enabled)) {
			// URLパターンを正規表現文字列に
			let source = SettingsUtils.convertToRegExp(rule.pattern).source;
			sources.push('(' + source + ')');

			// 全体のキャプチャ番号に対応するインデックスにフォルダ名リストを挿入する
			this.folderNamesList.push(rule.folder);
			// キャプチャの数だけインデックスを飛ばす
			for (let i = 0, captureCount = new RegExp('|' + source).exec('').length - 1; i < captureCount; i++) {
				this.folderNamesList.push(null);
			}
		}
		this.matchesAny = new RegExp(sources.join('|'), 'i');
	},

	/**
	 * URLから、振り分け先のフォルダ名リストを取得する。
	 * @param {string} url
	 * @returns {?string[]}
	 */
	getFolderNamesForURL: function (url) {
		let result = this.matchesAny.exec(url);
		if (result) {
			// 振り分け規則のいずれかのパターンに一致していれば
			// 一致したキャプチャに対応するフォルダ名リストを返す
			result.shift();
			return this.folderNamesList[result.findIndex(capture => capture !== undefined) + 1];
		}
		return null;
	},

	/**
	 * URLから、振り分け先のフォルダIDを取得する。
	 * @param {string} url
	 * @returns {?number}
	 */
	getFolderIdForURL: function (url) {
		let folderNames = this.getFolderNamesForURL(url);
		if (folderNames) {
			// ブックマークされるURLに対応する振り分け規則が存在すれば
			let id = BookmarkFolderUtils.getIdByNameList(folderNames);
			if (id) {
				// 振り分け先のフォルダが存在すれば
				return id;
			} else {
				let folderPath = '/' + folderNames.join('/').replace(
					folderNames[0],
					PlacesUtils.getFolderContents(PlacesUtils[BookmarkFolderUtils.FUEL_TO_SERVICE_PROPERTY_NAMES[folderNames[0]]]).root.title
				);
				showPopupNotification(_('振り分け先のフォルダ <%s> は存在しません。').replace('%s', folderPath), gBrowser.selectedTab, 'warning');
			}
		}
		return null;
	},

	/**
	 * {@link PlacesCommandHook._bookmarkPagePT}にインスタンス生成時のプロキシを設定する。
	 */
	hookPlacesCreateBookmarkTransaction: function () {
		window.getBookmarkFolderGuidForURL = (function (url) {
			if (!UninstallObserver.uninstalled && this.folderNamesList.length > 1) {
				// 当スクリプトが稼働中、かつ振り分け規則が一つでも存在していれば
				let id = this.getFolderIdForURL(url);
				if (id) {
					return PlacesUtils.promiseItemGuid(id);
				}
			}
		}).bind(this);
		PlacesCommandHook._bookmarkPagePT = eval('('
			+ PlacesCommandHook._bookmarkPagePT.toString().replace(/^async/u, '$& function')
				.replace('PlacesUtils.bookmarks.unfiledGuid', 'await getBookmarkFolderGuidForURL(url.href) || $&')
		+ ');');
	},

	/**
	 * 設定を削除し、スクリプトを停止する。
	 */
	uninstall: function () {
		SettingsUtils.deleteAll();
		UninstallObserver.notify();
	},
};



/**
 * 設定の変更が完了したときのオブザーバ。
 */
let SettingsObserver = {
	/**
	 * 通知の種類。
	 * @constant {string}
	 */
	TYPE: 'settingsUpdated',

	/**
	 * オブザーバを登録。
	 */
	init: function () {
		ObserverUtils.register(this.TYPE, this);
	},

	/**
	 * オブザーバ。
	 */
	observe: function () {
		BookmarksAssigner.generateRegExpMatchesAny();
	},

	/**
	 * 通知。
	 */
	notify: function () {
		ObserverUtils.notify(this.TYPE);
	},
};



/**
 * 設定画面。
 */
let SettingsScreen = {
	/*
	 * XUL名前空間。
	 * @constant {string}
	 */
	XUL_NS: 'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul',

	/**
	 * 設定画面タブのアイコン。
	 * @constant {string}
	 */
	ICON: 'data:image/x-icon;base64,AAABAAEAEBAAAAEAIADiAgAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAqlJREFUOI2NUWlIVFEYPfe+95zdbTQLS9Emo2jSKI2I6kdEQVF/ogixxVCjpIUWWqBAAqkgojIksIgiItQKpIiEUCqimQpLbZJRK1wox2m2N8285d5+OWgqdP7dyzmHc75DMA1cdU5KJTEfAJjG+or3d7DpuNNi8O1hz8Cbys7/FnxsWE76W8skznX64gQKtXAzV3wX+PPjyQv1vnVi76MV0oeGZWS8JvHouLOSUEHMIJRuT811lpjSsjal5+elQPFi1PN+NOr3P/49HHdTiTfqKv9dtMfNAUAcM6CSRKMjQ1mLd1RfM6bOUKEERMR6CZRh2GfBbs8y7c6YKVR0tIXbLSlCEIA+IQEAfLy1VAwOjhQWl21xm2wSiBYEVD94PIJoQIGrNbgkOU3qWlrpUidVGAPXygVvi/eSY9XMasiyBE0BCFO97sh1R5HxOJnXpo/n038Naq6UMHOKWMQjYQpdAZgOxFVYbcT5r3jCDcZgsdlEg5ms+NkrCz1dvMpIo3LuPOmuaCCrp1puUoJjVaXqM/eS1/e9+1xpybHbJit9eK//YO3TrxsCAHD2Yt3UMwLArgOnpd7ud8KWbWXdjJFGCnZSZRyqphWk2izNETl26syh8idTJmh5cFoqyNYzNm/dOcA5/anrWlYwFHKEgwFy7kiF509MYYJIjtZcvtk+ycD7co84N31k/t71wQpNiQYY08A5zzl/6mCPojB27sKNeqOkGyxJylxw3gkAP16XCxMq/Ppy/ZMlfbbj6SufaTQEOJXa4m9k46fSyqsKADQ11fNgzMxyMlVaOCeAzAVHyYQKuk41gYwmZdtllK4N4PtQMskz9ydmW1MoIiczQq2GEFjcl6iQmFH2eeyCQgSHTcMfn4YkwQo9zhPE8PBnLLJzgKmQ/XLi/y8QmSbXiWe3rgAAAABJRU5ErkJggg==',

	/**
	 * メニューバーの「ブックマーク」に、設定画面を開くオプションを追加。
	 */
	addToMenu: function () {
		let menuItem = document.createElementNS(this.XUL_NS, 'menuitem');
		menuItem.id = BookmarksAssigner.ID + '-menuitem';
		menuItem.setAttribute('label', BookmarksAssigner.NAME);
		menuItem.setAttribute('image', this.ICON);
		menuItem.classList.add('menuitem-iconic');
		menuItem.addEventListener('command', () => this.open());
		// Bug 911477 – Implement DOM4 methods: prepend(), append(), before(), after() and replace() <https://bugzilla.mozilla.org/show_bug.cgi?id=911477>
		let organizeBookmarksSeparator = document.getElementById('organizeBookmarksSeparator');
		organizeBookmarksSeparator.parentNode.insertBefore(menuItem, organizeBookmarksSeparator);

		this.blockDetachment();
	},

	/**
	 * 設定画面を開く。
	 */
	open: function () {
		if (this.tab) {
			// すでに同じウィンドウで開いていれば
			gBrowser.selectedTab  = this.tab;
		} else {
			let enumerator = Services.wm.getEnumerator('navigator:browser');
			while (enumerator.hasMoreElements()) {
				let win = enumerator.getNext();
				if (win[BookmarksAssigner.ID + '_settingsTab']) {
					// すでに別ウィンドウで開いていれば
					win.focus();
					win.gBrowser.selectedTab  = win[BookmarksAssigner.ID + '_settingsTab'];
					return;
				}
			}

			this.tab = gBrowser.addTab('about:blank');
			gBrowser.getBrowserForTab(this.tab).addEventListener('load', this, true);
			gBrowser.selectedTab = this.tab;
			gBrowser.tabContainer.addEventListener('TabClose', this);
		}
	},

	/**
	 * イベントが発生したタブに設定画面を描画する。
	 * @param {Ci.extIEventItem} event - loadイベント。
	 */
	show: function (event) {
		let doc = gBrowser.getBrowserForTab(this.tab).contentDocument, win = doc.defaultView;

		window[BookmarksAssigner.ID + '_settingsTab'] = this.tab;
		win.addEventListener('beforeunload', function () {
			delete window[BookmarksAssigner.ID + '_settingsTab'];
		});

		this.printStatic();
		BookmarkFolderTree.init(doc);
		doc.addEventListener('click', this);
		doc.addEventListener('change', this);
		doc.addEventListener('submit', this);

		// 設定を表示
		for (let rule of SettingsUtils.getRules()) {
			this.insertRule(rule);
		}

		// 空行を追加
		this.insertRule();
	},

	/**
	 * イベントハンドラ。
	 * @param {Event} event
	 */
	handleEvent: function (event) {
		let target = event.target;
		switch (event.type) {
			case 'load':
				let browser = gBrowser.getBrowserForTab(this.tab);
				if (browser.documentURI.spec === 'about:blank') {
					this.show();
				} else {
					// 同じタブで別のページが開かれたら
					browser.removeEventListener(event.type, this, event.eventPhase === Event.CAPTURING_PHASE);
					this.tab = null;
					return;
				}
				break;

			case 'TabClose':
				let closedTab = event.target;
				if (closedTab === this.tab) {
					gBrowser.tabContainer.removeEventListener(event.type, this);
					this.tab = null;
				}
				break;

			case 'click':
				switch (target.name) {
					case 'folder':
						// フォルダツリーの表示・非表示
						target.previousElementSibling.click();
						break;

					case 'delete':
						// 行の削除
						this.deleteRule(target);
						break;

					case 'add-row':
						// 行の追加
						this.insertRule();
						break;

					case 'up':
					case 'down':
						// 行の移動
						this.moveRule(target.name, target);
						break;

					case 'cancel':
						// キャンセル
						this.close();
						break;

					case 'export':
						// エクスポート
						SettingsUtils.exportToFile(
								gBrowser.getBrowserForTab(this.tab).contentDocument.defaultView,
								path => showPopupNotification(_('<%s> へ設定をエクスポートしました。').replace('%s', path), this.tab));
						break;

					case 'import':
						// インポート
						SettingsUtils.importFromFile(gBrowser.getBrowserForTab(this.tab).contentDocument.defaultView, (fileName, errorMessage) => {
							if (errorMessage) {
								showPopupNotification(_('「%s」からのインポートに失敗しました。').replace('%s', fileName) + errorMessage, this.tab, 'warning');
							} else {
								gBrowser.getBrowserForTab(this.tab).contentDocument.defaultView.location.reload();
								showPopupNotification(_('「%s」からのインポートが完了しました。').replace('%s', fileName), this.tab);
							}
						});
						break;

					case 'additional-import':
						// 追加インポート
						this.addRulesFromFile((fileName, errorMessage) => {
							if (errorMessage) {
								showPopupNotification(_('「%s」からのインポートに失敗しました。').replace('%s', fileName) + errorMessage, this.tab, 'warning');
							} else {
								showPopupNotification(_('「%s」からのインポートが完了しました。').replace('%s', fileName) + '\n'
										+ _('インポートした設定を保存するには、「OK」ボタンをクリックしてください。'), this.tab);
							}
						});
						break;

					case 'uninstall':
						// アンインストール
						if (this.tab,document.defaultView.confirm('本当に、『%s』のすべての設定を削除してもよろしいですか？'.replace('%s', BookmarksAssigner.NAME))) {
							this.close();
							BookmarksAssigner.uninstall();
							showPopupNotification(_('設定の削除が完了しました。当スクリプト自体を削除しなければ、次回のブラウザ起動時にまたスクリプトが起動します。'), this.tab);
						}
						break;
				}
				break;

			case 'change':
				switch (target.name) {
					case 'pattern':
						// パターンの種類
						this.showPatternType(target);
						break;

					case 'toggle-folder-tree-show':
						// フォルダツリーの表示・非表示
						if (target.checked) {
							this.showFolderTree(target);
						}
						break;

					default:
						if (target.mozMatchesSelector('.folder-tree [type=radio]')) {
							// フォルダが選択されたとき
							let button = getParentElementByTagName(target, 'td').querySelector('[name=folder]');
							button.textContent = target.parentElement.querySelector('label:last-of-type').textContent;
							button.value = JSON.stringify(BookmarkFolderTree.getFolderNameList(target));
						}
				}
				break;

			case 'submit':
				event.preventDefault();
				this.save();
				this.close();
				break;
		}
	},

	/**
	 * 設定タブ。
	 * @type {XULElement}
	 * @access protected
	 */
	tab: null,

	/**
	 * ファイルから設定を追加する。
	 * @param {Function} [callback] - 追加が完了したときのコールバック関数。第1引数にファイル名。
	 * @access protected
	 */
	addRulesFromFile: function (callback = function () { }) {
		let doc = gBrowser.getBrowserForTab(this.tab).contentDocument;
		SettingsUtils.getRulesFromFile(doc.defaultView, (rules, fileName, errorMessage) => {
			if (errorMessage) {
				callback(fileName, errorMessage);
			} else {
				let lastRule = doc.querySelector('tbody tr:last-of-type');
				let child = lastRule.querySelector('[name=pattern]').value.trim() === '' || lastRule.querySelector('[name=folder]').value === ''
						? lastRule
						: null;
				for (let rule of rules) {
					this.insertRule(rule, child);
				}
				callback(fileName);
			}
		});
	},

	/**
	 * 設定を保存する。
	 * @access protected
	 */
	save: function () {
		let rules = [];
		for (let row of gBrowser.getBrowserForTab(this.tab).contentDocument.getElementsByTagName('tbody')[0].rows) {
			let pattern = row.querySelector('[name=pattern]').value.trim();
			let folder = row.querySelector('[name=folder]').value;
			if (pattern && folder) {
				rules.push({
					enabled: row.querySelector('[name=enabled]').checked,
					pattern: pattern,
					folder: folder,
				});
			}
		}
		ArrayPrefUtils.setAll(SettingsUtils.ROOT_BRANCH_NAME + 'rules.', rules);
		SettingsObserver.notify();
	},

	/**
	 * 設定画面を閉じる。
	 * @access protected
	 */
	close: function () {
		if (gBrowser.tabs.length === 1) {
			// 設定画面以外のタブが存在しなければ
			let enumerator = Services.wm.getEnumerator('navigator:browser');
			enumerator.getNext();
			if (!enumerator.hasMoreElements()) {
				// 他にウィンドウが存在しなければ、ホームページに移動する
				let homePage = gHomeButton.getHomePage();
				gBrowser.getBrowserForTab(this.tab).contentDocument.defaultView.location.assign(
					homePage === 'about:blank' ? 'about:home' : homePage
				);
			} else {
				gBrowser.getBrowserForTab(this.tab).contentDocument.defaultView.close();
			}
		} else {
			gBrowser.removeTab(this.tab);
		}
	},

	/**
	 * 行を移動する。
	 * @param {string} direction - 上に移動するなら"up"、下に移動するなら"down"。
	 * @param {HTMLButtonElement} button - 移動ボタン。
	 * @access protected
	 */
	moveRule: function (direction, button) {
		let row = getParentElementByTagName(button, 'tr');
		row.parentElement.insertBefore(row, row[(direction === 'up' ? 'previous' : 'next') + 'ElementSibling']);
	},

	/**
	 * 行を削除する。
	 * @param {HTMLButtonElement} deleteButton - 削除ボタン。
	 * @access protected
	 */
	deleteRule: function (deleteButton) {
		getParentElementByTagName(deleteButton, 'tr').remove();
	},

	/**
	 * 指定された位置に行を挿入する。
	 * @param {object} [rule] - 指定しなかった場合は空行を挿入する。
	 * @param {HTMLTableRowElement} [child] - 指定しなかった場合は表本体の末尾に追加する。
	 * @access protected
	 */
	insertRule: function (rule = null, child = null) {
		let tbody = gBrowser.getBrowserForTab(this.tab).contentDocument.getElementsByTagName('tbody')[0];
		let row = tbody.querySelector('tbody > template').content.cloneNode(true);

		let enabled = row.querySelector('[name=enabled]');
		let folderButton = row.querySelector('[name=folder]');

		let patternTextBox = row.querySelector('[name=pattern]');
		patternTextBox.id = Math.random();
		patternTextBox.nextElementSibling.htmlFor.add(patternTextBox.id);

		tbody.insertBefore(row, child);

		if (rule) {
			// 有効
			enabled.checked = rule.enabled;
			// URLパターン
			patternTextBox.value = rule.pattern;
			this.showPatternType(patternTextBox);
			// フォルダ
			folderButton.value = JSON.stringify(rule.folder);
			// ボタンの表示
			folderButton.textContent = rule.folder.length === 1
				? PlacesUtils.getFolderContents(PlacesUtils[BookmarkFolderUtils.FUEL_TO_SERVICE_PROPERTY_NAMES[rule.folder[0]]]).root.title
				: rule.folder[rule.folder.length - 1];
		}
	},

	/**
	 * URLパターンがどの種類の文字列として認識されているか表示する。
	 * @param {HTMLInputElement} input
	 * @access protected
	 */
	showPatternType: function (input) {
		let output = gBrowser.getBrowserForTab(this.tab).contentDocument.querySelector('output[for~="' + input.id + '"]');
		if (input.value) {
			switch (SettingsUtils.getPatternType(input.value)) {
				case 'regexp':
					output.value = _('正規表現');
					break;
				case 'domain':
				case 'ipaddr':
					output.value = _('ホスト');
					break;
				case 'wildcard':
					output.value = _('ワイルドカード');
					break;
			}
		} else {
			output.value = '';
		}
	},

	/**
	 * フォルダツリー内のフォルダノードの選択を、ボタンに反映する。
	 * @param {HTMLInputElement} radioButton - 選択されたフォルダ。
	 * @access protected
	 */
	reflectSelectingFolder: function (radioButton) {
		let button = getParentElementByTagName(radioButton, 'td').getElementsByTagName('button')[0];
		button.value = JSON.stringify(BookmarkFolderTree.getFolderNameList(radioButton));
		button.textContent = radioButton.parentElement.querySelector('label:last-of-type').textContent;
	},

	/**
	 * フォルダツリーを表示する。
	 * @param {HTMLInputElement} checkbox - 表示状態を保持するチェックボックス。
	 * @access protected
	 */
	showFolderTree: function (currentCheckbox) {
		let cell = currentCheckbox.parentElement;

		// 他の行のツリーを非表示に
		for (let checkbox of currentCheckbox.form.querySelectorAll('[name=toggle-folder-tree-show]:checked')) {
			if (checkbox !== currentCheckbox) {
				checkbox.checked = false;
			}
		}

		if (!cell.getElementsByClassName('folder-tree')[0]) {
			// フォルダツリーが未作成なら
			let ol = cell.appendChild(BookmarkFolderTree.createRootNode());
			let value = cell.querySelector('[name=folder]').value;
			if (value) {
				// フォルダを選択する
				BookmarkFolderTree.selectDeepFolder(ol, JSON.parse(value));
			}
		}
	},

	/**
	 * 設定画面の静的部分を描画。
	 * @access protected
	 */
	printStatic: function () {
		let doc = gBrowser.getBrowserForTab(this.tab).contentDocument;

		// Favicon
		let link = doc.createElement('link');
		link.rel = 'icon';
		link.href = this.ICON;
		doc.head.appendChild(link);

		// タイトル
		doc.title = BookmarksAssigner.NAME;

		// スタイルシート
		let styleSheet = doc.head.appendChild(doc.createElement('style')).sheet;
		let cssRules = styleSheet.cssRules;
		// Bug 906353 – Add support for css4 selector :matches(), the standard of :-moz-any(). <https://bugzilla.mozilla.org/show_bug.cgi?id=906353>
		[
			':root {'
					+ 'height: 100%;'
					+ 'color: -moz-DialogText;'
					+ 'background: -moz-Dialog;'
					+ '}',

			// 表全体、および各行
			'table {'
					+ 'border-collapse: collapse;'
					+ 'width: 100%;'
					+ '}',
			'thead {'
					// 表全体を囲む枠線
					+ 'border-top: solid 1px gray;'
					+ 'border-left: solid 1px gray;'
					+ 'border-right: solid 1px gray;'
					+ '}',
			'tbody {'
					// 表全体を囲む枠線
					+ 'border-left: solid 1px gray;'
					+ 'border-bottom: solid 1px gray;'
					+ 'border-right: solid 1px gray;'
					+ '}',

			'thead th {'
					// ヘッダ行の各セル
					+ '-moz-appearance: treeheadercell;'
					+ 'font-weight: normal;'
					+ '}',
			'tbody > tr {'
					// 奇数行の背景色
					+ 'background: whitesmoke;'
					+ '}',
			'tbody > tr:nth-of-type(2n) {'
					// 偶数行の背景色
					+ 'background: gainsboro;'
					+ '}',

			'tbody tr:hover {'
					// マウスが載っている行
					+ 'box-shadow: 0 0 0.5em lightblue, inset 0 0 0.3em lightblue;'
					+ '}',

			// 列：有効・無効選択ボックス
			'colgroup.enabled {'
					+ 'width: 4em;'
					+ '}',
			'td.enabled {'
					+ 'text-align: center;'
					+ 'height: 100%;'
					+ '}',
			'td.enabled label {'
					+ 'display: block;'
					+ 'height: 100%;'
					+ '}',

			// 列：振り分け先フォルダ選択ボタン
			'colgroup.folder {'
					+ 'width: 40%;'
					+ '}',

			// 列：各種操作
			'colgroup.operation {'
					+ 'width: 8em;'
					+ '}',
			'td.operation {'
					+ 'text-align: right;'
					+ '}',

			// 各セル
			'th, td {'
					+ 'padding: 3px;'
					+ '}',
			'td {'
					// 内容を上寄せ
					+ 'vertical-align: top;'
					+ '}',

			// URLパターン
			'td.pattern {'
					+ 'display: flex;'
					+ '}',
			'[name=pattern] {'
					+ 'flex-grow: 1;'
					+ '}',
			'[name=pattern] ~ output {'
					+ 'display: inline-block;'
					+ 'width: 10em;'
					+ 'background: lightsteelblue;'
					+ 'text-align: center;'
					+ '}',

			// 行を移動するボタン
			'[name=up],' +
			'[name=bottom] {'
					+ 'font-weight: bold;'
					+ 'padding: 0.3em 0.5em;'
					+ 'border: solid 1px gray;'
					+ 'border-radius: 0.3em;'
					+ 'background: linear-gradient(whitesmoke, gainsboro);'
					+ 'position: relative;'
					+ '}',
			'[name=up]:hover,' +
			'[name=up]:focus,' +
			'[name=bottom]:hover,' +
			'[name=bottom]:focus {'
					+ 'background: linear-gradient(aliceblue, lavender);'
					+ '}',
			'[name=up]:active,' +
			'[name=bottom]:active {'
					+ 'background: linear-gradient(lavender, aliceblue);'
					+ '}',

			'tr:not(:last-of-type) > td > [name=up] {'
					// 上へ移動
					+ 'border-bottom-right-radius: 0;'
					+ '}',
			'[name=up] {'
					+ 'color: darkblue;'
					+ 'left: 1px;'
					+ 'top: -0.2em;'
					+ '}',
			'tr:not(:first-of-type) > td > [name=bottom] {'
					// 下へ移動
					+ 'border-top-left-radius: 0;'
					+ '}',
			'[name=bottom] {'
					+ 'color: darkred;'
					+ 'top: 0.1em;'
					+ '}',

			'tr:first-of-type [name=up],' +
			'tr:last-of-type [name=bottom] {'
					// 一番上の行では上へ移動ボタンは表示しない、一番下の行では下へ移動ボタンは表示しない
					+ 'visibility: hidden;'
					+ '}',

			// 行の削除ボタン
			'[name=delete] {'
					+ 'border: none;'
					+ '-moz-box-sizing: initial;'
					+ 'box-sizing: unset;'
					+ 'width: 16px;'
					+ 'height: 16px;'
					+ 'overflow: hidden;'
					+ 'text-indent: 30px;'
					+ 'white-space: nowrap;'
					+ 'background: url(resource://gre/chrome/toolkit/skin/classic/global/icons/close.png) content-box;'
					+ 'padding: 0.4em;'
					+ 'margin-left: 1em;'
					+ '}',
			'[name=delete]:hover,' +
			'[name=delete]:focus {'
					+ 'background-position: -16px 0;'
					+ '}',
			'[name=delete]:active {'
					+ 'background-position: -32px 0;'
					+ '}',
			'tr:only-of-type [name=delete] {'
					// 行が一つだけなら、削除ボタンは表示しない
					+ 'visibility: hidden;'
					+ '}',

			// フォルダアイコン
			'[name=folder]::before,' +
			'.folder-tree label:last-of-type::before {'
					+ 'content: "";'
					+ 'display: inline-block;'
					+ 'width: 16px;'
					+ 'height: 16px;'
					+ 'background: url(resource://gre/chrome/toolkit/skin/classic/global/icons/folder-item.png) 16px 0;'
					+ 'margin-right: 0.2em;'
					+ '}',
			'[name=folder][value="[\\"menu\\"]"]::before,' +
			'.folder-tree > li > [value=menu] ~ label:last-of-type::before {'
					// ブックマークメニュー
					+ 'background: url(resource:///chrome/browser/skin/classic/browser/places/bookmarksMenu.png);'
					+ '}',
			'[name=folder][value="[\\"toolbar\\"]"]::before,' +
			'.folder-tree > li > [value=toolbar] ~ label:last-of-type::before {'
					// ブックマークツールバー
					+ 'background: url(resource:///chrome/browser/skin/classic/browser/places/bookmarksToolbar.png);'
					+ '}',
			'[name=folder][value="[\\"unfiled\\"]"]::before,' +
			'.folder-tree > li > [value=unfiled] ~ label:last-of-type::before {'
					// 未整理のブックマーク
					+ 'background: url(resource:///chrome/browser/skin/classic/browser/places/unsortedBookmarks.png);'
					+ '}',

			// 行の追加ボタン
			'tfoot td {'
					+ 'padding: 0;'
					+ '}',
			'[name=add-row]::before {'
					+ 'content: url(resource:///chrome/browser/skin/classic/browser/tabbrowser/newtab.png);'
					+ 'margin-right: 0.5em;'
					+ 'vertical-align: -4px;'
					+ '}',
			'[name=add-row] {'
					+ 'border-top: none;'
					+ 'border-left: solid 1px gray;'
					+ 'border-bottom: solid 1px gray;'
					+ 'border-right: solid 1px gray;'
					+ 'border-radius: 0 0 0.2em 0.2em;'
					+ 'background: linear-gradient(lightgrey, silver);'
					+ 'position: relative;'
					+ 'top: -1px;'
					+ 'left: -1px;'
					+ '}',
			'[name="add-row"]:not([disabled]):hover,' +
			'[name="add-row"]:not([disabled]):focus,' +
			'[name="add-row"]:not([disabled]):active {'
					+ 'background: gainsboro;'
					+ '}',

			// フォルダツリーを閉じているとき
			'[name=toggle-folder-tree-show]:not(:checked) ~ ol {'
					+ 'display: none;'
					+ '}',
			'[name=toggle-folder-tree-show] {'
					// チェックボックスを非表示
					+ 'display: none;'
					+ '}',

			// 未選択のフォルダ
			'[name=folder]:not([value]),' +
			'[name=folder][value=""] {'
					+ 'color: gray;'
					+ 'font-style: oblique;'
					+ '}',
			'[name=folder]:not([value])::before,' +
			'[name=folder][value=""]::before {'
					+ 'display: none;'
					+ '}',

			// キャンセル・OKボタン
			'#submit-buttons {'
					+ 'text-align: right;'
					+ '}',
			'#submit-buttons button {'
					+ 'margin-left: 1em;'
					+ '}',
			'button:not([type]), button[type=submit] {'
					+ 'font-size: 2em;'
					+ '}',

			// パターンについて
			'#about dl {'
					+ 'float: left;'
					+ '}',
			'#about dt {'
					+ 'float: left;'
					+ 'background: burlywood;'
					+ 'padding: 0.1em;'
					+ '}',
			'#about dd {'
					+ 'clear: both;'
					+ 'border: solid burlywood;'
					+ 'border-width: 0 0 0.2em 0.4em;'
					+ 'padding: 0.3em 1em 0 0.2em;'
					+ 'margin-bottom: 0.7em;'
					+ '}',
			'#about::after {'
					+ 'content: "";'
					+ 'display: block;'
					+ 'clear: both;'
					+ '}',
		].forEach(function (rule) {
			styleSheet.insertRule(rule, cssRules.length);
		});

		let row, cell, input, checkbox, label, select, option, menu, button, img, div, section, kbd, key, li, dl;

		let form = doc.createElement('form');
		let table = doc.createElement('table');

		// 見出し
		let thead = table.createTHead();
		let headRow = thead.insertRow();

		// 本体
		let tbody = table.createTBody();
		let template = doc.createElement('template');
		row = doc.createElement('tr');

		// 有効
		headRow.appendChild(doc.createElement('th')).textContent = _('有効');
		cell = row.insertCell();
		label = doc.createElement('label');
		checkbox = doc.createElement('input');
		checkbox.name = 'enabled';
		checkbox.type = 'checkbox';
		checkbox.defaultChecked = true;
		label.appendChild(checkbox);
		cell.appendChild(label);

		table.insertBefore(doc.createElement('colgroup'), thead).classList.add(checkbox.name);
		cell.classList.add(checkbox.name);

		// URLパターン
		headRow.appendChild(doc.createElement('th')).textContent = _('URLパターン（大文字小文字同一視）');
		cell = row.insertCell();
		input = doc.createElement('input');
		input.name = 'pattern';
		cell.appendChild(input);

		let output = doc.createElement('output');
		cell.appendChild(output);

		table.insertBefore(doc.createElement('colgroup'), thead).classList.add(input.name);
		cell.classList.add(input.name);

		// フォルダ
		headRow.appendChild(doc.createElement('th')).textContent = _('振り分け先のフォルダ');
		cell = row.insertCell();
		cell.classList.add('folder');

		checkbox = doc.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.name = 'toggle-folder-tree-show';
		cell.appendChild(checkbox);

		button = doc.createElement('button');
		button.type = 'button';
		button.name = 'folder';
		button.textContent = _('未選択');
		cell.appendChild(button);

		table.insertBefore(doc.createElement('colgroup'), thead).classList.add(button.name);
		cell.classList.add(button.name);

		// 各種操作ボタン
		headRow.appendChild(doc.createElement('th'));
		cell = row.insertCell();

		button = doc.createElement('button');
		button.name = 'up';
		button.type = 'button';
		button.textContent = '↑';
		cell.appendChild(button);

		button = doc.createElement('button');
		button.name = 'bottom';
		button.type = 'button';
		button.textContent = '↓';
		cell.appendChild(button);

		button = doc.createElement('button');
		button.name = 'delete';
		button.type = 'button';
		button.textContent = button.title = _('行を削除');
		cell.appendChild(button);

		table.insertBefore(doc.createElement('colgroup'), thead).classList.add('operation');
		cell.classList.add('operation');

		template.content.appendChild(row);
		tbody.appendChild(template);

		// 行追加ボタン
		let tfoot = table.createTFoot();
		cell = tfoot.insertRow().insertCell();
		cell.colSpan = row.cells.length;
		button = doc.createElement('button');
		button.name = 'add-row';
		button.type = 'button';
		button.textContent = _('行を追加');
		cell.appendChild(button);

		form.appendChild(table);

		div = doc.createElement('div');
		div.id = 'submit-buttons';

		// キャンセルボタン
		button = doc.createElement('button');
		button.name = 'cancel';
		button.type = 'button';
		button.textContent = _('キャンセル');
		div.appendChild(button);

		// OKボタン
		button = doc.createElement('button');
		button.name = 'ok';
		button.textContent = _('OK');
		div.appendChild(button);

		form.appendChild(div);
		doc.body.appendChild(form);

		// パターンについて
		section = doc.createElement('section');
		section.id = 'about';
		dl = doc.createElement('dl');
		dl.appendChild(doc.createElement('dt')).textContent = _('“/”（スラッシュ）で始まり“/”で終わる場合');
		dl.appendChild(doc.createElement('dd')).textContent = _('正規表現として扱われます。');
		dl.appendChild(doc.createElement('dt')).textContent = _('ホスト（先頭・末尾がピリオドでない）、またはホストとポート');
		dl.appendChild(doc.createElement('dd')).textContent = _('ホスト、またはホストとポートとして扱われます。ホストがIPアドレスでない場合、そのサブドメインにも一致します。');
		dl.appendChild(doc.createElement('dt')).textContent = _('それ以外');
		dl.appendChild(doc.createElement('dd')).textContent = _('ワイルドカード（“*”のみ）を含む文字列として扱われます。');
		section.appendChild(dl);
		doc.body.appendChild(section);

		// インポートとエクスポート
		section = doc.createElement('section');
		section.appendChild(doc.createElement('h1')).textContent = _('インポートとエクスポート');
		dl = doc.createElement('dl');

		button = doc.createElement('button');
		button.name = 'export';
		button.type = 'button';
		button.textContent = _('エクスポート');
		dl.appendChild(doc.createElement('dt')).appendChild(button);
		dl.appendChild(doc.createElement('dd')).textContent = _('現在の設定をファイルへエクスポートします。保存していない設定は反映されません。');

		button = doc.createElement('button');
		button.name = 'import';
		button.type = 'button';
		button.textContent = _('インポート');
		dl.appendChild(doc.createElement('dt')).appendChild(button);
		dl.appendChild(doc.createElement('dd')).textContent = _('現在の設定をすべて削除し、ファイルから設定をインポートします。');

		button = doc.createElement('button');
		button.name = 'additional-import';
		button.type = 'button';
		button.textContent = _('追加インポート');
		dl.appendChild(doc.createElement('dt')).appendChild(button);
		dl.appendChild(doc.createElement('dd')).textContent = _('ファイルから振り分けルールを追加します。');

		section.appendChild(dl);
		doc.body.appendChild(section);

		// アンインストール
		section = doc.createElement('section');
		section.appendChild(doc.createElement('h1')).textContent = _('その他');
		dl = doc.createElement('dl');

		button = doc.createElement('button');
		button.name = 'uninstall';
		button.type = 'button';
		button.textContent = _('すべての設定を削除');
		dl.appendChild(doc.createElement('dt')).appendChild(button);
		dl.appendChild(doc.createElement('dd')).textContent = _('すべての設定を削除し、スクリプトを停止します。');

		section.appendChild(dl);
		doc.body.appendChild(section);
	},

	/**
	 * 設定画面タブを切り離せないようにする。
	 * @access protected
	 */
	blockDetachment: function () {
		gBrowser.swapBrowsersAndCloseOther = new Proxy(gBrowser.swapBrowsersAndCloseOther, {
			apply: (func, tabbrowser, argumentList) => {
				if (!UninstallObserver.uninstalled && !this.tab) {
					// アンインストール済みでなく、同じウィンドウで設定画面が開いていなければ
					let enumerator = Services.wm.getEnumerator('navigator:browser');
					while (enumerator.hasMoreElements()) {
						let win = enumerator.getNext();
						if (win[BookmarksAssigner.ID + '_settingsTab']) {
							// 別のウィンドウで設定画面が開いていれば
							let [blankTab, targetTab] = argumentList;
							if (targetTab.linkedBrowser.contentDocument === gBrowser.getBrowserForTab(settingsTab).contentDocument) {
								// 設定画面タブが移動されて来ようとしていれば
								if (tabbrowser.tabs.length === 1) {
									window.close();
								} else {
									tabbrowser.removeTab(blankTab);
								}
								return;
							}
						}
					}
				}
				func.apply(tabbrowser, argumentList);
			},
		});

		gBrowser.duplicateTab = new Proxy(gBrowser.duplicateTab, {
			apply: (func, tabbrowser, argumentList) => {
				if (!UninstallObserver.uninstalled && this.tab) {
				// アンインストール済みでない、かつ同じウィンドウで設定画面が開いていれば
					let [tab] = argumentList;
					if (tab.linkedBrowser.contentDocument === gBrowser.getBrowserForTab(this.tab).contentDocument) {
						// 設定画面タブが複製されようとしていれば
						return tab;
					}
				}
				return func.apply(tabbrowser, argumentList);
			},
		});

		gBrowser.moveTabTo = new Proxy(gBrowser.moveTabTo, {
			apply: (func, tabbrowser, argumentList) => {
				if (!UninstallObserver.uninstalled && this.tab) {
					// アンインストール済みでない、かつ同じウィンドウで設定画面が開いていれば
					let [tab, index] = argumentList;
					if (tab.linkedBrowser.contentDocument === gBrowser.getBrowserForTab(this.tab).contentDocument && tab.ownerGlobal !== window) {
						// 設定画面タブが移動されようとしていれば
						return;
					}
				}
				func.apply(tabbrowser, argumentList);
			},
		});

		PlacesControllerDragHelper.onDrop = new Proxy(PlacesControllerDragHelper.onDrop, {
			apply: (func, helper, argumentList) => {
				if (!UninstallObserver.uninstalled && this.tab) {
					// アンインストール済みでない、かつ同じウィンドウで設定画面が開いていれば
					let tab = argumentList[1].mozGetDataAt('application/x-moz-tabbrowser-tab', 0);
					if (tab && tab.linkedBrowser.contentDocument === gBrowser.getBrowserForTab(this.tab).contentDocument) {
						// 設定画面タブがドロップされようとしていれば
						return Promise.reject('about:blank');
					}
				}
				return func.apply(helper, argumentList);
			},
		});
	},
};



/**
 * 指定した局所名を持つ直近の親を返す。
 * @param {Node} childNode
 * @param {string} localName
 * @returns {?Element}
 */
let getParentElementByTagName = (function () {
	let _localName;
	let treeWalkers = new WeakMap();
	return function (childNode, localName) {
		if (childNode.localName === localName) {
			return childNode;
		} else {
			let doc = childNode.ownerDocument;
			let treeWalker = treeWalkers.get(doc);
			if (!treeWalker) {
				treeWalker = doc.createTreeWalker(doc, NodeFilter.SHOW_ELEMENT, function (node) {
					return node.localName === _localName ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
				});
				treeWalkers.set(doc, treeWalker);
			}
			_localName = localName;
			treeWalker.currentNode = childNode;
			return treeWalker.parentNode();
		}
	};
})();



/**
 * prefs.jsなどの設定を読み書きする。
 */
let SettingsUtils = {
	/**
	 * 設定を保存するブランチ名。（末尾にピリオドを含む）
	 * @constant {string}
	 */
	ROOT_BRANCH_NAME: 'extensions.' + BookmarksAssigner.ID + '.',

	/**
	 * [Encoding Standard]{@link http://encoding.spec.whatwg.org/}が要求する標準の文字符号化方式。
	 * @constant {string}
	 */
	THE_ENCODING: 'UTF-8',

	/**
	 * すべての設定を削除する。
	 */
	deleteAll: function () {
		Services.prefs.getBranch(this.ROOT_BRANCH_NAME).deleteBranch('');
	},

	/**
	 * ファイルに設定をエクスポートする。
	 * @param {Window} win - ダイアログの親となるウィンドウ。
	 * @param {Function} [callback] - 保存が完了したときのコールバック関数。第1引数にファイルのフルパス。
	 */
	exportToFile: function (win, callback = function () { }) {
		// ファイル保存ダイアログを開く
		let filePicker = new FilePicker(win, null, Ci.nsIFilePicker.modeSave);
		filePicker.appendFilter(_('JSON ファイル'), '*.json');
		filePicker.appendFilters(Ci.nsIFilePicker.filterAll);
		filePicker.defaultString = BookmarksAssigner.ID + '.json';
		filePicker.open(result => {
			if (result === Ci.nsIFilePicker.returnOK || result === Ci.nsIFilePicker.returnReplace) {
				// 「保存」ボタンが押されていれば
				let stream = FileUtils.openSafeFileOutputStream(filePicker.file);
				let converterOutputStream = new ConverterOutputStream(stream, this.THE_ENCODING, 0, 0x0000);
				converterOutputStream.writeString(JSON.stringify({
					rules: ArrayPrefUtils.getAll(SettingsUtils.ROOT_BRANCH_NAME + 'rules.').map(function (rule) {
						rule.folder = JSON.parse(rule.folder);
						return rule;
					}),
				}, null, '\t'));
				FileUtils.closeSafeFileOutputStream(stream);
				converterOutputStream.close();
				callback(filePicker.file.path);
			}
		});
	},

	/**
	 * ファイルから設定をインポートする。
	 * @param {Window} win - ダイアログの親となるウィンドウ。
	 * @param {Function} [callback] - インポートが成功、または失敗したときのコールバック関数。第1引数にファイル名。インポートに失敗していれば、第2引数にエラーメッセージ。
	 */
	importFromFile: function (win, callback = function () { }) {
		this.getRulesFromFile(win, (rules, fileName, errorMessage) => {
			if (errorMessage) {
				callback(fileName, errorMessage);
			} else {
				ArrayPrefUtils.setAll(SettingsUtils.ROOT_BRANCH_NAME + 'rules.', rules.map(function (rule) {
					rule.folder = JSON.stringify(rule.folder);
					return rule;
				}));
				SettingsObserver.notify();
				callback(fileName);
			}
		});
	},

	/**
	 * ファイル選択ダイアログを表示し、選択されたJSONファイルのルールを返す。
	 * @param {Window} win - ダイアログの親となるウィンドウ。
	 * @param {Function} callback - 第1引数にルールリスト、第2引数にファイル名。エラーが起こった場合は、第3引数にエラーメッセージ。
	 */
	getRulesFromFile: function (win, callback) {
		let filePicker = new FilePicker(win, null, Ci.nsIFilePicker.modeOpen);
		filePicker.appendFilter(_('JSON ファイル'), '*.json');
		filePicker.appendFilters(Ci.nsIFilePicker.filterAll);
		filePicker.open((result) => {
			if (result === Ci.nsIFilePicker.returnOK) {
				let rules = [], errorMessage;
				let file = filePicker.file;
				let stream = new FileInputStream(file, -1, -1, 0);
				try {
					let settings = JSON.parse(NetUtil.readInputStreamToString(stream, stream.available()));
					if (settings && Array.isArray(settings.rules)) {
						rules = settings.rules.filter(rule => this.isValid(rule));
					}
				} catch (e) {
					if (e instanceof SyntaxError) {
						errorMessage = _('JSONパースエラーです。') + '\n' + e.message;
					} else {
						throw e;
					}
				} finally {
					FileUtils.closeSafeFileOutputStream(stream);
				}

				if (rules.length === 0) {
					errorMessage = _('振り分けルールが一つも見つかりませんでした。');
				}

				if (errorMessage) {
					callback(null, file.leafName, errorMessage);
				} else {
					callback(rules, file.leafName);
				}
			}
		});
	},

	/**
	 * パターンの種類を表す文字列を返す。
	 * @param {string} pattern
	 * @returns {string} regexp, domain, ipaddr, wildcard のいずれか。
	 */
	getPatternType: function (pattern) {
		let type;
		let result = /^\/(.+)\/$/.exec(pattern);
		if (result) {
			try {
				new RegExp(result[1]);
				type = 'regexp';
			} catch (e) {
				if (!(e instanceof SyntaxError)) {
					throw e;
				}
			}
		}
		return type || getHostType(pattern) || 'wildcard';
	},

	/**
	 * URLパターンを正規表現インスタンスに変換する。
	 * @param {string} pattern
	 * @returns {RegExp}
	 * @see [JavaScript の正規表現のメタ文字をエスケープ](http://subtech.g.hatena.ne.jp/cho45/20090513/1242199703 "JavaScript の正規表現のメタ文字をエスケープ - 冬通りに消え行く制服ガールは✖夢物語にリアルを求めない。 - subtech")
	 */
	convertToRegExp: function (pattern) {
		let source;
		let patternType = this.getPatternType(pattern);
		switch (patternType) {
			case 'regexp':
				source = pattern.replace(/^\/(.+)\/$/, '$1');
				break;
			case 'domain':
			case 'ipaddr':
				source = '^[-+.a-z]+://' + (patternType === 'domain' ? '(?:(?!-)[-0-9a-z]*[0-9a-z]\\.)*' : '') + pattern.replace(/[\s\S]/g, function (_) {
					return '\\u' + (0x10000 + _.charCodeAt(0)).toString(16).slice(1);
				}) + '/';
				break;
			case 'wildcard':
				source = '^' + pattern.replace(/[\s\S]/g, function (_) {
					return _ === '*' ? '.*' : '\\u' + (0x10000 + _.charCodeAt(0)).toString(16).slice(1);
				}) + '$';
				break;
		}
		return new RegExp(source, 'i');
	},

	/**
	 * prefs.jsからルールを取得する。
	 * @returns {Object[]}
	 */
	getRules: function () {
		return ArrayPrefUtils.getAll(SettingsUtils.ROOT_BRANCH_NAME + 'rules.').map(function (rule) {
			rule.folder = JSON.parse(rule.folder);
			return rule;
		});
	},

	/**
	 * 与えられた振り分けルールが有効なものか検査する。
	 * @param {Object} rule
	 * @returns	{boolean}
	 * @access protected
	 */
	isValid: function (rule) {
		return typeof rule === 'object' && rule !== null
				&& typeof rule.enabled === 'boolean'
				&& typeof rule.pattern === 'string' && rule.pattern.trim() !== ''
				&& Array.isArray(rule.folder) && rule.folder.every(name => typeof name === 'string' && name !== '');
	},
};



/**
 * ブックマークフォルダを選択するためのツリーを描画する。
 */
let BookmarkFolderTree = {
	/**
	 * 文書作成時に実行する処理。
	 * @param {Document} doc - フォルダツリーを挿入する文書。
	 */
	init: function (doc) {
		this.document = doc;

		// キャッシュを削除
		BookmarkFolderUtils.reset();

		this.setStyleSheet();
		this.document.addEventListener('change', this);
	},

	/**
	 * フォルダ名のリストを取得する。
	 * @param {HTMLInputElement} radioButton - 選択されたフォルダ。
	 * @returns {string[]}
	 */
	getFolderNameList: function (radioButton) {
		let root = this.getRootNode(radioButton);
		let names = [];
		for (let li = radioButton.parentElement; root.contains(li); li = li.parentElement.parentElement) {
			names.unshift(li.getElementsByTagName('input')[0].value);
		}
		return names;
	},

	/**
	 * ルートからフォルダを開いていき、目的のフォルダを選択する。
	 * @param {HTMLOListElement} root
	 * @param {string[]} names
	 */
	selectDeepFolder: function (root, names) {
		let ol = root;
		for (let i = 0, l = names.length; i < l; i++) {
			let matchedItem;

			// 子フォルダを走査する。
			for (let li of ol.children) {
				let radioButton = li.getElementsByTagName('input')[0];
				if (radioButton.value === names[i]) {
					matchedItem = li;
					break;
				}
			}

			if (matchedItem) {
				// 一致するフォルダが存在すれば
				if (i + i === l) {
					// フォルダ名リストの末尾なら
					matchedItem.getElementsByTagName('input')[0].click();
				} else {
					let checkbox = matchedItem.querySelector('[name=toggle-open]');
					if (checkbox) {
						// 一致するフォルダに子フォルダが存在すれば
						// フォルダを開いて子フォルダを表示する
						checkbox.checked = true;
						ol = this.openFolder(checkbox);
					} else {
						// フォルダを選択する
						matchedItem.querySelector('[type=radio]').click();
						break;
					}
				}
			} else {
				// 一致するフォルダが存在しなければ、親フォルダを選択する
				ol.parentElement.querySelector('[type=radio]').click();
				break;
			}
		}
	},

	/**
	 * ルート直下のフォルダを含むルートノードを作成する。
	 * @returns {HTMLOListElement}
	 */
	createRootNode: function () {
		let ol = this.document.createElement('ol');
		ol.classList.add('folder-tree');

		// 属性名リストを取得
		let rootNames = BookmarkFolderUtils.getRootNames();

		let name = String(Math.random());
		for (let folder of BookmarkFolderUtils.getChildren()) {
			let li = this.createFolderTreeNode(folder, name);

			// フォルダを表す属性名を設定
			li.querySelector('[type=radio]').value = rootNames[folder.itemId];

			ol.appendChild(li);
		}
		return ol;
	},

	/**
	 * フォルダツリーを挿入する文書。
	 * @type {?Document}
	 * @access protected
	 */
	document: null,

	/**
	 * 文書にスタイルシートを設定する。
	 * @access protected
	 */
	setStyleSheet: function () {
		let aero = ['Win32', 'Win64'].indexOf(window.navigator.platform) !== -1;
		let twisty = 'resource://gre/chrome/toolkit/skin/classic/global/tree/twisty' + (aero ? '-Vista78' : '') + '.svg';

		let styleSheet = this.document.head.appendChild(this.document.createElement('style')).sheet;
		let cssRules = styleSheet.cssRules;
		[
			'.folder-tree {'
					+ 'background: whitesmoke;'
					+ 'border: solid 1px darkgray;'
					+ 'padding: 0.5em;'
					+ '}',

			// 各フォルダのリストマーカー、チェックボックス、及びラジオボタンの非表示
			'.folder-tree,' +
			'.folder-tree ol {'
					+ 'list-style: none;'
					+ 'padding-left: 1em;'
					+ '}',
			'.folder-tree input {'
					+ 'display: none;'
					+ '}',

			// フォルダ
			'.folder-tree label:last-of-type {'
					+ 'display: block;'
					+ 'padding: 0.2em;'
					+ 'border-radius: 0.2em;'
					+ 'border: solid 1px transparent;'
					+ '}',
			'.folder-tree label:last-of-type:hover {'
					// マウスが重なっているフォルダ
					+ 'border-color: lightblue;'
					+ 'background: linear-gradient(aliceblue, lavender);'
					+ '}',
			'.folder-tree [type=radio]:checked ~ label:last-of-type {'
					// 選択中のフォルダ
					+ 'border-color: cornflowerblue;'
					+ 'background: linear-gradient(lavender, lightsteelblue);'
					+ '}',

			// 開閉ボタン
			'.folder-tree [name=toggle-open] + label {'
					+ 'display: inline-block;'
					+ 'width: 9px;'
					+ 'height: 9px;'
					+ 'line-height: 9px;'
					+ 'padding: 4px;'
					+ 'overflow: hidden;'
					+ 'white-space: nowrap;'
					+ 'position: absolute;'
					+ 'left: -17px;'
					+ 'top: 3px;'
					+ '}',
			'.folder-tree li {'
					+ 'position: relative;'
					+ '}',

			// フォルダを閉じているとき
			'.folder-tree [name=toggle-open]:not(:checked) ~ ol {'
					+ 'display: none;'
					+ '}',
			'.folder-tree [name=toggle-open] + label::before {'
					+ 'content: url(' + twisty + '#clsd);'
					+ 'margin-right: 4px;'
					+ '}',
			'.folder-tree [name=toggle-open] + label:hover::before {'
					+ 'content: url(' + twisty + '#clsd-hover);'
					+ '}',

			// フォルダを開いているとき
			'.folder-tree [name=toggle-open]:checked + label::before {'
					+ 'content: url(' + twisty + '#open);'
					+ '}',
			'.folder-tree [name=toggle-open]:checked + label:hover::before {'
					+ 'content: url(' + twisty + '#open-hover);'
					+ '}',
		].forEach(function (rule) {
			styleSheet.insertRule(rule, cssRules.length);
		});
	},

	/**
	 * イベントハンドラ。
	 * @param {Event} event
	 * @access protected
	 */
	handleEvent: function (event) {
		let target = event.target;
		switch (event.type) {
			case 'change':
				if (target.name === 'toggle-open') {
					this.toggleOpen(target);
				}
				break;
		}
	},

	/**
	 * 指定した要素を含むツリーを返す。
	 * @param {Node} childNode
	 * @returns {?HTMLOListElement}
	 * @access protected
	 */
	getRootNode: (function () {
		let treeWalker;
		return function (childNode) {
			if (!treeWalker || treeWalker.root !== this.document) {
				treeWalker = this.document.createTreeWalker(this.document, NodeFilter.SHOW_ELEMENT, function (element) {
					return element.classList.contains('folder-tree') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
				});
			}
			treeWalker.currentNode = childNode;
			return treeWalker.parentNode();
		};
	})(),

	/**
	 * フォルダが開いたときに{@link BookmarkFolderTree.openFolder}、閉じたときに{@link BookmarkFolderTree.closeFolder}を実行する。
	 * @param {HTMLInputElement} checkbox - フォルダ開閉状態を表すチェックボックス。
	 * @access protected
	 */
	toggleOpen: function (checkbox) {
		if (checkbox.checked) {
			this.openFolder(checkbox);
		} else {
			this.closeFolder(checkbox);
		}
	},

	/**
	 * フォルダを開いて子フォルダを表示する。
	 * @param {HTMLInputElement} checkbox - フォルダ開閉状態を表すチェックボックス。
	 * @returns {HTMLOListElement}
	 * @access protected
	 */
	openFolder: function (checkbox) {
		let parent = checkbox.parentElement;
		let ol = parent.getElementsByTagName('ol')[0];
		if (!ol) {
			ol = parent.appendChild(this.document.createElement('ol'));
			let name = parent.getElementsByTagName('input')[0].name;
			for (let folder of BookmarkFolderUtils.getChildren(checkbox.value)) {
				ol.appendChild(this.createFolderTreeNode(folder, name));
			}
		}
		return ol;
	},

	/**
	 * フォルダを閉じて子フォルダを隠す。
	 * @param {HTMLInputElement} checkbox - フォルダ開閉状態を表すチェックボックス。
	 * @access protected
	 */
	closeFolder: function (checkbox) {
		let parent = checkbox.parentElement;
		if (parent.querySelector('ol :checked')) {
			// 閉じられたフォルダツリー内に選択されているフォルダがあれば
			parent.getElementsByTagName('input')[0].click();
		}
	},

	/**
	 * フォルダからli要素を作成する。
	 * @param {Ci.nsINavHistoryContainerResultNode} folder
	 * @param {string} name - ラジオボタンのname属性値。
	 * @returns {HTMLLIElement}
	 * @access protected
	 */
	createFolderTreeNode: function (folder, name) {
		let li = this.document.createElement('li');

		// フォルダノードを表すラジオボタン
		let radioButton = this.document.createElement('input');
		radioButton.type = 'radio';
		radioButton.value = folder.title;
		radioButton.name = name;
		li.appendChild(radioButton);

		if (BookmarkFolderUtils.getChildren(folder).length > 0) {
			// 子フォルダが存在すれば、開閉ボタンを表示する
			let checkbox = this.document.createElement('input');
			checkbox.type = 'checkbox';
			checkbox.name = 'toggle-open';
			checkbox.value = folder.itemId;
			li.appendChild(checkbox);

			checkbox.id = Math.random();
			let label = this.document.createElement('label');
			label.textContent = _('フォルダを開閉する');
			label.htmlFor = checkbox.id;
			li.appendChild(label);
		}

		// ラベル
		radioButton.id = Math.random();
		let label = this.document.createElement('label');
		label.textContent = folder.title;
		label.htmlFor = radioButton.id;
		li.appendChild(label);

		return li;
	},
}



/**
 * ブックマークフォルダに関する情報を取得する。
 */
let BookmarkFolderUtils = {
	/**
	 * {@link Ci.fuelIBookmarkRoots}と{@link PlacesUIUtils}のプロパティ名の対応表。
	 * @constant {Object.<string>}
	 */
	FUEL_TO_SERVICE_PROPERTY_NAMES: {
		menu: 'bookmarksMenuFolderId',
		toolbar: 'toolbarFolderId',
		unfiled: 'unfiledBookmarksFolderId',
	},

	/**
	 * 名前リストを使ってフォルダ階層を下に辿り、フォルダIDを取得する。
	 * @param {string[]} names - 最初の要素は{@link Ci.fuelIBookmarkRoots}のプロパティ名。
	 * @returns {?number}
	 */
	getIdByNameList: function (names) {
		let folder;
		for (let name of names) {
			if (folder) {
				folder = this.getChildByName(name, folder);
			} else {
				// 名前リストの最初の要素なら
				folder = PlacesUtils.getFolderContents(PlacesUtils[this.FUEL_TO_SERVICE_PROPERTY_NAMES[name]]).root;
			}
			if (!folder) {
				return null;
			}
		}
		return folder.itemId;
	},

	/**
	 * キャッシュを削除する。
	 */
	reset: function () {
		this.childrenList = {};
	},

	/**
	 * 子フォルダのリストを取得する。
	 * @param {(Ci.nsINavHistoryContainerResultNode|number)} [parent] - 親フォルダ、またはそのID。省略した場合はルートフォルダの子フォルダを返す。
	 * @returns {?(Ci.nsINavHistoryContainerResultNode[])} IDを指定した場合、それがキャッシュしていない親フォルダならnullを返す。
	 */
	getChildren: function (parent = PlacesUtils.placesRootId) {
		let parentId = parent.itemId || parent;
		if (!(parentId in this.childrenList)) {
			// 未取得なら
			if (parentId !== parent) {
				// 親フォルダの指定がIDでなければ
				this.childrenList[parentId] = [];
				parent.QueryInterface(Ci.nsINavHistoryContainerResultNode);
				parent.containerOpen = true;
				for (let i = 0, l = parent.childCount; i < l; i++) {
					let child = parent.getChild(i);
					if (PlacesUtils.nodeIsFolder(child)
						&& !PlacesUtils.annotations.itemHasAnnotation(child.itemId, PlacesUtils.LMANNO_FEEDURI)) {
						// フォルダ、かつフィードでなければ
						this.childrenList[parentId].push(child);
						break;
					}
				}
				parent.containerOpen = false;
			} else if (parentId === PlacesUtils.placesRootId) {
				// ルートフォルダなら
				this.childrenList[parentId] = [];
				for (let fuelPropertyName in this.FUEL_TO_SERVICE_PROPERTY_NAMES) {
					this.childrenList[parentId].push(
						PlacesUtils.getFolderContents(PlacesUtils[this.FUEL_TO_SERVICE_PROPERTY_NAMES[fuelPropertyName]]).root
					);
				}
			}
		}
		return this.childrenList[parentId] || null;
	},

	/**
	 * {Ci.fuelIBookmarkRoots}のプロパティ名のリストを取得する。
	 * @returns {Object.<string>} キーがフォルダID、値がプロパティ名。
	 */
	getRootNames: function () {
		let rootNames = {};
		for (let fuelPropertyName in this.FUEL_TO_SERVICE_PROPERTY_NAMES) {
			rootNames[PlacesUtils[this.FUEL_TO_SERVICE_PROPERTY_NAMES[fuelPropertyName]]] = fuelPropertyName;
		}
		return rootNames;
	},

	/**
	 * キーにフォルダID、値に子フォルダのリストをもつ。
	 * @type {Object.<Ci.nsINavHistoryContainerResultNode[]>}
	 * @access protected
	 */
	childrenList: {},

	/**
	 * 名前から子フォルダを取得する。
	 * @param {string} name
	 * @param {Ci.nsINavHistoryContainerResultNode} parent - 親フォルダ。
	 * @returns {?Ci.nsINavHistoryContainerResultNode}
	 * @access protected
	 */
	getChildByName: function (name, parent) {
		let result = null;
		parent.QueryInterface(Ci.nsINavHistoryContainerResultNode);
		parent.containerOpen = true;
		for (let i = 0, l = parent.childCount; i < l; i++) {
			let child = parent.getChild(i);
			if (child.title === name && PlacesUtils.nodeIsFolder(child)
				&& !PlacesUtils.annotations.itemHasAnnotation(child.itemId, PlacesUtils.LMANNO_FEEDURI)) {
				// 検索する名前と一致するフォルダ、かつフィードでなければ
				result = child;
				break;
			}
		}
		parent.containerOpen = false;
		return result;
	},
};



/**
 * バージョン3の設定値。
 */
let Version3Settings = {
	/**
	 * prefs.jsの設定名。
	 * @constant {string}
	 */
	PREF_NAME: 'extensions.userchromejs.place-star-button-switcher-347021',

	/**
	 * prefs.jsから古い形式のデータを削除し、新しい形式で保存し直す。
	 */
	addConvertedRules: function () {
		let newSettings = this.getAll().map(oldRule => {
			let newSetting = this.convertToCurrentSettings(oldRule);
			newSetting.folder = JSON.stringify(newSetting.folder);
			return newSetting;
		});
		ArrayPrefUtils.addAll(SettingsUtils.ROOT_BRANCH_NAME + 'rules.', newSettings);
		this.clear();
	},

	/**
	 * 振り分けルールを新しい形式に変換する。
	 * @param {object[]} oldRule
	 * @returns {object}
	 * @access protected
	 */
	convertToCurrentSettings: function (oldRule) {
		let oldPattern = oldRule.URI.trim();
		let newPattern = oldPattern;
		switch (oldRule.condition) {
			case 'domain':
				// ドメイン名（後方一致）
				let host = oldPattern.replace(/^[./]*(.+)[./]*$/, '$1');
				if (getHostType(host)) {
					newPattern = host.toLowerCase();
				}
				break;
			case 'prefix':
			case 'wildcard':
				// 前方一致
				// ワイルドカード（前方一致）
				if (!getHostType(oldPattern) && !oldPattern.startsWith('/')) {
					newPattern = oldPattern + (oldPattern.endsWith('*') ? '' : '*');
				}
				break;
			case 'regexp':
				// 正規表現
				try {
					new RegExp(oldPattern);
					newPattern = '/' + oldPattern + '/';
				} catch (e) { }
				break;
		}

		return {
			pattern: newPattern,
			folder: this.searchBookmarkFolderForName(oldRule.folder) || ['menu', oldRule.folder],
		};
	},

	/**
	 * フォルダ名からブックマークフォルダのパスを取得する。
	 * @param {string} name
	 * @returns	{?string[]} 最初の要素は{@link Ci.fuelIBookmarkRoots}のプロパティ名。
	 * @access protected
	 */
	searchBookmarkFolderForName: function (name) {
		let allFolders = {};
		let unvisitedFolderParents = [PlacesUtils.bookmarks.placesRoot];
		while (unvisitedFolderParents.length > 0) {
			for (let folder of BookmarkFolderUtils.getChildren(unvisitedFolderParents.shift())) {
				allFolders[folder.itemId] = folder;
				if (folder.title === name) {
					let rootNames = BookmarkFolderUtils.getRootNames();
					let names = [];
					for (let folderId = folder.itemId ; folderId; folderId = folder.parent) {
						folder = allFolders[folderId];
						names.unshift(rootNames[folderId] || folder.title);
					}
					return names;
				} else {
					unvisitedFolderParents.push(folder);
				}
			}
		}
		return null;
	},

	/**
	 * JSON形式の設定値を配列に変換する。
	 * @param {string} jsonString
	 * @returns	{object[]}
	 * @access protected
	 */
	convertToObject: function (jsonString) {
		let settings;
		try {
			settings = JSON.parse(jsonString);
		} catch (e) {
			if (!(e instanceof SyntaxError)) {
				throw e;
			}
		}
		return Array.isArray(settings) ? settings.filter(this.isValid) : [];
	},

	/**
	 * 与えられた振り分けルールが有効なものか簡易的に検査する。
	 * @param {Object} oldRule
	 * @returns	{boolean}
	 * @access protected
	 */
	isValid: function (oldRule) {
		return typeof oldRule === 'object' && oldRule !== null
				&& typeof oldRule.URI === 'string' && oldRule.URI.trim() !== ''
				&& typeof oldRule.condition === 'string' && ['domain', 'prefix', 'wildcard', 'regexp'].indexOf(oldRule.condition) !== -1
				&& typeof oldRule.folder === 'string' && oldRule.folder !== '';
	},

	/**
	 * prefs.jsから全設定値を取得する。
	 * @returns	{object[]}
	 * @access protected
	 */
	getAll: function () {
		return this.convertToObject(Preferences.get(this.PREF_NAME, '[]'));
	},

	/**
	 * prefs.jsから削除する。
	 * @access protected
	 */
	clear: function () {
		Services.prefs.clearUserPref(this.PREF_NAME);
	},
};



/**
 * アンインストール時に実行する処理。
 */
let UninstallObserver = {
	/**
	 * 通知の種類。
	 * @constant {string}
	 */
	TYPE: 'uninstall',

	/**
	 * スクリプトが停止していれば真。
	 * @type {booelan}
	 */
	uninstalled: false,

	/**
	 * オブザーバを登録。
	 */
	init: function () {
		ObserverUtils.register(this.TYPE, this);
	},

	/**
	 * オブザーバ。
	 */
	observe: function () {
		this.uninstalled = true;
		document.getElementById(BookmarksAssigner.ID + '-menuitem').remove();
	},

	/**
	 * 通知。
	 */
	notify: function () {
		ObserverUtils.notify(this.TYPE);
	},
};



/**
 * ホスト、またはホストとポートを表す文字列である可能性が高い場合に、ホストの種類を返す。
 * @param {string} host
 * @returns {?string} 'domain' と 'ipaddr' のどちらか。
 */
function getHostType(host) {
	try {
		NetUtil.newURI('http://' + host);
		let result = /^(?:([0-9]{1,3}(?:\.[0-9]{1,3}){3})|((?!-)[-0-9a-z]*[0-9a-z](?:\.(?!-)[-0-9a-z]*[0-9a-z])*|\[[:0-9a-f]+]))(?::[1-9][0-9]{0,4})?$/i.exec(host);
		if (result) {
			return result[1] ? 'ipaddr' : 'domain';
		}
	} catch (e) {
		if (e.result !== Cr.NS_ERROR_MALFORMED_URI) {
			throw e;
		}
	}
	return null;
}



/**
 * オブザーバサービスを利用して、各ウィンドウと通知を送受信する。
 * @version 2014-05-10
 */
let ObserverUtils = {
	/**
	 * オブザーバを追加する。
	 * @param {string} id - 当スクリプトに関する通知のID。
	 */
	init: function (id) {
		this.id = id;
		Services.obs.addObserver(this, this.id, false);
		window.addEventListener('unload', () => {
			Services.obs.removeObserver(this, this.id);
		});
	},

	/**
	 * 通知を受け取る関数を登録する。同じtypeの場合は上書きされる。
	 * @param {string} type
	 * @param {object} observer - observeメソッドを持つオブジェクト。
	 */
	register: function (type, observer) {
		this.observers[type] = observer;
	},

	/**
	 * 通知。
	 * @param {string} type
	 * @param {*} [data]
	 */
	notify: function (type, data = null) {
		Services.obs.notifyObservers(data, this.id, type);
	},

	/**
	 * オブザーバのリスト。
	 * @type {Object}
	 * @access protected
	 */
	observers: {},

	/**
	 * 当スクリプトに関する通知のID。
	 * @type {string}
	 * @access protected
	 */
	id: null,

	/**
	 * 通知を受け取るメソッド。
	 * @param {*} subject
	 * @param {string} topic
	 * @param {string} data
	 * @access protected
	 */
	observe: function (subject, topic, data) {
		if (data in this.observers) {
			// 対応するオブザーバが存在すれば
			this.observers[data].observe(subject);
		}
	},
};



/**
 * prefs.jsについて、オブジェクトの配列を取り扱う。
 * @version 2014-05-10
 */
let ArrayPrefUtils = {
	/**
	 * すべての要素を取得する。
	 * @param {!string} branchName - ブランチ名。末尾にドットが必要。
	 * @returns {Object[]}
	 */
	getAll: function (branchName) {
		let objects = [];
		let branch = Services.prefs.getBranch(branchName);
		for (let prefName of branch.getChildList('')) {
			let [index, property] = prefName.split('.');
			if (property !== undefined && /^(?:0|[1-9][0-9]*)$/.test(index)) {
				if (!(index in objects)) {
					objects[index] = {};
				}
				objects[index][property] = Preferences.get(branchName + prefName, null);
			} else {
				// 壊れた設定なら、削除する
				branch.clearUserPref(prefName);
			}
		}
		return objects;
	},

	/**
	 * 保存されている設定をすべて削除して置き換える。
	 * @param {!string} branchName - ブランチ名。末尾にドットが必要。
	 * @param {Object[]} objects
	 */
	setAll: function (branchName, objects) {
		let oldLength = this.getLength(branchName);
		objects.forEach((object, index) => {
			this.add(branchName, object, index);
		});

		let branch = Services.prefs.getBranch(branchName);
		for (let i = objects.length; i < oldLength; i++) {
			branch.deleteBranch(i + '.');
		}
	},

	/**
	 * 複数の設定を追加する。
	 * @param {!string} branchName - ブランチ名。末尾にドットが必要。
	 * @param {Object[]} objects
	 */
	addAll: function (branchName, objects) {
		let oldLength = this.getLength(branchName);
		objects.forEach((object, index) => {
			this.add(branchName, object, oldLength + index);
		});
	},

	/**
	 * 設定を追加する。
	 * @param {!string} branchName - ブランチ名。末尾にドットが必要。
	 * @param {Object} object
	 * @param {string} [index]
	 */
	add: function (branchName, object, index = this.getLength(branchName)) {
		let root = branchName + index + '.';
		for (let key in object) {
			Preferences.set(root + key, object[key]);
		}
	},

	/**
	 * 保存されている要素数を取得する。（歯抜けインデックスを含む）
	 * @param {!string} branchName - ブランチ名。末尾にドットが必要。
	 * @returns {number}
	 * @access protected
	 */
	getLength: function (branchName) {
		let indexes = [];
		let branch = Services.prefs.getBranch(branchName);
		for (let prefName of branch.getChildList('')) {
			let [index, property] = prefName.split('.');
			if (property !== undefined && /^(?:0|[1-9][0-9]*)$/.test(index)) {
				indexes.push(index);
			} else {
				// 壊れた設定なら、削除する
				branch.clearUserPref(prefName);
			}
		}
		return indexes.length > 0 ? Math.max.apply(null, indexes) + 1 : 0;
	},
};



/**
 * ポップアップ通知を表示する。
 * @param {string} message - 表示するメッセージ。
 * @param {XULElement} tab - メッセージを表示するタブ。
 * @param {string} [type=information] - メッセージの前に表示するアイコンの種類。"information"、"warning"、"error"、"question" のいずれか。
 * @version 2016-06-09-bookmarks-assigner
 */
function showPopupNotification(message, tab, type = 'information') {
	let win = tab.ownerDocument.defaultView;
	if (win.closed) {
		// 指定されたタブを含むウィンドウが既に閉じていれば、別ウィンドウの最前面のタブを取得
		tab = Services.wm.getMostRecentWindow('navigator:browser').gBrowser.selectedTab;
	} else if (!tab.ownerDocument.contains(tab)) {
		// 指定されたタブが既に閉じていれば、最前面のタブを取得
		tab = win.gBrowser.selectedTab;
	}
	win.PopupNotifications.show(gBrowser.getBrowserForTab(tab), BookmarksAssigner.ID, message, null, null, null, {
		persistWhileVisible: true,
		removeOnDismissal: true,
		popupIconURL: 'chrome://global/skin/icons/' + type + '-' + (type === 'information' ? '32' : '64') + '.png',
	});
}



BookmarksAssigner.main();

})();
